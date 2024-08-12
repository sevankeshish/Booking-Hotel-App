import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListContext";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const { currentBookmark, isLoading, getBookmark } = useBookmark();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading || !currentBookmark) return <Loader />;

  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className={`bookmarkItem `}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
