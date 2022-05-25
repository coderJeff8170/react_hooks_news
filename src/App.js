import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
    // .then((response) => {
    //   console.log(response.data);
    //   setResults(response.data.hits);
    // });
  }, []); //use dependency array to only call on load - things you want to load on changes get entered to dep array

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      console.log(response.data);
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getResults();
  };

  const handleClear = () => {
    setQuery("");
    searchInputRef.current.focus();
  };
  //in class based components, refs give us a way to access elements created in the render method.
  return (
    <div
      className="container max-w-md 
    mx-auto p-4 m-2 bg-purple-lightest 
    shadow-lg rounded"
    >
      <img
        src="https://icon.now.sh/react/c0c"
        alt="react-logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          get news!
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-teal text-white p-1 rounded"
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div className="font-bold text-orange-dark">"loading..."</div>
      ) : (
        <div>
          <ul className="list-reset leading-normal">
            {results.map((result) => (
              <li key={result.objectID}>
                <a
                  className="text-indigo-dark hover:text-indigo-darkest"
                  href={result.url}
                >
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}
