"use client";
import Dropdown from "@/components/Dropdown";
import OTP from "@/components/OtpHandler";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoaderSmall from "@/components/LoaderSmall";
import Image from "next/image";
import CountdownTimer from "@/components/CountDownTimer";
import { LoginApi, loginNew } from "@/Services/Api/Login";
import { getToken, setToken } from "@/Services/Cookie/userCookie";
import useFirebaseAuth from "@/Services/Firebase/useFirebaseAuth";

function Page() {
  const router = useRouter();
  const recaptchaContainer = useRef(null);

  const { initializeRecaptcha, loginWithEmailAndPassword, forgotPassword } =
    useFirebaseAuth();

  const [showLogin, setShowlogin] = useState(true);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const timerHandler = () => {
  //   setStartTimer(!startTimer);
  // };
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   if (phone != "" && phone.length > 5) {
  //     // setShowlogin(1);
  //     if (Cookies.get("token")) {
  //       Cookies.remove("token");
  //     }
  //     setLoading(true);
  //     const res = await phoneSignIn(`+${phone}`);
  //     if (res.status) {
  //       setShowlogin(1);
  //       setLoading(false);
  //       setStartTimer(true);
  //     } else {
  //       setLoading(false);
  //     }
  //   } else {
  //     toast.info("Add mobile number", {
  //       toastId: "sdkj",
  //     });
  //   }
  // };

  // const otpSubmitHandler = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await confirmCode(otpNumber);
  //     if (res.status) {
  //       setIsVerified(true);
  //       loginHandler(res.token);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setLoading(false);
  // };
  // const loginHandler = async (token) => {
  //   // console.log(authUser.user.multiFactor.user.accessToken);
  //   const formdata = new FormData();
  //   // formdata.append("profilePic", fileInput.files[0], "[PROXY]");
  //   formdata.append("dob", "2004-01-17");
  //   formdata.append("name", "Amin Painter");
  //   const response = await LoginApi(formdata, token);
  //   setLoading(false);
  //   if (response?.status) {
  //     setToken(token);
  //     router.push("/dashboard");
  //   } else {
  //     toast.error(response?.message, {
  //       toastId: "1234567890",
  //     });
  //     console.error(response?.message);
  //     setIsVerified(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginWithEmailAndPassword(
        email,
        password,
        "/dashboard"
      );
      console.log(res, "hi check");
      if (res?.status) {
        console.log(res.token);
        const firebaseToken = res.token;

        const creds = { email, password };
        const result = await LoginApi(firebaseToken);
        if (result?.status) {
          console.log(firebaseToken, res, "checking");
          setToken(firebaseToken);
          router.push("/dashboard");
        } else {
          toast.error("Something went wrong while registering with backend");
        }
      }
    } catch (error) {
      toast.error(error.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await forgotPassword(recoveryEmail);
      if (result?.status) {
        setLoading(false)
        setShowlogin(true);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Error Occured");
    }
    setLoading(false);
  };

  // const OTPResendHandler = async (e) => {
  //   setLoading(true);
  //   const res = await phoneSignIn(`+${phone}`);
  //   if (res.status) {
  //     setStartTimer(true);
  //     setLoading(false);
  //   }
  // };
  // const otpCallback = (val) => {
  //   setOtpNumber(val);
  // };

  useEffect(() => {
    initializeRecaptcha(recaptchaContainer.current);
  }, [initializeRecaptcha]);
  return (
    <div className="flex flex-wrap h-screen ">
      <div className="w-1/2 bg-primary flex justify-center items-center">
        <img src="LoginImage.png" alt="" />
      </div>
      <div id="recaptcha-container" ref={recaptchaContainer}></div>

      {showLogin && (
        <div className="w-1/2  flex items-center justify-center bg-white">
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-4/6 xs:w-5/6 md:w-5/6"
          >
            <div className="hidden justify-center xs:flex sm:flex">
              <Image
                src="/logo.svg"
                alt="Logo"
                width="200"
                height="100"
                className=""
              />
            </div>
            <p className="text-primary text-[32px] font-semibold font-sans">
              Login
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#2E2E37] mt-6 font-sans">
                Email
              </p>
              <input
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="py-4 px-4 rounded-lg bg-[#EEEEF6] text-[#000] text-base font-normal w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#2E2E37] mt-6 font-sans">
                Password
              </p>
              <input
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="py-4 px-4 rounded-lg bg-[#EEEEF6] text-[#000] text-base font-normal w-full"
              />
            </div>

            {/* <PhoneInput
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              style={{ background: "#EEEEF6" }}
              inputClass="control"
            /> */}
            {/* <input type="number" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter mobile number" className="py-4 px-4 rounded-lg bg-[#EEEEF6] text-[#000] text-base font-normal w-full"/> */}
            {/* <h5 className="text-[#232946] text-base font-semibold underline text-right mt-4">Resend OTP</h5> */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowlogin(false)}
                className="text-sm font-semibold text-[#2E2E37] mt-1 font-sans hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="bg-primary flex justify-center py-4 mt-5 rounded-lg text-base font-semibold font-sans text-white w-full"
            >
              {!loading ? "Login" : <LoaderSmall />}
            </button>
          </form>
        </div>
      )}
      {!showLogin && (
        <div className="w-1/2  flex items-center justify-center bg-white">
          <form
            onSubmit={handleRecovery}
            className="flex flex-col w-4/6 xs:w-5/6 md:w-5/6"
          >
            <div className="hidden justify-center xs:flex sm:flex">
              <Image
                src="/logo.svg"
                alt="Logo"
                width="200"
                height="100"
                className=""
              />
            </div>
            <p className="text-primary text-xl mt-8 font-semibold font-sans">
              Enter your email to receive recovery link
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#2E2E37] mt-3 font-sans">
                Email
              </p>
              <input
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="Enter your email"
                required
                type="email"
                className="py-4 px-4 rounded-lg bg-[#EEEEF6] text-[#000] text-base font-normal w-full"
              />
            </div>

            <button
              type="submit"
              disabled={!recoveryEmail}
              className="bg-primary flex justify-center py-4 mt-5 rounded-lg text-base font-semibold font-sans text-white w-full"
            >
              {!loading ? "Send Link" : <LoaderSmall />}
            </button>
          </form>
        </div>
      )}

      {/* {showLogin == 1 && (
        <div className="w-1/2  flex items-center justify-center bg-white">
          <div className="flex flex-col w-4/6 xs:w-5/6 md:w-5/6">
            <p className="text-primary text-[32px] font-semibold font-sans">
              Verification
            </p>
            <div className="flex flex-col gap-4">
              <p className="text-base font-semibold text-[#2E2E37] font-sans">
                Please enter the 6-digit code sent to <br />{" "}
                <span className="font-bold font-sans">+{phone}</span>{" "}
              </p>
              <OTP handler={otpCallback} />
              <button
              disabled={isVerified}
                onClick={otpSubmitHandler}
                className={`bg-primary flex justify-center py-4 px-4 rounded-lg text-base font-semibold font-sans text-white w-full ${
                  isVerified ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {!loading ? "Verify" : <LoaderSmall />}
              </button>
              {!startTimer && (
                <button
                  onClick={OTPResendHandler}
                  className="bg-transparent py-4 px-4 rounded-lg text-base border-2 border-[#d2d2d2] font-semibold text-[#82829b] w-full font-sans  "
                >
                  Resend OTP
                </button>
              )}
              {startTimer && (
                <h5 className="flex items-center font-normal text-grey text-sm justify-center mt-2 w-full font-sans">
                  Didn&apos;t receive the OTP?
                  <CountdownTimer interval={60} handler={timerHandler} />
                </h5>
              )}
            </div>
          </div>
        </div>
      )} */}
      {/* {showLogin == 2 && <LoginDetails phone={phone} />} */}
    </div>
  );
}
export default Page;
