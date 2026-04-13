import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem } from "../utils/storage";

function PostItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "ID Card",
    location: "",
    date: new Date().toISOString().slice(0, 10),
    reporter: "",
    phone: "",
    type: searchParams.get("type") || "lost",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

 useEffect(() => {
  const typeFromQuery = searchParams.get("type");
  if (typeFromQuery === "lost" || typeFromQuery === "found") {
    setForm((prev) => ({ ...prev, type: typeFromQuery }));
  }
}, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, phone: onlyDigits }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian number starting with 6–9.");
      return;
    }

    if (!form.title.trim() || !form.location.trim() || !form.reporter.trim()) {
      setError("Fill title, location, and reporter name.");
      return;
    }

    addItem({
      id: Date.now(),
      ...form,
      contact: `+91${form.phone}`,
      createdAt: new Date().toISOString(),
      resolved: false,
    });

    alert("Report posted successfully.");
    navigate("/explore");
  };

  return (
    <div className="page-wrap">
      <div className="form-card">
        <div className="section-heading">
          <h2>Post a Report</h2>
          <span className="muted">Lost or found? Share it here.</span>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form className="premium-form" onSubmit={handleSubmit}>
          <div className="two-col">
            <input name="title" placeholder="Item title" value={form.title} onChange={handleChange} />
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Describe the item, color, markings, where you saw it..."
            rows="4"
            value={form.description}
            onChange={handleChange}
          />

          <div className="two-col">
            <select name="category" value={form.category} onChange={handleChange}>
              <option>ID Card</option>
              <option>Wallet</option>
              <option>Phone</option>
              <option>Book</option>
              <option>Bag</option>
              <option>Keys</option>
              <option>Other</option>
            </select>
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          </div>

          <div className="two-col">
            <input name="date" type="date" value={form.date} onChange={handleChange} />
            <input name="reporter" placeholder="Reporter name" value={form.reporter} onChange={handleChange} />
          </div>

          <div className="phone-wrap">
            <span className="country-code">+91</span>
            <input
              name="phone"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>

          <input type="file" accept="image/*" onChange={handleImage} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}

          <div className="form-actions">
            <button type="button" className="ghost-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostItem;