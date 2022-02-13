import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const fetchTest = async () => {
      const test = await axios.get("/api/test");
      console.log("test", test);
    };
    fetchTest();
  }, []);

  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">Hello Project 3</h1> */}
      <nav>
        <div className=" h-9 border border-orange-400">
          <p>navbar</p>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={""} />
        <Route path="/photos" element={""} />
        <Route path="/photographers" element={""} />
        <Route path="/signup" element={""} />
        <Route path="/signin" element={""} />
        <Route path="/:userID/posts" element={""} />
        <Route path="/:userID/posts/new" element={""} />
        <Route path="/:userID/posts/:postID" element={""} />
        <Route path="/:userID/posts/:postID/edit" element={""} />
      </Routes>
    </div>
  );
}

export default App;
