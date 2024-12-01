import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom';

const CreatePost = () => {

    const [post, setPost] = useState({title: "", content:""})

    const createPost = async (event) => {
        event.preventDefault();

        // Insert the new post with initial upvotes set to 0
        const { error } = await supabase
          .from('Posts')
          .insert({ 
            title: post.title, 
            content: post.content,
            upvotes: 0  // Set initial upvotes to 0
          });

        if (error) {
          console.error('Error inserting post:', error);
        } else {
          window.location = "/";  // Redirect to home after creating the post
        }
    }

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

                <input type="submit" value="Submit" onClick={createPost} />
                <Link to="/"><button className="cancelButton">Cancel</button></Link>
            </form>
        </div>
    )
}

export default CreatePost;
