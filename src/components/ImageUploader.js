import { getUploadLink, removeFileFromS3, uploadToS3 } from '@/Utilities/Course';
import React,{useState,useRef,useEffect} from 'react'
import { toast } from 'react-toastify';
import LoaderLarge from './LoaderLarge';
export default function ImageUploader(props) {
    const [file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(props.uploaded);
    const [url,setUrl] = useState(props.fileAdded);
    const fileRef = useRef(null);
    const [loading,setLoading] = useState(false)
    const [keyValue,setKeyValue] = useState(props.keyUrl)
    const [progress, setProgress] = useState(0);
    
    const coverHandler = (e) => {
        if(e.target.files[0]){
            if (
                (e.target.files[0].type === "image/png" ||
                    e.target.files[0].type === "image/jpg" ||
                    e.target.files[0].type === "image/jpeg") &&
                e.target.files[0].size <= 15 * 1024 * 1024 // 5 MB in bytes
            ) {
                setFile(e.target.files[0]);
            } else if (e.target.files[0].size > 15 * 1024 * 1024) {
                toast.error("File size must not exceed 15 MB", {
                    toastId: "upload-error-2",
                });
            } else {
                toast.error("Only JPEG and PNG are supported", {
                    toastId: "upload-error-1",
                });
            }
            
        }
        else{
            toast.error("No file chosen"),{
                toastId:"uploaddd-error-1aejdg"
            }
        }
        // setFile(e.target.files[0]);
    }
    const uploadHandler = () => {
        apiHandler(file)
    }
    
    const apiHandler = async (file) => {
        setLoading(true)
        const response = await getUploadLink(file,'thumbnail')
        if(response.status){
            uploadS3Handler(response.data?.url,response.data?.key,file)
        }
    }
    
    // const uploadS3Handler = async (url,key,file) => {
    //     const response = await uploadToS3(url,file)
    //     if(response){
    //         const temp = url.split("?")
    //         const obj = {
    //             key:key,
    //             url:temp[0]
    //         }
    //         props.callback(obj)
    //         setKeyValue(key)
    //         setUrl(URL.createObjectURL(file))
    //         setIsUploaded(true);
    //     }else{
            
    //     }
    //     setLoading(false)
    // }
    const uploadS3Handler = async (url, key, file) => {
        try {
            setLoading(true)
            const response = await uploadToS3(url, file, (percent) => {
                setProgress(percent);
                // You can also log it or do something else with the progress
                setProgress(percent)
            });
            if (response.status) {
                const temp = url.split("?")
                const obj = {
                    key:key,
                    url:temp[0]
                }
                props.callback(obj)
                setKeyValue(key)
                setUrl(URL.createObjectURL(file))
                setIsUploaded(true);
            }else{
                setProgress(0)
                toast.error(response?.message,{
                    toastId:'hdhdswe2'
                })
            }
        } catch (error) {
            console.error('Upload error:', error);
            // Handle error state if needed
        } finally {
            setLoading(false);
        }
    };
    const backImage = {
        backgroundImage: isUploaded?`url("${url}")`:``,
        backgroundSize:"contain",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        // borderColor:"transparent"
    }
    const removeHandler = () => {
        setProgress(0)
        removeApiHandler()
        setFile(null);
        setIsUploaded(false);
        setUrl('');
        props.callback('');
    }
    const removeApiHandler = async () => {
        const response = await removeFileFromS3({key:keyValue})
        setKeyValue('')
    }
    useEffect(()=>{
        if(file){
            setLoading(true)
            uploadHandler();
        }
    },[file])

    return (
        <div className='flex items-center cursor-pointer relative group justify-center size-44 rounded-lg bg-[#fff] border border-dashed border-[#D3D6EE]' style={backImage}>
            {!isUploaded && !loading && <div className='w-full flex flex-wrap justify-center'>
                <div className='size-16 bg-[#DADDF1] rounded-full flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <rect width="24" height="24" transform="translate(0.5)" fill="#DADDF1"/>
                        <path d="M19.5 2H5.5C4.70435 2 3.94129 2.31607 3.37868 2.87868C2.81607 3.44129 2.5 4.20435 2.5 5V19C2.5 19.7956 2.81607 20.5587 3.37868 21.1213C3.94129 21.6839 4.70435 22 5.5 22H19.5C19.6645 21.9977 19.8284 21.981 19.99 21.95L20.29 21.88H20.36H20.41L20.78 21.74L20.91 21.67C21.01 21.61 21.12 21.56 21.22 21.49C21.3535 21.3918 21.4805 21.2849 21.6 21.17L21.67 21.08C21.7682 20.9805 21.8585 20.8735 21.94 20.76L22.03 20.63C22.0998 20.5187 22.1601 20.4016 22.21 20.28C22.2374 20.232 22.2609 20.1818 22.28 20.13C22.33 20.01 22.36 19.88 22.4 19.75V19.6C22.4567 19.4046 22.4903 19.2032 22.5 19V5C22.5 4.20435 22.1839 3.44129 21.6213 2.87868C21.0587 2.31607 20.2956 2 19.5 2ZM5.5 20C5.23478 20 4.98043 19.8946 4.79289 19.7071C4.60536 19.5196 4.5 19.2652 4.5 19V14.69L7.79 11.39C7.88296 11.2963 7.99356 11.2219 8.11542 11.1711C8.23728 11.1203 8.36799 11.0942 8.5 11.0942C8.63201 11.0942 8.76272 11.1203 8.88458 11.1711C9.00644 11.2219 9.11704 11.2963 9.21 11.39L17.81 20H5.5ZM20.5 19C20.4991 19.1233 20.4753 19.2453 20.43 19.36C20.4071 19.4087 20.3804 19.4556 20.35 19.5C20.3232 19.5423 20.2931 19.5825 20.26 19.62L14.91 14.27L15.79 13.39C15.883 13.2963 15.9936 13.2219 16.1154 13.1711C16.2373 13.1203 16.368 13.0942 16.5 13.0942C16.632 13.0942 16.7627 13.1203 16.8846 13.1711C17.0064 13.2219 17.117 13.2963 17.21 13.39L20.5 16.69V19ZM20.5 13.86L18.62 12C18.0477 11.457 17.2889 11.1543 16.5 11.1543C15.7111 11.1543 14.9523 11.457 14.38 12L13.5 12.88L10.62 10C10.0477 9.45699 9.2889 9.15428 8.5 9.15428C7.7111 9.15428 6.95228 9.45699 6.38 10L4.5 11.86V5C4.5 4.73478 4.60536 4.48043 4.79289 4.29289C4.98043 4.10536 5.23478 4 5.5 4H19.5C19.7652 4 20.0196 4.10536 20.2071 4.29289C20.3946 4.48043 20.5 4.73478 20.5 5V13.86Z" fill="#9099D5"/>
                    </svg>
                </div>
                <h6 className='text-xs font-normal mt-2 text-[#9C9896] w-full text-center'>Drag and drop image(PNG,JPG or JPEG) or</h6>
                <h6 className='text-xs font-semibold text-[#4655B9] mt-2'>Choose file</h6>
            </div>}
            {loading && <h5 className='flex items-center justify-center text-3xl text-primary font-bold h-52'>{progress}%</h5>}
            {isUploaded && !loading && <h5 className={`text-sm font-normal text-[#AE445A] hidden group-hover:flex`}>Edit Picture</h5>}
            <input 
                type='file'
                ref={fileRef}
                multiple={false}
                onChange={coverHandler}
                className={`absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer`} 
                accept=".jpg,.png,.jpeg"
            />
            
            {isUploaded && !loading && (
                <div onClick={removeHandler} className="flex size-10 cursor-pointer justify-center items-center rounded-full bg-white absolute -top-4 -right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </div>
            )}
        </div>
    )
}