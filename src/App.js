import { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="app">
      <TopNav setSelectedItem={setSelectedItem} />
      <div className="main">
        <Sidebar selectedItem={selectedItem} />
        <Gallery setSelectedItem={setSelectedItem} />
      </div>
      <Footer />
      <img src="/images/paper-overlay.png" className="background-overlay" alt="" />
    </div>
  );
}

export default App;
