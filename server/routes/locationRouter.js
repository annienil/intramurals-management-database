import express from "express";
import db from "../database.js";

const locationRouter = express.Router();

locationRouter.get('/:id', async (req, res) => {
    const id = req.params['id'];

    try {
        const [rows] = await db.getConnection().query(
            `SELECT * FROM Location l, PostalCode p WHERE l.id = ? AND p.postalCode = l.postalCode`,
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

locationRouter.delete('/:id', async (req, res) => {
    const id = req.params['id'];

    try {
        await db.getConnection().query(
            `DELETE FROM Location WHERE id = ?`,
            [id],
        )
        res.status(204).send('Success!');
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

locationRouter.post('/factory', async (req, res) => {
    const name = req.body['name'];
    const address = req.body['address'];
    const postalCode = req.body['postalCode'];
    const country = req.body['country'];
    const province = req.body['province'];
    const city = req.body['city'];

    const missingAValue = [name, address, postalCode, country, province, city].some((value) => value === undefined);

    if (missingAValue) {
        return res.status(500).send('All items are required.');
    }

    try {
        // create postal code
        const [postalCodeCount] = await db.getConnection().query(
            `SELECT COUNT(postalCode) AS count FROM PostalCode WHERE postalCode = ?`,
            [postalCode]
        );

        console.log(postalCodeCount[0].count);
        console.log(postalCode);

        if (postalCodeCount[0].count === 0) {
            const [postalCodeQuery] = await db.getConnection().query(
                `INSERT INTO PostalCode VALUES (?, ?, ?)`,
                [postalCode, province, city]
            );
        }

        // create location
        const [location] = await db.getConnection().query(
            `INSERT INTO Location(name, address, postalCode, country) VALUES (?, ?, ?, ?)`,
            [name, address, postalCode, country]
        );

        // return location
        res.status(201).json(location[0]);
    } catch (e) {
        res.status(500).send(`There was an error: ${e}`);
    }
});

locationRouter.get('', async (req, res) => {
   try {
       const [locations] = await db.getConnection().query(
           `SELECT * FROM Location l, PostalCode p WHERE l.postalCode = p.postalCode`
       );

       res.status(200).json(locations);
   } catch (e) {
       res.status(500).send(`There was an error: ${e}`);
   }
});

export default locationRouter;