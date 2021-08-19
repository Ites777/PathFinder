import React from "react";
import { Card } from "react-bootstrap";
import style from "./style.module.css";
import { server } from "../../../constants";

export default function Title({ card }) {

  const { url, title, difficulty, rating, address } = card;

  return (
    <div >
      <Card style={{ border: 'none' }} className="text-white">
        <div style={{
          background: "rgb(2,0,36)",
          display: "flex",
          backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 2%, rgba(22,13,13,0) 35%), url(${server}${url})`,
          backgroundSize: 'cover',
          height: `60vh`,
          borderRadius: '5px'
        }}><div className={style.shadow}><Card.Title style={{
          fontSize: '40px'
        }}>{title}</Card.Title><Card.Text>{address}</Card.Text></div></div>
      </Card>
    </div>
  );
}
