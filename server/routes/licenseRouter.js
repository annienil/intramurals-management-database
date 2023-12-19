import express from "express";
import db from "../database.js";

const licenseRouter = express.Router();

licenseRouter.get("/list", async (req, res) => {
  const activityFilter = req.query.activity;
  const staffFilter = req.query.staff;
  let query = `
    SELECT Individual.name AS officialName, Activity.name AS activityName , OCOA.*, OL.* 
    FROM OfficialCanOfficiateActivity OCOA
    JOIN OfficialLicense OL ON OCOA.licenseNumber = OL.licenseNumber
    JOIN Official Official ON OCOA.staffId = Official.staffId
    JOIN Individual Individual ON Official.individualId = Individual.id
    JOIN Activity Activity ON OCOA.activityId = Activity.id`;

  const queryParams = [];
  if (activityFilter || staffFilter) {
    let conditions = [];
    if (activityFilter) {
      conditions.push(`OCOA.activityId = ?`);
      queryParams.push(activityFilter);
    }
    if (staffFilter) {
      conditions.push(`OCOA.staffId = ?`);
      queryParams.push(staffFilter);
    }
    query += ` WHERE ` + conditions.join(" AND ");
  }

  try {
    let licenses;
    [licenses] = await db.getConnection().query(query, queryParams);

    res.status(200).json(licenses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

licenseRouter.post("/create", async (req, res) => {
  const { staffId, activityId, licenseNumber, licenseExpiration, tierLevel } =
    req.body;

  try {
    const [license] = await db.getConnection().query(
      `INSERT INTO OfficialLicense (licenseNumber, licenseExpiration, tierLevel)
      VALUES (?, ?, ?)`,
      [licenseNumber, licenseExpiration, tierLevel]
    );

    await db.getConnection().query(
      `INSERT INTO OfficialCanOfficiateActivity (staffId, activityId, licenseNumber)
      VALUES (?, ?, ?)`,
      [staffId, activityId, licenseNumber]
    );

    res.status(201).json({ message: "License created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

licenseRouter.delete("/delete/:id", async (req, res) => {
    const { id: licenseNumber } = req.params;
    
    try {
        await db
        .getConnection()
        .query(`DELETE FROM OfficialLicense WHERE licenseNumber = ?`, [
            licenseNumber,
        ]);
    
        res.status(200).json({ message: "License deleted successfully" });
    } catch (error) {
        res
        .status(500)
        .json({ error: "Database query failed", details: error.message });
    }
    });

export default licenseRouter;
