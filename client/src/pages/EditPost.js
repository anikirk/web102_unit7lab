import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ title: "", author: "", description: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const updatePost = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Posts')
            .update({ title: post.title, author: post.author, description: post.description })
            .eq('id', id);

        if (error) {
            console.error('Update error:', error.message);
        } else {
            window.location.href = "/"; // Redirect to the home page
        }
    };

    // DELETE post
    const deletePost = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete error:', error.message);
        } else {
            window.location.href = "/"; // Redirect to the home page
        }
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br />
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;