import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineCongig({
    plugins: [react()],
    base: process.env.VITE_BASE_PATH || "//react-vite-deploy",
});