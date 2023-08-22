const express = require("express");
const serverConnectDB = require("./config/db.ts");
const dotenv = require("dotenv").config();
const cors = require('cors');

const app = express();
connectDB();

app.use(cors(process.env.FRONTEND_URL))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/page", require("./routes/page.routes.ts"));
app.use("/sheet", require("./routes/sheet.routes.ts"));
app.use("/note", require("./routes/note.routes.ts"));
app.use("/user", require("./routes/user.routes.ts"));

app.listen(5001, () => console.log("Le serveur a démarré au port " + 5001));
