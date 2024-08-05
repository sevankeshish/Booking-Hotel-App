import { Outlet } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListContext";
import Map from "../Map/Map";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
