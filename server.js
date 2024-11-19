const fs = require("fs");
const { createServer } = require("https");
const { parse } = require("url");

const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const hostname = "local.new.nurse-edu.co.kr";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync("./ssl/local.new.nurse-edu.co.kr.key"),
  cert: fs.readFileSync("./ssl/local.new.nurse-edu.co.kr.crt"),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(443, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log("> Server started on https://local.new.nurse-edu.co.kr");
  });
});
