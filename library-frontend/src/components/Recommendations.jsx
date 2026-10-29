import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = ({ show, token }) => {
  const meResult = useQuery(ME, {
    skip: !token,
  });

  const genre = meResult.data ? meResult.data.me.favoriteGenre : null;

  const booksResult = useQuery(ALL_BOOKS, {
    skip: meResult.loading,
    variables: {
      genre,
    },
  });

  if (!show) {
    return null;
  }

  if (booksResult.loading || meResult.loading) {
    return <div>Loading...</div>;
  }

  const books = booksResult.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{genre}</b>
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
