"use client";
import LoaderLarge from "@/components/LoaderLarge";
import LoaderSmall from "@/components/LoaderSmall";
import { getPolicies, updatePolicy } from "@/Services/Api/Policy/policies";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page() {
  const [page, setpage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(null);
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState("user");
  const [updatedPrivacy, setUpdatedprivacy] = useState("");
  const [updatedTerms, setUpdatedTerms] = useState("");
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getPolicies(userType);
      if (result?.status) {
        console.log(result.data);
        setData(result.data);
        setUpdatedprivacy(result.data[0].content);
        setUpdatedTerms(result.data[1].content);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "An error occured");
    }
    setLoading(false);
  };

  const handleSubmit = async (type) => {
    // e.preventDefault();
    let content;
    if (type === "privacy_policy") {
      content = updatedPrivacy;
    } else {
      content = updatedTerms;
    }
    try {
      setSmallLoading(type);
      const result = await updatePolicy(userType, type, content);
      if (result.status) {
        toast.success(
          `${
            type === "privacy_policy"
              ? "Privacy Policy"
              : "Terms and Conditions"
          } ${
            userType === "user" ? "for user" : "for guide"
          } updated successfully`
        );
        fetchData();
      } else {
        toast.error(result.message || "Error Occured");
      }
    } catch (error) {
      toast.error(error.message || "An error occured");
    }
    setSmallLoading(null);
  };
  useEffect(() => {
    console.log("page mounted");
    fetchData();
  }, [userType]);
  return (
    <div className="flex flex-col gap-7 ">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Policies
      </p>
      <div className="flex flex-row items-center  border-b-2 border-[#DDDDDD] w-full">
        <button
          onClick={() => {
            setpage(false);
            setData([]);
            setUserType("user");
          }}
          className={` py-2 px-6 text-base font-sans  ${
            page
              ? "font-normal text-[#838383]"
              : "bg-[#0000000D] text-[#252322] font-semibold"
          }   `}
        >
          User
        </button>
        <button
          onClick={() => {
            setpage(true);
            setData([]);

            setUserType("guide");
          }}
          className={` py-2 px-6 text-base font-sans  ${
            page
              ? "bg-[#0000000D] text-[#252322] font-semibold"
              : "     font-normal text-[#838383]"
          }   `}
        >
          Guide
        </button>
      </div>
      {loading && (
        <div className="flex justify-center  items-center p-10 w-full ">
          <LoaderLarge />
        </div>
      )}
      {!loading && data && (
        <div className="flex flex-col gap-7 max-h-[64vh] overflow-y-scroll booking-table-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("privacy_policy");
            }}
            className="flex flex-col gap-7 w-2/3"
          >
            <p className="text-base font-semibold text-black font-sans">
              Privacy Policy
            </p>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm font-semibold text-black font-sans">
                Policy Description
              </p>
              <textarea
                value={updatedPrivacy}
                onChange={(e) => setUpdatedprivacy(e.target.value)}
                className="rounded-lg p-4"
                rows={10}
              ></textarea>
              <button
                disabled={
                  smallLoading === "privacy_policy" ||
                  updatedPrivacy === data[0]?.content
                }
                id="privacy"
                type="submit"
                className={`${
                  smallLoading || updatedPrivacy === data[0]?.content
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#AE445A]"
                } p-4 mt-2 rounded-lg flex justify-center items-center  text-white w-2/12 font-semibold font-sans`}
              >
                {smallLoading === "privacy_policy" ? <LoaderSmall /> : "Update"}
              </button>
            </div>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("terms_and_conditions");
            }}
            className="flex flex-col gap-7 w-2/3"
          >
            <p className="text-base font-semibold text-black font-sans">
              Terms and Conditions
            </p>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm font-semibold text-black font-sans">
                Terms and Conditions Description
              </p>
              <textarea
                value={updatedTerms}
                onChange={(e) => setUpdatedTerms(e.target.value)}
                className="rounded-lg p-4"
                rows={10}
              ></textarea>
              <button
                disabled={
                  smallLoading === "terms_and_conditions" ||
                  updatedTerms === data[1]?.content
                }
                id="t&c"
                type="submit"
                className={`${
                  smallLoading || updatedTerms === data[1]?.content
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#AE445A]"
                } p-4 mt-2 rounded-lg flex justify-center items-center  text-white w-2/12 font-semibold font-sans`}
              >
                {smallLoading === "terms_and_conditions" ? (
                  <LoaderSmall />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Page;
