// PlayersPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function StadiumPage() {
  const [stadium, setStadium] = useState([]);

  useEffect(() => {
    // Fetch players data from your backend
    fetch("http://localhost:8081/stadium")
      .then((res) => res.json())
      .then((data) => setStadium(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <table>
          <thead>
            <tr>
              <th>Stadium_ID</th>
              <th>TeamName</th>
              <th>Name</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Opened</th>
            </tr>
          </thead>
          <tbody>
            {stadium.map((stadium, i) => (
              <tr key={i}>
                <td>{stadium.Stadium_ID}</td>
                <td>{stadium.TeamName}</td>
                <td>{stadium.Name}</td>
                <td>{stadium.Capacity}</td>
                <td>{stadium.Location}</td>
                <td>{stadium.Opened}</td>
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

export default StadiumPage;
