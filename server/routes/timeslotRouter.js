import express from "express";
import db from "../database.js";

const timeslotRouter = express.Router();

timeslotRouter.get('/pool/:tier.:term.:gender.:activityId', async (req, res) => {
    const tier = req.params['tier'];
    const term = req.params['term'];
    const gender = req.params['gender'];
    const activityId = req.params['activityId'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT TimeSlot.id, startDateTime, endDateTime, l.name AS locationName, l.address, l.postalCode, l.country, p.city, p.province FROM Timeslot, Location l, PostalCode p WHERE poolTier = ? AND poolTerm = ? AND poolGender = ? AND poolActivityId = ? AND l.id = locationId AND p.postalCode = l.postalCode`,
            [tier, term, gender, activityId]
        );

        res.json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

timeslotRouter.get('/:id', async (req, res) => {
    const id = req.params['id'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT * FROM Timeslot WHERE id = ?`,
            [id]
        );

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

timeslotRouter.delete('/:id', async (req, res) => {
   const id = req.params['id'];

   try {
       db.getConnection().query(
           `DELETE FROM Timeslot WHERE id = ?`,
           [id]
       );
       res.status(204).send('Success!');
   } catch (e) {
       res.status(500).send(`There was an error: ${e}`);
   }
});

timeslotRouter.post('/factory/', async (req, res) => {
    const day = req.body['day'];
    const startTime = req.body['startTime'];
    const endTime = req.body['endTime'];
    const slotDuration = req.body['slotDuration'];

    const locationNames = req.body['locations'];

    const gender = req.body['poolGender'];
    const tier = req.body['poolTier'];
    const term = req.body['poolTerm'];
    const activityId = req.body['poolActivityId'];

    const missingAValue = [day, startTime, endTime, slotDuration, locationNames, gender, tier, term, activityId].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send('All items are required.');
    }

    // get location Ids

    try {
        const [locationIds] = await db.getConnection().query(
            `SELECT id FROM Location WHERE name IN ?`,
            [locationNames]
        );
    } catch (e) {
        res.status(500).send(`There was an error with the locations provided: ${e}`);
    }

    // create object of start date time, end date time and location

    // SQL create command

    // return created timeslots
    res.status(201).json(req.body);
});

export default timeslotRouter;