import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewCard = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="containerr" style={{ height: "1000px;" }}>
      <div className="flex">
        <a
          href="/"
          className="btn btn-primary m-3"
          style={{ textDecoration: "none" }}
        >
          Back
        </a>
        <h1 className="text-center">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
      </div>
      <div className="card p-3">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <p>
              <strong>Type:</strong>{" "}
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
            <p>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </p>
            <p>
              <strong>Height:</strong> {pokemon.height / 10} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight / 10} kg
            </p>
            <h5>Stats:</h5>
            <ul className="list-unstyled">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  <strong>
                    {stat.stat.name.charAt(0).toUpperCase() +
                      stat.stat.name.slice(1)}
                    :
                  </strong>{" "}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
