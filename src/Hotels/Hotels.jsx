import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useFetch from "../hooks/useFetch";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) <Loader />;
  return <div>{data.length}</div>;
}

export default Hotels;
