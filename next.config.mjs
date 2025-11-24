/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
    images: {
        unoptimized: process.env.NODE_ENV === 'production',
    },
};

export default nextConfig;
