import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'

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

        writeFileSync('dist/_redirects', redirectsContent);
      },
    },
  ],
})
