import React from 'react';
import { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", description: "", image: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
    
        const postData = { title: post.title };
    
        if (post.description.trim() !== '') {
            postData.description = post.description;
        }
    
        if (post.image.trim() !== '') {
            postData.image = post.image;
        }
    
        await supabase.from('Posts').insert(postData);
    
        window.location = "/";
    };
    

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" onChange={handleChange}>
                </textarea>
                <br/>

                <label for="image">Image-url</label> <br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost