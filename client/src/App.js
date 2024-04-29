import './App.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostPage from './pages/PostPage';  // Import the PostPage component
import { Link } from 'react-router-dom';

const App = () => {
    const [sortBy, setSortBy] = useState('created_at');
    const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

    const posts = [
        { 'id': '1', 'title': 'Cartwheel in Chelsea 🤸🏽‍♀️', 'author': 'Harvey Milian', 'description': descr, 'created_at': '2024-04-29T01:56:17.186883', 'upvotes': 10 },
        { 'id': '2', 'title': 'Love Lock in Paris 🔒', 'author': 'Beauford Delaney', 'description': descr, 'created_at': '2024-04-28T12:30:00.186883', 'upvotes': 15 },
        { 'id': '3', 'title': 'Wear Pink on Fridays 🎀', 'author': 'Onika Tonya', 'description': descr, 'created_at': '2024-04-27T08:45:00.186883', 'upvotes': 8 },
        { 'id': '4', 'title': 'Adopt a Dog 🐶', 'author': 'Denise Michelle', 'description': descr, 'created_at': '2024-04-26T15:20:00.186883', 'upvotes': 20 },
    ];

    // Sets up routes
    let element = useRoutes([
        {
            path: "/",
            element: <ReadPosts data={posts} sortBy={sortBy} />
        },
        {
            path: "/edit/:id",
            element: <EditPost data={posts} />
        },
        {
            path: "/new",
            element: <CreatePost />
        },
        {
            path: "/post/:id",  // Route for the post page
            element: <PostPage data={posts} />
        }
    ]);

    const handleSortByChange = (event) => {
        const sortByValue = event.target.value;
        setSortBy(sortByValue);
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Binary Haven: Where CS Owls Unite</h1>
                <p>Cracking the Code: Insider Secrets to Conquering the CS Journey at FAU</p>
                <div>
                    Sort by:{' '}
                    <select value={sortBy} onChange={handleSortByChange}>
                        <option value="created_at">Created Time</option>
                        <option value="upvotes">Upvotes</option>
                    </select>
                </div>
                <Link to="/"><button className="headerBtn"> Home  </button></Link>
                <Link to="/new"><button className="headerBtn"> Create New Post </button></Link>
            </div>
            {element}
        </div>
    );
}

export default App;


