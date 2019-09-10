const { ipcMain } = require("electron");
const express = require("express");
const expressapp = express();
const fs = require("fs");
const os = require("os");
let server =  null

module.exports = {
    setLocalServer,
    stopLocalServer
};

function setLocalServer(mainWindow){
    ipcMain.on("startlocal", (event, arg) => {
        const { location } = arg;        
        const PORT = 9999;
        const indexFile = () => fs.readFileSync(location + "/index.html");
        const jsFile = () => fs.readFileSync(location + "/scripts/index.js");
        expressapp.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
        // html file
        expressapp.get("/", (req, res) => {
          res.setHeader("Content-Type", "text/html");
          res.send(indexFile());
        });
        // js file
        expressapp.get("/scripts/index.js", (req, res) => {
          res.setHeader("Content-Type", "text/javascript");
          res.send(jsFile());
        });
        // asset file
        expressapp.use("/Assets", express.static(location + "/Assets"));
        // start local server
        (async () => {
          server = expressapp.listen(PORT, () =>
            console.log(`App listening on port ${PORT}!`)
          );
        })();
        // detects OS ip
        let ip = "";
        let networkInterfaces = Object.values(os.networkInterfaces())
          .reduce((r, a) => {
            r = r.concat(a);
            return r;
          }, [])
          .filter(({ family, address }) => {
            return family.toLowerCase().indexOf("v4") >= 0 && address !== "127.0.0.1";
          })
          .map(({ address }) => address);
        ip = networkInterfaces.join(", ");
        mainWindow.webContents.send("ipcRenderer", { option: "updateIP", ip: ip });
      });
      
      ipcMain.on("stoplocal", () => {
        if(server)
        server.close();
      });
      
}

function stopLocalServer(){
  server.close();
}
