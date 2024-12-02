import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import './PostInfo.css';
import upvoteLogo from '../assets/thumbsup.png';
import more from '../assets/more.png';

const PostInfo = (props) => {

    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [newComments, setComments] = useState([]); // Ensure comments are initialized as an array
    const [showPrompt, setShowPrompt] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('id, title, content, upvotes, comments, created_at')
                .eq('id', id)
                .limit(1)
                .single();

            setPosts(data);
            setCount(data.upvotes);
            setComments(Array.isArray(data.comments) ? data.comments : []);  // Ensure comments are an array
        };
        fetchPost();
    }, [id]);

    const updateCount = async (event) => {
        event.preventDefault();

        const data = await supabase
            .from('Posts')
            .update({ upvotes: count + 1 })
            .eq('id', id);

        setCount((prevCount) => prevCount + 1);
    };

    const addComment = async (newCom) => {
        // Add new comment only if it's a valid string
        if (newCom.trim()) {
            const updatedComments = [...newComments, newCom];
            setComments(updatedComments);

            const data = await supabase
                .from('Posts')
                .update({ comments: updatedComments })
                .eq('id', id);
            setShowPrompt(false);
        }
    };

    const submitComment = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let newCom = document.getElementById('commentInput').value;

            addComment(newCom);
            document.getElementById('commentInput').value = '';
        }
    };

    const timestamp = new Date(posts.created_at);
    const currentTime = new Date();
    const diffHours = Math.round((currentTime - timestamp) / (1000 * 60 * 60));

    // Helper function to render content with line breaks
    const renderContentWithLineBreaks = (content) => {
        if (!content) return null;
        return content.split('\n').map((str, index) => (
            <span key={index}>
                {str}
                <br />
            </span>
        ));
    };

    return (
        <div>
            {posts && posts.id != null ? (
                <div className="postSection">
                    <Link to={'../edit/' + posts.id}>
                        <img className="moreButton" alt="edit button" src={more} />
                    </Link>
                    <h2>{posts.title}</h2>
                    <div className="content">
                        {renderContentWithLineBreaks(posts.content)} {/* Display content with line breaks */}
                    </div>
                    <div className="likes">
                        <p>Posted {diffHours} hours ago</p>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="image"
                                src={upvoteLogo}
                                className="upvote-icon"
                                onClick={updateCount}
                            />
                            {count} upvotes
                        </p>
                    </div>

                    <div className="commentSection">
                        <h4>Comments</h4>
                        {showPrompt && (posts.comments?.length === 0 || posts.comments === null) && (
                            <p>Be the first to leave a comment!</p>
                        )}
                        <div>
                            <ul>
                                {Array.isArray(newComments) && newComments.length > 0 ? (
                                    newComments.map((comment, index) => <li key={index}>{comment}</li>)
                                ) : (
                                    <li>No comments yet.</li>
                                )}
                            </ul>
                            <input
                                id="commentInput"
                                autoComplete="off"
                                className="commentInput"
                                type="text"
                                onKeyDown={submitComment}
                                placeholder="Leave a comment..."
                            />
                        </div>
                    </div>

                    <Link to='/'>
                        <button className="back">Go Back</button>
                    </Link>
                </div>
            ) : (
                <h3><LoadingPage /></h3>
            )}
        </div>
    );
};

export default PostInfo;
