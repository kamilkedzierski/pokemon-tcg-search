module.exports = {
  dependency: {
    platforms: {
      ios: {},
      android: {
        cxxModuleCMakeListsPath: 'src/main/jni/CMakeLists.txt',
        cxxModuleCMakeListsModuleName: 'tcgsearch_cxxmodule',
        cxxModuleHeaderName: 'TcgSearchCxxModule',
      },
    },
  },
};
