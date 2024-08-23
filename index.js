const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config/.env" });

const schoolRoutes = require("./routes/schoolRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Use the school routes
app.use("/api/schools", schoolRoutes);
// Root Route
app.get("/", (req, res) => {
  res.send("Server is running and database connection is established!");
});

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
