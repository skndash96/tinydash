import path from "node:path";
import fs from "node:fs";
import express from "express";
import ejs from "ejs";

(async () => {
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use("/styles", express.static(path.resolve("./dist/styles/")));
app.use("/images", express.static(path.resolve("./dist/images/")));
app.use("/fonts", express.static(path.resolve("./dist/fonts/")));
app.use("/scripts", express.static(path.resolve("./dist/scripts/")));

const renderOptions = { rmWhitespace: true };

const components = {};
const vcomponents = fs.readdirSync("src/sfc/");
for (let i = 0; i < vcomponents.length; i++) {
  let f = vcomponents[i];
  
  await new Promise((resolve, reject) => {
    ejs.renderFile(
      path.resolve("./src/sfc/"+f),
      null,
      renderOptions,
      (e, result) => {
        if (e) reject(e);
        else {
          let [html, js] = result.split("<script>");
          js = js.slice(0, js.match("</script>").index);

          components[f.slice(0, -4)] = { html, js };
          resolve();
        }
      }
    )
  });
};

const pages = fs.readdirSync("src/").filter(f => f.endsWith(".ejs"));
for (let i=0; i < pages.length; i++) {
  let page = pages[i].slice(0, -4);
  
  app.get("/"+ (page === "index" ? "" : page), (req, res) => {
    res.render(
      path.resolve("./src/"+pages[i]),
      { components },
      renderOptions,
      (e, html) => {
        if (e) {
          res.status(500).redirect("/500?m=" + (e.message || ""));
          console.error(e);
        } else {
          res.status(200).send(html).end();
        }
      }
    );
  });
};

app.get("/*", (req, res) => {
  res.render(
    path.resolve("./src/path.ejs"),
    null,
    renderOptions,
    (e, html) => {
      if (e) {
        res.status(500).redirect("/500?m=" + (e.message || ""));
        console.error(e);
      } else {
        res.status(200).send(html).end();
      }
    }
  );
});

app.listen(PORT, () => console.log("App up and running @ localhost:"+PORT));
})();