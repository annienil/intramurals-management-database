import express from "express";
import db from '../database.js';

const activityConfigRouter = express.Router();

// get all activity Configs
activityConfigRouter.get('/', async(req, res) => {
    try {
        const [activityConfigs] = await db.getConnection().query(
            `SELECT * FROM ActivityConfig`
        );
        if (activityConfigs.length > 0) {
            res.status(200).json(activityConfigs);
        } else {
            res.json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});


// create new activity config
activityConfigRouter.post('/', async(req, res) => {
    const name = req.body['name'];
    const forfeitWinPoints = req.body['forfeitWinPoints'];
    const defaultWinPoints = req.body['defaultWinPoints'];
    const cancelWinPoints = req.body['cancelWinPoints'];
    const forfeitPenalty = req.body['forfeitPenalty'];
    const defaultPenalty = req.body['defaultPenalty'];
    const cancelPenalty = req.body['cancelPenalty'];

    const missingAValue = [name, forfeitWinPoints, defaultWinPoints, cancelWinPoints,
        forfeitPenalty, defaultPenalty, cancelPenalty].some((value) => value === undefined);

    if (missingAValue) {
        res.status(500).send('All values must be defined. Please try again.');
    }
    try {
        await db.getConnection().query(
            `INSERT INTO ActivityConfig(name, forfeitWinPoints, defaultWinPoints, cancelWinPoints,
            forfeitPenalty, defaultPenalty, cancelPenalty) VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [name, forfeitWinPoints, defaultWinPoints, cancelWinPoints, forfeitPenalty, defaultPenalty, cancelPenalty]
        );
        res.status(201).send(req.body);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// update activity config
activityConfigRouter.put('/:name', async(req, res) => {
    const name = req.params['name'];

     const forfeitWinPoints = req.body['forfeitWinPoints'];
     const defaultWinPoints = req.body['defaultWinPoints'];
     const cancelWinPoints = req.body['cancelWinPoints'];
     const forfeitPenalty = req.body['forfeitPenalty'];
     const defaultPenalty = req.body['defaultPenalty'];
     const cancelPenalty = req.body['cancelPenalty'];


    const missingAValue = [name, forfeitWinPoints, defaultWinPoints, cancelWinPoints,
            forfeitPenalty, defaultPenalty, cancelPenalty].some((value) => value === undefined);

    if (missingAValue) {
         res.status(500).send('All values must be defined. Please try again.');
    }

    try {
        const [activityConfig] = await db.getConnection().query(
            `UPDATE ActivityConfig
            SET forfeitWinPoints = ?, defaultWinPoints = ?, cancelWinPoints = ?, forfeitPenalty = ?,  defaultPenalty = ?, cancelPenalty = ?
            WHERE name = ?`,
            [forfeitWinPoints, defaultWinPoints, cancelWinPoints, forfeitPenalty, defaultPenalty, cancelPenalty, name]
        );
        res.send(activityConfig);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// delete activity config
// have to do some delete cascade stuff
activityConfigRouter.delete('/:name', async(req, res) => {
    const name = req.params['name'];
    try {
        await db.getConnection().query(
            `DELETE FROM ActivityConfig WHERE name = ?`,
            [name]
        );
        res.status(200).send("Success!");
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

export default activityConfigRouter;