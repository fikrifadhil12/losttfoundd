import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Barang tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header back button */}
      <div className="bg-white shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-4 text-blue-600 flex items-center"
        >
          &larr; Kembali
        </button>
      </div>

      {/* Main card */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* gambar */}
          <div className="h-64 bg-gray-100 relative">
            {item.imageBase64 ? ( // Ubah dari item.image ke item.imageBase64
              <img
                src={item.imageBase64}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,..."; // Fallback jika gambar error
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Tidak ada gambar
              </div>
            )}
          </div>

          {/* info */}
          <div className="p-6">
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p className="text-gray-500 mt-1">Ditemukan: {item.dateFound}</p>

            <div className="mt-6 space-y-3">
              <div>
                <h3 className="font-medium">Lokasi</h3>
                <p>{item.location}</p>
              </div>
              <div>
                <h3 className="font-medium">Deskripsi</h3>
                <p>{item.description || "-"}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-8 border-t pt-6">
              <h2 className="font-semibold">Penemu</h2>
              <p className="mt-1">
                {item.finderName} – {item.phone}
              </p>
              <a
                href={`tel:${item.phone}`}
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Hubungi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
