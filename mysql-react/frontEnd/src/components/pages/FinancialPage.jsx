// FinancialPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../misc/NavBar";
import Footer from "../../misc/Footer";
import "../../Page_css/styles1.css";

function FinancialPage() {
  const [finance, setFinance] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const financesPerPage = 32;

  useEffect(() => {
    // Fetch players data from your backend
    fetch("http://localhost:8081/finance")
      .then((res) => res.json())
      .then((data) => setFinance(data))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastFinance = currentPage * financesPerPage;
  const indexOfFirstFinance = indexOfLastFinance - financesPerPage;
  const currentFinances = finance.slice(
    indexOfFirstFinance,
    indexOfLastFinance
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <table>
          <thead>
            <tr>
              <th>TeamName</th>
              <th>Season</th>
              <th>Spending</th>
              <th>Avg Ticket Price</th>
              <th>Attendance</th>
              <th>Total Ticket Earning</th>
              <th>NFL Payout</th>
              <th>Total Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {currentFinances.map((finance, i) => (
              <tr key={i}>
                <td>{finance.TeamName}</td>
                <td>{finance.Year}</td>
                <td>{finance.Spending}</td>
                <td>{finance["Avg Ticket Price"]}</td>
                <td>{finance.Attendance}</td>
                <td>{finance["Total Ticket Earning"]}</td>
                <td>{finance["NFL Payout"]}</td>
                <td>{finance["Total Profit/Loss"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          financesPerPage={financesPerPage}
          totalFinances={finance.length}
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
  financesPerPage,
  totalFinances,
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
      Math.ceil(totalFinances / financesPerPage)
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
      {currentPage < Math.ceil(totalFinances / financesPerPage) && (
        <li onClick={() => paginate(currentPage + 1)}>Next</li>
      )}
    </ul>
  );
};

export default FinancialPage;
