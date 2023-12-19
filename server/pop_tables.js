import db from "./database.js";

db.initDb();

await db
  .getConnection()
  .query(
    `INSERT INTO ActivityConfig VALUES 
    ("Soccer Config", 1, 2, 2, 1, 2, 2),
    ("Basketball Config", 10, 25, 25, 1, 2, 2),
    ("Dodgeball Config", 5, 10, 10, 1, 2, 2),
    ("Volleyball Config", 2, 4, 4, 1, 2, 2),
    ("Flag Football Config", 7, 14, 14, 1, 2, 2)`
  )
  .then(() => console.log(`success populating Activity Config`))
  .catch((err) =>
    console.log(`there was an error populating Activity Config! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Activity VALUES
    (1, "Nitobe Basketball League", "Basketball Config"),
    (2, "Handle Cup Soccer League", "Soccer Config"),
    (3, "Tristan Brown Flag Football League", "Flag Football Config"),
    (4, "Dodgeball League", "Dodgeball Config"),
    (5, "War Memorial Volleyball League", "Volleyball Config")`
  )
  .then(() => console.log(`success populating Activity`))
  .catch((err) =>
    console.log(`there was an error populating Activity! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Pool (tier, gender, term, activityId) 
    VALUES 
    ('Beginner', 'Male', 'Fall', 1),
    ('Intermediate', 'Female', 'Fall', 1),
    ('Advanced', 'Male', 'Winter', 1),
    ('Beginner', 'Female', 'Spring', 1),
    ('Intermediate', 'Female', 'Spring', 1)`
  )
  .then(() => console.log(`success populating Pool`))
  .catch((err) => console.log(`there was an error populating Pool! ${err}`));

await db
  .getConnection()
  .query(
    `INSERT INTO Team VALUES
    (1, "The Three Shooters", "NORMAL", True, 1, "Beginner", "Male", "Fall", 1),
    (2, "Drible Bievers", "NORMAL", True, 1, "Beginner", "Male", "Fall", 1),
    (3, "We Cant Shoot", "GOOD", True, 1, "Beginner", "Male", "Fall", 1),
    (4, "Winners", "AGGRESSIVE", True, 1, "Beginner", "Male", "Fall", 1),
    (5, "He is Not our Captain", "GOOD", True, 1, "Beginner", "Male", "Fall", 1),
    (6, "Here not to win", "NORMAL", True, 1, "Beginner", "Male", "Fall", 1)`
  )
  .then(() => console.log(`success populating Team`))
  .catch((err) => console.log(`there was an error populating Team! ${err}`));

await db
  .getConnection()
  .query(
    `INSERT INTO PostalCode (postalCode, province, city)
    VALUES
        ('V6T 1Z3', 'BC', 'Vancouver'),
        ('V6B 4Y8', 'BC', 'Vancouver'),
        ('V3M 7A8', 'BC', 'New Westminster'),
        ('V7P 3T1', 'BC', 'North Vancouver'),
        ('V8W 1W5', 'BC', 'Victoria')
    `
  )
  .then(() => console.log(`success populating PostalCode`))
  .catch((err) =>
    console.log(`there was an error populating PostalCode! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Location (id, name, address, postalCode, country)
    VALUES
        (1, 'Thunderbird Stadium', '6288 Stadium Rd', 'V6T 1Z3', 'Canada'),
        (2, '123 Stadium', '123 Pine Dr', 'V6B 4Y8', 'Canada'),
        (3, 'New Westminster Stadium', '123 Elm Rd', 'V3M 7A8', 'Canada'),
        (4, 'North Vancouver Stadium', '123 Maple Ave', 'V7P 3T1', 'Canada'),
        (5, 'Victoria Stadium', '123 Cedar Ln', 'V8W 1W5', 'Canada')`
  )
  .then(() => console.log(`success populating Location`))
  .catch((err) =>
    console.log(`there was an error populating Location! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Timeslot 
    (id, startDateTime, endDateTime, locationId, poolTier, poolGender, poolTerm, poolActivityId) 
    VALUES 
    (1, '2023-10-25 09:00:00', '2023-10-20 10:00:00', 1, "Beginner","Male", "Fall",1),
    (2, '2023-9-21 10:00:00', '2023-10-21 11:00:00', 2,"Beginner","Male", "Fall",1),
    (3, '2023-12-22 12:00:00', '2023-10-22 13:00:00', 3,"Beginner", "Male", "Fall",1),
    (4, '2023-1-23 14:00:00', '2023-10-23 15:00:00', 4, "Beginner","Male", "Fall",1),
    (5, '2023-8-24 16:00:00', '2023-10-24 17:00:00', 5,"Beginner", "Male", "Fall",1)`
  )
  .then(() => console.log(`success populating Timeslot`))
  .catch((err) =>
    console.log(`there was an error populating Timeslot! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Game (gameId, status, timeslotId)
    VALUES
    (1, 'scheduled', 1),
    (2, 'scheduled', 2),
    (3, 'played', 3),
    (4, 'played', 4),
    (5, 'cancelled', 5)`
  )
  .then(() => console.log(`success populating Game`))
  .catch((err) => console.log(`there was an error populating Game! ${err}`));

await db
  .getConnection()
  .query(
    `INSERT INTO Individual (id, name, email, phone) VALUES
    (1, 'Chris Frazier', 'chrisfrazier@example.com', '123-456-7890'),
    (2, 'Timothy Lopez', 'timothylopez@example.com', '123-456-7891'),
    (3, 'Wilson Blevins', 'wilsonblevins@example.com', '123-456-7892'),
    (4, 'Aysha Singh', 'ayshasingh@example.com', '123-456-7893'),
    (5, 'Sumaiya Fulton', 'sumaiyafulton@example.com', '123-456-7894'),
    (10, 'Augie Blaszkiewicz', 'augeblaz@example.com', '123-456-7896'),
    (11, 'Vail Kondratenya', 'vailkondra@example.com', '123-456-7897'),
    (12, 'Kelly Chmarny', 'kellych@example.com', '123-456-7898'),
    (13, 'Elsinore Mearns', 'elsinoremearns@example.com', '123-456-7881'),
    (14, 'Hermy Bezemer', 'hermybezemer@example.com', '123-456-7882')`
  )
  .then(() => console.log(`success populating Individual`))
  .catch((err) =>
    console.log(`there was an error populating Individual! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Participant(studentId, individualId, hasPaidFees, isActive)
    VALUES
    ('100101', 10, True, False),
    ('100102', 11, True, False),
    ('100103', 12, False, False),
    ('100104', 13, False, False),
    ('100105', 14, False, False)`
  )
  .then(() => console.log(`success populating Participant`))
  .catch((err) =>
    console.log(`there was an error populating Participant! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO TeamParticipantPlaysOnGame (gameId, teamId, studentId, jerseyNumber, checkInTime)
    VALUES
    (1,1, '100101', '13', '2023-09-13T14:12:00.0000'),
    (1,1, '100102', '27', '2023-10-31T14:14:00.0000'),
    (1,1, '100103', '84', '2023-11-11T14:15:00.0000'),
    (1,1, '100104', '7', '2023-10-01T14:20:00.0000'),
    (1,1, '100105', '16', '2023-12-6T14:30:00.0000')`
  )
  .then(() => console.log(`success populating Team Participant Plays On Game`))
  .catch((err) =>
    console.log(
      `there was an error populating Team Participant Plays On Game! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `INSERT INTO ParticipantMemberOfTeam(studentId, teamId, waiver, role, dateJoined)
    VALUES
    ('100101', 1, 'SIGNED', 'REGULAR', '2023-10-10'),
    ('100102', 1, 'UNSIGNED', 'CAPTAIN', '2023-09-15'),
    ('100103', 1, 'INELIGIBLE', 'REGULAR', '2023-08-20'),
    ('100104', 1, 'SIGNED', 'REGULAR', '2023-07-05'),
    ('100105', 1, 'UNSIGNED', 'REGULAR', '2023-06-01')`
  )
  .then(() => console.log(`success populating participant Member of Team`))
  .catch((err) =>
    console.log(
      `there was an error populating participant Member of Team! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `INSERT INTO OfficialYearsWorked (hiredDate, yearsWorked) VALUES 
    ('2021-01-15', 2),  
    ('2022-08-10', 1), 
    ('2023-11-05', 0), 
    ('2022-03-20', 1),   
    ('2021-04-25', 2)`
  )
  .then(() => console.log(`success populating Official Years Worked`))
  .catch((err) =>
    console.log(`there was an error populating Official Years Worked! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO Official (staffId, individualId, hiredDate) VALUES 
    ("541546", 1, '2021-01-15'),  
    ("541578", 2, '2022-08-10'),  
    ("458456", 3, '2023-11-05'),  
    ("245126", 4, '2022-03-20'),  
    ("548654", 5, '2021-04-25')`
  )
  .then(() => console.log(`success populating Official`))
  .catch((err) =>
    console.log(`there was an error populating Official! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO OfficialOfficiatesGame (staffId, gameId, status) VALUES
    ('541546', 1, 'ONTIME'),
    ('541578', 2, 'LATE'),
    ('458456', 3, 'ONTIME'),
    ('245126', 4, 'LATE'),
    ('548654', 5, 'ONTIME')`
  )
  .then(() => console.log(`success populating Official Officiates Game`))
  .catch((err) =>
    console.log(
      `there was an error populating Official Officiates Game! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `INSERT INTO OfficialLicense (licenseNumber, licenseExpiration, tierLevel) VALUES
    ('001', '2024-11-15', 'Advanced'),
    ('002', '2025-05-20', 'Advanced'),
    ('003', '2024-12-01', 'Intermediate'),
    ('004', '2026-02-10', 'Intermediate'),
    ('005', '2025-08-25', 'Beginner')`
  )
  .then(() => console.log(`success populating officiate License`))
  .catch((err) =>
    console.log(`there was an error populating officiate License! ${err}`)
  );

await db
  .getConnection()
  .query(
    `INSERT INTO OfficialCanOfficiateActivity (staffId, activityId, licenseNumber) VALUES
    ('541546', 1, '001'),
    ('541578', 1, '002'),
    ('458456', 1, '003'),
    ('245126', 1, '004'),
    ('548654', 1, '005')`
  )
  .then(() => console.log(`success populating Official Can Officiate Activity`))
  .catch((err) =>
    console.log(
      `there was an error populating Official Can Officiate Activity! ${err}`
    )
  );

await db
  .getConnection()
  .query(
    `INSERT INTO GamePlayedByTeam (gameId, teamId, side, result, score)
    VALUES
      (1, 1, 'AWAY', 'WIN', '4'),
      (1, 2, 'HOME', 'LOSE', '1'),
      (2, 3, 'AWAY', 'DRAW', '3'),
      (2, 4, 'HOME', 'WIN', '3'),
      (3, 5, 'AWAY', 'LOSE', '1'),
      (3, 1, 'AWAY', 'WIN', '2');`
  )
  .then(() => console.log(`success populating Game Played By Team`))
  .catch((err) =>
    console.log(`there was an error populating Game Played By Team! ${err}`)
  );

// db.getConnection().query(
//     ``
// ).then(() => console.log(`success populating `)).catch((err) => console.log(`there was an error populating ! ${err}`));