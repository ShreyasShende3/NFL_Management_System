// TeamPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function TeamPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    // Fetch players data from your backend
    fetch("http://localhost:8081/team")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <table>
          <thead>
            <tr>
              <th>TeamID</th>
              <th>TeamName</th>
              <th>Owner</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {team.map((team, i) => (
              <tr key={i}>
                <td>{team.TeamID}</td>
                <td>{team.TeamName}</td>
                <td>{team.Owner}</td>
                <td>{team.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
      <div className="copyright">
        Created By Shreyas Shende & Hrithik Jadhav
      </div>
    </div>
  );
}

export default TeamPage;
