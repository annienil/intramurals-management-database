import express from "express";
import db from '../database.js';

const participantMemberOfTeamRouter = express.Router();

// get participants of a specific team
participantMemberOfTeamRouter.get('/:teamId', async(req, res) => {
    const teamId = req.params['teamId'];
    try {
        const [team] = await db.getConnection().query(
            `SELECT * FROM ParticipantMemberOfTeam WHERE teamId = ?`,
            [teamId]
        );

        if (team.length > 0) {
            res.status(200).json(team);
        } else {
            res.json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

participantMemberOfTeamRouter.post('/', async(req, res) => {
    const studentId = req.body['studentId'];
    const teamId = req.body['teamId'];
    const waiver = req.body['waiver'];
    const role = req.body['role'];
    const dateJoined = req.body['dateJoined'];

    const missingAValue = [studentId, teamId, waiver, role, dateJoined].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send(req.body);
    }
    try {
        const [participant] = await db.getConnection().query(
           `INSERT INTO ParticipantMemberOfTeam(studentId, teamId, waiver, role, dateJoined)
            VALUES (?, ?, ?, ?, ?)`,
            [studentId, teamId, waiver, role, dateJoined]
        );
        if (participant.length > 0) {
            res.status(200).json(participant[0]);
        } else {
            res.status(200).json();
        }
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

// delete specific team
participantMemberOfTeamRouter.delete('/:studentId', async(req, res) => {
    const studentId = req.params['studentId'];
    try {
        await db.getConnection().query(
            `DELETE FROM ParticipantMemberOfTeam WHERE studentId = ?`, [studentId]
        );
        res.status(204).send('Success!');
    } catch (e) {
        res.status(500).send(e);
    }
});

export default participantMemberOfTeamRouter;