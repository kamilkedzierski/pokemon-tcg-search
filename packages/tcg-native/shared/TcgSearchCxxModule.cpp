#include "TcgSearchCxxModule.h"

#include "TcgSearchBridgeUtils.h"

#include <jsi/jsi.h>

#include <utility>

namespace facebook::react {
namespace {
constexpr const char* kEmptyResultsJson = "[]";
}  // namespace

// Creates the C++ TurboModule bridge with the provided JS call invoker.
TcgSearchCxxModule::TcgSearchCxxModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeTcgSearchModuleCxxSpec<TcgSearchCxxModule>(std::move(jsInvoker)) {}

// Builds a searchable in-memory index from raw dataset JSON.
double TcgSearchCxxModule::buildIndex(jsi::Runtime& rt, std::string datasetJson) {
  std::vector<pokemon_search::Card> cards;
  std::string parseError;
  if (!tcg_module_utils::ParseCardsFromDatasetJson(rt, datasetJson, &cards, &parseError)) {
    throw jsi::JSError(
        rt, parseError.empty() ? "Failed to parse dataset JSON" : parseError);
  }

  auto engine = std::make_shared<pokemon_search::SearchEngine>();
  const int cardsCount = engine->BuildFromCards(std::move(cards));
  if (cardsCount <= 0) {
    throw jsi::JSError(rt, "Dataset did not contain valid cards");
  }

  {
    std::lock_guard<std::mutex> lock(mutex_);
    engine_ = std::move(engine);
  }

  return static_cast<double>(kIndexId);
}

// Runs name-based lookups against the current index.
std::string TcgSearchCxxModule::searchByName(
    jsi::Runtime& rt, double indexId, std::string query, double limit) {
  return RunSearch(
      rt,
      indexId,
      std::move(query),
      limit,
      &pokemon_search::SearchEngine::SearchByName);
}

// Runs number-based lookups against the current index.
std::string TcgSearchCxxModule::searchByNumber(
    jsi::Runtime& rt, double indexId, std::string number, double limit) {
  return RunSearch(
      rt,
      indexId,
      std::move(number),
      limit,
      &pokemon_search::SearchEngine::SearchByNumber);
}

std::string TcgSearchCxxModule::RunSearch(
    jsi::Runtime& rt,
    double indexId,
    std::string value,
    double limit,
    SearchMethod searchMethod) {
  const std::size_t parsedLimit = tcg_module_utils::ParseLimit(limit);
  if (parsedLimit == 0 || value.empty()) {
    return kEmptyResultsJson;
  }

  int parsedIndexId = 0;
  if (!tcg_module_utils::TryParseIndexId(indexId, &parsedIndexId)) {
    throw jsi::JSError(rt, "Invalid index id");
  }

  const auto engine = GetEngine(parsedIndexId);
  if (engine == nullptr) {
    throw jsi::JSError(rt, "Index does not exist");
  }

  const auto hits = ((*engine).*searchMethod)(value, parsedLimit);
  return tcg_module_utils::SerializeHits(hits);
}

// Returns the active search engine instance when the id is valid.
std::shared_ptr<pokemon_search::SearchEngine> TcgSearchCxxModule::GetEngine(
    int indexId) const {
  std::lock_guard<std::mutex> lock(mutex_);
  if (!engine_ || indexId != kIndexId) {
    return nullptr;
  }

  return engine_;
}

}  // namespace facebook::react
