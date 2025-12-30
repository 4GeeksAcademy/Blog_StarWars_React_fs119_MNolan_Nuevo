import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (id) => {
    dispatch({ type: "removeFavorite", payload: id });
  };

  return (
    <nav className="navbar navbar-light bg-dark mb-2 px-3">
      <span className="navbar-brand mb-0 text-white fs-3 fw-bold">Star Wars
        <i className="fa-brands fa-galactic-republic px-2 text-white"></i>
        <i className="fa-brands fa-galactic-senate px-2 text-white"></i>
        <i className="fa-brands fa-jedi-order px-2 text-white"></i>
        <i className="fa-brands fa-old-republic px-2 text-white"></i>
      </span>
      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Favoritos {store.favorites.length}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item text-muted">Empty</li>
          ) : (
            store.favorites.map((fav) => (
              <li key={fav.id} className="dropdown-item d-flex justify-content-between">
                {fav.name}
                <i
                  className="fas fa-trash text-danger"
                  onClick={() => removeFavorite(fav.id)}
                  style={{ cursor: "pointer" }}
                ></i>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};