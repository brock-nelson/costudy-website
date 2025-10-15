import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://costudy.co';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/(auth)/',
          '/login/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
