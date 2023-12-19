import express from "express";
import db from "../database.js";

const individualRouter = express.Router();

const getParticipants = async (searchTerm) => {
  const [participants] = await db.getConnection().query(
    `SELECT 
    Individual.name, 
    Individual.email, 
    Individual.phone,  
    Participant.studentId, 
    Participant.individualId, 
    Participant.hasPaidFees, 
    Participant.isActive
    FROM Participant
    JOIN Individual ON Participant.individualId = Individual.id
    WHERE Individual.name LIKE ? OR Individual.email LIKE ? OR Participant.studentId LIKE ?;`,
    [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  );

  return participants;
};

const getOfficials = async (searchTerm) => {
  const [officials] = await db.getConnection().query(
    `SELECT 
    Individual.name, 
    Individual.email, 
    Individual.phone, 
    Official.staffId, 
    Official.individualId,
    Official.hiredDate, 
    OfficialYearsWorked.yearsWorked
    FROM Official
    JOIN Individual ON Official.individualId = Individual.id
    JOIN OfficialYearsWorked ON Official.hiredDate = OfficialYearsWorked.hiredDate
    WHERE Individual.name LIKE ? OR Individual.email LIKE ? OR Official.staffId LIKE ?;`,
    [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  );

  return officials;
};

const calculateYearsWorked = (hiredDate) => {
  const currentDate = new Date();
  const yearsWorked = currentDate.getFullYear() - hiredDate.getFullYear();
  return yearsWorked;
};

individualRouter.get("/list", async (req, res) => {
  const type = req.query.type;
  const searchTerm = req.query.search || "";

  console.log(searchTerm);

  try {
    let data;
    if (type === "official") {
      data = await getOfficials(searchTerm);
    } else if (type === "participant") {
      data = await getParticipants(searchTerm);
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.post("/participant/create", async (req, res) => {
  const { name, email, phone, studentId, hasPaidFees } = req.body;
  const isActive = true;

  try {
    const [individual] = await db
      .getConnection()
      .query(`INSERT INTO Individual (name, email, phone) VALUES (?, ?, ?)`, [
        name,
        email,
        phone,
      ]);

    await db
      .getConnection()
      .query(
        `INSERT INTO Participant (studentId, individualId, hasPaidFees, isActive) VALUES (?, ?, ?, ?)`,
        [studentId, individual.insertId, hasPaidFees, isActive]
      );

    res.status(201).json({ message: "Participant created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.post("/official/create", async (req, res) => {
  const { name, email, phone, hiredDate, staffId } = req.body;
  const yearsWorked = calculateYearsWorked(new Date(hiredDate));

  try {
    const [individual] = await db
      .getConnection()
      .query(`INSERT INTO Individual (name, email, phone) VALUES (?, ?, ?)`, [
        name,
        email,
        phone,
      ]);

    const [OfficialYearsWorked] = await db
      .getConnection()
      .query(
        `INSERT IGNORE INTO OfficialYearsWorked (hiredDate, yearsWorked) VALUES (?, ?);`,
        [hiredDate, yearsWorked]
      );

    await db
      .getConnection()
      .query(
        `INSERT INTO Official (hiredDate, staffId, individualId) VALUES (?, ?, ?)`,
        [hiredDate, staffId, individual.insertId]
      );

    res.status(201).json({ message: "Official created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.delete("/delete/:id", async (req, res) => {
  const { id: individualId } = req.params;

  try {
    await db
      .getConnection()
      .query(`DELETE FROM Individual WHERE id = ?`, [individualId]);

    res.status(200).json({ message: "Individual deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.post("/official/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, hiredDate, staffId } = req.body;
  console.log(id);
  console.log(req.body);
  const yearsWorked = calculateYearsWorked(new Date(hiredDate));

  try {
    await db
      .getConnection()
      .query(
        `UPDATE Individual SET name = ?, email = ?, phone = ? WHERE id = ?`,
        [name, email, phone, id]
      );

    await db
      .getConnection()
      .query(
        `INSERT IGNORE INTO OfficialYearsWorked (hiredDate, yearsWorked) VALUES (?, ?);`,
        [hiredDate, yearsWorked]
      );

    await db
      .getConnection()
      .query(
        `UPDATE Official SET hiredDate = ?, staffId = ? WHERE individualId = ?`,
        [hiredDate, staffId, id]
      );

    res.status(200).json({ message: "Official updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.post("/participant/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, studentId, hasPaidFees } = req.body;

  try {
    await db
      .getConnection()
      .query(
        `UPDATE Individual SET name = ?, email = ?, phone = ? WHERE id = ?`,
        [name, email, phone, id]
      );

    await db
      .getConnection()
      .query(
        `UPDATE Participant SET studentId = ?, hasPaidFees = ? WHERE individualId = ?`,
        [studentId, hasPaidFees, id]
      );

    res.status(200).json({ message: "Participant updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.get("/allMightyOfficials", async (req, res) => {
  try {
    const [officials] = await db.getConnection().query(
      `SELECT Individual.name, Individual.email, Individual.phone, Official.staffId, Official.individualId, Official.hiredDate, OfficialYearsWorked.yearsWorked
      FROM
      (SELECT Offical.staffId 
        FROM Official Offical
        WHERE NOT EXISTS (
            SELECT Activity.id
            FROM Activity Activity
            WHERE NOT EXISTS (
              SELECT *
              FROM OfficialCanOfficiateActivity OCOA
              WHERE OCOA.staffId = Offical.staffId AND OCOA.activityId = Activity.id
            )
        )) 
      AS allMightyOfficials
      JOIN Official ON allMightyOfficials.staffId = Official.staffId
      JOIN Individual ON Official.individualId = Individual.id
      JOIN OfficialYearsWorked ON Official.hiredDate = OfficialYearsWorked.hiredDate;`
    );

    res.status(200).json(officials);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

individualRouter.get("/notPaidFeesParticipant", async (req, res) => {
  try {
    const [participants] = await db.getConnection().query(
      `SELECT Individual.name, 
    Individual.email, 
    Individual.phone,  
    Participant.studentId, 
    Participant.individualId, 
    Participant.hasPaidFees, 
    Participant.isActive
    FROM Participant
    JOIN Individual ON Participant.individualId = Individual.id
    WHERE Participant.hasPaidFees = false`
    );

    res.status(200).json(participants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database query failed", details: error.message });
  }
});

export default individualRouter;
