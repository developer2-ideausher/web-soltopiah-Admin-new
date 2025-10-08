import { guideApprovalStatus } from "@/Services/Api/Guide/GuideApi";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoaderSmall from "./LoaderSmall";
import { useRouter } from "next/navigation";

const RejectGuideModal = ({ onClose, purpose, id }) => {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (finalStatus) => {
    try {
      setLoading(true);
      const res = await guideApprovalStatus(id, purpose, reason);
      if (res.data) {
        toast.success("Request Submitted");
        onClose();
        router.push("/guide-management");
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  return (
    <div>
      {purpose === false && (
        <div className="bg-[#FFFFFF] rounded-lg border p-5 flex flex-col gap-4 w-[40vw]">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[#252322] font-semibold text-base">
              Please state the reason for rejection
            </p>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-[#414554] font-semibold text-sm">
              Briefly explain the reason
            </p>
            <textarea
              className="border border-[#E7E5E4] p-2 rounded-lg"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason here"
            ></textarea>
          </div>
          <button
            disabled={!reason}
            onClick={() => {
              setStatus(false);
              handleSubmit();
            }}
            className="w-full p-3 text-center bg-[#EE3E3E] text-white font-semibold text-base rounded-lg flex items-center justify-center"
          >
            {loading ? <LoaderSmall /> : "Submit"}
          </button>
        </div>
      )}
      {purpose ===true && (
        <div className="bg-[#FFFFFF] rounded-lg border p-5 flex flex-col gap-4 w-[30vw]">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[#252322] font-semibold text-base">
              Are you sure you want to approve?
            </p>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <button
            onClick={() => {
              setStatus(true);
              handleSubmit();
            }}
            className="w-full p-3 text-center bg-green-600 text-white font-semibold text-base rounded-lg flex items-center justify-center"
          >
            {loading ? <LoaderSmall /> : "Yes, Approve"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RejectGuideModal;
