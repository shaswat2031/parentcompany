/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'rymgrenergy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.synchronousbuilddigital.com',
      },
    ],
  },
};

export default nextConfig;
