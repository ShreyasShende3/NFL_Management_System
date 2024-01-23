import React from "react";
import "../../landingPage/styles.css";

const LandingPage = () => {
  return (
    <div className="main">
      <nav>
        <div className="logo">
          <img src="/The world studios.png" alt="Text" />
        </div>
        <ul>
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/more_info">SUMMARY</a>
          </li>
          <li>
            <a href="/player">PLAYER</a>
          </li>
          <li>
            <a href="/coach">COACH</a>
          </li>
          <li>
            <a href="/stadium">STADIUM</a>
          </li>
          <li>
            <a href="/results">RESULTS</a>
          </li>
          <li>
            <a href="/stats">STATS</a>
          </li>
          <li>
            <a href="/team">TEAMS</a>
          </li>
          <li>
            <a href="/finance">FINANCE</a>
          </li>
        </ul>
      </nav>

      <div className="video-container">
        <video autoPlay loop muted playsInline className="bg__video">
          <source src="/nfl_animation.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="content">
        <h1>
          NFL
          <br />
          <span>MANAGEMENT</span>
          <br />
          <span>SYSTEM</span>
        </h1>
        <br />
        <div className="Paragraph1">
          <p>
            The NFL Management System offers a comprehensive overview of three
            seasons within the National Football League (NFL). The platform
            presents an extensive array of data, including player profiles,
            rosters, game results, financial insights, stadium details, and
            unique information derived from intricate database queries.
          </p>
        </div>
        <br />
        <div className="Paragraph2">
          <p>
            With a user-friendly interface, the system provides enthusiasts and
            analysts alike with a dynamic tool to explore and analyze diverse
            facets of the league. Through sophisticated queries, it unveils
            patterns and correlations, offering a deeper understanding of team
            dynamics, player performance, and the financial intricacies of the
            NFL across multiple seasons.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
