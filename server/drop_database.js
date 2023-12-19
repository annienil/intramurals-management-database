import db from "./database.js";

db.initDb();

await db
    .getConnection()
    .query(
        `DROP TABLE GamePlayedByTeam`
    )
    .then(() => console.log(`success deleting Game Played By Team`))
    .catch((err) =>
        console.log(`there was an error deleting Game Played By Team! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE OfficialCanOfficiateActivity`
    )
    .then(() => console.log(`success deleting Official Can Officiate Activity`))
    .catch((err) =>
        console.log(
            `there was an error deleting Official Can Officiate Activity! ${err}`
        )
    );

await db
    .getConnection()
    .query(
        `DROP TABLE OfficialLicense`
    )
    .then(() => console.log(`success deleting official License`))
    .catch((err) =>
        console.log(`there was an error deleting official License! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE OfficialOfficiatesGame`
    )
    .then(() => console.log(`success deleting Official Officiates Game`))
    .catch((err) =>
        console.log(`there was an error deleting Official Officiates Game! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE Official`
    )
    .then(() => console.log(`success deleting Official`))
    .catch((err) => console.log(`there was an error deleting Official! ${err}`));

await db
    .getConnection()
    .query(
        `DROP TABLE OfficialYearsWorked`
    )
    .then(() => console.log(`success deleting Official years Worked`))
    .catch((err) =>
        console.log(`there was an error deleting Official years Worked! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE ParticipantMemberOfTeam`
    )
    .then(() => console.log(`success deleting Participant Member of Team`))
    .catch((err) =>
        console.log(
            `there was an error deleting Participant Member of Team! ${err}`
        )
    );

await db
    .getConnection()
    .query(
        `DROP TABLE TeamParticipantPlaysOnGame`
    )
    .then(() => console.log(`success deleting Team Participant Plays On Game`))
    .catch((err) =>
        console.log(
            `there was an error deleting Team Participant Plays On Game! ${err}`
        )
    );

await db
    .getConnection()
    .query(
        `DROP TABLE Participant`
    )
    .then(() => console.log(`success deleting Participant`))
    .catch((err) =>
        console.log(`there was an error deleting Participant! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE Individual`
    )
    .then(() => console.log(`success deleting Individual`))
    .catch((err) =>
        console.log(`there was an error deleting Individual! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE Game`
    )
    .then(() => console.log(`success deleting Game`))
    .catch((err) => console.log(`there was an error deleting Game! ${err}`));

await db
    .getConnection()
    .query(
        `DROP TABLE TimeSlot`
    )
    .then(() => console.log(`success deleting TimeSlot`))
    .catch((err) => console.log(`there was an error deleting TimeSlot! ${err}`));

await db
    .getConnection()
    .query(
        `DROP TABLE Location`
    )
    .then(() => console.log(`success deleting Location`))
    .catch((err) => console.log(`there was an error deleting Location! ${err}`));

await db
    .getConnection()
    .query(
        `DROP TABLE PostalCode`
    )
    .then(() => console.log(`success deleting PostalCode`))
    .catch((err) =>
        console.log(`there was an error deleting PostalCode! ${err}`)
    );

await db
    .getConnection()
    .query(
        `DROP TABLE Team`
    )
    .then(() => console.log(`success deleting Team`))
    .catch((err) => console.log(`there was an error deleting Team! ${err}`));

await db
    .getConnection()
    .query(
        `DROP TABLE Pool`
    )
    .then(() => console.log(`success deleting Pool`))
    .catch((err) => console.log(`there was an error deleting Pool! ${err}`));

await db
    .getConnection()
    .query(
        `DROP TABLE Activity`
    )
    .then(() => console.log(`success deleting Activity`))
    .catch((err) => console.log(`there was an error deleting Activity! ${err}`));

await db.getConnection().query(
    `DROP TABLE ActivityConfig`
).then(() => console.log(`success deleting ActivityConfig`)).catch((err) => console.log(`there was an error deleting ActivityConfig! ${err}`));

// db.getConnection().query(
//     ``
// ).then(() => console.log(`success deleting `)).catch((err) => console.log(`there was an error deleting ! ${err}`));