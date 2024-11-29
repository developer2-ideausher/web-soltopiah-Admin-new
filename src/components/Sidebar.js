"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserIcon from "../../icons/UserIcon";
import GuideIcon from "../../icons/GuideIcon";
import ContentManage from "../../icons/ContentManage";
import Category from "../../icons/Category";
import Quickreads from "../../icons/Quickreads";
import Challenge from "../../icons/Challenge";
import Calmess from "../../icons/Calmess";
import Subscriptions from "../../icons/Subscriptions";
import Community from "../../icons/Community";
import PlatformEarnings from "../../icons/PlatformEarnings";
import NotificationManagement from "../../icons/NotificationManagement";
import BadgesandRewards from "../../icons/BadgesandRewards";
import DashboardIco from "../../icons/DashboardIco";
export default function Sidebar() {
  const pathName = usePathname();
  return (
    <div className="flex flex-col lg:p-3 xl:p-2 2xl:p-2 bg-primary  justify-start h-screen ">
      <div className="flex flex-col p-3 justify-center h-full w-full gap-1 font-sans ">
        <div className="flex justify-center" >
        <Image src="/logo.svg" layout="responsive" width="300" height="200" alt="Logo" />
        </div>

        <div className="flex  flex-col gap-1  overflow-y-scroll sidebar-wrapper">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName == "/dashboard" && "bg-pink on"
            }`}
          >
            <DashboardIco/>
           
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base font-sans text-white font-normal group-hover:text-primary">
              Dashboard
            </h6>
          </Link>
          <Link
            href="/user-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/user-management")  && "bg-pink on"
            }`}
          >
            <UserIcon />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary">
              User Management
            </h6>
          </Link>
          <Link
            href="/guide-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith('/guide-management') && "bg-pink on"
            }`}
          >
            <GuideIcon />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary">
              Guide Management
            </h6>
          </Link>
          <Link
            href="/content-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/content-management")   && "bg-pink on"
            }`}
          >
            <ContentManage />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Content Management
            </h6>
          </Link>
          <Link
            href="/category-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/category-management")  && "bg-pink on"
            }`}
          >
            <Category />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Category Management
            </h6>
          </Link>
          <Link
            href="/quickreads"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/quickreads")  && "bg-pink on"
            }`}
          >
            <Quickreads />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Quick Reads
            </h6>
          </Link>
          <Link
            href="/live-manage"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/live-manage" ) && "bg-pink on"
            }`}
          >
            <Quickreads />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Live Management
            </h6>
          </Link>
          <Link
            href="/challenge-module"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/challenge-module" )  && "bg-pink on"
            }`}
          >
            <Challenge />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Challenge Module
            </h6>
          </Link>
          <Link
            href="/calmness-feedback"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/calmness-feedback")  && "bg-pink on"
            }`}
          >
            <Calmess />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Calmess Feedback
            </h6>
          </Link>
          <Link
            href="/subscriptions"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName == "/subscriptions" && "bg-pink on"
            }`}
          >
            <Subscriptions />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Subscriptions
            </h6>
          </Link>
          <Link
            href="/community-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/community-management")   && "bg-pink on"
            }`}
          >
            <Community />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Community Management
            </h6>
          </Link>
          {/* <Link
            href="/platform-earnings"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName == "/platform-earnings" && "bg-pink on"
            }`}
          >
            <PlatformEarnings />
            <h6 className=" lg:text-xs xl:text-sm 2xl:text-base text-white font-normal font-sans group-hover:text-primary whitespace-nowrap">
              Platform Earnings
            </h6>
          </Link> */}
          <Link
            href="/earning-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/earning-management") && "bg-pink on"
            }`}
          >
            <NotificationManagement />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal whitespace-nowrap group-hover:text-primary">
              Earning Management
            </h6>
          </Link>
          <Link
            href="/notification-management"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName.startsWith("/notification-management") && "bg-pink on"
            }`}
          >
            <NotificationManagement />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal whitespace-nowrap group-hover:text-primary">
              Notifications Management
            </h6>
          </Link>
          <Link
            href="/badgesandrewards"
            className={`flex items-center gap-2 lg:p-2 xl:p-2 2xl:p-4 rounded-lg w-full hover:bg-pink group cursor-pointer sidebar-link mt-3 ${
              pathName == "/badgesandrewards" && "bg-pink on"
            }`}
          >
            <BadgesandRewards />
            <h6 className="lg:text-xs xl:text-sm 2xl:text-base text-white font-normal group-hover:text-primary">
              Badges and Rewards
            </h6>
          </Link>
        </div>
      </div>
      {/* <div className="flex items-center justify-center gap-2 p-4 rounded-lg w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <mask
            id="mask0_123_1169"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_123_1169)">
            <path
              d="M16.7917 10.8333H6.66667V9.16667H16.7917L15.5 7.875L16.6667 6.66667L20 10L16.6667 13.3333L15.5 12.125L16.7917 10.8333ZM12.5 7.5V4.16667H4.16667V15.8333H12.5V12.5H14.1667V15.8333C14.1667 16.2917 14.0035 16.684 13.6771 17.0104C13.3507 17.3368 12.9583 17.5 12.5 17.5H4.16667C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H12.5C12.9583 2.5 13.3507 2.66319 13.6771 2.98958C14.0035 3.31597 14.1667 3.70833 14.1667 4.16667V7.5H12.5Z"
              fill="white"
            />
          </g>
        </svg>
        <h6 className="text-sm text-white font-normal group-hover:text-primary">
          Logout
        </h6>
      </div> */}
    </div>
  );
}
