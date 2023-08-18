import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MoviesPage from "./components/MoviesPage";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Layout/Navbar";
import SigninPage from "./components/SigninPage";
import MoviePage from "./components/MoviePage";
import SearchPage from "./components/SearchPage";


function App() {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/movie/:slug" element={<MoviePage />} />
        <Route path="/search/:search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
