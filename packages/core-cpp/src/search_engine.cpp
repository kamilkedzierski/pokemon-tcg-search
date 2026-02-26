#include "../include/pokemon_search/search_engine.hpp"
#include "../include/pokemon_search/search_utils.hpp"

#include <algorithm>
#include <cmath>
#include <unordered_set>
#include <utility>

namespace pokemon_search {
namespace {
constexpr double kScoreEpsilon = 0.000001;

// Computes a relevance score for a name query against a single card.
double ScoreNameMatch(const Card& card, const std::string& normalized_query) {
  if (normalized_query.empty()) {
    return 0.0;
  }

  const std::string normalized_name = search_utils::ToLower(card.name);

  if (normalized_name == normalized_query) {
    return 1.0;
  }

  if (normalized_name.rfind(normalized_query, 0) == 0) {
    return 0.9;
  }

  if (normalized_name.find(normalized_query) != std::string::npos) {
    return 0.7;
  }

  const std::vector<std::string> name_tokens = search_utils::Tokenize(normalized_name);
  const std::vector<std::string> query_tokens = search_utils::Tokenize(normalized_query);
  if (query_tokens.empty()) {
    return 0.0;
  }

  std::size_t overlap = 0;
  for (const std::string& token : query_tokens) {
    if (std::find(name_tokens.begin(), name_tokens.end(), token) != name_tokens.end()) {
      overlap += 1;
    }
  }

  if (overlap == 0) {
    return 0.0;
  }

  return std::min(0.6, 0.3 + static_cast<double>(overlap) * 0.1);
}

}  // namespace

// Rebuilds lookup indexes from validated cards and returns indexed card count.
int SearchEngine::BuildFromCards(std::vector<Card> cards) {
  cards_.clear();
  token_to_card_indices_.clear();
  number_to_card_indices_.clear();

  cards_.reserve(cards.size());
  for (Card& card : cards) {
    if (card.id.empty() || card.name.empty() || card.number.empty()) {
      continue;
    }

    cards_.push_back(std::move(card));
  }

  for (std::size_t i = 0; i < cards_.size(); ++i) {
    const Card& card = cards_[i];

    std::unordered_set<std::string> unique_tokens;
    for (const std::string& token : search_utils::Tokenize(card.name)) {
      unique_tokens.insert(token);
    }

    for (const std::string& token : unique_tokens) {
      token_to_card_indices_[token].push_back(i);
    }

    const std::string normalized_number = search_utils::NormalizeNumber(card.number);
    if (!normalized_number.empty()) {
      number_to_card_indices_[normalized_number].push_back(i);
    }
  }

  return static_cast<int>(cards_.size());
}

// Returns best name matches sorted by score (then stable by id).
std::vector<SearchHit> SearchEngine::SearchByName(
    const std::string& query, std::size_t limit) const {
  if (cards_.empty() || limit == 0) {
    return {};
  }

  const std::string normalized_query = search_utils::ToLower(search_utils::Trim(query));
  if (normalized_query.empty()) {
    return {};
  }

  std::vector<SearchHit> hits;
  std::unordered_set<std::size_t> candidate_indices;
  const std::vector<std::string> query_tokens = search_utils::Tokenize(normalized_query);
  for (const std::string& token : query_tokens) {
    const auto entry = token_to_card_indices_.find(token);
    if (entry == token_to_card_indices_.end()) {
      continue;
    }

    for (std::size_t index : entry->second) {
      candidate_indices.insert(index);
    }
  }

  if (candidate_indices.empty()) {
    for (std::size_t i = 0; i < cards_.size(); ++i) {
      candidate_indices.insert(i);
    }
  }

  hits.reserve(candidate_indices.size());
  for (std::size_t card_index : candidate_indices) {
    const Card& card = cards_[card_index];
    const double score = ScoreNameMatch(card, normalized_query);
    if (score <= 0.0) {
      continue;
    }

    hits.push_back(SearchHit{card.id, score});
  }

  std::sort(hits.begin(), hits.end(), [](const SearchHit& left, const SearchHit& right) {
    if (std::abs(left.score - right.score) > kScoreEpsilon) {
      return left.score > right.score;
    }

    return left.id < right.id;
  });

  if (hits.size() > limit) {
    hits.resize(limit);
  }

  return hits;
}

// Returns exact card-number matches with a fixed top score.
std::vector<SearchHit> SearchEngine::SearchByNumber(
    const std::string& number, std::size_t limit) const {
  if (cards_.empty() || limit == 0) {
    return {};
  }

  const std::string normalized_number = search_utils::NormalizeNumber(number);
  if (normalized_number.empty()) {
    return {};
  }

  const auto entry = number_to_card_indices_.find(normalized_number);
  if (entry == number_to_card_indices_.end()) {
    return {};
  }

  std::vector<SearchHit> hits;
  hits.reserve(std::min(limit, entry->second.size()));
  for (std::size_t card_index : entry->second) {
    hits.push_back(SearchHit{cards_[card_index].id, 1.0});
    if (hits.size() >= limit) {
      break;
    }
  }

  return hits;
}

}  // namespace pokemon_search
