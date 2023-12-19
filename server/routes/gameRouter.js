import express from "express";
import db from '../database.js';

const gameRouter = express.Router();

gameRouter.get('/:id', async (req, res) => {
   const id = req.params['id'];

   try {
       const [games] = await db.getConnection().query(
           `SELECT g.gameId, g.status, g.timeslotId, t.startDateTime, t.endDateTime, t.locationId FROM Game g, TimeSlot t WHERE gameId = ? AND t.id = g.timeslotId`,
           [id]
       );

       if (games.length > 0) {
           res.status(200).json(games[0]);
       } else {
           res.status(204).json();
       }
   } catch (e) {
       res.status(500).send(`There was an error: ${e}`);
   }
});

gameRouter.get('/timeslot/:id', async (req, res) => {
    const id = req.params['id'];

    try {
        const [games] = await db.getConnection().query(
            `SELECT gameId, status FROM Game WHERE timeslotId = ? `,
            [id]
        );

        if (games.length > 0) {
            res.status(200).json(games[0]);
        } else {
            res.status(204).json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gameRouter.post('/factory', async (req, res) => {
    const timeslotId = req.body['timeslotId'];
    const homeTeamId = req.body['homeTeamId'];
    const awayTeamId = req.body['awayTeamId'];
    const status = req.body['status'] ?? 'Scheduled';

    const missingAValue = [timeslotId, homeTeamId, awayTeamId, status].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send('All items are required.');
    }


    try {
        // create game
        const [games] = await db.getConnection().query(
            `INSERT INTO Game(status, timeslotId) VALUES(?, ?)`,
            [status, timeslotId]
        );

        const game = games[0];
        const gameId = game['gameId'];

        // create game played by team
        const [gamePlayedByTeams] = await db.getConnection().query(
            `INSERT INTO GamePlayedByTeam(gameId, teamId, side) VALUES (?, ?, 'HOME'), (?, ?, 'AWAY')`,
            [gameId, homeTeamId, gameId, awayTeamId]
        );

        res.status(201).json(game);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

gameRouter.delete('/:id', async (req, res) => {
    const id = req.params['id'];

    try {
        const [games] = await db.getConnection().query(
            `DELETE FROM Game WHERE gameId = ?`,
            [id]
        );

        res.status(204).send('Success!');
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

export default gameRouter;