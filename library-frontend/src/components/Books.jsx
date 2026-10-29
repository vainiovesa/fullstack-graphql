import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  let books = result.data.allBooks;
  const genres = [
    ...new Set(books.map((b) => b.genres).reduce((a, b) => a.concat(b), [])),
  ];
  if (genre) {
    books = books.filter((b) => b.genres.includes(genre));
  }

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
