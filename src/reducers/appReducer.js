import { getRandomFood } from "../logic/logic";
import { Directions } from "../constants/enums/Directions";
import { Actions } from "../constants/enums/Actions";

export const initialState = {
  dots: [
    [0, 0],
    [2, 0]
  ],
  food: getRandomFood(),
  speed: 200,
  direction: Directions.right
};

export function reducer(state, action) {
  if (action.type === Actions.GameOver) {
    return { ...state, direction: Directions.right, dots: initialState.dots };
  } else if (action.type === Actions.Direction) {
    return { ...state, direction: action.direction };
  } else if (action.type === Actions.Move) {
    return { ...state, dots: action.snake };
  } else if (action.type === Actions.Enlarge) {
    return { ...state, dots: action.dots };
  } 
   else if (action.type === Actions.NewFood) {
    return { ...state, food: getRandomFood() };
  }
}
