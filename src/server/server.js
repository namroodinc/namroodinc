import React from "react";
import compress from "compression";
import ReactDOMServer from "react-dom/server";
import exphbs from "express-handlebars";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "../shared/controllers/AppController";
require("dotenv").config();

var app = express();
exphbs.create({});
app.set("port", (process.env.PORT || 5001));

app.use(compress());
app.enable("view cache");
app.set("views", "./src/client/views");
app.engine("hbs", exphbs({
  defaultLayout: "main.hbs",
  layoutsDir: "src/client/views/layouts/"
}));
app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("*", function (req, res) {
  const context = {};
  const content = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  );
  const templateProps = {
    content: content,
    jsUrl: process.env.NODE_ENV === "prod" ? "" : "//localhost:5000"
  };
  res.render("index", templateProps);
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"), process.env.NODE_ENV);
});
