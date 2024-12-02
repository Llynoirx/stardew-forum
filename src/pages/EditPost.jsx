import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';
import LoadingPage from './LoadingPage';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });
  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('id, title, content, image_url')
        .eq('id', id)
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        setPost(data); 
        setLoading(false); 
      }
    };
    fetchPost();
  }, [id]);

  const updatePost = async (event) => {
    event.preventDefault();

    let finalImageUrl = imageUrl || post.image_url; 

    if (image) {
      const fileExtension = image.name.split('.').pop();
      const fileName = `post-images/${Date.now()}.${fileExtension}`;

      const { data, error: uploadError } = await supabase.storage
        .from('posts') // Ensure this is the correct bucket name
        .upload(fileName, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError.message);
        return;
      }

      const { publicURL, error: urlError } = supabase.storage
        .from('posts')
        .getPublicUrl(fileName);

      console.log('Public URL generated:', publicURL); 

      if (urlError) {
        console.error('Error getting public URL:', urlError.message);
        return;
      }

      finalImageUrl = publicURL; 
    }

    console.log('Final imageUrl:', finalImageUrl);  

    const { error } = await supabase
      .from('Posts')
      .update({
        title: post.title,
        content: post.content,
        image_url: finalImageUrl, 
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error.message);
    } else {
      window.location = '/'; 
    }
  };

  const deletePost = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', id); 

    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      window.location = '/'; 
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Update the `image` state with the selected file
  };

  // Handle changes to the image URL input
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value); // Update the `imageUrl` state with the user-provided URL
  };

  // If the post is still loading, show a loading page
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="editPostContainer">
      <form onSubmit={updatePost}>
        {/* Title input */}
        <input
          className="titleText"
          autoComplete="off"
          type="text"
          id="title"
          name="title"
          value={post.title}  // Controlled input
          placeholder="Enter title of post"
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Content textarea */}
        <textarea
          className="contentText"
          autoComplete="off"
          id="content"
          name="content"
          value={post.content}  // Controlled input
          rows="6"
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Image upload input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />
        <br />

        {/* Image URL input
        <input
          type="text"
          placeholder="Or paste an image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <br />
        <br /> */}

        {/* Buttons for form submission and actions */}
        <input type="submit" value="Update Post" />
        <button className="deleteButton" onClick={deletePost}>Delete</button>
        <Link to="/">
          <button className="cancelButton">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditPost;
