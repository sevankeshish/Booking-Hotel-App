import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <Loader />;

  return (
    <div className="serachList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel?.id ? "current-hotel" : ""
              } `}
            >
              <img src={item.thumbnail_url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="loction">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
