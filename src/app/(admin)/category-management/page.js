"use client";
import React, { useEffect, useState } from "react";
import AddSearchBar from "../../../components/AddSearchBar";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import { getToken } from "@/Services/Cookie/userCookie";

function Page() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategoryData();
  }, []);

  const token = getToken();
  const getCategoryData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/course-categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setCategoryData(result.data.results);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex flex-col gap-7">
      <p className="text-userblack font-semibold text-xl2 font-sans">
        Category Management
      </p>
      <div className="flex flex-col">
        <AddSearchBar route="/category-management/addnew" />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-categoryTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Category
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Course
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Duration
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date Created
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {categoryData &&
              categoryData.map((item, index) => (
                <div key={item._id || index} className=" grid grid-cols-categoryTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-4">
                    <img className="h-8 w-8 object-cover rounded-full" src={item.image?item.image.url :"image1.png"} alt="" />
                    <p className="text-sm font-sans font-semibold text-[#252322]">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <p className="text-sm font-sans font-semibold text-[#252322]">
                      Designed to give you mental peace
                    </p>
                  </div>
                  <span className="text-userblack w-[350px] font-sans font-semibold text-sm">
                    Successful people make their decisions based on where they
                    want to be.”
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    15:30 mins
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    Video lesson
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    Feb 27, 2024
                  </span>

                  <button className="text-[#08A03C] font-sans font-semibold text-sm">
                    <MenuDots />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Page;
