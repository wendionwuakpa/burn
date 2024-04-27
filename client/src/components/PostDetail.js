import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single();

      if (error) console.log("Error fetching post", error);
      else setPost(data);
    };

    fetchPost();
  }, [id]);

  const addComment = async () => {
    if (comment) {
      const updatedComments = [...(post.comments || []), comment];
      const { error } = await supabase
        .from('Posts')
        .update({ comments: updatedComments })
        .eq('id', id);

      if (error) console.log("Error adding comment", error);
      else setPost(prev => ({ ...prev, comments: updatedComments }));
      setComment("");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <h3>Comments:</h3>
      <ul>
        {post.comments && post.comments.map((c, index) => <li key={index}>{c}</li>)}
      </ul>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Submit Comment</button>
    </div>
  );
};

export default PostDetail;
