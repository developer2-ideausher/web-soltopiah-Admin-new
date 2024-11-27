"use client";
import {
  getAllChapters,
  getAllCourses,
  getAllUnitaryCourses,
} from "@/Utilities/Course";
import FilterBar from "@/components/FilterBar";
import FilterPagination from "@/components/FilterPagination";
import KhushFilterBar from "@/components/KhushFilterBar";
import LoaderLarge from "@/components/LoaderLarge";
import SingleCM from "@/components/SingleCM";
import SingleChapter from "@/components/SingleChapter";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const queryRef = useRef(false);
  const [tab, setTab] = useState("courses");
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(false)
  const [chapters, setChapters] = useState([]);

  const [filters,setFilters] = useState({
    status:'',
    sortOrder:'',
    sortBy:"",
    keyword:"",
    page:1,
    limit:10
  })
  const [filters2,setFilters2] = useState({
    status:'',
    sortOrder:'',
    sortBy:"",
    keyword:"",
    page:1,
    limit:10
})

  const dataSetter = async (query) => {
    const response = await getAllCourses(query);
    if (response?.status) {
      setData(response.data);
    } else {
    }
  };
  const dataSetterChapters = async (query) => {
    const response = await getAllUnitaryCourses(query);
    if (response?.status) {
      setChapters(response.data);
    } else {
    }
  };
  const filterHandler = async (status,sortOrder,sortBy,keyword,page,limit,access,type,content) => {
    setFilters({
      status:status,
      sortOrder:sortOrder,
      sortBy:sortBy,
      keyword:keyword,
      page:page,
      limit:limit,
      access:access,
      content:content
    })
    let query = ''
    if(keyword == ''){
      query = "?page="+page+"&limit="+limit
    }else{
      query = '?search='+keyword
    }
    if(access != '' && access != undefined){
      query = query + '&accessibility='+access
    }
    // if(type != ''){
    //   query = query + '&type='+type
    // }
    if(sortOrder != ''){
      query = query + '&sortOrder='+sortOrder
    }
    if(sortBy != ''){
      query = query + '&sortBy='+sortBy
    }
    if(content != '' && content != undefined &&  content != 'undefined'){
      query = query + '&courseContentType='+content
    }
    dataSetter(query)  
  }
  const filterChaptersHandler = async (status,sortOrder,sortBy,keyword,page,limit,access,type,content) => {
    setFilters2({
      sortOrder:sortOrder,
      sortBy:sortBy,
      keyword:keyword,
      page:page,
      limit:limit,
      access:access,
      content:content
    })
    let query = "?page="+page+"&limit="+limit
    if(keyword == ''){
      if(access != '' && access != undefined){
        query = query + '&accessibility='+access
      }
      // if(type != ''){
      //   query = query + '&type='+type
      // }
      if(sortOrder != ''){
        query = query + '&sortOrder='+sortOrder
      }
      if(sortBy != ''){
        query = query + '&sortBy='+sortBy
      }
      
      if(content != '' && content != undefined &&  content != 'undefined'){
        query = query + '&courseContentType='+content
      }
      dataSetterChapters(query)
    }else{
      let temp = '?search='+keyword
      dataSetterChapters(temp)
  }
  }
  useEffect(() => {
    if (!queryRef.current) {
      dataSetter("");
      dataSetterChapters("");
    }
    queryRef.current = true;
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl2 font-sans font-semibold text-[#17161D]">
          Content Management
        </h2>
        <Link
          href="/content-management/add"
          className="bg-[#3090E9] cursor-pointer rounded-3xl px-4 py-3 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.1427 10.8554H10.857V15.1411C10.857 15.3685 10.7667 15.5865 10.6059 15.7472C10.4452 15.908 10.2272 15.9983 9.99983 15.9983C9.7725 15.9983 9.55449 15.908 9.39374 15.7472C9.233 15.5865 9.14269 15.3685 9.14269 15.1411V10.8554H4.85698C4.62965 10.8554 4.41163 10.7651 4.25088 10.6044C4.09014 10.4436 3.99983 10.2256 3.99983 9.99829C3.99983 9.77096 4.09014 9.55294 4.25088 9.3922C4.41163 9.23145 4.62965 9.14115 4.85698 9.14115H9.14269V4.85543C9.14269 4.62811 9.233 4.41009 9.39374 4.24934C9.55449 4.0886 9.7725 3.99829 9.99983 3.99829C10.2272 3.99829 10.4452 4.0886 10.6059 4.24934C10.7667 4.41009 10.857 4.62811 10.857 4.85543V9.14115H15.1427C15.37 9.14115 15.588 9.23145 15.7488 9.3922C15.9095 9.55294 15.9998 9.77096 15.9998 9.99829C15.9998 10.2256 15.9095 10.4436 15.7488 10.6044C15.588 10.7651 15.37 10.8554 15.1427 10.8554Z"
              fill="#fff"
            />
          </svg>
          <h5 className="text-[#fff] text-sm font-normal">Create Content</h5>
        </Link>
      </div>
      <div className="flex items-center w-full border-b border-[#DDD] mt-3">
        <h6
          onClick={(e) => setTab("courses")}
          className={`cursor-pointer text-base border-b-[3px] ${
            tab == "courses"
              ? "font-semibold text-[#252322] border-black bg-[#6f6f7220]"
              : "font-normal text-[#838383] border-transparent"
          }  py-2 px-6`}
        >
          Courses
        </h6>
        <h6
          onClick={(e) => setTab("singles")}
          className={`cursor-pointer text-base border-b-[3px] ${
            tab == "singles"
              ? "font-semibold text-[#252322] border-black bg-[#6f6f7220]"
              : "font-normal text-[#838383] border-transparent"
          }  py-2 px-6`}
        >
          Singles
        </h6>
      </div>
      <div className="w-full bg-white border border-solid border-[#E7E8EA] rounded-lg mt-4">
      {tab == 'courses' && <KhushFilterBar course={true} loading={loading} handler={filterHandler} limit={data?.limit} totalPages={data?.totalPages} page={data?.page}/> }
      {tab == 'singles' && <KhushFilterBar course={true} loading={loading} handler={filterChaptersHandler} limit={chapters?.limit} totalPages={chapters?.totalPages} page={chapters?.page}/> }
        {tab == "courses" && (
          <div className="w-full flex items-center justify-between bg-[#F0F2F5] py-2 px-5">
            <h6 className="text-[#595C69] font-normal w-3/12 text-sm">
              Course
            </h6>
            <h6 className="text-[#595C69] font-normal w-2/12 text-sm">
              Description
            </h6>
            <h6 className="text-[#595C69] font-normal w-16 text-center text-sm">
              Category
            </h6>
            <h6 className="text-[#595C69] font-normal w-1/12 text-center text-sm">
              Date Created
            </h6>
            <h6 className="text-[#595C69] font-normal w-24 text-center text-sm">
              Access type
            </h6>
          </div>
        )}
        {tab == "singles" && (
          <div className="w-full flex items-center justify-between bg-[#F0F2F5] py-2 px-5">
            <h6 className="text-[#595C69] font-normal w-3/12 text-sm">
              Course
            </h6>
            <h6 className="text-[#595C69] font-normal w-2/12 text-sm">
              Description
            </h6>
            <h6 className="text-[#595C69] font-normal w-1/12 text-center text-sm">
              Category
            </h6>
            <h6 className="text-[#595C69] font-normal w-1/12 text-center text-sm">
              Type
            </h6>
            <h6 className="text-[#595C69] font-normal w-1/12 text-center text-sm">
              Date Created
            </h6>
            <h6 className="text-[#595C69] font-normal w-24 text-center text-sm">
              Access type
            </h6>
          </div>
        )}
        {!data && (
          <div className="flex justify-center items-center p-10 w-full mt-4">
            <LoaderLarge />
          </div>
        )}
        {data && tab == "courses" && data?.results.length == 0 && (
          <h5 className="text-black p-5 w-full text-center text-sm font-normal">
            No data found!
          </h5>
        )}
        {data &&
          tab == "courses" &&
          data?.results.map((item, index) => (
            <SingleCM key={index} data={item} />
          ))}
           {data && tab == 'courses' && <FilterPagination type="course" handler={filterHandler} filters={filters} limit={data?.limit} totalPages={data?.totalPages} page={data?.page}/>}

        {chapters && tab == "singles" && chapters?.results?.length == 0 && (
          <h5 className="text-black p-5 w-full text-center text-sm font-normal">
            No data found!
          </h5>
        )}
        {chapters &&
          tab == "singles" &&
          chapters?.results.map((item, index) => (
            <SingleChapter key={index} data={item} />
          ))}
             {data && tab == 'singles' && <FilterPagination type="course" handler={filterChaptersHandler} filters={filters2} limit={chapters?.limit} totalPages={chapters?.totalPages} page={chapters?.page}/>}
      </div>
    </div>
  );
}
