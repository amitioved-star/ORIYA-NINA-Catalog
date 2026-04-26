import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Catalog() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data, error } = await supabase
      .from("items")
      .select("*");

    if (error) {
      console.log("❌ שגיאה:", error);
    } else {
      console.log("✅ נתונים:", data);
      setItems(data);
    }
  }

  return (
    <div style={{ padding: "40px", direction: "rtl" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        הקטלוג שלנו
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {items.map((item) => (
          <div key={item.id} style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            background: "#fff"
          }}>
            <h3>{item.name}</h3>
            <p>💰 {item.price} ₪</p>
            <p>{item.description}</p>
            <p>📦 {item.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
}