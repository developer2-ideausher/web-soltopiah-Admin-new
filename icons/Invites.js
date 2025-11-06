import React from "react";

const Invites = ({ active }) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-200 ${
          active ? "text-[#000520]" : "text-white"
        } group-hover:text-[#000520]`}
      >
        <path
          d="M15 7V15.8C15 16.9201 15 17.4802 14.782 17.908C14.5903 18.2843 14.2843 18.5903 13.908 18.782C13.4802 19 12.9201 19 11.8 19H4.2C3.07989 19 2.51984 19 2.09202 18.782C1.71569 18.5903 1.40973 18.2843 1.21799 17.908C1 17.4802 1 16.9201 1 15.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H9M15 7L9 1M15 7H12.2C11.0799 7 10.5198 7 10.092 6.78201C9.71569 6.59027 9.40973 6.28431 9.21799 5.90798C9 5.48016 9 4.9201 9 3.8V1M5 15H11M5 11H11M5 7H6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ fill: "none", stroke: "currentColor" }}
        />
      </svg>
    </div>
  );
};

export default Invites;
