var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();

app.use(express.json());
app.use(cors());

const key =
  "mongodb+srv://ecepeda:LwmsfJvQ1brnaRhc@kuger.rvqdhdu.mongodb.net/kSXBACKFINAL?retryWrites=true&w=majority&appName=Kuger";

const authRoutes = require("./api/auth/routes");  
app.use("/api/v1/auth", authRoutes);
mongoose.connect(key);
var port = process.env.PORT || 3033;
app.listen(port, function () {
  console.log("Servidor rodando na porta " + port);
});
