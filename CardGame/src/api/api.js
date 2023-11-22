let BASE_URL = "http://139.59.149.116:2375/";

export const getTest = async () => {
  return await fetch(BASE_URL + "test").then((res) => res.json());
};

// #region Login and register
export const register = async (username, password) => {
  if (!username || !password) {
    return null;
  }

  if (login(username, password)) {
    return null;
  }

  return await fetch(BASE_URL + "user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: crypto.getRandomValues(new Uint32Array(1))[0],
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const login = async (username, password) => {
  let allUsers = await fetch(BASE_URL + "user").then((res) => res.json());
  let user = allUsers.filter(
    (user) => user.username === username && user.password === password
  );
  return user ? user[0] : null;
};

// #endregion

// #region Game
const getAllGames = async () => {
  return await fetch(BASE_URL + "game").then((res) => res.json());
};

export const getGamesByUserId = async (userId) => {
  let allGames = await getAllGames();
  return allGames.filter((game) =>
    game.players.filter((player) => player.uid === userId)
  );
};

export const getGameById = async (id) => {
  return await fetch(BASE_URL + "game/" + id).then((res) => res.json());
};

export const createGame = async (game) => {
  return await fetch(BASE_URL + "game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  }).then((res) => res.json());
};

export const deleteGame = async (id) => {
  return await fetch(BASE_URL + "game/" + id, {
    method: "DELETE",
  }).then((res) => res.json());
};

// #endregion

// #region Cards

export const getCards = async () => {
  return await fetch(BASE_URL + "card").then((res) => res.json());
};

export const createCard = async (card) => {
  return await fetch(BASE_URL + "card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  }).then((res) => res.json());
};

export const getCardById = async (id) => {
  return await fetch(BASE_URL + "card/" + id).then((res) => res.json());
};

// #endregion
