const serverless = require("serverless-http");
module.exports.handler = serverless(require("../../server/app"));
