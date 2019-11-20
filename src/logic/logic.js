import { moveSnake } from "./move";
import { Actions } from "../constants/enums/Actions";

export const getRandomFood = () => {
  const min = 1;
  const max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const gameOver = (state, dispatch) => {
  alert(`Game over. Snake length is ${state.dots.length}`);
  dispatch({ type: Actions.GameOver });
};

const checkIfOutOfBorders = (state, dispatch) => {
  const head = state.dots[state.dots.length - 1];
  if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    gameOver(state, dispatch);
  }
};

const checkIfCollapsed = (state, dispatch) => {
  let snake = [...state.dots];
  let head = snake[snake.length - 1];
  snake.pop();
  snake.forEach(dot => {
    if (head[0] === dot[0] && head[1] === dot[1]) {
      gameOver(state, dispatch);
    }
  });
};

const enlargeSnake = (state, dispatch) => {
  let newSnake = [...state.dots];
  newSnake.unshift([]);
  dispatch({ type: Actions.Enlarge, dots: newSnake });
};

const increaseSpeed = (state, dispatch) => {
  if (state.speed > 10) {
    dispatch({ type: Actions.IncreaseSpeed });
  }
};

const checkIfEat = (state, dispatch) => {
  let head = state.dots[state.dots.length - 1];
  let newFood = [...state.food];
  if (head[0] === state.food[0] && head[1] === newFood[1]) {
    dispatch({ type: Actions.NewFood, food: getRandomFood });
    enlargeSnake(state, dispatch);
    increaseSpeed(state, dispatch);
  }
};

export const updateGame = (state, dispatch) => {
  moveSnake(state, dispatch);
  checkIfOutOfBorders(state, dispatch);
  checkIfCollapsed(state, dispatch);
  checkIfEat(state, dispatch);
};
