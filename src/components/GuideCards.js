import React from "react";

function GuideCards({ Title }) {
  return (
    <div>
      <div className="lg:py-4 lg:px-3 w-full xl:py-4 xl:px-4 2xl:py-[18px] 2xl:px-6 rounded-xl border border-[#AE445A] bg-[#F7ECEE] lg:text-sm xl:text-base 2xl:text-lg font-sans text-userblack font-semibold shadow-lg ">
        {Title}
      </div>
    </div>
  );
}

export default GuideCards;
