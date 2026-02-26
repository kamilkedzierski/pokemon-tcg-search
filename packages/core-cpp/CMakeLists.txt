cmake_minimum_required(VERSION 3.20)
project(pokemon_search_core VERSION 0.1.0 LANGUAGES CXX)

include(CTest)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_library(pokemon_search_core STATIC
  src/search_engine.cpp
  src/search_utils.cpp
)

target_include_directories(pokemon_search_core
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

target_compile_features(pokemon_search_core PUBLIC cxx_std_20)

if(BUILD_TESTING)
  add_executable(core_tests
    tests/search_engine_test.cpp
  )

  target_link_libraries(core_tests PRIVATE pokemon_search_core)

  add_test(NAME core_tests COMMAND core_tests)
endif()
