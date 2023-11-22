import React, { useEffect, useState } from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MainPage.css";
import { createGame, deleteGame, getGamesByUserId } from "../api/api";

function MainPage() {
  const [games, setGames] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    async function loadGames() {
      // Load all games
      const games = await getGamesByUserId(user.id);
      setGames(games);
    }
    loadGames();
  }, [user.id]);

  function joinGameHandle(gameId) {
    console.log("joining game");
  }

  function createGameHandle() {
    console.log("creating game");
    let gameId = crypto.getRandomValues(new Uint32Array(1))[0];
    let gameName = document.getElementById("createGame").value;

    const game = {
      id: gameId,
      name: gameName,
      players: [
        {
          uid: user.id,
          name: user.name,
          health: 10,
          hand: [1, 1, 1, 1],
        },
      ],
      board: [null, null, null, null, null, null, null, null],
    };
    console.log(game);
    createGame(game);
    setGames([...games, game]);
  }

  function surrenderGameHandle(gameId) {
    console.log("surrender game");
    deleteGame(gameId);
    setGames(games.filter((game) => game.id !== gameId));
  }

  return (
    <>
      <div className="container">
        <h1>Card game</h1>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-3">
            <div className="input-group">
              <input type="text" className="form-control" id="joinGame" />
              <span className="input-group-text">
                <input
                  type="submit"
                  className="btn btn-secondary"
                  value={"Join game"}
                  onClick={joinGameHandle}
                />
              </span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="input-group">
              <input type="text" className="form-control" id="createGame" />
              <span className="input-group-text">
                <input
                  type="submit"
                  className="btn btn-secondary"
                  value={"Create"}
                  onClick={createGameHandle}
                />
              </span>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
        <br></br>
        <div className="row">
          <h2>Games</h2>
          <div className="col-sm-3"></div>
          <div className="col-sm-7">
            <table className="table">
              <thead>
                <tr>
                  <th>Game ID</th>
                  <th>Game Name</th>
                  <th>Players</th>
                  <th>Join</th>
                  <th>Surrender</th>
                </tr>
              </thead>
              <tbody id="games">
                {games.map((game) => (
                  <tr key={game.id}>
                    <td>{game.id}</td>
                    <td>{game.name}</td>
                    <td>{game.players.length}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          window.location.replace(`/game/${game.id}`)
                        }
                      >
                        Join
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => surrenderGameHandle(game.id)}
                      >
                        Surrender
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
