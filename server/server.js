import express, { response } from "express";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import path from "path";

const app = express();
const router = express.Router();

const PORT = 8000;

router.use("^/$", (req, res) => {
  fs.readFile(path.resolve("./dist/index.html"), "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error ", error);
    }

    res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

router.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.use(router);

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
