import React from "react";
import "./Card.css";

const Card = (porps) => {
  return <div className="container">{porps.children}</div>;
};

export default Card;
