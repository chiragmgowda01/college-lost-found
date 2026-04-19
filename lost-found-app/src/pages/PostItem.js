import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, push } from "firebase/database";

function PostItem() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "ID Card",
    location: "",
    date: new Date().toISOString().slice(0, 10),
    reporter: "",
    phone: "",
    type: "lost",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeFromQuery = params.get("type");

    if (typeFromQuery === "lost" || typeFromQuery === "found") {
      setForm((prev) => ({ ...prev, type: typeFromQuery }));
    }
  }, [location.search]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian number.");
      return;
    }

    if (!form.title || !form.location || !form.reporter) {
      setError("Fill all required fields.");
      return;
    }

    await push(ref(db, "items"), {
      ...form,
      phone: "+91" + form.phone,
      status: "open",
      createdAt: Date.now()
    });

    alert("Report posted successfully!");
    navigate("/explore");
  };

  return (
    <div className="page-wrap">
      <div className="form-card">
        <h2>Post Item</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} />
          <textarea name="description" placeholder="Description" onChange={handleChange} />

          <select name="type" onChange={handleChange}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="reporter" placeholder="Your Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />

          <input type="file" onChange={handleImage} />
          {preview && <img src={preview} alt="preview" width="100" />}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PostItem;