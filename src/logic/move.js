import { Directions } from "../constants/enums/Directions";
import { Actions } from "../constants/enums/Actions";

export const moveSnake = (state, dispatch) => {
  let snake = [...state.dots];
  let head = snake[state.dots.length - 1];

  switch (state.direction) {
    case Directions.Right:
      head = [[head[0] + 2, head[1]]];
      break;
    case Directions.Left:
      head = [[head[0] - 2, head[1]]];
      break;
    case Directions.Up:
      head = [[head[0], head[1] - 2]];
      break;
    case Directions.Down:
      head = [[head[0], head[1] + 2]];
      break;
    default:
      head = [[head[0] + 2, head[1]]];
      break;
  }
  snake = snake.concat(head);
  snake.shift();

  dispatch({ type: Actions.Move, snake });
};
