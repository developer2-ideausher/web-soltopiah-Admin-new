import React from "react";
import GreenUpArrow from "../../../icons/GreenUpArrow";
import RedDownArrow from "../../../icons/RedDownArrow";

function Card({ Heading, Number, color, Percent, textColour }) {
  const bgColor = !(color === "[#E6FFEC]") ? "bg-[#FFF0F1]" : "bg-[#E6FFEC]";

  return (
    <div className="bg-white py-[14px] px-5 rounded-xl">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-sans font-normal text-[#606B6C]">
          {Heading}
        </p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-xl font-sans font-bold text-[#121616]">{Number}</p>
          {/* <div
            className={`flex flex-row items-center gap-1 py-[2px] px-[6px] rounded-xl ${bgColor}`}
          >
            {color === "[#E6FFEC]" ? <GreenUpArrow /> : <RedDownArrow />}
            <p
              className={`font-sans font-black text-sm ${
                color === "[#E6FFEC]" ? "text-[#2BAB4B]" :"text-[#E43A42]"
              } `}
            >
              {Percent}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
