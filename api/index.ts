import LogWithColors from "./src/utils/miscellanea/LogWithColor";
import { config } from "./src/config/config";
const PORT = config?.server?.port || 3001;
import app from "./src/app";

import swaggerDocs from "./src/utils/swagger";

app.listen(PORT, () => {
  LogWithColors.infoBGC(` App listening on port ${PORT} `);
  swaggerDocs(app, Number(PORT));
});
