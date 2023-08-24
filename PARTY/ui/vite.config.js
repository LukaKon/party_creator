import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true,
  server: { port: 3000 },
  // esbuild: {
    // jsxInject: `import React from 'react'`,
  // }
})
