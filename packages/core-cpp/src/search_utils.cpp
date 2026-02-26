#include "../include/pokemon_search/search_utils.hpp"

#include <cctype>

namespace pokemon_search::search_utils {
namespace {

// Returns true for ASCII whitespace handled by normalization helpers.
bool IsWhitespace(char value) {
  return value == ' ' || value == '\n' || value == '\r' || value == '\t';
}

char ToLowerAscii(char value) {
  return static_cast<char>(std::tolower(static_cast<unsigned char>(value)));
}

}  // namespace

// Trims leading and trailing ASCII whitespace from text.
std::string Trim(std::string_view value) {
  std::size_t start = 0;
  std::size_t end = value.size();

  while (start < end && IsWhitespace(value[start])) {
    start += 1;
  }

  while (end > start && IsWhitespace(value[end - 1])) {
    end -= 1;
  }

  return std::string(value.substr(start, end - start));
}

// Converts text to lowercase for case-insensitive matching.
std::string ToLower(std::string_view value) {
  std::string out;
  out.reserve(value.size());

  for (char c : value) {
    out.push_back(ToLowerAscii(c));
  }

  return out;
}

// Normalizes card numbers by trimming and taking the segment before '/'.
std::string NormalizeNumber(std::string_view value) {
  const std::string trimmed = Trim(value);
  const std::size_t slash = trimmed.find('/');
  const std::string_view before_slash = slash == std::string::npos
      ? std::string_view(trimmed)
      : std::string_view(trimmed).substr(0, slash);
  return ToLower(Trim(before_slash));
}

// Splits text into lowercase alphanumeric tokens.
std::vector<std::string> Tokenize(std::string_view value) {
  std::vector<std::string> tokens;
  std::string current;

  for (char c : value) {
    if (std::isalnum(static_cast<unsigned char>(c))) {
      current.push_back(ToLowerAscii(c));
      continue;
    }

    if (!current.empty()) {
      tokens.push_back(current);
      current.clear();
    }
  }

  if (!current.empty()) {
    tokens.push_back(current);
  }

  return tokens;
}

}  // namespace pokemon_search::search_utils
