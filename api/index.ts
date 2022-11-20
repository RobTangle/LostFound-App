import LogWithColors from "./src/miscellanea/LogWithColor";
const config = require(__dirname + "/src/config/config.js");
const PORT = config?.server?.port || 3001;
import app from "./src/app";

app.listen(PORT, () => {
  console.log(
    "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
  );
  LogWithColors.infoBGC(` App listening on port ${PORT} `);
  console.log(
    "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
  );
});
