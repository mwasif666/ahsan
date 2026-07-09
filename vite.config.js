import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' lets the production build in /dist be opened straight from the
// file system (double-click dist/index.html) as well as served from any path.
export default defineConfig({
  base: './',
  plugins: [react()],
});
