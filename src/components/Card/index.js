import React from 'react';
import './style.css';

const Card = (props) => {
  const {title,img} = props;
  
  return(
    <div className="card">
      <img src={img} alt={title} className="card-figure"/>
      <h3> {title} </h3>
    </div>
  )
}

export default Card;