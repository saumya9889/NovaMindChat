// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from "@tailwindcss/vite";

// import path from 'path';

export default defineConfig({
  plugins: [
     tailwindcss(),
      // This line is necessary to use Tailwind CSS with Vite
      react()
  ],
});

