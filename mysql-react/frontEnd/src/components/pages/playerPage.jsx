// PlayersPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    // Fetch players data from your backend based on searchQuery and selectedSeason
    let url = "http://localhost:8081/player";

    if (searchQuery || selectedSeason) {
      url += `?search=${searchQuery}&season=${selectedSeason}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.log(err));
  }, [searchQuery, selectedSeason]);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <div className="specificSearch">
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            <option value="">All Seasons</option>
            {Array.from(new Set(players.map((player) => player.Year))).map(
              (season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              )
            )}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Player_ID</th>
              <th>Kit No.</th>
              <th>Name</th>
              <th>Position</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Date of Birth</th>
              <th>College</th>
              <th>Drafted</th>
              <th>Season</th>
              <th>TeamName</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player, i) => (
              <tr key={i}>
                <td>{player.Player_ID}</td>
                <td>{player["Kit No."]}</td>
                <td>{player.Name}</td>
                <td>{player.Position}</td>
                <td>{player.Weight}</td>
                <td>{player.Height}</td>
                <td>
                  {new Date(player["Date of Birth"]).toLocaleDateString()}
                </td>
                <td>{player.College}</td>
                <td>{player.Drafted}</td>
                <td>{player.Year}</td>
                <td>{player.TeamName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          playersPerPage={playersPerPage}
          totalPlayers={players.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      <Footer />
      <div className="copyright">
        Created By Shreyas Shende & Hrithik Jadhav
      </div>
    </div>
  );
}

// Pagination component
const Pagination = ({
  playersPerPage,
  totalPlayers,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  const visiblePageNumbers = 5;

  for (
    let i = Math.max(1, currentPage - Math.floor(visiblePageNumbers / 2));
    i <=
    Math.min(
      currentPage + Math.floor(visiblePageNumbers / 2),
      Math.ceil(totalPlayers / playersPerPage)
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li onClick={() => paginate(currentPage - 1)}>Previous</li>
      )}
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </li>
      ))}
      {currentPage < Math.ceil(totalPlayers / playersPerPage) && (
        <li onClick={() => paginate(currentPage + 1)}>Next</li>
      )}
    </ul>
  );
};

export default PlayersPage;
