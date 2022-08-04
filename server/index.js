require("module-alias/register");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const stackTrace = require("stack-trace");
const app = express();
const port = 3001;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Parse cookies (as sent by API clients)
app.use(cookieParser());

// Add cors
app.use(cors({ credentials: true, origin: true }));

app.use((req, res, next) => {
  req.url = req.url.replace("/metrics", "");
  next();
});

app.get("/", (req, res) => {
  return res.send("I'm Alive!!!");
});

app.get("/favicon.ico", (req, res) => res.status(204));

const registerEndpoints = require("./app/startup/endpoints");

registerEndpoints(app).then(() => {
  app.route("*").all((req, res, next) => {
    next({
      status: 404,
      message: "The route you are trying to get is not defined",
    });
  });

  // error handler middleware
  app.use((error, req, res, next) => {
    const stack = stackTrace.parse(error);

    console.log({
      error,
      endpoint: req.url,
      ...(Array.isArray(stack) &&
        stack[0] && {
          fileName: stack[0].getFileName(),
          lineNumber: stack[0].getLineNumber(),
        }),
    });

    // if its an internal error and its not running on local
    // then send a general error message
    if (process.env.ENV_NAME !== "development" && !error.benchmetric)
      return res.status(500).json({
        type: "InternalServerError",
        code: "errors.internal",
        message: "Internal Server Error",
      });

    return res.status(error.status || 500).json({
      type: error.type || "InternalServerError",
      code: error.code || "errors.internal",
      message: error.message || "Internal Server Error",
    });
  });

  app.listen(port, () =>
    console.log(`benchmetric-provider started on port ${port}!`)
  );
});
