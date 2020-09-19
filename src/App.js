import React, { useState, useEffect } from "react";
import PokemonIndex from './pokemonIndex';
import Pagination from './pagination';
import axios from 'axios'
function App() {
  const [pokemon, setpokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoding] = useState(true);


  useEffect(() => {
    setLoding(true)
    let cancel
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoding(false)
      setNextPage(res.data.next)
      setPrevPage(res.data.previous)
      setpokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPage])

  function gotoNextPage() {
    setCurrentPage(nextPage);
  }
  function gotoPrevPage() {
    setCurrentPage(prevPage);
  }

  if (loading) return "Loading....."
  return (
    <>
      <PokemonIndex pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPage ? gotoNextPage : null}
        gotoPrevPage={prevPage ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
