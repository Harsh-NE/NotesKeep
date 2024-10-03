import React, { useState } from "react";
import Header from "./header";
import Input from "./input";
import Card from "./notes";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((oldNotes) => [...oldNotes, newNote]);
  }

  function handleedit(id, updatedNote) {
    setNotes((oldNotes) => {
      const index = oldNotes.findIndex((note) => note.id === id);
      const newNotes = [...oldNotes];
      newNotes[index] = updatedNote;
      console.log("upd:", updatedNote);
      console.log(newNotes);
      return newNotes;
    });
  }

  function handleupload(event) {
    const file = event.target.files[0];
    setFile(file);
  }

  function handledelete(id) {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== id));
  }

  return (
    <div className="outbox">
      <Header />
      <Input addValue={addNote} />
      <Card
        notes={notes}
        handleEdit={handleedit}
        handleUpload={handleupload}
        handleDelete={handledelete}
      />
    </div>
  );
}

export default App;
