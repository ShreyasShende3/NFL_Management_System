import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function StatsPage() {
  const [stats, setStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const StatsPerPage = 20;
  const [currentStatsType, setCurrentStatsType] = useState("passing_stats");

  const fetchStats = (endpoint) => {
    fetch(`http://localhost:8081/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Fetch default stats (Passing Stats in this case)
    fetchStats(currentStatsType);
  }, [currentStatsType]);

  const handleFilterButtonClick = (endpoint) => {
    // Set the current stats type to trigger a re-fetch when it changes
    setCurrentStatsType(endpoint);

    // Fetch data for the selected stats type
    fetchStats(endpoint);
  };

  const renderTableHeaders = () => {
    // Define headers based on the current stats type
    const headersByType = {
      passing_stats: [
        "Player_ID",
        "Name",
        "Team Abb",
        "Games Played",
        "Passes Completed",
        "Completion%",
        "Passing Yards",
        "Yards Lost",
        "Takedowns",
        "Interceptions",
        "Sacks",
        "Season",

        // ... other passing stats headers ...
      ],
      receiving_stats: [
        "Player_ID",
        "Name",
        "Team Abb",
        "Games Played",
        "Receptions",
        "Catch%",
        "Receiving Yards",
        "Takedowns",
        "Fumbles",
        "Season",
        // ... other receiving stats headers ...
      ],
      rushing_stats: [
        "Player_ID",
        "Name",
        "Team Abb",
        "Games Played",
        "Rushing Attempts",
        "Rushing Yards",
        "Takedowns",
        "Fumbles",
        "Season",
        // ... other rushing stats headers ...
      ],
      defense_stats: [
        "Player_ID",
        "Name",
        "Team Abb",
        "Games Played",
        "Interceptions",
        "Tackles",
        "Season",
        // ... other defense stats headers ...
      ],
    };

    const headers = headersByType[currentStatsType];

    return (
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    );
  };

  const renderTableData = () => {
    // Define the data based on the current stats type
    return currentStats.map((stats, i) => (
      <tr key={i}>
        {Object.keys(stats).map((header) => (
          <td key={header}>{stats[header]}</td>
        ))}
      </tr>
    ));
  };

  const indexOfLastStats = currentPage * StatsPerPage;
  const indexOfFirstStats = indexOfLastStats - StatsPerPage;
  const currentStats = stats.slice(indexOfFirstStats, indexOfLastStats);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        {/* Buttons for different stats */}
        <div className="button-container" style={{ marginBottom: "20px" }}>
          <button onClick={() => handleFilterButtonClick("passing_stats")}>
            Passing Stats
          </button>
          <button onClick={() => handleFilterButtonClick("receiving_stats")}>
            Receiving Stats
          </button>
          <button onClick={() => handleFilterButtonClick("rushing_stats")}>
            Rushing Stats
          </button>
          <button onClick={() => handleFilterButtonClick("defense_stats")}>
            Defense Stats
          </button>
        </div>

        <table>
          <thead>{renderTableHeaders()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>

        <Pagination
          StatsPerPage={StatsPerPage}
          totalStats={stats.length}
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
const Pagination = ({ StatsPerPage, totalStats, currentPage, paginate }) => {
  const pageNumbers = [];
  const visiblePageNumbers = 5;

  for (
    let i = Math.max(1, currentPage - Math.floor(visiblePageNumbers / 2));
    i <=
    Math.min(
      currentPage + Math.floor(visiblePageNumbers / 2),
      Math.ceil(totalStats / StatsPerPage)
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
      {currentPage < Math.ceil(totalStats / StatsPerPage) && (
        <li onClick={() => paginate(currentPage + 1)}>Next</li>
      )}
    </ul>
  );
};

export default StatsPage;
