#pragma once

#include <string>
#include <string_view>
#include <vector>

namespace pokemon_search::search_utils {

std::string Trim(std::string_view value);

std::string ToLower(std::string_view value);

std::string NormalizeNumber(std::string_view value);

std::vector<std::string> Tokenize(std::string_view value);

}  // namespace pokemon_search::search_utils
