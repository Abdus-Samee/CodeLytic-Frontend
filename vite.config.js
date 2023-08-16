import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdir, existsSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-redirects',
      buildEnd: () => {
        const redirectsContent = `
        /* /index.html 200
        `;

        const redirectsFilePath = resolve(__dirname, 'dist', '_redirects');

        if (!existsSync('dist')) {
          mkdirSync('dist');
        }

        writeFileSync('dist/_redirects', redirectsContent);
      },
    },
  ],
})
