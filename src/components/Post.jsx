import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import more from '../assets/more.png'

const Post = (props) => {

  const timestamp = new Date(props.created_at)
  const currentTime = new Date()
  const diffMinutes = Math.round((currentTime - timestamp) / (1000 * 60))
  const diffHours = Math.round((diffMinutes / 60));
  const diffDays = Math.round((diffHours / 24))

  return (
      <div className="Post">
        <div> 
          <Link to={'edit/'+ props.id}>
            <img className="moreButton" alt="edit button" src={more} />
          </Link> 
        </div>
        <Link to={'post/'+ props.id}>
          <h2 className="name">{props.title}</h2>
        </Link>
        
        {/* Add the "content" class to preserve line breaks */}
        <div className="content">{props.content}</div>
          
        <div className="upvotes">
          { diffMinutes < 60 ? <p>Posted {diffMinutes} minutes ago</p> 
          : diffHours < 24 ? <p>Posted {diffHours} hours ago</p>
          : <p>Posted {diffDays} days ago</p>
          } 
          <p>{props.upvotes} upvotes</p>
        </div>
      </div>
  );
};

export default Post;
