import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const fs = require("fs")

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

        fs.writeFileSync('dist/_redirects', redirectsContent);
      },
    },
  ],
})
