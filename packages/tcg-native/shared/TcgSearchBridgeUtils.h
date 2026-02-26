#pragma once

#include <cstddef>
#include <string>
#include <string_view>
#include <vector>

#include <jsi/jsi.h>

#include <pokemon_search/search_engine.hpp>

namespace facebook::react::tcg_module_utils {

bool TryParseIndexId(double rawIndexId, int* outIndexId);
std::size_t ParseLimit(double rawLimit);

bool ParseCardsFromDatasetJson(
    facebook::jsi::Runtime& rt,
    std::string_view datasetJson,
    std::vector<pokemon_search::Card>* outCards,
    std::string* error);

std::string SerializeHits(const std::vector<pokemon_search::SearchHit>& hits);

}  // namespace facebook::react::tcg_module_utils
