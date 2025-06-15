import { useState /*, useEffect*/ } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import ItemDetail from "./pages/ItemDetail";

function App() {
  // Hapus DEFAULT_ITEMS dan localStorage karena akan menggunakan Firebase
  // Gunakan useEffect untuk mengambil data dari Firebase

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
