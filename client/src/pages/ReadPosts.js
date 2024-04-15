import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';  // Importing the Supabase client

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')  // Specify the table
                .select()      // Select all records
                .order('created_at', { ascending: true });  // Order by 'created_at' in ascending order

            setPosts(data);  // Set the fetched data to state
        };

        fetchPosts();  // Call the fetch function when the component mounts
    }, []);  // Empty dependency array means this effect only runs once after initial render

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Card 
                            key={post.id} 
                            id={post.id} 
                            title={post.title} 
                            author={post.author} 
                            description={post.description} 
                        />
                    ))
                ) : <h2>No Challenges Yet 😞</h2>
            }
        </div>  
    );
}

export default ReadPosts;