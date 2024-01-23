// SummaryPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function SummaryPage() {
  const [summary, setSummary] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("Arizona Cardinals");

  useEffect(() => {
    // Fetch list of teams
    fetch("http://localhost:8081/team")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.log(err));

    // Fetch summary data
    fetch("http://localhost:8081/more_info")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const filteredSummary = summary.filter(
    (item) => item.TeamName === selectedTeam
  );

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <div className="SummarySelector">
          <select onChange={handleChangeTeam} value={selectedTeam}>
            {teams.map((team) => (
              <option key={team.TeamID} value={team.TeamName}>
                {team.TeamName}
              </option>
            ))}
          </select>
        </div>
        <div className="SummaryTable1">
          {selectedTeam && (
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>TeamName</th>
                  <th>PlayerCount</th>
                  <th>CoachName</th>
                  <th>TotalProfit</th>
                </tr>
              </thead>
              <tbody>
                {filteredSummary.map((data, i) => (
                  <tr key={i}>
                    <td>{data.Year}</td>
                    <td>{data.TeamName}</td>
                    <td>{data.PlayerCount}</td>
                    <td>{data.CoachName}</td>
                    <td>{data.TotalProfit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="SummaryTable2">
          {selectedTeam && (
            <table>
              <thead>
                <tr>
                  <th>TeamName</th>
                  <th>Stadium</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Total Games Played</th>
                </tr>
              </thead>
              <tbody>
                {filteredSummary.slice(0, 1).map((data, i) => (
                  <tr key={i}>
                    <td>{data.TeamName}</td>
                    <td>{data.StadiumName}</td>
                    <td>{data.Wins}</td>
                    <td>{data.Losses}</td>
                    <td>{data.TotalGames}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
      <div className="copyright">
        Created By Shreyas Shende & Hrithik Jadhav
      </div>
    </div>
  );
}

export default SummaryPage;
