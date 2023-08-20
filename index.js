import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import express from "express";
import compression from "compression";
import { helloRouter } from "./routes/hello.js";
import { goodbyeRouter } from "./routes/goodbye.js";
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

//configuration
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    static: __dirname + "static" + sep,
    views: __dirname + "views" + sep,
  },
};

// Express initiation
const app = express();
app.disable("x-powered-by");

//INITIATE EJS

app.set("view engine", "ejs");
app.set("views", cfg.dir.views);

//MIDDLEWARES****************************************************
//static assets
app.use(express.static(cfg.dir.static));

//for performance
app.use(compression());

//ROUTES****************************************************
//

app.get("/", (req, res) => {
  res.render("form", {
    title: "Parse HTTP GET data",
    data: req.query,
  });
});
app.use("/hello", helloRouter);
app.use("/goodbye", goodbyeRouter);
// app.get("/:title", (req, res) => {
//   res.render("message", { title: req.params.title });
// });

// app.get("/log-in", (req, res) => {
//   res.render("message", { title: "Log in" });
// });

// app.get("/hello/", (req, res) => {
//   res.render("message", { title: "Hello again!" });
// });

// start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});

//FALLBACK
app.use((req, res) => {
  res.status(404).send("Not found");
});

export { cfg, app };
