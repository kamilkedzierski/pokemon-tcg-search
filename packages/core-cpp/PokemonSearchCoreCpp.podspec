require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'PokemonSearchCoreCpp'
  s.version      = package['version']
  s.summary      = package['description']
  s.description  = package['description']
  s.homepage     = 'https://github.com/kamilkedzierski/pokemon-tcg-search'
  s.license      = package['license']
  s.authors      = 'Kamil Kedzierski'
  s.platforms    = { :ios => '15.1' }
  s.source       = { :path => '.' }

  s.source_files        = 'src/**/*.{cpp,cc,cxx}', 'include/**/*.hpp'
  s.public_header_files = 'include/**/*.hpp'
  s.header_mappings_dir = 'include'

  s.pod_target_xcconfig = {
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++20',
    'HEADER_SEARCH_PATHS' => '"$(inherited)" "$(PODS_TARGET_SRCROOT)/include"'
  }
end
