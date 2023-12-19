import express from "express";
import db from "../database.js";


const poolRouter = express.Router();

poolRouter.get('/activity/:activityId', async (req, res) => {
    const activityId = req.params['activityId'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT * FROM Pool WHERE activityId = ?`,
            [activityId]
        );

        res.json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

poolRouter.get('/:tier.:term.:gender.:activityId', async (req, res) => {
    const tier = req.params['tier'];
    const term = req.params['term'];
    const gender = req.params['gender'];
    const activityId = req.params['activityId'];

    try {

        const [rows] = await db.getConnection().query(
            `SELECT * FROM Pool WHERE tier = ? AND term = ? AND gender = ? AND activityId = ?`,
            [tier, term, gender, activityId]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
})

poolRouter.post('', async (req, res) => {
    const gender = req.body['gender'];
    const tier = req.body['tier'];
    const term = req.body['term'];
    const activityId = req.body['activityId'];

    const missingAValue = [gender, tier, term, activityId].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send('All items are required.');
    }

    try {
        await db.getConnection().query(
            `INSERT INTO Pool VALUES (?, ?, ?, ?)`,
            [tier, gender, term, activityId]
        )
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
    res.status(201).json(req.body);
})

poolRouter.delete('/:tier.:term.:gender.:activityId', async (req, res) => {
    const tier = req.params['tier'];
    const term = req.params['term'];
    const gender = req.params['gender'];
    const activityId = req.params['activityId']

    try {
        await db.getConnection().query(
            `DELETE FROM Pool WHERE tier = ? AND term = ? AND gender = ? AND activityId = ?`,
             [tier, term, gender, activityId],
        )
        res.status(204).send('Success!');
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
})

export default poolRouter;