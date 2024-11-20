import React from 'react';
import "./Form.css"

export function TitleInput({ fields, handleChange }) {
  return (
    <>
      <label htmlFor="title">Title:</label> <br />
      <input
        type="text"
        name="title"
        value={fields.title}
        placeholder="Enter Title"
        onChange={handleChange}
      /> <br />
    </>
  );
}

export function ContentInput({ fields, handleChange }) {
  return (
    <>
      <label htmlFor="content">Content:</label> <br />
      <input
        type="text"
        name="context"
        value={fields.speed}
        placeholder="Enter content"
        onChange={handleChange}
      /> <br />
    </>
  );
}