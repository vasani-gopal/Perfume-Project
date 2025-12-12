import React, { useEffect, useState } from "react";

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    fetch("/api/perfumes")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data);
        setPerfumes(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Perfume List</h1>

      {perfumes.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PerfumeList;
