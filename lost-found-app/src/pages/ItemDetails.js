import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, removeItem } from "../utils/storage";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id);

  if (!item) {
    return (
      <div className="page-wrap">
        <div className="empty-state">Report not found.</div>
      </div>
    );
  }

  const handleResolve = () => {
    const ok = window.confirm("Mark this report as resolved and remove it?");
    if (!ok) return;
    removeItem(item.id);
    alert("Report removed.");
    navigate("/explore");
  };

  return (
    <div className="page-wrap">
      <div className="detail-card">
        <img
          src={item.image || "https://via.placeholder.com/900x600?text=Campus+Item"}
          alt={item.title}
          className="detail-image"
        />

        <div className="detail-content">
          <span className={`badge ${item.type === "lost" ? "badge-lost" : "badge-found"}`}>
            {item.type === "lost" ? "Lost" : "Found"}
          </span>

          <h2>{item.title}</h2>
          <p className="muted">{item.category} • {item.location}</p>
          <p>{item.description || "No description provided."}</p>

          <div className="detail-grid">
            <div><strong>Reporter</strong><span>{item.reporter}</span></div>
            <div><strong>Phone</strong><span>{item.contact}</span></div>
            <div><strong>Date</strong><span>{item.date}</span></div>
          </div>

          <div className="form-actions">
            <a className="ghost-btn" href={`tel:${item.contact}`}>Contact Reporter</a>
            <button className="success-btn" onClick={handleResolve}>Mark Resolved</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;