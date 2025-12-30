import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ItemCard = ({ id, name, type, store, dispatch }) => {
    const imgBase =
        "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img";
    const fallbackImg = `${imgBase}/placeholder.jpg`;

    const typePaths = {
        character: "characters",
        planet: "planets",
        starship: "starships",
    };

    const imgUrl = `${imgBase}/${typePaths[type]}/${id}.jpg`;

    const isFavorite = store.favorites.some((fav) => fav.id === id && fav.type === type);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "removeFavorite", payload: { id, type } });
        } else {
            dispatch({ type: "addFavorite", payload: { id, name, type } });
        }
    };

    return (
        <div className="card me-2 shadow-sm" style={{ minWidth: "200px" }}>
            <img
                src={imgUrl}
                className="card-img-top"
                alt={name}
                onError={(e) => (e.currentTarget.src = fallbackImg)}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark">{name}</h5>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Link to={`/${type}/${id}`} className="btn btn-outline-dark">
                        Mas Info
                    </Link>
                    <button
                        onClick={toggleFavorite}
                        className="btn btn-link p-0"
                        style={{ fontSize: "1.8rem", color: isFavorite ? "red" : "black" }}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <i className="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["character", "planet", "starship"]).isRequired,
    store: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};