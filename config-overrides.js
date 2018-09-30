const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], // change importing css to less
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#303F9F" },
    javascriptEnabled: true,
  })(config, env);
  return config;
};
