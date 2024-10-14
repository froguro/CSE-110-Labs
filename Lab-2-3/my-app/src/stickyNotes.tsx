import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter, HeartButton, ToggleTheme } from "./hooksExercise";
import { ThemeContext, themes } from "./themeContext";

export const StickyNotes = () => {

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
    
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote = {
      ...createNote,
      id: notes.length + 2
    };

    setNotes([...notes, newNote]);

    setCreateNote(initialNote);
  }

  const theme = useContext(ThemeContext);

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  }

  const handleNoteUpdate = (
    noteId: number,
    field: "title" | "content" | "label",
    value: string
  ) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
  };

  const handleDelete = (noteId: number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== noteId));
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
    <div className='app-container'>
  	<form className="note-form" onSubmit={createNoteHandler} >
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
          style={{ background: currentTheme.background, color: currentTheme.foreground }}
        	required>
          
      	</input>
    	</div>

    	<div>
      	<textarea
          placeholder="Note Content"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
          style={{ background: currentTheme.background, color: currentTheme.foreground }}
        	required>
      	</textarea>
    	</div>

    <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
        style={{ background: currentTheme.background, color: currentTheme.foreground }}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit" style={{ background: currentTheme.background, color: currentTheme.foreground }} >Create Note</button></div>
  	</form>
    <div className="notes-grid">
    	{notes.map((note) => (
      	<div
        	key={note.id}
        	className="note-item"
          style={{ background: currentTheme.background, color: currentTheme.foreground }}
      	>
        	<div className="notes-header">
              <HeartButton
                isFavorited={favorites.includes(note.id)}
                toggleFavorite={() => toggleFavorite(note.id)}
              />
              <button onClick={() => handleDelete(note.id)}>x</button>
            </div>
            <h2 contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(event) =>
              handleNoteUpdate(note.id, "title", event.target.innerText)
            }> 
              {note.title} 
            </h2>
            <p contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(event) =>
              handleNoteUpdate(note.id, "content", event.target.innerText)
            }> 
              {note.content} 
            </p>
            <p contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(event) =>
              handleNoteUpdate(note.id, "label", event.target.innerText)
            }> 
              {note.label} 
            </p>
          </div>
        ))}
      </div>
      <div className="favorites-list">
        <h2>List of Favorites:</h2>
        <ul>
          {notes
            .filter((note) => favorites.includes(note.id)) // Filter the favorited notes
            .map((favoriteNote) => (
              <ul key={favoriteNote.id}>{favoriteNote.title}</ul>
            ))}
        </ul>
      </div>
      <button onClick={toggleTheme}> Toggle Theme </button>
    </div>
    </ThemeContext.Provider>
  );
};

