import React from 'react';
import {useState} from 'react'; 
import './CreatePost.css'
import { supabase } from '../client';

const CreatePost = () => {

    //  const createPost = async (event) => {
    //     event.preventDefault(); 
    //     await supabase
    //     .from('Posts')
    //     .insert({title: post.title, 
    //     author: post.author,
    //     description: post.description})
    //     .select();
    //     window.location = "/";
    //  }

    const createPost = async (event) => {
        event.preventDefault(); 
        const { data, error } = await supabase
            .from('Posts')
            .insert([
                { title: post.title, author: post.author, description: post.description }
            ]);
    
        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            console.log('Post created:', data);
            window.location = "/";
        }
    };

    const [post, setPost] = useState({title: "", author: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label for="title">Gym / Class</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label for="author">Instructor</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default CreatePost