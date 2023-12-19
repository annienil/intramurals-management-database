import express from "express";
import db from '../database.js';

const gamePlayedByTeamRouter = express.Router();

gamePlayedByTeamRouter.get('/:gameId.:teamId', async (req, res) => {
    const gameId = req.params['gameId'];
    const teamId = req.params['teamId'];

    try {
        const [gamePlayedByTeam] = await db.getConnection().query(
            `SELECT * FROM GamePlayedByTeam WHERE gameId = ? AND teamId = ?`,
            [gameId, teamId]
        );

        if (gamePlayedByTeam.length > 0) {
            res.status(200).json(gamePlayedByTeam[0]);
        } else {
            res.status(204).json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gamePlayedByTeamRouter.get('/:gameId/:side', async (req, res) => {
    const gameId = req.params['gameId'];
    const side = req.params['side'];

    try {
        const [gamePlayedByTeam] = await db.getConnection().query(
            `SELECT g.side, g.result, g.score, t.name AS teamName
                FROM GamePlayedByTeam g, Team t 
                WHERE g.gameId = ? AND t.teamId = g.teamId AND g.side = ?`,
            [gameId, side]
        );

        if (gamePlayedByTeam.length > 0) {
            res.status(200).json(gamePlayedByTeam[0]);
        } else {
            res.status(204).json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gamePlayedByTeamRouter.put('/:gameId.:teamId/score', async (req, res) => {
    const gameId = req.params['gameId'];
    const teamId = req.params['teamId'];

    const score = req.body['score'];

    if (score === undefined) {
        return res.status(500).send('Score is required.')
    }

    try {
        const [gamePlayedByTeam] = await db.getConnection().query(
            `UPDATE GamePlayedByTeam SET score = ? WHERE gameId = ? AND teamId = ?`,
            [score, gameId, teamId]
        );

        if (gamePlayedByTeam.length > 0) {
            res.status(200).json(gamePlayedByTeam[0]);
        } else {
            res.status(204).json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gamePlayedByTeamRouter.get('/count/teamId/all', async (req, res) => {
    console.log('here!');
    try {
        const [rows] = await db.getConnection().query(
            `SELECT teamId, COUNT(*) AS count FROM GamePlayedByTeam GROUP BY teamId`
        );
        res.status(200).json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gamePlayedByTeamRouter.get('/count/teamId/max/:maxAmount', async (req, res) => {
    const max = req.params['maxAmount'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT teamId, COUNT(*) AS count FROM GamePlayedByTeam GROUP BY teamId HAVING count < ?`,
            [max]
        );

        res.status(200).json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gamePlayedByTeamRouter.get('/count/teamId/less_than_max', async (req, res) => {
    const max = req.params['maxAmount'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT teamId, COUNT(*) AS count FROM GamePlayedByTeam GROUP BY teamId HAVING count < (
                SELECT MAX(c) FROM (
                    SELECT COUNT(*) AS c FROM GamePlayedByTeam g GROUP BY g.teamId
                ) AS T
            )`,
            [max]
        );

        res.status(200).json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});


export default gamePlayedByTeamRouter;