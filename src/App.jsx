import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Picasso-test/" element={<MainPage />} />
        <Route path="/Picasso-test/posts/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
