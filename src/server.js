const fs = require("fs");
const fastify = require("fastify")({
  logger: true,
  /*  http2: true,
  https: {
    key: fs.readFileSync("../crt/qciety.tech.key"),
    cert: fs.readFileSync("../crt/qciety.tech.cert"),
  }, */
});

const bufferIndexHtml = fs.readFileSync("src/static/index.html");
const bufferStylesheetCss = fs.readFileSync("src/static/stylesheet.css");
const bufferLogoPng = fs.readFileSync(
  "src/static/Logo_Q_ciety_12.04_weiss.png"
);

fastify.get("/*", async (req, res) => {
  switch (req.url) {
    case "/":
    case "/index.html":
      res.type("text/html").send(bufferIndexHtml);
    case "/stylesheet.css":
      res.type("text/css").send(bufferStylesheetCss);
    case "/Logo_Q_ciety_12.04_weiss.png":
      res.type("image/png").send(bufferLogoPng);
    default:
      res.code(404).send("Not Found");
  }
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
