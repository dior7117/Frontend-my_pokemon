import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllCard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
        setFilteredPokemonList(data.results);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching Pokémon:', error));
  }, []);

  useEffect(() => {
    const filteredList = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  }, [searchTerm, pokemonList]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-3">All Pokémon</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="row">
        {filteredPokemonList.map(pokemon => (
          <div key={pokemon.name} className="col-md-3 mb-3">
            <div className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`}
                alt={pokemon.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <Link to={`/view/${pokemon.url.split('/').slice(-2, -1)}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCard;
