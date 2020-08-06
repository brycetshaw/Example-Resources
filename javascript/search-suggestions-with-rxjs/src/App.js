import React, { useState, useEffect } from "react";

import "./App.css";

import { from, BehaviorSubject, observable } from "rxjs";
import {
  map,
  filter,
  delay,
  mergeMap,
  debounce,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";

const getPokemonByName = async (name) => {
  const { results: allPokemon } = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=1000"
  ).then((res) => res.json());
  return allPokemon.filter((pokemon) => pokemon.name.includes(name));
};

let searchSubject = new BehaviorSubject("");
let searchResultObservable = searchSubject.pipe(
  filter((val) => val.length > 1),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap((value) => from(getPokemonByName(value)))
);

const useObservable = (observable, setter) => {
  useEffect(() => {
    let subscription = observable.subscribe((result) => {
      setter(result);
    });
    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useObservable(searchResultObservable, setResults);

  const handleSearchChange = (e) => {
    console.log(e.target);
    const newValue = e.target.value;
    setSearch(newValue);
    searchSubject.next(newValue);
  };

  const handleListClick = (e) => {
    const selectedElementText = e.currentTarget.textContent;
    // const selectedInput = e.target.key.text;
    setSearch(selectedElementText);
    searchSubject.next(selectedElementText);
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={handleSearchChange}
        />
      </form>

      <div>
        {results.map((pokemon) => (
          <div key={pokemon.name} onClick={handleListClick}>
            {pokemon.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
