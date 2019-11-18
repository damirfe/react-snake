export const getRandomFood = () => {
  const min = 1;
  const max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export const Directions = {
  right: "right",
  left: "left",
  up: "up",
  down: "down"
};
