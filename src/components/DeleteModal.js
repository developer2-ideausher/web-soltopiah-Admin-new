import React from 'react';
import LoaderSmall from './LoaderSmall';

export default function DeleteModal({ loading, onDelete, onClose }) {
  return (
    <div className='modal-container'>
      <div className='w-96 bg-white p-5 rounded-xl'>
        <h3 className='font-bold text-[#232946] text-[22px] text-center mt-3'>DELETE</h3>
        <h5 className='font-semibold text-[#232946] text-center mt-3'>Do you really want to delete the content?</h5>
        <div className='grid grid-cols-2 gap-5 mt-5'>
          <button className='p-3 rounded-lg border border-[#AE445A] text-[#AE445A] font-medium text-sm' onClick={onClose}>No</button>
          <button className='p-3 flex justify-center bg-[#AE445A] border border-[#AE445A] rounded-lg text-white font-medium text-sm' onClick={onDelete}>
            {!loading ? 'Yes' : <LoaderSmall />}
          </button>
        </div>
      </div>  
    </div>
  );
}
