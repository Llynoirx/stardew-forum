/* Post component that displays a single post w/ 
  details such as title, content, and time posted */

import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import more from '../assets/more.png'

const Post = (props) => {
  // Calculate time difference btwn when the post was created and the current time
  const timestamp = new Date(props.created_at)
  const currentTime = new Date()
  const diffMinutes = Math.round((currentTime - timestamp) / (1000 * 60))
  const diffHours = Math.round((diffMinutes / 60))
  const diffDays = Math.round((diffHours / 24))

  return (
    <div className="Post">

      {/* Edit button linking to the post's edit page */}
      <div>
        <Link to={'edit/' + props.id}>
          <img className="moreButton" alt="edit button" src={more} />
        </Link>
      </div>

      {/* Link to the post's detail page, displays title, content, and upvotes */}
      <Link to={'post/' + props.id} className="postLink">
        <h2 className="name">{props.title}</h2>
        <div className="content">{props.content}</div>
        {/* Display time since post was made and upvote count */}
        <div className="upvotes">
          {diffMinutes < 60 ? (
            <p>Posted {diffMinutes} minutes ago</p>
          ) : diffHours < 24 ? (
            <p>Posted {diffHours} hours ago</p>
          ) : (
            <p>Posted {diffDays} days ago</p>
          )}
          <p>{props.upvotes} upvotes</p>
        </div>
      </Link>
    </div>
  )
}

export default Post