/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  alternateRefs: [
    {
      href: 'https://example.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://example.com/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://example.com/de',
      hreflang: 'de',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};