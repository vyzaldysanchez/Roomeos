import * as errorHandler from "errorhandler";
import { MessagingServer } from "./messaging";
import * as http from "http";

const app = require("./app");
const httpServer = http.createServer(app);
const messagingServer = new MessagingServer(httpServer);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
httpServer.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

messagingServer.listen();

module.exports = app;