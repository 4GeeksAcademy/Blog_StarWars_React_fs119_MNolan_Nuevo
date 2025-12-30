import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Details = ({ type }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  const endpointMap = {
    character: "people",
    planet: "planets",
    starship: "starships",
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://swapi.tech/api/${endpointMap[type]}/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch detail");
        const data = await res.json();
        setItem({ ...data, id: Number(id) });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDetail();
  }, [id, type]);

  if (error) return <h2 className="text-center mt-5 text-danger">{error}</h2>;
  if (!item) return <h2 className="text-center mt-5">Cargando...</h2>;

  const imgBase =
    "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img";
  const typePaths = {
    character: "characters",
    planet: "planets",
    starship: "starships",
  };
  const imgUrl = `${imgBase}/${typePaths[type]}/${id}.jpg`;
  const fallbackImg = `${imgBase}/placeholder.jpg`;

  const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="container mt-2">
      <div className="row g-4">
        <div className="col-md-5 text-center">
          <img
            src={imgUrl}
            alt={item.name}
            className="img-fluid rounded shadow"
            onError={(e) => (e.currentTarget.src = fallbackImg)}
          />
        </div>
        <div className="col-md-7">
          <Link to="/" className="btn btn-outline-dark my-1">
            ← Regresa a Home
          </Link>
          <h4 className="mb-2">{item.name}</h4>
          <ul className="list-group">
            {Object.entries(item).map(([key, value]) =>
              typeof value === "string" && !value.startsWith("http") ? (
                <li key={key} className="list-group-item">
                  <strong>{formatKey(key)}:</strong> {value}
                </li>
              ) : null
            )}
          </ul>

        </div>
      </div>
    </div>
  );
};