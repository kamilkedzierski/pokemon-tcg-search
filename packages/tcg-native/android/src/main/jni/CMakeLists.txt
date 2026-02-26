cmake_minimum_required(VERSION 3.13)

project(tcgsearch_cxxmodule)

add_library(
  tcgsearch_cxxmodule
  SHARED
  ../../../../shared/TcgSearchBridgeUtils.cpp
  ../../../../shared/TcgSearchCxxModule.cpp
  ../../../../node_modules/@pokemon-search/core-cpp/src/search_engine.cpp
  ../../../../node_modules/@pokemon-search/core-cpp/src/search_utils.cpp
)

target_include_directories(
  tcgsearch_cxxmodule
  PUBLIC
  ../../../../shared
  ../../../../node_modules/@pokemon-search/core-cpp/include
  ../../build/generated/source/codegen/jni/react/renderer/components/AppSpecs
)

target_compile_features(tcgsearch_cxxmodule PRIVATE cxx_std_20)

target_link_libraries(
  tcgsearch_cxxmodule
  react_codegen_AppSpecs
  reactnative
  jsi
)
