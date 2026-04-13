import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <Link to={`/item/${item.id}`} className="item-card">
      <div className="item-image-wrap">
        <img
          src={item.image || "https://via.placeholder.com/600x400?text=Campus+Item"}
          alt={item.title}
          className="item-image"
        />
        <span className={`badge ${item.type === "lost" ? "badge-lost" : "badge-found"}`}>
          {item.type === "lost" ? "Lost" : "Found"}
        </span>
      </div>

      <div className="item-body">
        <h3>{item.title}</h3>
        <p className="muted">{item.category} • {item.location}</p>
        <p className="snippet">{item.description?.slice(0, 90) || "No description provided."}</p>

        <div className="item-meta">
          <span>{item.reporter || "Anonymous"}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;