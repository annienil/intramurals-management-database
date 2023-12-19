import db from "./database.js";

db.initDb();

await db.getConnection().query(
    `CREATE TABLE IF NOT EXISTS ActivityConfig(
        name VARCHAR(255) PRIMARY KEY,
        forfeitWinPoints INT NOT NULL,
        defaultWinPoints INT NOT NULL,
        cancelWinPoints INT NOT NULL,
        forfeitPenalty INT NOT NULL,
        defaultPenalty INT NOT NULL,
        cancelPenalty INT NOT NULL
    )`
).then(() => console.log(`success creating ActivityConfig`)).catch((err) => console.log(`there was an error creating ActivityConfig! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Activity(
    id INT Primary Key AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    activityConfigName VARCHAR(255) NOT NULL,
    FOREIGN KEY (activityConfigName) REFERENCES ActivityConfig(name) ON DELETE RESTRICT
    )`
  )
  .then(() => console.log(`success creating Activity`))
  .catch((err) => console.log(`there was an error creating Activity! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Pool (
        tier VARCHAR(255),
        gender VARCHAR(255),
        term VARCHAR(255),
        activityId INT,
        PRIMARY KEY (tier, gender, term, activityId),
        FOREIGN KEY (activityId) REFERENCES Activity(id)
    )`
  )
  .then(() => console.log(`success creating Pool`))
  .catch((err) => console.log(`there was an error creating Pool! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Team(
        teamId INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        behaviour ENUM("NORMAL","GOOD","AGGRESSIVE") NOT NULL DEFAULT "NORMAL",
        isActive BOOL NOT NULL DEFAULT True,
        activityId INT NOT NULL,
        poolTier VARCHAR(255),
        poolGender VARCHAR(255),
        poolTerm VARCHAR(255),
        poolActivityId INT,
        FOREIGN KEY (activityId) REFERENCES Activity(Id),
        FOREIGN KEY (poolTier, poolGender, poolTerm, poolActivityId) REFERENCES Pool(tier, gender, term, activityId)
    )`
  )
  .then(() => console.log(`success creating Team`))
  .catch((err) => console.log(`there was an error creating Team! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS PostalCode (
        postalCode VARCHAR(255) PRIMARY KEY,
        province VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL
    )`
  )
  .then(() => console.log(`success creating PostalCode`))
  .catch((err) =>
    console.log(`there was an error creating PostalCode! ${err}`)
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Location(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        postalCode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        FOREIGN KEY(postalCode) REFERENCES PostalCode(postalCode)
    )`
  )
  .then(() => console.log(`success creating Location`))
  .catch((err) => console.log(`there was an error creating Location! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Timeslot (
        id INT PRIMARY KEY AUTO_INCREMENT,
        startDateTime DATETIME NOT NULL,
        endDateTime DATETIME NOT NULL,
        locationId INT NOT NULL,
        poolActivityId INT NOT NULL,
        poolTier VARCHAR(255) NOT NULL,
        poolTerm VARCHAR(255) NOT NULL,
        poolGender VARCHAR(255) NOT NULL,
        FOREIGN KEY(locationId) REFERENCES Location(id) ON DELETE CASCADE,
        FOREIGN KEY(poolTier, poolGender,poolTerm, poolActivityId) 
            REFERENCES Pool(tier, gender, term, activityId)
    )`
  )
  .then(() => console.log(`success creating TimeSlot`))
  .catch((err) => console.log(`there was an error creating TimeSlot! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Game (
        gameId INT PRIMARY KEY AUTO_INCREMENT,
        status VARCHAR(255),
        timeslotId INT NOT NULL,
        FOREIGN KEY (timeslotId) REFERENCES Timeslot(id) ON DELETE RESTRICT
    )`
  )
  .then(() => console.log(`success creating Game`))
  .catch((err) => console.log(`there was an error creating Game! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Individual (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL
    )`
  )
  .then(() => console.log(`success creating Individual`))
  .catch((err) =>
    console.log(`there was an error creating Individual! ${err}`)
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Participant (
        studentId VARCHAR(255) PRIMARY KEY,
        individualId INT NOT NULL,
        hasPaidFees BOOL NOT NULL,
        isActive BOOL NOT NULL,
        FOREIGN KEY (individualId) REFERENCES Individual(id) ON DELETE CASCADE
    )`
  )
  .then(() => console.log(`success creating Participant`))
  .catch((err) =>
    console.log(`there was an error creating Participant! ${err}`)
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS TeamParticipantPlaysOnGame(
        gameId INT,
        teamId INT,
        studentId VARCHAR(255),
        jerseyNumber VARCHAR(255) NOT NULL,
        checkInTime DATETIME NOT NULL,
        PRIMARY KEY(gameId, teamId, studentId),
        FOREIGN KEY (gameId) REFERENCES Game(gameId) ON DELETE CASCADE,
        FOREIGN KEY (teamId) REFERENCES Team(teamId) ON DELETE CASCADE,
        FOREIGN KEY (studentId) REFERENCES Participant(studentId) ON DELETE CASCADE
    )`
  )
  .then(() => console.log(`success creating Team Participant Plays On Game`))
  .catch((err) =>
    console.log(
      `there was an error creating Team Participant Plays On Game! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS ParticipantMemberOfTeam (
        studentId VARCHAR(255) NOT NULL,
        teamId INT NOT NULL,
        waiver ENUM('SIGNED', 'UNSIGNED', 'INELIGIBLE') NOT NULL,
        role ENUM('REGULAR', 'CAPTAIN')  NOT NULL,
        dateJoined DATE NOT NULL,
        PRIMARY KEY(studentId, teamId),
        FOREIGN KEY(studentId) REFERENCES Participant(studentId) ON DELETE CASCADE,
        FOREIGN KEY(teamId) REFERENCES Team(teamId) ON DELETE CASCADE 
    )`
  )
  .then(() => console.log(`success creating Participant Member of Team`))
  .catch((err) =>
    console.log(
      `there was an error creating Participant Member of Team! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS OfficialYearsWorked (
        hiredDate DATE PRIMARY KEY,
        yearsWorked INT NOT NULL
    )`
  )
  .then(() => console.log(`success creating Official years Worked`))
  .catch((err) =>
    console.log(`there was an error creating Official years Worked! ${err}`)
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS Official (
        staffId VARCHAR(255) PRIMARY KEY,
        individualId INT NOT NULL,
        hiredDate DATE NOT NULL,
        FOREIGN KEY(individualId) REFERENCES Individual(id) ON DELETE CASCADE,
        FOREIGN KEY(hiredDate) REFERENCES OfficialYearsWorked(hiredDate) ON DELETE CASCADE
    )`
  )
  .then(() => console.log(`success creating Official`))
  .catch((err) => console.log(`there was an error creating Official! ${err}`));

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS OfficialOfficiatesGame (
        staffId VARCHAR(255) NOT NULL,
        gameId INT NOT NULL,
        status ENUM('ONTIME', 'LATE') NOT NULL,
        PRIMARY KEY(staffId, gameId),
        FOREIGN KEY(staffId) REFERENCES Official(staffId) ON DELETE CASCADE,
        FOREIGN KEY(gameId) REFERENCES Game(gameId) ON DELETE CASCADE
    )`
  )
  .then(() => console.log(`success creating Official Officiates Game`))
  .catch((err) =>
    console.log(`there was an error creating Official Officiates Game! ${err}`)
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS OfficialLicense (
        licenseNumber VARCHAR(255) PRIMARY KEY,
        licenseExpiration DATE NOT NULL,
        tierLevel VARCHAR(255) NOT NULL
    )`
  )
  .then(() => console.log(`success creating official License`))
  .catch((err) =>
    console.log(`there was an error creating official License! ${err}`)
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS OfficialCanOfficiateActivity (
        staffId VARCHAR(255) NOT NULL,
        activityId INT NOT NULL,
        licenseNumber VARCHAR(255) NOT NULL,
        PRIMARY KEY(staffId, activityId),
        FOREIGN KEY(staffId) REFERENCES Official(staffId) ON DELETE CASCADE,
        FOREIGN KEY(activityId) REFERENCES Activity(id) ON DELETE CASCADE,
        FOREIGN KEY(licenseNumber) REFERENCES OfficialLicense(licenseNumber) ON DELETE CASCADE
    )`
  )
  .then(() => console.log(`success creating Official Can Officiate Activity`))
  .catch((err) =>
    console.log(
      `there was an error creating Official Can Officiate Activity! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `CREATE TABLE IF NOT EXISTS GamePlayedByTeam (
        gameId INT NOT NULL,
        teamId INT NOT NULL,
        side ENUM('HOME', 'AWAY') NOT NULL,
        result ENUM('WIN', 'LOSE','DRAW') NOT NULL,
        score VARCHAR(255) NOT NULL,
        PRIMARY KEY(gameId, teamId),
        FOREIGN KEY(gameId) REFERENCES Game(gameId) ON DELETE CASCADE, 
        FOREIGN KEY(teamId) REFERENCES Team(teamId) ON DELETE CASCADE
    )`
  )
  .then(() => console.log(`success creating Game Played By Team`))
  .catch((err) =>
    console.log(`there was an error creating Game Played By Team! ${err}`)
  );

// db.getConnection().query(
//     ``
// ).then(() => console.log(`success creating `)).catch((err) => console.log(`there was an error creating ! ${err}`));