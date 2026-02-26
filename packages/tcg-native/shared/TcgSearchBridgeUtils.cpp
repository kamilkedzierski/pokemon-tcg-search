#include "TcgSearchBridgeUtils.h"

#include <cmath>
#include <exception>
#include <limits>
#include <string>

namespace facebook::react::tcg_module_utils {
namespace {

// Escapes JSON-sensitive characters in string fields.
std::string EscapeJson(std::string_view value) {
  std::string escaped;
  escaped.reserve(value.size());

  for (const char c : value) {
    if (c == '"' || c == '\\') {
      escaped.push_back('\\');
      escaped.push_back(c);
      continue;
    }

    if (c == '\n') {
      escaped += "\\n";
      continue;
    }

    if (c == '\r') {
      escaped += "\\r";
      continue;
    }

    if (c == '\t') {
      escaped += "\\t";
      continue;
    }

    escaped.push_back(c);
  }

  return escaped;
}

void SetError(std::string* error, std::string_view message) {
  if (error != nullptr) {
    *error = std::string(message);
  }
}

}  // namespace

// Parses and validates a JS index id into a positive integer.
bool TryParseIndexId(double rawIndexId, int* outIndexId) {
  if (outIndexId == nullptr) {
    return false;
  }

  if (!std::isfinite(rawIndexId)) {
    return false;
  }

  if (rawIndexId < 1 || rawIndexId > static_cast<double>(std::numeric_limits<int>::max())) {
    return false;
  }

  const double rounded = std::floor(rawIndexId);
  if (rounded != rawIndexId) {
    return false;
  }

  *outIndexId = static_cast<int>(rounded);
  return true;
}

// Converts a JS numeric limit into a bounded C++ size.
std::size_t ParseLimit(double rawLimit) {
  // JS numbers arrive as double; normalize to a safe non-negative integer limit for C++.
  if (!std::isfinite(rawLimit) || rawLimit <= 0) {
    return 0;
  }

  const double maxValue = static_cast<double>(std::numeric_limits<std::size_t>::max());
  if (rawLimit > maxValue) {
    return std::numeric_limits<std::size_t>::max();
  }

  return static_cast<std::size_t>(std::floor(rawLimit));
}

// Parses dataset JSON into cards via the JS runtime's JSON parser.
bool ParseCardsFromDatasetJson(
    facebook::jsi::Runtime& rt,
    std::string_view datasetJson,
    std::vector<pokemon_search::Card>* outCards,
    std::string* error) {
  if (outCards == nullptr) {
    return false;
  }

  outCards->clear();

  try {
    // Keep parsing dependency-free by delegating JSON parsing to JS runtime.
    const jsi::Object json = rt.global().getPropertyAsObject(rt, "JSON");
    const jsi::Function parse = json.getPropertyAsFunction(rt, "parse");
    const jsi::String payload = jsi::String::createFromUtf8(rt, std::string(datasetJson));
    const jsi::Value parsed = parse.call(rt, payload);
    if (!parsed.isObject()) {
      SetError(error, "Dataset JSON must be an array");
      return false;
    }

    const jsi::Object parsedObject = parsed.asObject(rt);
    if (!parsedObject.isArray(rt)) {
      SetError(error, "Dataset JSON must be an array");
      return false;
    }

    const jsi::Array rows = parsedObject.asArray(rt);
    const std::size_t rowsCount = rows.size(rt);
    outCards->reserve(rowsCount);

    for (std::size_t i = 0; i < rowsCount; ++i) {
      const jsi::Value row = rows.getValueAtIndex(rt, i);
      if (!row.isObject()) {
        continue;
      }

      const jsi::Object card = row.asObject(rt);
      const jsi::Value idValue = card.getProperty(rt, "id");
      const jsi::Value nameValue = card.getProperty(rt, "name");
      const jsi::Value numberValue = card.getProperty(rt, "number");

      if (!idValue.isString() || !nameValue.isString() || !numberValue.isString()) {
        continue;
      }

      outCards->push_back(pokemon_search::Card{
          idValue.asString(rt).utf8(rt),
          nameValue.asString(rt).utf8(rt),
          numberValue.asString(rt).utf8(rt),
      });
    }

    if (outCards->empty()) {
      SetError(error, "Dataset JSON does not contain valid cards");
      return false;
    }

    return true;
  } catch (const jsi::JSError& jsError) {
    SetError(error, jsError.getMessage());
    return false;
  } catch (const std::exception& exception) {
    SetError(error, exception.what());
    return false;
  }
}

// Serializes search hits to a compact JSON array.
std::string SerializeHits(const std::vector<pokemon_search::SearchHit>& hits) {
  std::string json;
  json.push_back('[');

  for (std::size_t i = 0; i < hits.size(); ++i) {
    if (i > 0) {
      json.push_back(',');
    }

    const auto& hit = hits[i];
    json += "{\"id\":\"";
    json += EscapeJson(hit.id);
    json += "\",\"score\":";
    json += std::to_string(hit.score);
    json.push_back('}');
  }

  json.push_back(']');
  return json;
}

}  // namespace facebook::react::tcg_module_utils
