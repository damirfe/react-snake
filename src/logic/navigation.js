import { Directions } from "../constants/enums/Directions";

export function navigate(e, dispatch) {
  switch (e.keyCode) {
    case 38:
      dispatch({ type: "direction", direction: Directions.Up });
      break;
    case 40:
      debugger;
      const direction = Directions.Down;
      dispatch({ type: "direction", direction: Directions.Down });

      break;
    case 37:
      dispatch({ type: "direction", direction: Directions.Left });
      break;
    case 39:
      dispatch({ type: "direction", direction: Directions.Right });
      break;
    default:
      dispatch({ type: "direction", direction: Directions.Right });
  }
}
