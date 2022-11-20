import LogWithColors from "./src/miscellanea/LogWithColor";
import { config } from "./src/config/config";
const PORT = config?.server?.port || 3001;
import app from "./src/app";

app.listen(PORT, () => {
  LogWithColors.infoBGC(` App listening on port ${PORT} `);
});
