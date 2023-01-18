import { useState } from "react";
import { useInventoryContext } from "../hooks/useInventoryContext";
import moment from "moment";
import Edit from "../images/edit.svg";
import Delete from "../images/delete.svg";
import UnknownCover from "../images/unknown-cover.svg";

const GameDetails = ({ game }) => {
  const formattedReleaseDate = moment(game.releaseDate).format("YYYY-MM-DD");

  const [title, setTitle] = useState(game.title);
  const [copies, setCopies] = useState(game.copies);
  const [releaseDate, setReleaseDate] = useState(formattedReleaseDate);
  const [imgUrl, setImgUrl] = useState(game.imgUrl);

  // Format release date of each game
  const { dispatch } = useInventoryContext();
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(
      `https://games-inventory-api.onrender.com/api/inventory/${game._id}`,
      { method: "DELETE" }
    );

    // json = the document that was just deleted
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GAME", payload: json });
    }
  };

  // Shows the edit inputs once edit button is pressed
  const handleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  // Edits the current game selected with the new values inputted by the user
  const handleEdit = async () => {
    const changes = { title, copies, releaseDate, imgUrl };

    const response = await fetch(
      `https://games-inventory-api.onrender.com/api/inventory/${game._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(changes),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setShowEdit(false);

      // Reload page so changes show straight away for the user
      window.location.reload();
    }
  };

  return (
    <div className='game-details'>
      <h3>
        {showEdit ? (
          <input
            type='text'
            value={title}
            placeholder='Game Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          game.title
        )}
      </h3>
      <p className='date-text'>
        {showEdit ? (
          <input
            type='date'
            value={formattedReleaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        ) : (
          formattedReleaseDate
        )}
      </p>
      <img
        className='cover-img'
        src={game.imgUrl ? game.imgUrl : UnknownCover}
        alt={`Cover art for ${game.title}`}
      />
      {showEdit && (
        <div className='edit-imgurl-input'>
          <input
            type='text'
            value={imgUrl}
            placeholder='Image URL'
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
      )}
      <p className='copies-text'>
        {!showEdit && "Copies: "}
        {showEdit ? (
          <input
            type='number'
            value={copies}
            placeholder='Copies'
            onChange={(e) => setCopies(e.target.value)}
          />
        ) : (
          game.copies
        )}
      </p>
      <div className='game-details-btn-container'>
        <button className='delete-btn' onClick={handleDelete}>
          <img src={Delete} alt='Delete current game' />
        </button>
        <button className='update-btn' onClick={handleShowEdit}>
          <img src={Edit} alt='Edit current game details' />
        </button>
      </div>
      {showEdit && (
        <button className='submit-changes-btn' onClick={handleEdit}>
          Submit Changes
        </button>
      )}
    </div>
  );
};

export default GameDetails;
