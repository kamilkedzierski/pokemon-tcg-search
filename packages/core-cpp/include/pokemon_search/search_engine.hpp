#pragma once

#include <cstddef>
#include <string>
#include <unordered_map>
#include <vector>

namespace pokemon_search {

struct Card {
  std::string id;
  std::string name;
  std::string number;
};

struct SearchHit {
  std::string id;
  double score;
};

class SearchEngine {
 public:
  int BuildFromCards(std::vector<Card> cards);
  std::vector<SearchHit> SearchByName(const std::string& query, std::size_t limit) const;
  std::vector<SearchHit> SearchByNumber(const std::string& number, std::size_t limit) const;

 private:
  std::vector<Card> cards_;
  std::unordered_map<std::string, std::vector<std::size_t>> token_to_card_indices_;
  std::unordered_map<std::string, std::vector<std::size_t>> number_to_card_indices_;
};

}  // namespace pokemon_search
