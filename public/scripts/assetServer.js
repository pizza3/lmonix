const express = require("express");
const expressapp = express();
let server;

module.exports = {
  setAssetServer,
  closeAssetServer
};

function setAssetServer(arg) {
    console.log('got called');
    
  const { location } = arg;
  const PORT = 9889;
  expressapp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  // asset file
  expressapp.use("/Assets", express.static(location + "/Assets"));
  // start local server
  (async () => {
    server = expressapp.listen(PORT, () =>
      console.log(`App listening on port ${PORT}!`)
    );
  })();
}
function closeAssetServer() {
    if(server){
        server.close();
    }
}
