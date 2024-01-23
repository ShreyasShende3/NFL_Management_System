// CoachPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function CoachPage() {
  const [coach, setCoach] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coachesPerPage = 21;

  useEffect(() => {
    // Fetch players data from your backend
    fetch("http://localhost:8081/coach")
      .then((res) => res.json())
      .then((data) => setCoach(data))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastCoach = currentPage * coachesPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
  const currentCoaches = coach.slice(indexOfFirstCoach, indexOfLastCoach);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <table>
          <thead>
            <tr>
              <th>Coach_ID</th>
              <th>Name</th>
              <th>Team Abb</th>
              <th>Season</th>
              <th>TeamName</th>
            </tr>
          </thead>
          <tbody>
            {currentCoaches.map((coach, i) => (
              <tr key={i}>
                <td>{coach.Coach_ID}</td>
                <td>{coach.Name}</td>
                <td>{coach["Team Abb"]}</td>
                <td>{coach.Year}</td>
                <td>{coach.TeamName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          coachesPerPage={coachesPerPage}
          totalCoaches={coach.length}
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
  coachesPerPage,
  totalCoaches,
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
      Math.ceil(totalCoaches / coachesPerPage)
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
      {currentPage < Math.ceil(totalCoaches / coachesPerPage) && (
        <li onClick={() => paginate(currentPage + 1)}>Next</li>
      )}
    </ul>
  );
};

export default CoachPage;
