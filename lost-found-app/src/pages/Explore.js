import React, { useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getItems } from "../utils/storage";

function Explore() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const items = getItems();

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesType = type === "all" ? true : item.type === type;
      const text = `${item.title} ${item.description} ${item.category} ${item.location} ${item.reporter}`
        .toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [items, search, type]);

  return (
    <div className="page-wrap">
      <div className="section-heading">
        <h2>Explore Reports</h2>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title, category, location, reporter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <div className="empty-state">No matching reports found.</div>
        )}
      </div>
    </div>
  );
}

export default Explore;