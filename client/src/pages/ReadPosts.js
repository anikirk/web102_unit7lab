import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';  // Importing the Supabase client
import { Link } from 'react-router-dom';

const ReadPosts = ({ data, sortBy }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')  // Specify the table
                    .select()      // Select all records
                    .order(sortBy === 'created_at' ? 'created_at' : 'upvotes', { ascending: true });  // Order by 'created_at' or 'upvotes'

                if (error) {
                    throw error;
                }

                setPosts(data);  // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();  // Call the fetch function when the component mounts
    }, [sortBy]);  // Dependency array includes sortBy to fetch posts when sortBy changes

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPosts = posts.filter(post => {
        const postValues = Object.values(post).join('').toLowerCase();
        return postValues.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="ReadPosts">
            <input
                type="text"
                placeholder="Search Posts"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <br></br>
            {
                filteredPosts && filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <Card 
                                id={post.id} 
                                title={post.title} 
                                created_at={post.created_at} 
                                upvotes={post.upvotes} 
                            />
                        </Link>
                    ))
                ) : <h2>No Posts Yet 😞</h2>
            }
        </div>  
    );
    );
}

export default ReadPosts;

