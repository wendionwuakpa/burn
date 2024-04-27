import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import {supabase} from '../client'

// const ReadPosts = (props) => {

//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             // making the call to supabase is async so need to await 
//             const {data} = await supabase
//             .from('Posts')
//             .select()
//             .order('created_at', {ascending: true})

//             //set state of posts 
//             setPosts(data);
//         }
//         fetchPosts(); 
//     }, [props]);

const ReadPosts = ({ sortType, searchQuery }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        let query = supabase
          .from('Posts')
          .select();
  
        if (searchQuery) {
          query = query.ilike('title', `%${searchQuery}%`);
        }
  
        if (sortType === 'rating') {
          query = query.order('rating', { ascending: false });
        } else { // Default to sort by created_at
          query = query.order('created_at', { ascending: false });
        }
  
        const { data, error } = await query;
  
        if (!error && data) {
          setPosts(data);
        } else {
          console.error(error);
        }
      };
  
      fetchPosts(); 
    }, [sortType, searchQuery]); // Depend on sortType and searchQuery
  

    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} author={post.author} rating={post.rating}/>
                ) : <h2>{'No Reviews Submitted Yet.'}</h2>
            }
        </div>  
    )
};

export default ReadPosts;