"use strict";
const express = require("express");
const serverConnectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const app = express();
serverConnectDB();
app.use(cors(process.env.FRONTEND_URL));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/page", require("./routes/page.routes"));
app.use("/sheet", require("./routes/sheet.routes"));
app.use("/note", require("./routes/note.routes"));
app.use("/user", require("./routes/user.routes"));
app.listen(5001, () => console.log("Le serveur a démarré au port " + 5001));
//# sourceMappingURL=server.js.map