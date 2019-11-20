import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import { getRandomFood, Directions } from "./logic";
import { useInterval } from "./hooks/useInterval";

function App() {
  const [dots, setDots] = useState([
    [0, 0],
    [2, 0]
  ]);
  const [food, setFood] = useState(getRandomFood);
  const [speed, setSpeed] = useState(200);
  const [direction, setDirection] = useState(Directions.right);

  const moveSnake = () => {
    let snake = [...dots];
    let head = snake[dots.length - 1];

    switch (direction) {
      case Directions.right:
        head = [[head[0] + 2, head[1]]];
        break;
      case Directions.left:
        head = [[head[0] - 2, head[1]]];
        break;
      case Directions.up:
        head = [[head[0], head[1] - 2]];
        break;
      case Directions.down:
        head = [[head[0], head[1] + 2]];
        break;
      default:
        head = [[head[0] + 2, head[1]]];
        break;
    }
    snake = snake.concat(head);
    snake.shift();

    setDots(snake);
  };

  useEffect(() => {
    document.onkeydown = onKeyPress;
  }, []);

  useInterval(() => {
    moveSnake();
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
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

  const gameOver = () => {
    alert(`Game over. Snake length is ${dots.length}`);
    setDots([
      [0, 0],
      [2, 0]
    ]);
    setDirection(Directions.right);
  };

  const checkIfOutOfBorders = () => {
    const head = dots[dots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...dots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const checkIfEat = () => {
    let head = dots[dots.length - 1];
    let newFood = [...food];
    if (head[0] === food[0] && head[1] === newFood[1]) {
      setFood(getRandomFood());
      enlargeSnake();
      increaseSpeed();
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...dots];
    newSnake.unshift([]);
    setDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
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
