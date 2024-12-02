import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';
import LoadingPage from './LoadingPage';

const EditPost = () => {
  // Get the post id from the URL parameters
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });
  const [image, setImage] = useState(null); // For storing the image selected by the user
  const [imageUrl, setImageUrl] = useState(''); // For storing the image URL provided by the user
  const [loading, setLoading] = useState(true); // To manage loading state while fetching the post

  // Fetch the post data from Supabase when the component mounts or when `id` changes
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
        setPost(data); // Set the fetched post data in state
        setLoading(false); // Stop loading once the post is fetched
      }
    };
    fetchPost();
  }, [id]);

  const updatePost = async (event) => {
    event.preventDefault();

    let finalImageUrl = imageUrl || post.image_url; // Use imageUrl from user input or fallback to current image URL

    // If an image is selected, upload it to Supabase Storage
    if (image) {
      const fileExtension = image.name.split('.').pop();
      const fileName = `post-images/${Date.now()}.${fileExtension}`;

      // Upload the image to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('posts') // Ensure this is the correct bucket name
        .upload(fileName, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError.message);
        return;
      }

      // Get the public URL for the uploaded image
      const { publicURL, error: urlError } = supabase.storage
        .from('posts')
        .getPublicUrl(fileName);

      console.log('Public URL generated:', publicURL);  // Log the URL for debugging

      if (urlError) {
        console.error('Error getting public URL:', urlError.message);
        return;
      }

      finalImageUrl = publicURL; // Update the image URL with the public URL
    }

    console.log('Final imageUrl:', finalImageUrl);  // Log the final image URL

    // Update the post in the database with the new image URL (if uploaded) or the original image URL
    const { error } = await supabase
      .from('Posts')
      .update({
        title: post.title,
        content: post.content,
        image_url: finalImageUrl, // Ensure the URL is correctly passed here
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error.message);
    } else {
      window.location = '/'; // Redirect to home after updating the post
    }
  };

  // Function to delete the post
  const deletePost = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', id); // Delete the post by its `id`

    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      window.location = '/'; // Redirect to home page after successfully deleting the post
    }
  };

  // Handle changes to the form fields (title and content)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value, // Update the corresponding field in the `post` state
    }));
  };

  // Handle changes to the image input
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
