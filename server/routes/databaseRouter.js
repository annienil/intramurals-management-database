import express from "express";
import db from "../database.js";
import database from "../database.js";

const databaseRouter = express.Router();

databaseRouter.get('/tables', async (req, res) => {
   try {
       const [rows] = await db.getConnection().query(
           `SELECT table_name AS name FROM information_schema.tables`
       )

       res.json(rows);
   } catch (e) {
       res.status(500).send(`There was an error: ${e}`);
   }
});

databaseRouter.get('/table/:name', async (req, res) => {
    const name = req.params['name'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT column_name AS name FROM information_schema.columns WHERE table_name = ?`,
            [name]
        )

        res.json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

databaseRouter.get('/:table/:columns', async (req, res) => {
    const tableName = req.params['table'];
    const columns = req.params['columns'];

    if (columns === undefined) {
        return res.status(500).send('All items are required.');
    }

    const editedColumns = columns.replace(/,/g, ', ')

    try {
        const [rows] = await db.getConnection().query(
            `SELECT ${editedColumns} FROM ${tableName}`,
        )

        res.status(200).json(rows);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

export default databaseRouter;