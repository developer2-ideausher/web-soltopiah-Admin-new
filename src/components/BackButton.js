import React from 'react'
import LeftBlackarrow from '../../icons/LeftBlackarrow'

function BackButton() {
  return (
    <div
    className="flex flex-row items-center gap-1 py-[6px] px-3 rounded-[45px] border border-[#A0A2A9] cursor-pointer"
  >
    <LeftBlackarrow />
    <p className="text-sm font-sans font-semibold text-[#252322]">Back</p>
  </div>
  )
}

export default BackButton
