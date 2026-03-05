import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react(),
        // Pass 1: Gzip
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            filter: /\.(js|mjs|json|css|html|geojson)$/i,
            // ONLY compress files that CloudFront will refuse to touch (>10MB)
            threshold: 10485760,
            verbose: true
        }),
        // Pass 2: Brotli
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            filter: /\.(js|mjs|json|css|html|geojson)$/i,
            // SAME threshold: 10MB
            threshold: 10485760,
            verbose: true
        }),
    ],
    publicDir: 'public'
});
