import { useState, useEffect } from "react";
import axios from "axios";
import { openDB } from "idb";

export default function MoviePage() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      
      const db = await openDB();
      const movies = await db.getAll("my-store");
      setMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async () => {
    const movie = { title };
    try {
      const db = await openDB();
      const tx = db.transaction("my-store", "readwrite");
      await tx.done;
      await tx.store.add(movie);
      setTitle("");
      const updatedMovies = await db.getAll("my-store");
      return updatedMovies;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const db = await openDB();
      const tx = db.transaction("my-store", "readwrite");
      await tx.done;
      await tx.store.delete(movieId);
      const updatedMovies = await db.getAll("my-store");
      return updatedMovies;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMovie();
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => handleDeleteMovie(movie.id)}>
            Delete Movie
          </button>
        </div>
      ))}
    </div>
  );
}
