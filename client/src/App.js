import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import PhotoGallery from "./Components/PhotoGallery";

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
      <h1 className="text-3xl font-bold underline">Hello Project 3</h1>
      <PhotoGallery />
    </div>
  );
}

export default App;
