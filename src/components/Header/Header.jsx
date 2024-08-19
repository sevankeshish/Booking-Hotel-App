import { useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  NavLink,
} from "react-router-dom";
import { MdLocationOn, MdLogout } from "react-icons/md";
import { DateRange } from "react-date-range";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

import { format } from "date-fns";

import useOutsideClick from "../../hooks/useOutsideClick";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const navigate = useNavigate();

  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOptions = (name, operation) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    // setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go ?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown ">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              minDate={new Date()}
              className="date"
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &nbsp;&bull;&nbsp; {options.children} children
            &nbsp;&bull;&nbsp; {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              opt={options}
              handleOption={handleOptions}
              setOpenOptions2={setOpenOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
};

export default Header;

function GuestOptionList({ opt, handleOption, setOpenOptions2 }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions2(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OpenItem
        opt2={opt}
        handleOption2={handleOption}
        type="adult"
        minLimit={1}
      />
      <OpenItem
        opt2={opt}
        handleOption2={handleOption}
        type="children"
        minLimit={0}
      />
      <OpenItem
        opt2={opt}
        handleOption2={handleOption}
        type="room"
        minLimit={1}
      />
    </div>
  );
}

function OpenItem({ opt2, handleOption2, type, minLimit }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOption2(type, "dec")}
          disabled={opt2[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{opt2[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption2(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <strong>{user.name}</strong>
          <button>
            &nbsp; <MdLogout className="logout icon" onClick={handleLogout} />
          </button>
        </div>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  );
}
