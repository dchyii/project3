import "./App.css";
import axios from "axios";
import PhotoGallery from "./Components/Pages/Home/PhotoGallery";
import ImageUploader from "./Components/Pages/ImageUploader/ImageUploader";
import { useEffect, createContext, useContext, useState } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Navbar from "./Components/Subcomponents/Navbar";
import { SignupForm } from "./Components/Pages/SignupForm";
import { SigninForm } from "./Components/Pages/SigninForm";
import Photos from "./Components/Pages/Photos/Photos";
import Photographers from "./Components/Pages/Photographers/Photographers";
import ImageEditPost from "./Components/Pages/ImageUploader/ImageEditPost";
import SearchBar from "./Components/Subcomponents/SearchBar";
import PhotoView from "./Components/Pages/Photos/PhotoView";
import UserPosts from "./Components/UserPosts/UserPosts";
import ScrollToTop from "react-scroll-to-top";
import ProfileEdit from "./Components/Pages/ImageUploader/ProfileEdit";
import SearchResults from "./Components/Pages/Search/SearchResults";

export const DataContext = createContext();

function App() {
  useEffect(() => {
    const fetchTest = async () => {
      const test = await axios.get("/api/test");
      console.log("test", test);
    };
    fetchTest();
  }, []);

  const [userContext, setUserContext] = useState({
    userID: "",
    username: "",
    password: "",
    profilePhoto: "",
    isLoggedIn: false,
    isSuperAdmin: false,
  });

  const [photos, setPhotos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allPhotosDataset, setAllPhotosDataset] = useState([]);

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
    const getAllPhotosAndUsers = async () => {
      const allPhotos = await axios.get("/api/images/allimages");
      const allUsers = await axios.get("/api/users/superadmin/allusername");
      setPhotos(allPhotos.data.data);
      setAllUsers(allUsers.data.data);
    };
    getAllPhotosAndUsers();
  }, []);

  useEffect(() => {
    const photosDataset = photos.map((photo) => {
      const findUser = allUsers?.find(
        (user) => user.userid === photo.imageAuthor
      );
      const username = findUser?.username;
      const userProfile = findUser?.profilePhoto;
      return { ...photo, username: username, profilePhoto: userProfile };
    });
    const sortedPhotosDataset = photosDataset.sort((a, b) => {
      return b.imageLikes.length - a.imageLikes.length;
    });
    setAllPhotosDataset(sortedPhotosDataset);
  }, [photos, allUsers]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  return (
    <DataContext.Provider value={[userContext, setUserContext]}>
      <div className="App">
        <Navbar />
        <br></br>
        <br></br>
        <SearchBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setIsAdvancedSearch={setIsAdvancedSearch}
        />
        <br></br>
        <ScrollToTop smooth viewBox="-50 0 256 256" />
        <div className="App-container h-screen w-full pt-16 -mt-20 bg-slate-100 ">
          <Routes>
            <Route
              path="/"
              element={
                <PhotoGallery photos={allPhotosDataset} users={allUsers} />
              }
            />
            <Route
              path="/photos"
              element={<Photos photos={allPhotosDataset} />}
            />
            <Route
              path="/photographers"
              element={<Photographers photos={allPhotosDataset} />}
            />
            <Route
              path="/search"
              element={
                <SearchResults
                  photos={allPhotosDataset}
                  users={allUsers}
                  advancedSearch={[isAdvancedSearch, setIsAdvancedSearch]}
                />
              }
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
              element={<UserPosts photos={allPhotosDataset} users={allUsers} />}
            />
            <Route
              path="/:userID/edit"
              element={<ProfileEdit photos={photos} />}
            />
            <Route path="/:userID/posts/new" element={<ImageUploader />} />
            <Route
              path="/:userID/posts/:postID"
              element={<PhotoView allUsers={allUsers} />}
            />
            <Route
              path="/:userID/posts/:postID"
              element={<PhotoView users={allUsers} photos={allPhotosDataset} />}
            />
            <Route
              path="/:userID/posts/:postID/edit"
              element={<ImageEditPost />}
            />
          </Routes>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
