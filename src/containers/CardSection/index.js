import React from 'react';
import './style.css';
import Card from '../../components/Card';

const CardSection = (props) => {
  const { data } = props;

  return(
    <section className="card-section">
      <h2> Mis memes favoritos </h2>
      <div className="card-list">
        {
          data.length > 0 && data.map((item, index) => <Card key={index} title={item.title} img={item.img} />) 
        }
      </div>
    </section>
  );
}
export default CardSection;