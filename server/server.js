import express from "express";
import cors from "cors";
import db from "./database.js";
import individualRouter from "./routes/individualRouter.js";
import poolRouter from "./routes/poolRouter.js";
import timeslotRouter from "./routes/timeslotRouter.js";
import locationRouter from "./routes/locationRouter.js";
import gameRouter from "./routes/gameRouter.js";
import gamePlayedByTeamRouter from "./routes/gamePlayedByTeamRouter.js";
import teamRouter from "./routes/teamRouter.js";
import activityRouter from "./routes/activityRouter.js";
import activityConfigRouter from "./routes/activityConfigRouter.js";
import databaseRouter from "./routes/databaseRouter.js";
import participantMemberOfTeamRouter from "./routes/participantMemberOfTeamRouter.js";
import licenseRouter from "./routes/licenseRouter.js";

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}

app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json

await db.initDb();

app.use("/individual", individualRouter);
app.use("/license", licenseRouter);
app.use('/pool', poolRouter);
app.use('/timeslot', timeslotRouter);
app.use('/location', locationRouter);
app.use('/game', gameRouter);
app.use('/gamePlayedByTeam', gamePlayedByTeamRouter);
app.use('/team', teamRouter);
app.use('/activity', activityRouter);
app.use('/activityConfig', activityConfigRouter);
app.use('/database', databaseRouter);
app.use('/participants', participantMemberOfTeamRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
