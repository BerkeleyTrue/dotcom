module.exports = {
  siteMetadata: {
    title: 'BerkeleyTrue',
    description: 'My personal page',
    author: '@berkeleytrue',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        /* eslint-disable camelcase */
        short_name: 'berkeleytrue',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#eadeda',
        display: 'minimal-ui',
        // This path is relative to the root of the site.
        icon: 'src/images/gatsby-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          /* eslint-disable comma-dangle */
          require('postcss-nested-ancestors')({}),
          require('postcss-nested')({}),
          require('postcss-import')({}),
          require('postcss-flexbox')({}),
          require('postcss-button')({}),
          require('postcss-simple-vars')({}),
          require('postcss-automath')({}),
          require('postcss-normalize')({}),
          require('postcss-console')({}),
          require('autoprefixer')({}),
          require('cssnano')({}),
          /* eslint-enable comma-dangle */
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
