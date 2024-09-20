import { useEffect, useState } from "react";
import "./App.css";
import { fetchImagesByQuery } from "./services/unsplash-api";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

// TODO
// 2. add StyleS

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getPhotos = async () => {
      try {
        setisError(false);
        setIsLoading(true);
        const data = await fetchImagesByQuery(page, searchQuery);
        if (data.results.length === 0) {
          toast("Nothing to show. Please change your search query");
        }
        setPhotos((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setisError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [page, searchQuery]);

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSetSearchQuery = (query) => {
    setSearchQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const handleModalOpening = (modalData) => {
    setIsModalOpened(true);
    setModalData(modalData);
  };

  const handleModalClosing = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <SearchBar setSearchQuery={handleSetSearchQuery} />
      {!!photos.length && (
        <ImageGallery photos={photos} onImageClick={handleModalOpening} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {page < totalPages && <LoadMoreBtn onClick={handleChangePage} />}
      {isModalOpened && (
        <ImageModal
          isModalOpened={isModalOpened}
          closeModal={handleModalClosing}
          modalData={modalData}
        />
      )}
    </>
  );
}

export default App;
