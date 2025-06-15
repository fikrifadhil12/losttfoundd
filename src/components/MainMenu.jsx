import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to</h1>
          <h2 className="text-4xl font-extrabold text-white">Lost & Found</h2>
          <p className="text-indigo-100 mt-4">Temukan Barang Kamu dan Temukan Barang</p>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Primary CTA */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/search")}
          >
            GET STARTED
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-white border border-indigo-100 hover:border-indigo-300 text-indigo-600 px-4 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
              onClick={() => navigate("/search")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Cari Barang
            </button>
            <button
              className="bg-white border border-indigo-100 hover:border-indigo-300 text-indigo-600 px-4 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
              onClick={() => navigate("/upload")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Menemukan barang
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-indigo-50 p-4 text-center text-indigo-500 text-sm">
          S+ Found - Membantu menemukan barang hilang
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
