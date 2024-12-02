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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false });

            setPosts(data);
            setSortedResults(data);
            setFilteredResults(data);

            setTimeout(() => {
                setLoading(false); // Hide the loading screen after 3-5 seconds
            }, 1500); // Set the desired delay (1500ms)
        };

        fetchPosts();
    }, []);

    // Function to handle search
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        const results = sortedResults.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(results);
    };

    // Sort by Newest
    const sortNewest = () => {
        const sortedByNewest = [...posts].sort((a, b) => b.created_at.localeCompare(a.created_at));
        setSortedResults(sortedByNewest);
        applySearch(searchInput, sortedByNewest); // Reapply search after sorting
    };

    // Sort by Popularity (upvotes)
    const sortPopular = () => {
        const sortedByPopular = [...posts].sort((a, b) => b.upvotes - a.upvotes);
        setSortedResults(sortedByPopular);
        applySearch(searchInput, sortedByPopular); // Reapply search after sorting
    };

    // Apply search filter on sorted results
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
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <div>
                        <input
                            className="searchBar"
                            type="text"
                            placeholder="Search posts by title..."
                            value={searchInput}
                            onChange={(e) => searchItems(e.target.value)}
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
