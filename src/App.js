import React, { useState, useEffect, useInterval } from "react";
import Snake from "./Snake";
import Food from "./Food";
import { getRandomFood, Directions, moveSnake } from "./logic";

function App() {
  const [dots, setDots] = useState([
    [0, 0],
    [2, 0]
  ]);
  const [food, setFood] = useState(getRandomFood);
  const [speed, setSpeed] = useState(500);
  const [direction, setDirection] = useState(Directions.right);

  const moveSnake = () => {
    let snake = [...dots];
    let head = snake[dots.length - 1];

    switch (direction) {
      case Directions.right:
        head = [[head[0] + 2, head[1]]];
        break;
      case Directions.right:
        head = [[head[0] - 2, head[1]]];
        break;
      case Directions.up:
        head = [[head[0], head[1] - 2]];
        break;
      case Directions.down:
        head = [[head[0] + 2, head[1] + 2]];
        break;
    }
    snake = snake.concat(head);
    snake.shift();

    setDots(snake);
  };

  useEffect(() => {
    document.onkeydown = onKeyPress;
  }, [document.onkeydown]);

  useInterval(() => {
    moveSnake();
  }, speed);

  const onKeyPress = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection(Directions.up);
        break;
      case 40:
        setDirection(Directions.down);
        break;
      case 37:
        setDirection(Directions.left);
        break;
      case 39:
        setDirection(Directions.right);
        break;
      default:
        setDirection(Directions.right);
    }
  };

  return (
    <div className="area">
      <Snake dots={dots} />
      <Food dot={food} />
    </div>
  );
}

export default App;
