import React,{useState,useRef,useEffect} from 'react'
import { toast } from 'react-toastify';
import ReactAudioPlayer from 'react-audio-player';
export default function AudioVideoUploader(props) {
    const [file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(props.uploaded);
    const [url,setUrl] = useState(props.fileAdded);
    const fileRef = useRef(null);
    const [loading,setLoading] = useState(false)
    const [type,setType] = useState('')
    const [acceptType,setAcceptType] = useState('')
    const coverHandler = (e) => {
        if(e.target.files[0]){
            if(!e.target.files[0].type.includes("video") && !e.target.files[0].type.includes("audio")){
                toast.info("Only audio & video files are allowed",{
                    toastId:'sdjhgf'
                })
            }else{
                if(e.target.files[0].type.includes("video")){
                    if(e.target.files[0].type.includes("video") && acceptType != 'audio'){
                        setFile(e.target.files[0]);
                        setType('video')
                        
                    }else{
                        toast.info("As you added audio in first content, now only audio files are allowed",{
                            toastId:'sdjhgf'
                        })
                    }
                }
                if(e.target.files[0].type.includes("audio")){
                    if(e.target.files[0].type.includes("audio") &&  acceptType != 'video'){
                        setFile(e.target.files[0]);
                        setType("audio")
                    }else{
                        toast.info("As you added video in first content, now only video files are allowed",{
                            toastId:'sdjhgf'
                        })
                    }
                }
            }
            
        }
        else{
            toast.info("No file chosen"),{
                toastId:"uploaddd-error-1aejdg"
            }
        }
    }
    const uploadHandler = () => {
        // props.callback(file)
        setUrl(URL.createObjectURL(file))
        setIsUploaded(true)
        setTimeout(()=>{
            calculateDuration()
        },[1000])
    }
    const calculateDuration = () => {
        const video = document.getElementById(type)
        const duration = video.duration / 60
        props.callback(file,duration.toFixed(2),type)
    }
    const backImage = {
        backgroundImage: isUploaded?`url("${url}")`:``,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        // borderColor:"transparent"
    }
    const removeHandler = () => {
        setFile(null)
        setIsUploaded(false)
        setUrl('')
        props.callback('')
    }
    useEffect(()=>{
        if(file){
            setLoading(true)
            uploadHandler();
        }
    },[file])
    useEffect(()=>{
        if(props.type){
            setType(props.type)
        }
        setAcceptType(props.contentType)
    },[props.type,props.contentType])
    return (
        <div className={`${isUploaded && 'bg-white p-2 rounded-xl'}`}>
            {!isUploaded && <div className='flex items-center cursor-pointer relative group justify-center w-full h-44 rounded-lg bg-[#fff] border border-dashed border-[#D3D6EE]' style={backImage}>
                {!isUploaded && <div className='w-full flex flex-wrap justify-center'>
                    <div className='size-16 bg-[#DADDF1] rounded-full flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <rect width="24" height="24" transform="translate(0.5)" fill="#DADDF1"/>
                            <path d="M20.32 2H4.68C3.47602 2 2.5 2.97602 2.5 4.18V19.82C2.5 21.024 3.47602 22 4.68 22H20.32C21.524 22 22.5 21.024 22.5 19.82V4.18C22.5 2.97602 21.524 2 20.32 2Z" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5 2V22" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 2V22" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.5 12H22.5" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.5 7H7.5" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.5 17H7.5" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 17H22.5" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 7H22.5" stroke="#9099D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h6 className='text-sm font-normal mt-2 text-[#9C9896] w-full text-center'>Drag and drop video or audio(MP3,MP4,AVI or MKI) or</h6>
                    <h6 className='text-sm font-semibold text-[#4655B9] mt-2'>Choose file</h6>
                </div>}
                {isUploaded && <h5 className={`text-sm font-normal text-[#AE445A] hidden group-hover:flex`}>Edit Picture</h5>}
                <input 
                    type='file'
                    ref={fileRef}
                    multiple={false}
                    onChange={coverHandler}
                    className={`absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer`} 
                    accept={type == '' ? "audio/*,video/*" : type == 'audio' ? 'audio/*' : 'video/*' }
                />
            </div>}
            {isUploaded && type == 'video' && <video id="video" width="100%" className='rounded-xl' controls height="200">
                <source src={url} type={file?.type}  />
            </video>}
            {isUploaded && type == 'audio' && <div className='w-full'>
                <ReactAudioPlayer
                    src={url}
                    style={{
                        width:"100%"
                    }}
                    className='w-full'
                    controls
                    id="audio"
                />
            </div>}
            {isUploaded && <div onClick={removeHandler} className='flex cursor-pointer justify-center items-center bg-[#feecec] mt-4 gap-2 p-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z" fill="#EE3E3E"/>
                </svg>
                <h5 className='text-sm font-semibold text-black'>Remove</h5>
            </div>}
        </div>
    )
}