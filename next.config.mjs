/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
    images: {
        unoptimized: process.env.NODE_ENV === 'production',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
