import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { supabase } from '../client';
import LoadingPage from './LoadingPage';
import './HomeFeed.css';

const HomeFeed = (props) => {
    // State initialization for posts, search, filtered/sorted results, and loading
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch posts from the database and set them to state
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false });

            setPosts(data);
            setSortedResults(data);
            setFilteredResults(data);

            // Have loading screen run for 1.5 seconds
            setTimeout(() => {
                setLoading(false); 
            }, 1500);
        };

        fetchPosts();
    }, []);

    // Function to handle search input change
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        const results = sortedResults.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(results);
    };

    // Function to sort posts by newest
    const sortNewest = () => {
        const sortedByNewest = [...posts].sort((a, b) => b.created_at.localeCompare(a.created_at));
        setSortedResults(sortedByNewest);
        applySearch(searchInput, sortedByNewest); 
    };

    // Function to sort posts by popularity (upvotes)
    const sortPopular = () => {
        const sortedByPopular = [...posts].sort((a, b) => b.upvotes - a.upvotes);
        setSortedResults(sortedByPopular);
        applySearch(searchInput, sortedByPopular); 
    };

    // Function to apply search filter on sorted posts
    const applySearch = (searchValue, data) => {
        if (searchValue !== "") {
            const results = data.filter(item =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(results);
        } else {
            setFilteredResults(data); // If search is empty, show all posts
        }
    };

    return (
        <div className="HomeFeed">
            {/* Conditionally render loading screen or posts based on loading state */}
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <div>
                        {/* Search bar input */}
                        <input
                            className="searchBar"
                            type="text"
                            placeholder="Search posts by title..."
                            value={searchInput}
                            onChange={(e) => searchItems(e.target.value)}
                        />
                        {/* Buttons to sort posts */}
                        <p>
                            <button className="sort" onClick={sortNewest}>Newest</button>
                            <button className="sort" onClick={sortPopular}>Most Popular</button>
                        </p>
                    </div>
                    {/* Map over filtered posts and display each */}
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
