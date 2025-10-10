import express from "express";
import cors from 'cors'
import connectDB from "./db/Connectdb.js";
import api from "./routes/Api.js";

const app = express();
const port = 2003;
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL);

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.use('/api', api);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
