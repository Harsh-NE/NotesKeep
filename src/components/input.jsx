import React, { useState } from "react";
function Input({ addValue }) {
  const [id, setid] = useState(0);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  function sethead() {
    addValue({
      id: id,
      title: title,
      content: value,
    });
    setid(id + 1);
    setTitle("");
    setValue("");
  }
  return (
    <div className="input-container">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Add a note..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" onClick={sethead} disabled={!title || !value}>
        Save
      </button>
    </div>
  );
}
export default Input;
