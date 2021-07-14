export const removeCartItem = (cartItems, itemIdToRemove) => {
  const items = cartItems;
  delete items[itemIdToRemove];
  return items;
};

export const addStepToCheckoutSteps = (steps, stepToAdd) => {
  const stepIdx = steps.indexOf(stepToAdd);
  const hasExists = stepIdx !== -1;
  let newSteps = steps;
  if (hasExists) {
    newSteps = steps.slice(0, stepIdx + 1);
  } else {
    newSteps.push(stepToAdd);
  }
  return newSteps;
};
