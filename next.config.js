require('dotenv').config()
module.exports = {
  devIndicators: {
    autoPrerender: false
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_KEY: process.env.AIRTABLE_BASE_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    RESTRICTED_GOOGLE_MAPS_API_KEY: process.env.RESTRICTED_GOOGLE_MAPS_API_KEY,
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    )
    return config
  },
}
