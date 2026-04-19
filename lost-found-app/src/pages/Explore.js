import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";

function Explore() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(db, "items");

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];

      for (let id in data) {
        list.push({ id, ...data[id] });
      }

      setItems(list.reverse());
    });
  }, []);

  const resolveItem = async (id) => {
    await update(ref(db, "items/" + id), {
      status: "resolved"
    });
  };

  return (
    <div>
      <h2>All Items</h2>

      {items.map((item) => (
        <div key={item.id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.type}</p>
          <p>{item.location}</p>
          <p>{item.phone}</p>
          <p>Status: {item.status}</p>

          {item.status !== "resolved" && (
            <button onClick={() => resolveItem(item.id)}>
              Mark Resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Explore;