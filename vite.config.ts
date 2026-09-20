import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({

// })

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // 👈 patch Node global for browser
  },
});
