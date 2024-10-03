import React, { useState } from "react";
import "/public/styles.css";
import axios from "axios";
function Card({ id, title, content, onEdit, onUpload, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(id);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [isUploading, setisUploading] = useState(false);
  const [file, setFile] = useState();
  function handleEditClick(index) {
    setIsEditing(true);
  }
  function handleSave() {
    const updatedNote = { id: editId, title: editTitle, content: editContent };
    onEdit(updatedNote); // Call the onEdit prop with the updated note object
    setIsEditing(false);
  }
  function handleSave() {
    const updatedNote = { id: editId, title: editTitle, content: editContent };
    onEdit(updatedNote); // Call the onEdit prop with the updated note object
    setIsEditing(false);
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    setFile(file);
    setisUploading(true);
  }
  function handleUploadSave() {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:3000", formData, config)
      .then((response) => {
        console.log(response.data);
        setisUploading(false);
        onUpload(file);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  }
  return (
    <div className="eachnote">
      <div className="notetext">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit title"
            />

            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit content"
            />
          </>
        ) : (
          <>
            <h4>{title}</h4>
            <p>{content}</p>
          </>
        )}
      </div>
      <div className="noteicon">
        {isEditing ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSave}
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-lg icon"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsEditing(false)}
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg icon"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </>
        ) : (
          <>
            <svg
              id="editicon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil icon"
              viewBox="0 0 16 16"
              onClick={handleEditClick}
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
            <svg
              id="uploadicon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-arrow-up-fill icon"
              viewBox="0 0 16 16"
              onClick={() => setisUploading(true)}
            >
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0z" />
            </svg>
            <svg
              id="deleteicon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash icon"
              viewBox="0 0 16 16"
              onClick={onDelete}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5V3H2.5z" />
            </svg>
          </>
        )}
      </div>
      {isUploading && (
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadSave}>Upload</button>
        </div>
      )}
    </div>
  );
}

function Notes({ notes, handleEdit, handleUpload, handleDelete }) {
  return (
    <div className="container">
      {notes.map((note, index) => {
        return (
          <Card
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onEdit={(updatedNote) => handleEdit(note.id, updatedNote)} // Pass the note's id and updated note
            onUpload={(updatedNote) => handleUpload(note.id, updatedNote)}
            onDelete={() => handleDelete(note.id)} // Pass the note's id
          />
        );
      })}
    </div>
  );
}

export default Notes;
