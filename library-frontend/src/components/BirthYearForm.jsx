import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const BirthYearForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => console.log(error.message),
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });

    setName("");
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
              <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
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
