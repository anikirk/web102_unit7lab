import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1);
  }

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString(); // Convert timestamp to a human-readable format
  };

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <p className="created_at">Time Posted: {formatTimestamp(props.created_at)}</p>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Upvotes: {count}</button>
      </div>
  );
};

export default Card;