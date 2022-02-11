import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import ImageUploader from "./components/ImageUploader/ImageUploader";

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
      <ImageUploader />
    </div>
  );
}

export default App;
