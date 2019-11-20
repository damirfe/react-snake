import React, { useReducer, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import { updateGame } from "./logic/logic";
import { useInterval } from "./hooks/useInterval";
import { initialState, reducer } from "./reducers/appReducer";
import { navigate } from "./logic/navigation";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.onkeydown = onKeyPress;
  }, []);

  useInterval(() => {
    updateGame(state, dispatch);
  }, 200);

  const onKeyPress = e => {
    e = e || window.event;
    navigate(e, dispatch);
  };

  return (
    <div className="area">
      <Snake dots={state.dots} />
      <Food dot={state.food} />
    </div>
  );
}

export default App;
