import { useState } from "react";
import { useInventoryContext } from "../hooks/useInventoryContext";
import Close from "../images/close.svg";

const GameForm = ({ toggleForm }) => {
  const { dispatch } = useInventoryContext();
  const [title, setTitle] = useState("");
  const [copies, setCopies] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const game = { title, copies, releaseDate, imgUrl };

    // Fetch request to POST new data
    const response = await fetch(
      "https://games-inventory-api.onrender.com/api/inventory",
      {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      // Reset all states if form is successfully submitted
      setTitle("");
      setCopies("");
      setReleaseDate("");
      setImgUrl("");
      setError(null);
      console.log("New game added", json);
      // Adds the new game into the games array so that the UI and the database are in sync
      dispatch({ type: "CREATE_GAME", payload: json });
    }
  };

  return (
    <div className='test-container'>
      <div className='darken-screen' onClick={toggleForm}>
        {" "}
      </div>
      <div className='sidebar'>
        <form onSubmit={handleSubmit}>
          <div className='sidebar-top'>
            <h3>Add a new game</h3>
            <img onClick={toggleForm} src={Close} alt='Close Sidebar' />
          </div>

          <div className='form-items-container'>
            <div className='form-item'>
              <label htmlFor='title'>Game Title:</label>
              <input
                type='text'
                id='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>

            <div className='form-item'>
              <label htmlFor='copies'>Number of Copies:</label>
              <input
                type='number'
                id='copies'
                onChange={(e) => setCopies(e.target.value)}
                value={copies}
                required
              />
            </div>

            <div className='form-item form-item-date'>
              <label htmlFor='releaseDate'>Release Date:</label>
              <input
                type='date'
                id='releaseDate'
                onChange={(e) => setReleaseDate(e.target.value)}
                value={releaseDate}
                required
              />
            </div>

            <div className='form-item'>
              <label htmlFor='imgUrl'>Add image url (optional):</label>
              <input
                type='text'
                id='imgUrl'
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
              />
            </div>
            <button>Add Game</button>
          </div>

          {error && <div className='error'>ERROR</div>}
        </form>
      </div>
    </div>
  );
};

export default GameForm;
