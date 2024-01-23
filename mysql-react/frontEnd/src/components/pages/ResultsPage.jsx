// ResultsPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ResultsPerPage = 20;

  useEffect(() => {
    // Fetch players data from your backend
    fetch("http://localhost:8081/results")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastResults = currentPage * ResultsPerPage;
  const indexOfFirstResults = indexOfLastResults - ResultsPerPage;
  const currentResults = results.slice(indexOfFirstResults, indexOfLastResults);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <table>
          <thead>
            <tr>
              <th>Match_ID</th>
              <th>TeamName</th>
              <th>Score</th>
              <th>match_date</th>
              <th>Outcome</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((results, i) => (
              <tr key={i}>
                <td>{results.Match_ID}</td>
                <td>{results.TeamName}</td>
                <td>{results.Score}</td>
                <td>{new Date(results["match_date"]).toLocaleDateString()}</td>
                <td>{results.Outcome}</td>
                <td>{results.Category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          ResultsPerPage={ResultsPerPage}
          totalResults={results.length}
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
  ResultsPerPage,
  totalResults,
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
      Math.ceil(totalResults / ResultsPerPage)
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
      {currentPage < Math.ceil(totalResults / ResultsPerPage) && (
        <li onClick={() => paginate(currentPage + 1)}>Next</li>
      )}
    </ul>
  );
};

export default ResultsPage;
