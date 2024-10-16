import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";
import userEvent from "@testing-library/user-event";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});


describe("Read StickyNote", () => {
    test("notes that are created should be displayed on the page", () => {
      render(<StickyNotes />);
      dummyNotesList.map((note) => {
        const testNoteTitle = screen.getByText(`${note.title}`);
        expect(testNoteTitle).toBeInTheDocument();
      })
    });
});

describe("Update Stickynote", () => {
    test("Once the update is done, is the document object value updating", async () => {
      render(<StickyNotes />);
      const noteTitle1 = screen.getByText("test note 1 title");
      await userEvent.click(noteTitle1);
      await userEvent.keyboard("abc");
      const updatedNoteTitle1 = screen.getByText("test note 1 titleabc");
      expect(updatedNoteTitle1).toBeInTheDocument();
    })
});

describe("Delete Stickynote", () => {
    test("Does the note get filtered out once the `x` button is pressed", () => {
        render(<StickyNotes />);
        const deleteButton = screen.getByTestId('delete-button-1');
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        const noteTitle1 = screen.queryByText("test note 1 title");
        expect(noteTitle1).not.toBeInTheDocument();
    });
});


describe("edge cases", () => {
  test("Does creating multiple notes mean t", () => {
    render(<StickyNotes />);

    const arrayOfNotes = ["Note1", "Note2", "Note3"]
    // Please make sure your sticky note has a title and content input field with the following placeholders.
    arrayOfNotes.map((noteTitle) => {
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteButton = screen.getByText("Create Note");
      fireEvent.change(createNoteTitleInput, { target: { value: noteTitle } });
      fireEvent.click(createNoteButton);
      const newNoteTitle = screen.getByText(noteTitle);
      expect(newNoteTitle).toBeInTheDocument();
      })
    
  })
  
  test("Can there be 0 sticky notes?", () => {
    render(<StickyNotes />);
    const deleteButtons = screen.getAllByText("x");
    deleteButtons.forEach(button => {
      fireEvent.click(button);
    });
    dummyNotesList.forEach(note => {
      const noteTitle = screen.queryByText(note.title);
      expect(noteTitle).not.toBeInTheDocument();
    });
  });
});