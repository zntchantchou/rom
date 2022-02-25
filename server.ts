import * as dotenv from "dotenv";
import express from "express";
import { handleNumber } from "./src/utils/utils";
dotenv.config();
const app = express();

app.use(express.json());
app.listen(process.env.PORT, () =>
  console.log(`[Server.js]: listening on ${process.env.PORT}...`)
);

// ROUTES
app.post("/roman", function (req, res) {
  const { value } = req.body;
  res.json(handleNumber(value));
  res.end();
});

export {};
