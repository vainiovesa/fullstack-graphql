import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const BirthYearForm = ({ authors }) => {
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => console.log(error.message),
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("authorSelect");

    editAuthor({
      variables: { name, setBornTo: Number(born) },
    });

    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <div>
        <form onSubmit={submit}>
          <div>
            <label>
              name
              <select name="authorSelect">
                {authors.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </label>
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default BirthYearForm;
