import React from 'react'
import Profile2 from '../../../public/Profile2.png'

function UserDetailsBox() {
  return (
    <div className="flex flex-row gap-3 justify-between rounded-xl p-4 bg-white">
          <div className="flex flex-col p-4 w-full gap-4 rounded-md border border-[#CE8F9C]">
            <div className="flex flex-row gap-3">
              <img src={Profile2.src} alt="" />
              <div className="flex flex-col">
                <p className="text-base font-sans font-semibold text-userblack">
                  Henry Fiat
                </p>
                <p className="text-[#666576] text-base font-sans font-normal">
                  (406) 555-0120
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-20">
              <div className="flex flex-col gap-4 text-base font-sans font-normal text-[#71737F]">
                <p>User ID</p>
                <p>Account created</p>
              </div>
              <div className="flex flex-col gap-4 text-base font-sans font-normal text-[#71737F]">
                <p>:</p>
                <p>:</p>
              </div>
              <div className="flex flex-col gap-4 text-base font-sans font-semibold text-userblack">
                <p>012364</p>
                <p>Feb 27, 2022, 23:57</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 w-full gap-4 rounded-md border border-[#CE8F9C]">
            <div className="flex flex-row items-center gap-20">
              <div className="flex flex-col gap-4 text-base font-sans font-normal text-[#71737F]">
                <p>Subscription type</p>
                <p>Status</p>
                <p>Subscription purchase date</p>
              </div>
              <div className="flex flex-col gap-4 text-base font-sans font-normal text-[#71737F]">
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="flex flex-col gap-4 text-base font-sans font-semibold text-userblack">
                <p>Monthly</p>
                <p>Active</p>
                <p>04-06-2024</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default UserDetailsBox
