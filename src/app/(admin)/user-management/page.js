"use client";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GreenDot from "../../../../icons/GreenDot";
import Link from "next/link";
import RedDot from "../../../../icons/RedDot";
import BlueDot from "../../../../icons/BlueDot";
import { getAllUsersApi, switchUser } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";
import dayjs from "dayjs";
import { Switch } from "@mui/material";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";

function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = createTheme({
    palette: {
      customRed: {
        main: "#f44336",
      },
    },
  });
  const fetchData = async (page) => {
    setLoading(true);
    setData([])
    const result = await getAllUsersApi(page);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.log(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  const handleToggle = async (index) => {
    const user = data[index];
    const newStatus = !user.isBlocked;

    setData((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index].isBlocked = newStatus;
      return updatedUsers;
    });

    const result = await switchUser(user._id, newStatus);
    if (!result.status) {
      console.error(result.message);
      setData((prevUsers) => {
        const revertedUsers = [...prevUsers];
        revertedUsers[index].isBlocked = !newStatus;
        return revertedUsers;
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex flex-col gap-7">
          <p className="text-userblack font-semibold text-xl2 font-sans">
            Users
          </p>

          <div className="flex flex-col">
            <SearchBar showAddButton={false} />
            <div className="w-full overflow-x-scroll booking-table-wrapper">
              <div className="bg-[#F0F2F5] min-w-fit w-full">
                <div className="items-center grid grid-cols-userTable justify-between p-4">
                  <span className="text-[#666576] font-sans font-normal text-sm">
                    Users
                  </span>
                  <span className="text-[#666576] font-sans font-normal text-sm">
                    User ID
                  </span>
                  <span className="text-[#666576] font-sans font-normal text-sm">
                    Account created
                  </span>

                  <span className="text-[#666576] font-sans font-normal text-sm">
                    User Type
                  </span>
                  <span className="text-[#666576] font-sans font-normal ml-5 text-sm">
                    Status
                  </span>
                  <span className="text-[#666576] font-sans font-normal text-sm">
                    Action
                  </span>
                </div>
              </div>
              {loading && (
                <div className="flex justify-center bg-white items-center p-10 w-full ">
                  <LoaderLarge />
                </div>
              )}
              <div className="flex flex-col bg-white min-w-fit w-full ">
                {data &&
                  data.map((item, index) => (
                    <Link
                      key={item._id || index}
                      href={`/user-management/${item._id}`}
                    >
                      <div className=" grid grid-cols-userTable justify-between border-b border-[#E9E9EC] items-center p-4">
                        <div className="flex flex-row items-center gap-2">
                          <img
                            src={item.profilePic?.url || "Frame1.png"}
                            alt="Icon"
                            className="w-11 h-11 rounded-full"
                          />
                          <div className="flex flex-col ">
                            <p className="text-sm font-sans font-bold text-[#252322]">
                              {item.firstName} {item.lastName}
                            </p>
                            <p className="text-base font-normal font-sans text-[#666576]">
                              {item.phone || "--"}
                            </p>
                          </div>
                        </div>
                        <span className="text-userblack  font-sans font-semibold text-sm">
                          {item._id}
                        </span>
                        <span className="text-userblack font-sans font-semibold text-sm">
                          {dayjs(item.createdAt).format("MM/DD/YYYY")}
                        </span>
                        <span className="text-userblack font-sans font-semibold text-sm">
                          {item.__t}
                        </span>
                        {item.isBlocked ? (
                          <div className="py-1 px-3 w-[100px] rounded-md border-[#F4B9B9] border font-sans font-semibold text-sm flex flex-row items-center gap-2 text-[#AB2B2B]">
                            <RedDot />
                            <p>Blocked</p>
                          </div>
                        ) : (
                          <div className="py-1 px-3 w-[100px] rounded-md border-[#B9F4C8] border font-sans font-semibold text-sm flex flex-row items-center gap-2 text-[#2BAB4B]">
                            <GreenDot />
                            <p>Active</p>
                          </div>
                        )}

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Switch
                            checked={item.isBlocked}
                            onChange={() => handleToggle(index)}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#AB2B2B",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                {
                                  backgroundColor: "#AB2B2B",
                                },
                              "& .MuiSwitch-switchBase": {
                                color: "#2BAB4B",
                              },
                              "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                                backgroundColor: "#2BAB4B ",
                              },
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <RobinPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Page;
