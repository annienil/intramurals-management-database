import express from "express";
import db from '../database.js';

const teamRouter = express.Router();

// get all teams
teamRouter.get('/', async(req, res) => {
    try {
        const [teams] = await db.getConnection().query(
            `SELECT * FROM Team`
        )
        if (teams.length > 0) {
            res.status(200).json(teams)
        } else {
            res.json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// create team
teamRouter.post('/', async(req, res) => {
    const name = req.body['name'];
    let isActive = req.body['isActive'];
    const activityId = req.body['activityId'];
    const poolTier = req.body['poolTier'];
    const poolGender = req.body['poolGender'];
    const poolTerm = req.body['poolTerm'];
    const poolActivityId = req.body['poolActivityId'];

//
    if (isActive === null || isActive === undefined) {
        isActive = true;
    }

    const missingAValue = [name, isActive,
        activityId, poolTier, poolGender, poolTerm, poolActivityId].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send(req.body);
    }

    try {
        await db.getConnection().query(
            `INSERT INTO Team(name, behaviour, isActive, activityId,
            poolTier, poolGender, poolTerm, poolActivityId) VALUES (?, "NORMAL", ?, ?, ?, ?, ?, ?)`,
            [name, isActive, activityId, poolTier, poolGender, poolTerm, poolActivityId]
        );
        res.send(req.body);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// update specific team
teamRouter.put('/:teamId', async(req, res) => {
    const teamId = req.params['teamId'];

    const name = req.body['name'];
    let behaviour = req.body['behaviour'];
    let  isActive = req.body['isActive'];

    const missingAValue = [teamId, name, behaviour, isActive].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send('All items are required.');
    }

    try {
        const [team] = await db.getConnection().query(
           `UPDATE Team
            SET name = ?, behaviour = ?, isActive = ?
            WHERE teamId = ?;`,
            [name, behaviour, isActive, teamId]
        );
        res.status(200).json(team);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }

});

// delete specific team
teamRouter.delete('/:teamId', async(req, res) => {
    const teamId = req.params['teamId'];
    try {
        await db.getConnection().query(
            `DELETE FROM Team WHERE teamId = ?`, [teamId]
        );
        res.status(204).send('Success!');
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

export default teamRouter;