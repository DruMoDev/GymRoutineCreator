import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { configDotenv } from "dotenv";

const envFile =
  process.env.NODE_ENV === "production" ? "production.env" : "development.env";

configDotenv({ path: envFile });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
