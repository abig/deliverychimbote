const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === "true",
});

const SOURCE_MAPS = process.env.PRODUCTION_SOURCE_MAPS === "true";

module.exports = withBundleAnalyzer({
  productionBrowserSourceMaps: SOURCE_MAPS,
});
