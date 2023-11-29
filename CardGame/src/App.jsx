import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import Game from "./pages/Game";
// import Header from "./components/header";
import CardMaker from "./pages/CardMaker";

function App() {
  document
    .getElementsByTagName("body")[0]
    .setAttribute("data-bs-theme", "dark");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/CardMaker" element={<CardMaker />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
      {/* <Header /> */}
    </>
  );
}

export default App;
