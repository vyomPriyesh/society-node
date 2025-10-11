import express from "express";
import cors from "cors";
import connectDB from "./db/Connectdb.js";
import api from "./routes/Api.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);

app.use(express.json());
app.use(cors());

const assetsUrl = path.join(__dirname, "assets");
app.use("/assets", express.static(assetsUrl));

app.get("/", (req, res) => res.send("Hello from Express on Vercel!"));
app.use("/api", api);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal server error" });
});

export default app;
