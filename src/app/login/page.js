"use client";
import Link from "next/link";
import React, { useState } from "react";
import useFirebaseAuth from "@/Services/Firebase/useFirebaseAuth";
import OTP from "@/components/OtpHandler";
import { useRef } from "react";
import { setToken } from "@/Services/Cookie/userCookie";
import { useRouter } from "next/navigation";
import { LoginApi } from "@/Services/Api/Login";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

// import React from 'react'

function Page() {
  const [showLogin, setShowlogin] = useState(false);
  const [phone, setPhone] = useState("");
  const { signInWithPhoneNumber, verifier } = useFirebaseAuth();
  const getEnteredOTP = (numbers, status) => {
    console.log(numbers, status);
  };
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const handleInputChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);

    if (e.target.value.length === e.target.maxLength) {
      // Move focus to the next input field when the current input is filled
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };
  const clearOtpInputs = () => {
    setInputs(["", "", "", "", "", ""]);
    inputRefs[0].current.focus(); // Set focus back to the first input field
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter your mobile number", {
        toastId: "no-phone-error",
      });
      return;
    }
    console.log(phone);

    const appVerifier = verifier();
    // setLoading(true)

    signInWithPhoneNumber(`+${phone}`, appVerifier)
      .then((confirmationResult) => {
        // setViewOtp(true);
        // setLoading(false)
        setResult(confirmationResult);
        handleNewClick();
        // toast.success("OTP sent", {
        //   toastId: "otp-success"
        // });
      })
      .catch((error) => {
        setLoading(false)
        // toast.error(error.message, {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      });
  };
  //first call after submiting otp
  const router = useRouter();
  const otpSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    result
      .confirm(inputs.join(""))
      .then((authUser) => {
        setToken(authUser.user.multiFactor.user.accessToken);

        loginHandler(authUser);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message, {
          toastId: "error-1",
        });
        clearOtpInputs();
      });
  };
  const handleNewClick = () => {
    setShowlogin(!showLogin);
  };
  const loginHandler = async (authUser) => {
    console.log(authUser.user.multiFactor.user.accessToken);
    const formdata = new FormData();
    // formdata.append("profilePic", fileInput.files[0], "[PROXY]");
    formdata.append("dob", "2004-01-17");
    formdata.append("name", "Amin Painter");
    const response = await LoginApi(formdata);
    setLoading(false);
    if (response?.status) {
      router.push("/dashboard");
    } else {
      toast.error(response?.message, {
        toastId: "1234567890",
      });
      console.error(response?.message);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-row h-screen ">
        <div className="w-1/2 bg-primary flex justify-center items-center">
          <img src="LoginImage.png" alt="" />
        </div>
        {!showLogin && (
          <div className="w-1/2 flex items-center justify-center bg-white">
            <div className="flex flex-col gap-6 w-full lg:p-20 xl:p-32 2xl:40">
              <p className="text-primary font-sans font-semibold lg:text-3xl xl:text-4xl 2xl:text-4xl">
                Login
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-base font-sans font-semibold text-[#2E2E37]">
                  Mobile number
                </p>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  type="number"
                  placeholder="Enter mobile number"
                  className="py-4 px-4 rounded-lg bg-[#EEEEF6] text-[#2E2E37] text-lg font-normal font-sans xl:w-full 2xl:w-[600px]"
                />
              </div>
              <button
                onClick={handleClick}
                className="bg-primary py-4 px-4 rounded-lg text-base font-sans font-semibold text-white xl:w-full 2xl:w-[600px]"
              >
                Send Otp
              </button>
            </div>
          </div>
        )}
        {showLogin && (
          <div className="w-1/2 flex items-center justify-center bg-white">
            <div className="flex flex-col gap-6 w-full lg:p-20 xl:p-32 2xl:40">
              <p className="text-primary font-sans font-semibold lg:text-3xl xl:text-4xl 2xl:text-4xl">
                Verification
              </p>
              <div className="flex flex-col gap-4">
                <p className="text-base font-sans font-semibold text-[#2E2E37]">
                  Please enter the 6-digit code sent to <br />
                  <span className="font-bold">{phone}</span>
                </p>
                {/* <div className="grid grid-cols-6 items-center  gap-4 xl:w-full 2xl:w-[500px]">
              <input
                type="number"
                placeholder="_"
                className="bg-[#EEEEF6] p-5  rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"
              />
              <input
                type="number"
                placeholder="_"
                className="bg-[#EEEEF6] p-5  rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"
              />
              <input
                type="number"
                placeholder="_"
                className="bg-[#EEEEF6] p-5  rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"
              />
              <input
                type="number"
                placeholder="_"
                className="bg-[#EEEEF6] p-5  rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"
                maxLength="1"
              />
              <input
                type="number"
                placeholder="_"
                className="bg-[#EEEEF6] p-5  rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"
              />
              <input
                type="number"
                placeholder="_"
                className="bg-[#EEEEF6] p-5  rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"
              />
            </div> */}
                <div className="grid grid-cols-6 items-center gap-5 2xl:w-[500px]">
                  {inputs.map((value, index) => (
                    // <div className="rounded-lg gap-3 bg-blue-50">
                    <input
                      key={index}
                      type="number"
                      value={value}
                      ref={inputRefs[index]}
                      onChange={(e) => handleInputChange(index, e)}
                      className=" p-5 bg-[#EEEEF6] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium"
                      placeholder="-"
                      maxLength={1}
                      required
                    />
                    // </div>
                  ))}
                </div>
                {/* <OTP handler={getEnteredOTP}/> */}
              </div>

              <button
                onClick={otpSubmit}
                className="bg-primary py-4 px-4 rounded-lg text-base font-sans font-semibold text-white lg:w-full xl:w-full 2xl:w-[500px]  "
              >
                Verify
              </button>
            </div>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </>
  );
}

export default Page;
