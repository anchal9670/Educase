const db = require("../database/db");
const { addSchoolSV, listSchoolsSV } = require("../validator/schoolValidator");
// Controller to add a new school
exports.addSchool = async (req, res) => {
  const validateReqBody = await addSchoolSV.validateAsync(req.body);
  const { name, address, latitude, longitude } = validateReqBody;

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add school" });
    }
    res.status(201).json({
      message: "School added successfully",
      schoolId: results.insertId,
    });
  });
};

// Controller to list all schools sorted by proximity to the user's location
exports.listSchools = async (req, res) => {
  try {
    const validateReqBody = await listSchoolsSV.validateAsync(req.body);
    const { latitude, longitude } = validateReqBody;

    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      return res
        .status(400)
        .json({ error: "Invalid latitude or longitude values" });
    }

    // SQL query to calculate distance and sort by proximity
    const query = `
      SELECT name, address, latitude, longitude,
        (3959 * acos(
          cos(radians(?)) * cos(radians(latitude)) 
          * cos(radians(longitude) - radians(?)) 
          + sin(radians(?)) * sin(radians(latitude))
        )) AS distance
      FROM schools
      HAVING distance IS NOT NULL
      ORDER BY distance
    `;

    db.query(
      query,
      [parsedLatitude, parsedLongitude, parsedLatitude],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Failed to list schools" });
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
