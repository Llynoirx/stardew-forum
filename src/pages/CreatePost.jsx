import React, { useState } from 'react';
import { supabase } from '../client';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom'; 
import { TitleInput, ContentInput } from '../components/Form'; 

function CreatePost() {
  const [fields, setFields] = useState({ title: '', content: ''});
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const makePost = async (e) => {
    e.preventDefault();

    if (!fields.title || !fields.content ) {
      alert('Please fill in all fields');
      return;
    }

    const { error } = await supabase
      .from('Posts')
      .insert([{ title: fields.title, content: fields.content }])
      .select();

    if (error) {
      alert("Couldn't create post; please try again");
    } else {
      alert('Post successfully created');
      navigate('/');
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Create a New Post</h1>
      <div className="container">
        <form className="form" onSubmit={makePost}>
        <TitleInput fields={fields} handleChange={handleChange} />
        <ContentInput fields={fields} handleChange={handleChange} />
        <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
