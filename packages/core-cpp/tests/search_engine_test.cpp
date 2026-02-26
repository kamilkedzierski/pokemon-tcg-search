#include "pokemon_search/search_engine.hpp"

#include <stdexcept>
#include <string>
#include <vector>

using pokemon_search::Card;
using pokemon_search::SearchEngine;

void Expect(bool condition, const std::string& message) {
  if (!condition) {
    throw std::runtime_error(message);
  }
}

int main() {
  SearchEngine engine;
  const int count = engine.BuildFromCards({
      Card{"xy-1", "Venusaur EX", "15"},
      Card{"swsh-2", "Charizard", "4/102"},
      Card{"sv-10", "Blastoise", "4"},
  });
  Expect(count == 3, "Expected three indexed cards");

  const auto by_name = engine.SearchByName("char", 10);
  Expect(by_name.size() == 1, "Expected one card for name query");
  Expect(by_name.front().id == "swsh-2", "Expected Charizard for name query");
  Expect(by_name.front().score > 0.0, "Expected positive score for name query");

  const auto by_number = engine.SearchByNumber("4", 10);
  Expect(by_number.size() == 2, "Expected two cards for number query");
  Expect(by_number.front().score == 1.0, "Expected exact score for number query");

  const auto by_number_with_slash = engine.SearchByNumber("4/123", 10);
  Expect(by_number_with_slash.size() == 2, "Expected slash normalization for number query");

  const auto limited = engine.SearchByName("a", 2);
  Expect(limited.size() == 2, "Expected limit to cap result size to 2");

  const auto empty = engine.SearchByName("", 10);
  Expect(empty.empty(), "Expected empty result for empty query");

  return 0;
}
