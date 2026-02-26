#pragma once

#include <memory>
#include <mutex>
#include <string>

#include <pokemon_search/search_engine.hpp>

#if __has_include(<TcgSearchSpecsJSI.h>)
#include <TcgSearchSpecsJSI.h>
#elif __has_include(<react/renderer/components/TcgSearchSpecs/TcgSearchSpecsJSI.h>)
#include <react/renderer/components/TcgSearchSpecs/TcgSearchSpecsJSI.h>
#elif __has_include(<AppSpecsJSI.h>)
#include <AppSpecsJSI.h>
#elif __has_include(<react/renderer/components/AppSpecs/AppSpecsJSI.h>)
#include <react/renderer/components/AppSpecs/AppSpecsJSI.h>
#else
#error "Generated *SpecsJSI.h header not found. Ensure Codegen artifacts are available."
#endif

namespace facebook::react {

class TcgSearchCxxModule : public NativeTcgSearchModuleCxxSpec<TcgSearchCxxModule> {
 public:
  explicit TcgSearchCxxModule(std::shared_ptr<CallInvoker> jsInvoker);

  // Search API exposed to JS.
  double buildIndex(jsi::Runtime& rt, std::string datasetJson);
  std::string searchByName(jsi::Runtime& rt, double indexId, std::string query, double limit);
  std::string searchByNumber(jsi::Runtime& rt, double indexId, std::string number, double limit);

 private:
  using SearchMethod = std::vector<pokemon_search::SearchHit> (pokemon_search::SearchEngine::*)(
      const std::string&,
      std::size_t) const;
  static constexpr int kIndexId = 1;

  std::string RunSearch(
      jsi::Runtime& rt,
      double indexId,
      std::string value,
      double limit,
      SearchMethod searchMethod);
  std::shared_ptr<pokemon_search::SearchEngine> GetEngine(int indexId) const;

  mutable std::mutex mutex_;
  std::shared_ptr<pokemon_search::SearchEngine> engine_;
};

}  // namespace facebook::react
