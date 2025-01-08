// import express from "express";
// import fs from "fs";
// import React from "react";
// import ReactDOMServer from "react-dom/server";
import App from "../src/App";
// import path from "path";
const express = require("express");
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
// const App = require("../src/App");
const path = require("path");

const app = express();
const router = express.Router();

const PORT = 8000;

// router.use("^/$", (req, res) => {
app.use("^/$", (req, res) => {
  fs.readFile(path.resolve("./dist/index.html"), "utf-8", (error, data) => {
    console.log("data", data);
    if (error) {
      console.log("error", error);
      return res.status(500).send("Error ", error);
    }

    const html = ReactDOMServer.renderToString(<App />);
    console.log("html", html);
    res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
        // `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

router.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.use(router);

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
