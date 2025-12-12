import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({

// })

export default defineConfig({
  define: {
      plugins: [react()],
    global: "window", // 👈 patch Node global for browser
  },
});
