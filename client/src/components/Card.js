import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'


const Card = (props) =>  {

  const [count, setCount] = useState(props.rating || 0);
  const updateCount = async (event) => {
    event.preventDefault(); 

    await supabase
      .from('Posts')
      .update({rating: count + 1} )
      .eq('id', props.id)

    setCount((count) => count + 1);
  }

  function calculateHoursAgo(timestampStr) {
    const timestamp = new Date(timestampStr);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - timestamp.getTime();
    const hoursAgo = diffInMilliseconds / (1000 * 60 * 60);
    return hoursAgo;
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"Instructor:  " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="ratingButton" onClick={updateCount} > Ratings: {props.rating}</button>
          <p>{calculateHoursAgo(props.created_at) + " hours ago"}</p>
          <Link to={`/posts/${props.id}`}>
          <button>View Post</button>
          </Link>
      </div>
  );
};

export default Card;