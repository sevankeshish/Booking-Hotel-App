import { useRef } from "react";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { DateRange } from "react-date-range";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

import { format } from "date-fns";

import useOutsideClick from "../../hooks/useOutsideClick";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Header = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [destination, setDestination] = useState("");

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
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
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
