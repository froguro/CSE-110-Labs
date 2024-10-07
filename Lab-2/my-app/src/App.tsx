import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter, HeartButton } from "./hooksExercise";

function App() {

  // State to track the list of favorite notes (by their IDs)
  const [favorites, setFavorites] = useState<number[]>([]);

  // Toggle a note's favorite status
  const toggleFavorite = (noteId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(noteId)
        ? prevFavorites.filter((id) => id !== noteId) // Remove from favorites
        : [...prevFavorites, noteId] // Add to favorites
    );
  };

  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
    
  return (
    <div className='app-container'>
  	<form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

    <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>
    <div className="notes-grid">
    	{notes.map((note) => (
      	<div
        	key={note.id}
        	className="note-item"
      	>
        	<div className="notes-header">
              <HeartButton
                isFavorited={favorites.includes(note.id)}
                toggleFavorite={() => toggleFavorite(note.id)}
              />
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
      <div className="favorites-list">
        <h2>List of Favorites:</h2>
        <ul>
          {dummyNotesList
            .filter((note) => favorites.includes(note.id)) // Filter the favorited notes
            .map((favoriteNote) => (
              <ul key={favoriteNote.id}>{favoriteNote.title}</ul>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
