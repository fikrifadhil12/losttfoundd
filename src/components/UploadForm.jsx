import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadForm = ({ onItemAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    finderName: "",
    imageBase64: "",
    previewImg: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.match("image.*")) {
      alert("Hanya file gambar yang diperbolehkan");
      return;
    }

    // Validasi ukuran file (max 1MB)
    if (file.size > 1 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 1MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setFormData({
        ...formData,
        imageBase64: event.target.result,
        previewImg: event.target.result, // Pastikan ini di-set
      });
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Gagal membaca file gambar");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.location ||
      !formData.phone ||
      !formData.finderName
    ) {
      toast.error("Harap isi semua field yang wajib diisi");
      return;
    }

    setIsUploading(true);

    try {
      await addDoc(collection(db, "items"), {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        finderName: formData.finderName,
        imageBase64: formData.imageBase64, // Simpan string base64
        dateFound: new Date().toLocaleDateString("id-ID"),
        createdAt: serverTimestamp(),
      });

      toast.success("Barang berhasil diupload!");

      // Reset form
      setFormData({
        name: "",
        location: "",
        phone: "",
        finderName: "",
        imageBase64: "",
        previewImg: "",
      });

      navigate("/search");
      if (onItemAdded) onItemAdded();
    } catch (err) {
      console.error(err);
      toast.error(`Gagal menyimpan data: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Info Barang</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gambar Barang</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {formData.previewImg ? (
              <div className="mb-2">
                <img
                  src={formData.previewImg}
                  alt="Preview"
                  className="h-32 w-full object-contain mx-auto rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      previewImg: "",
                      imageBase64: "",
                    })
                  }
                  className="text-red-500 text-sm mt-2"
                >
                  Hapus Gambar
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">
                  Seret atau klik untuk upload gambar
                </p>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImage}
                />
                <label
                  htmlFor="fileInput"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Pilih File
                </label>
              </>
            )}
          </div>
        </div>

        {/* Nama Barang */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nama Barang</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Contoh: iPhone 13"
            required
          />
        </div>

        {/* Lokasi Ditemukan */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Lokasi Ditemukan</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Contoh: Ruang Aula"
            required
          />
        </div>

        {/* Nomor HP */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nomor HP</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Contoh: 082123456789"
            required
          />
        </div>

        {/* Nama Penemu */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Nama Penemu</label>
          <input
            type="text"
            name="finderName"
            value={formData.finderName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Nama Anda"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors"
        >
          Upload Barang
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
