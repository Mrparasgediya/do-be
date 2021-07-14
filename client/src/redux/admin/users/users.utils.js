export const deleteUserAndGetRestUsers = (users, userId) => {
  const updatedUsers = users;
  delete updatedUsers[userId];
  return updatedUsers;
};
