require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const labRoutes = require("./routes/labs");
const scheduleRoutes = require("./routes/schedules");
const borrowingRoutes = require("./routes/borrowings");
const publicApiRoutes = require("./routes/publicApi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/labs", labRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/borrowings", borrowingRoutes);
app.use("/api", publicApiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
