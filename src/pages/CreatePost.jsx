import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom';

const CreatePost = () => {

    // State to track the post's title and content
    const [post, setPost] = useState({title: "", content:""})

    // Ftn to create a new post in the database
    const createPost = async (event) => {
        event.preventDefault();

        // Insert the new post with initial upvotes set to 0
        const { error } = await supabase
          .from('Posts')
          .insert({ 
            title: post.title, 
            content: post.content,
            upvotes: 0  
          });

        if (error) {
          console.error('Error inserting post:', error);
        } else {
          window.location = "/";  // Redirect to home after creating the post
        }
    }

    // Ftn to handle changes in input fields and update state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div>
            <form>

                {/* Input for title */}
                <input 
                    className="titleText"
                    autoComplete="off" 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Enter title of post" 
                    onChange={handleChange} 
                /><br />
                <br/>

                {/* Text area for content */}
                <textarea 
                    className="contentText"
                    autoComplete="off" 
                    id="content" 
                    name="content" 
                    rows="6"
                    placeholder="Enter content of post" 
                    onChange={handleChange} 
                /><br />
                <br/>

                {/* Submit button to create post */}
                <input type="submit" value="Submit" onClick={createPost} />
                {/* Cancel button that redirects to the home page */}
                <Link to="/"><button className="cancelButton">Cancel</button></Link>
            </form>
        </div>
    )
}

export default CreatePost;
