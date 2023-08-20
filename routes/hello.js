import { Router } from "express";
import { hello } from "../lib/locale.js";
import { capitalize } from "../lib/string.js";

export const helloRouter = Router();

helloRouter.get("/:name", (req, res, next) => {
  res.render("message", {
    title: `${hello.en} ${capitalize(req.params.name)}!`,
  });
});

helloRouter.get("/:lang/:name", (req, res, next) => {
  res.render("message", {
    title: `${hello[req.params.lang] || hello.en} ${capitalize(
      req.params.name
    )}!`,
  });
});
