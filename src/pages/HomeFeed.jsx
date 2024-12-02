import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { supabase } from '../client';
import LoadingPage from './LoadingPage';
import './HomeFeed.css';

const HomeFeed = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const [loading, setLoading] = useState(true); // State to control loading screen

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false });
            
            setPosts(data);
            setSortedResults(data);
            setFilteredResults(data);

            // Set a delay before hiding the loading screen
            setTimeout(() => {
                setLoading(false); // Hide the loading screen after 3-5 seconds
            }, 1500); // Set the desired delay (3000ms = 3 seconds)
        };

        fetchPosts();
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filteredData = sortedResults.filter(item =>
                typeof item.title === "string" &&
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(sortedResults);
        }
    };

    const sortNewest = () => {
        sortedResults.sort((a, b) => b.created_at.localeCompare(a.created_at));
        setSortedResults([...sortedResults]);
    };

    const sortPopular = () => {
        sortedResults.sort((a, b) => b.upvotes - a.upvotes);
        setSortedResults([...sortedResults]);
    };

    return (
        <div className="HomeFeed">
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <div>
                        <input
                            className="searchBar"
                            type="text"
                            placeholder="Search posts by title..."
                            onChange={(inputString) => searchItems(inputString.target.value)}
                        />
                        <p>
                            <button className="sort" onClick={sortNewest}>Newest</button>
                            <button className="sort" onClick={sortPopular}>Most Popular</button>
                        </p>
                    </div>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                upvotes={post.upvotes}
                                comments={post.comments}
                                created_at={post.created_at}
                            />
                        ))
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </div>
    );
};

export default HomeFeed;
