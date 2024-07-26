import React from "react";
import GreyCross from "../../icons/GreyCross";
import { useRouter } from "next/navigation";

function DeclineModal({onclose,onSubmitClick}) {
    const router =useRouter()
    const handleClick=()=>{
        onclose()
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        onSubmitClick()
        router.push("/live-manage/live-requests");
    }
  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center bg-white w-[700px] max-h-[80vh] rounded-lg">
      <div className="flex flex-col items-center gap-8 w-full ">
        <div className="flex justify-between items-center w-full border-b py-3 px-4">
          <p className="text-base font-sans font-semibold text-[#252322]">Please state the reason</p>
          <button onClick={handleClick}>
            <GreyCross />
          </button>
        </div>
        <div className="flex flex-col items-start gap-6 w-full py-3 px-4 ">
          <div className="flex gap-2 items-center ">
            <input type="radio" id="1" name="action" value="1" />
            <label className="text-xl font-normal text-[#414554] font-sans" htmlFor ="Reason 1">Reason 1</label>
          </div>
          <div className="flex gap-2 items-center ">
            <input type="radio" id="2" name="action" value="2" />
            <label className="text-xl font-normal text-[#414554] font-sans" htmlFor ="Reason 2">Reason 2</label>
          </div>
          <div className="flex gap-2 items-center ">
            <input type="radio" id="3" name="action" value="3" />
            <label className="text-xl font-normal text-[#414554] font-sans" htmlFor ="Reason 3">Reason 3</label>
          </div>
        </div>
        <div className="flex flex-col items-start w-full py-3 px-4 gap-2">
            <label className="text-sm font-sans font-semibold text-[#414554]" htmlFor ="Explain">Briefly explain the reason</label>
            <textarea className="py-3 px-4 border border-[#E7E5E4] rounded-xl w-full" placeholder="Enter Description" ></textarea>
        </div>
        <div className="py-3 px-4 w-full">
        <button type="submit" className="w-full text-base font-sans font-normal text-white p-3 bg-[#EE3E3E] border border-[#EE3E3E] rounded-md ">Submit</button>
        </div>
       
      </div>
    </form>
  );
}

export default DeclineModal;
