"use server";
import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

export async function getHoverImages() {
  noStore();
  try {
    const dir = path.join(process.cwd(), "public", "hover_images");
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir);
    const timestamp = Date.now();
    return files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map((file) => `/hover_images/${file}?v=${timestamp}`);
  } catch (error) {
    console.error("Error reading hover_images directory:", error);
    return [];
  }
}
