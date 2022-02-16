import "./App.css";
import axios from "axios";
import PhotoGallery from "./Components/Pages/Home/PhotoGallery";
import ImageUploader from "./Components/Pages/ImageUploader/ImageUploader";
import { useEffect, createContext, useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Subcomponents/Navbar";
import { SignupForm } from "./Components/Pages/SignupForm";
import { SigninForm } from "./Components/Pages/SigninForm";
import Photos from "./Components/Pages/Photos/Photos";
import Photographers from "./Components/Pages/Photographers/Photographers";
import SearchBar from "./Components/Subcomponents/SearchBar";
import UserPosts from "./Components/UserPosts/UserPosts";

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
    password: "",
    profilePhoto: "",
    isLoggedIn: false,
    isSuperAdmin: false,
  });

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedData = localStorage.getItem("userContext");
      if (!storedData) {
        return;
      } else {
        const parsedStoredData = JSON.parse(storedData);
        setUserContext(parsedStoredData);
      }
    };
    checkLocalStorage();
  }, []);

  useEffect(() => {
    const allPhoto = async () => {
      const allPhotos = await axios.get("/api/images/allimages");
      // console.log(allPhotos.data.data);
      setPhotos(allPhotos.data.data);
    };
    allPhoto();
  }, []);

  return (
    <DataContext.Provider value={[userContext, setUserContext]}>
      <div className="App">
        {/* <h1 className="text-3xl font-bold underline">Hello Project 3</h1> */}
        <Navbar />
        <br></br>
        <br></br>
        <SearchBar />
        <br></br>
        <div className="App-container h-screen w-full pt-16 -mt-20">
          <Routes>
            <Route path="/" element={<PhotoGallery photos={photos} />} />
            <Route path="/photos" element={<Photos photos={photos} />} />
            <Route
              path="/photographers"
              element={<Photographers photos={photos} />}
            />
            <Route
              path="/signup"
              element={
                userContext.isLoggedIn ? <Navigate to="/" /> : <SignupForm />
              }
            />
            <Route
              path="/signin"
              element={
                userContext.isLoggedIn ? <Navigate to="/" /> : <SigninForm />
              }
            />
            <Route
              path="/:userID/posts"
              element={<UserPosts photos={photos} />}
            />
            <Route path="/:userID/posts/new" element={<ImageUploader />} />
            <Route path="/:userID/posts/:postID" element={""} />
            <Route path="/:userID/posts/:postID/edit" element={""} />
          </Routes>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
