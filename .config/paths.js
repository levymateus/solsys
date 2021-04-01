'use strict'

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);


const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = ['js'];


// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appBuild: resolveApp(buildPath),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appPath: resolveApp('.'),
  publicUrlOrPath,
}