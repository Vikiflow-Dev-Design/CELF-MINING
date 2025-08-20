// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// module.exports = config;


const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = config;