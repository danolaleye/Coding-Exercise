const getDirectories = require("./getDirectories");
const mainDirectory = "controllers";

const endpointHandler = require("./endpointHandler");

module.exports = async (app) => {
  // get all directories from `mainDirectory`
  const directories = await getDirectories(mainDirectory);

  // for each directory get all the endpoints that are in there
  for (const dir of directories) {
    const endpoints = await getDirectories(`${mainDirectory}/${dir}`);

    for (const endpoint of endpoints) {
      console.log({ endpoint });
      // get the endpoint config
      const {
        Method,
        Routes,
      } = require(`../../../${mainDirectory}/${dir}/${endpoint}/config.json`);

      // get the endpoint handler
      const handler = require(`../../../${mainDirectory}/${dir}/${endpoint}`);

      // add endpoint to express router
      app[Method.toLowerCase()](
        `/${dir}/${endpoint}`,
        async (req, res, next) => {
          // run endpoint handler
          await endpointHandler(req, res, next, handler);
        }
      );

      // add custom route
      /**
       * Optional: to get shorter routes or add params in url
       */
      if (Routes) {
        for (let route of Routes) {
          route = route.replace(/^\/|\/$/g, "");
          app[Method.toLowerCase()](
            `/${dir}/${route}`,
            async (req, res, next) => {
              // get scopes from endpoints config
              // req.scopes = Scopes;
              await endpointHandler(req, res, next, handler);
            }
          );
        }
      }
    }
  }
};
