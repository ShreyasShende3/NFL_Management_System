const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "nfl",
});
app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

app.get("/coach", (req, res) => {
  const sql = `
  SELECT coach.Coach_ID, coach.Name, coach.\`Team Abb\`, season.Year, team.TeamName
  FROM coach
  JOIN team ON coach.TeamID = team.TeamID
  JOIN season ON coach.Season_ID = season.Season_ID
  ORDER BY season.Season_ID
  `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/player", (req, res) => {
  const { search, season } = req.query;

  let sql = `
    SELECT
      player.Player_ID,
      player.\`Kit No.\`,
      player.Name,
      player.Position,
      player.Weight,
      player.Height,
      player.\`Date of Birth\`,
      player.College,
      player.Drafted,
      season.Year,
      team.TeamName
    FROM
      player
    JOIN
      team ON player.TeamID = team.TeamID
    JOIN
      season ON player.Season_ID = season.Season_ID
    WHERE
      1=1
  `;

  if (search) {
    sql += ` AND player.Name LIKE '%${search}%'`;
  }

  if (season) {
    sql += ` AND season.Year = ${season}`;
  }

  sql += " ORDER BY player.Player_ID";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/stadium", (req, res) => {
  const sql = `
  SELECT stadium.Stadium_ID,team.TeamName, stadium.Name, Stadium.Capacity, stadium.Location, stadium.Opened
  FROM stadium
  JOIN team ON stadium.TeamID = team.TeamID
  `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/team", (req, res) => {
  const sql = "SELECT * FROM team";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/finance", (req, res) => {
  const sql = `
    SELECT
        team.TeamName,
        season.Year,
        financial.Spending,
        financial.\`Avg Ticket Price\`,
        financial.Attendance,
        financial.\`Total Ticket Earning\`,
        financial.\`NFL Payout\`,
        financial.\`Total Profit/Loss\`
    FROM
        financial
    JOIN team ON financial.TeamID = team.TeamID
    JOIN season ON financial.Season_ID = season.Season_ID
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/results", (req, res) => {
  const sql = `
  SELECT results.Match_ID, team.TeamName, results.Score, results.match_date, results.Outcome, results.Category
  FROM results
  JOIN team ON results.TeamID = team.TeamID
  ORDER BY results.Match_ID
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/passing_stats", (req, res) => {
  const sql = `
    SELECT
      passing_stats.Player_ID,
      passing_stats.Name,
      passing_stats.\`Team Abb\`,
      passing_stats.\`Games Played\`,
      passing_stats.\`Passes Completed\`,
      passing_stats.\`Completion%\`,
      passing_stats.\`Passing Yards\`,
      passing_stats.\`Yards Lost\`,
      passing_stats.Takedowns,
      passing_stats.Interceptions,
      passing_stats.Sacks,
      season.Year AS Season_Year
    FROM
      passing_stats
    JOIN season ON passing_stats.Season_ID = season.Season_ID
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Endpoint for receiving stats
app.get("/receiving_stats", (req, res) => {
  const sql = `
    SELECT
      receiving_stats.Player_ID,
      receiving_stats.Name,
      receiving_stats.\`Team Abb\`,
      receiving_stats.\`Games Played\`,
      receiving_stats.Receptions,
      receiving_stats.\`Catch%\`,
      receiving_stats.\`Receiving Yards\`,
      receiving_stats.Takedowns,
      receiving_stats.Fumbles,
      season.Year AS Season_Year
    FROM
      receiving_stats
    JOIN season ON receiving_stats.Season_ID = season.Season_ID
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Endpoint for rushing stats
app.get("/rushing_stats", (req, res) => {
  const sql = `
    SELECT
      rushing_stats.Player_ID,
      rushing_stats.Name,
      rushing_stats.\`Team Abb\`,
      rushing_stats.\`Games Played\`,
      rushing_stats.\`Rushing Attempts\`,
      rushing_stats.\`Rushing Yards\`,
      rushing_stats.Takedowns,
      rushing_stats.Fumbles,
      season.Year AS Season_Year
    FROM
      rushing_stats
    JOIN season ON rushing_stats.Season_ID = season.Season_ID
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Endpoint for defense stats
app.get("/defense_stats", (req, res) => {
  const sql = `
    SELECT
      defense_stats.Player_ID,
      defense_stats.Name,
      defense_stats.\`Team Abb\`,
      defense_stats.\`Games Played\`,
      defense_stats.Interceptions,
      defense_stats.Tackles,
      season.Year AS Season_Year
    FROM
      defense_stats
    JOIN season ON defense_stats.Season_ID = season.Season_ID
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/more_info", (req, res) => {
  const selectedTeam = req.query.team;

  const sql = `
    SELECT
      Season.Year,
      Team.TeamName,
      COUNT(DISTINCT Player.Player_ID) AS PlayerCount,
      Coach.Name AS CoachName,
      Stadium.Name AS StadiumName,
      TeamWinsLosses.Wins,
      TeamWinsLosses.Losses,
      TeamWinsLosses.TotalGames,
      MAX(Financial.\`Total Profit/Loss\`) AS TotalProfit
    FROM
      Season
      LEFT JOIN Team ON 1=1
      LEFT JOIN Player ON Season.Season_ID = Player.Season_ID AND Team.TeamID = Player.TeamID
      LEFT JOIN Coach ON Season.Season_ID = Coach.Season_ID AND Team.TeamID = Coach.TeamID
      LEFT JOIN Stadium ON Team.TeamID = Stadium.TeamID
      LEFT JOIN (
        SELECT
          TeamID,
          SUM(CASE WHEN Outcome = 'WIN' THEN 1 ELSE 0 END) AS Wins,
          SUM(CASE WHEN Outcome = 'LOSE' THEN 1 ELSE 0 END) AS Losses,
          COUNT(DISTINCT Match_ID) AS TotalGames
        FROM Results
        GROUP BY TeamID
      ) AS TeamWinsLosses ON Team.TeamID = TeamWinsLosses.TeamID
      LEFT JOIN Financial ON Team.TeamID = Financial.TeamID AND Season.Season_ID = Financial.Season_ID
    GROUP BY
      Season.Year,
      Team.TeamName,
      Coach.Name,
      Stadium.Name,
      TeamWinsLosses.Wins,
      TeamWinsLosses.Losses,
      TeamWinsLosses.TotalGames;
  `;

  db.query(sql, [selectedTeam], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening");
});
