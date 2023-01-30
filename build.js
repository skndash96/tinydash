import { exec } from "child_process";
import fs from "fs";
import path from "path";
import ejs from "ejs";

(async () => {
let start = Date.now();

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

let files = fs.readdirSync("src").filter(f => f.endsWith(".ejs"));
for (let i = 0; i < files.length; i++) {
  let f = files[i];
  let inp = "./src/"+f;
  let out = "dist/"+f.slice(0,-4)+".html";
  
  ejs.renderFile(
    inp,
    { components },
    renderOptions,
    write
  );
  function write(e, html) {
    if (e) {
      console.error(e);
    } else {
      fs.writeFileSync(out, html, "utf-8");
      console.log("Completed "+out);
    }
  }
}

console.log("Done in "+(Date.now()-start)+"ms");
})();