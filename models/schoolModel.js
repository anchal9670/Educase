const db = require("../database/db");

// Create Schools Table
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
    )
`;

db.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating table:", err.stack);
    process.exit(1); // Exit the process with an error
  }
  console.log("Schools table created or already exists.");
  process.exit(0); // Exit the process successfully
});
