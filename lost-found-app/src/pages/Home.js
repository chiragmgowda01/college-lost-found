import React from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { getItems } from "../utils/storage";

function Home() {
  const navigate = useNavigate();
  const items = getItems().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recent = items.slice(0, 6);

  return (
    <div id="main-content">
      <section className="hero">
        <div className="hero-left">
          <span className="hero-pill">College Lost & Found</span>
          <h1>Find, post, and reunite items across your campus.</h1>
          <p>
            A premium, responsive community board where any student can post a lost
            or found report and connect instantly.
          </p>

          <div className="hero-actions">
            <button className="primary-btn danger" onClick={() => navigate("/post?type=lost")}>
              Report Lost
            </button>
            <button className="primary-btn success" onClick={() => navigate("/post?type=found")}>
              Report Found
            </button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="stat-card">
            <span>Total Reports</span>
            <strong>{items.length}</strong>
          </div>
          <div className="stat-card">
            <span>Lost</span>
            <strong>{items.filter((i) => i.type === "lost").length}</strong>
          </div>
          <div className="stat-card">
            <span>Found</span>
            <strong>{items.filter((i) => i.type === "found").length}</strong>
          </div>
        </div>
      </section>

      <section className="recent-section">
        <div className="section-heading">
          <h2>Recent Reports</h2>
          <button className="text-link" onClick={() => navigate("/explore")}>
            View all
          </button>
        </div>

        <div className="cards-grid">
          {recent.length > 0 ? (
            recent.map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <div className="empty-state">
              No reports yet. Start by posting the first lost or found item.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;