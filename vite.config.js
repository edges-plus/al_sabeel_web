import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets/"),
      "@components": resolve(__dirname, "src/components/"),
      "@pages": resolve(__dirname, "src/pages/"),
      "@navigation": resolve(__dirname, "src/navigation/"),
      "@helpers": resolve(__dirname, "src/helpers/"),
      "@root": resolve(__dirname, "src/"),
      "@actions": resolve(__dirname, "src/redux/actions/"),
      "@lib": resolve(__dirname, "src/lib/"),
      "PrintTemplates": resolve(__dirname, "src/PrintTemplates/")
    }
  }
});
