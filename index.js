import { fileURLToPath } from "url";
import { dirname, sep } from "path";

// Express application
import express from "express";
import compression from "compression";

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
// configuration
const cfg = {
  port: process.env.PORT || 3000,
  dir: { root: __dirname, static: __dirname + "static" + sep },
};

console.dir(cfg, { depth: null, color: true });
// Express initiation
const app = express();

app.disable("x-powered-by");
app.use(express.static(cfg.dir.static));
app.use(compression());
app.use((req, res) => {
  res.status(404).send("Not found");
});
// home page route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/page.html", (req, res) => {
  res.send("Matulog ka na!");
});
// start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});

export { cfg, app };
