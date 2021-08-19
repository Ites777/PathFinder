import React from 'react';
// import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
// import axios from "axios";
// import { Link } from 'react-router-dom'
// // import { server } from '../../constants';
// import Title from './Title/Title';
import style from "./style.module.css"
import { Card, Badge } from 'react-bootstrap'
import { Rating } from "@material-ui/lab";



export default function Description({data}) {

  const { url, title, difficulty, rating, address, length, lng, lat, description } = data;
  let variant, text, rat = rating

  if(difficulty < 4) {
    variant = 'green'
    text = 'eazy'
  } else if (difficulty < 7) {
    variant = 'lightblue'
    text = 'средний'
  } else {
    variant = 'red'
    text = 'тяжелый'
  }

  return (
    <Card style={{border: 'none'}} body>{description}
      <hr></hr>
      <div className={style.length}>
      <Card.Subtitle className="mb-2 text-muted">Длина</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Рейтинг</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Сложность</Card.Subtitle>
      </div>
      <div className={style.blabla}>
        <span>{length}km</span>
      <Rating
            name="half-rating-read"
            defaultValue={5}
            precision={0.5}
            readOnly
          />
      <Badge style={{backgroundColor: `${variant}`, marginLeft: '20px'}} >{text}</Badge>
      </div>
      </Card> 
  )
}
