import { Router } from "express";
import { capitalize } from "../lib/string.js";

export const goodbyeRouter = Router();

goodbyeRouter.get("/:name", (req, res, next) => {
  res.render("url", {
    title: `Goodbye ${capitalize(req.params.name)}!`,
    url: req.url,
  });
});
