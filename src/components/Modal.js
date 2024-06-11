import React from 'react'

function Modal(props){
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 backdrop-blur-md z-50 flex items-center">
                <div className="my-0 mx-auto ">
                    {props.children}
                </div>
            </div>
        </>
    );
}
export default Modal;