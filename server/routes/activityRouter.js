import express from "express";
import db from '../database.js';

const activityRouter = express.Router();

// get all activities
activityRouter.get('/', async(req, res) => {
    try {
        const [activities] = await db.getConnection().query(
            `SELECT * FROM Activity`
        );
        if (activities.length > 0) {
            res.status(200).json(activities);
        } else {
            res.status(201).json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// create new activity
activityRouter.post('/', async(req, res) => {
    const name = req.body['name'];
    const activityConfigName = req.body['activityConfigName'];

    const missingAValue = [name, activityConfigName].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send('All items are required.');
    }

    try {
        const [activity] = await db.getConnection().query(
            `INSERT INTO Activity(name, activityConfigName) VALUES (?, ?)`,
            [name, activityConfigName]
            );
        res.send(req.body);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// update existing activity
activityRouter.put('/:id', async(req, res) => {
    const id = req.params['id'];
    const name = req.body['name'];
    const activityConfigName = req.body['activityConfigName'];

    const missingAValue = [name, activityConfigName].some((value) => value === undefined);

    if (missingAValue) {
        res.status(500).send('All items are required.');
    }

    try {
        const [activity] = await db.getConnection().query(
            `UPDATE Activity SET name = ?, activityConfigName = ? WHERE id = ?`,
            [name, activityConfigName, id]
        );
        res.json(activity);

    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// delete activity
activityRouter.delete('/:id', async(req, res) => {
    const id = req.params['id'];
    try {
        await db.getConnection().query(
            `DELETE FROM Activity WHERE id = ?`,
            [id]
        );
        res.status(200).send("Success!");
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

export default activityRouter;