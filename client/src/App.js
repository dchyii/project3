import "./App.css";
import axios from "axios";
import { useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Subcomponents/Navbar";

export const DataContext = createContext();

function App() {
  useEffect(() => {
    const fetchTest = async () => {
      const test = await axios.get("/api/test");
      console.log("test", test);
    };
    fetchTest();
  }, []);

  const userContext = {
    userID: "user1",
    username: "username1",
    isLoggedIn: true,
    isSuperAdmin: false,
  };

  return (
    <DataContext.Provider value={userContext}>
      <div className="App">
        {/* <h1 className="text-3xl font-bold underline">Hello Project 3</h1> */}
        <Navbar />
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
    </DataContext.Provider>
  );
}

export default App;
