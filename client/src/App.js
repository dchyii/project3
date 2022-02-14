import "./App.css";
import axios from "axios";
import PhotoGallery from "./Components/Pages/Home/PhotoGallery";
import ImageUploader from "./Components/Pages/ImageUploader/ImageUploader";
import { useEffect, createContext, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Subcomponents/Navbar";
import { SignupForm } from "./Components/Pages/SignupForm";
import { SigninForm } from "./Components/Pages/SigninForm";

export const DataContext = createContext();

function App() {
  useEffect(() => {
    const fetchTest = async () => {
      const test = await axios.get("/api/test");
      console.log("test", test);
    };
    fetchTest();
  }, []);

  // const userContext = {
  //   userID: "user1",
  //   username: "username1",
  //   isLoggedIn: false,
  //   isSuperAdmin: false,
  // };

  const [userContext, setUserContext] = useState({
    userID: "",
    username: "",
    isLoggedIn: false,
    isSuperAdmin: false,
  });

  return (
    <DataContext.Provider value={[userContext, setUserContext]}>
      <div className="App">
        {/* <h1 className="text-3xl font-bold underline">Hello Project 3</h1> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<PhotoGallery />} />
          <Route path="/photos" element={""} />
          <Route path="/photographers" element={""} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/:userID/posts" element={""} />
          <Route path="/:userID/posts/new" element={<ImageUploader />} />
          <Route path="/:userID/posts/:postID" element={""} />
          <Route path="/:userID/posts/:postID/edit" element={""} />
        </Routes>
      </div>
    </DataContext.Provider>
  );
}

export default App;
