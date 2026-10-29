import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = ({ show, token }) => {
  const booksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME, {
    skip: !token,
  });

  if (!show) {
    return null;
  }

  if (booksResult.loading || meResult.loading) {
    return <div>Loading...</div>;
  }

  const favoriteGenre = meResult.data.me.favoriteGenre;
  let books = booksResult.data.allBooks;
  books = books.filter((b) => b.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

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
    </div>
  );
};

export default Recommendations;
