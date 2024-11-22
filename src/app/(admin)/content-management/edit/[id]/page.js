"use client"
import { addChapterInCourse, deleteMediaFromCourse, getAllCategories, getSingleChapter, getSingleCourse, updateChapterAccessibility, updateChapterInCourse, updateCourse } from '@/Utilities/Course'
import AudioVideoUploader from '@/components/AUdioVideoUploader'
import AddContentToCourseModal from '@/components/AddContentToCourseModal'
import Dropdown from '@/components/Dropdown'
import ImageUploader from '@/components/ImageUploader'
import LoaderLarge from '@/components/LoaderLarge'
import LoaderSmall from '@/components/LoaderSmall'
import SingleContentAdded from '@/components/SingleContentAdded'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function Add() {
    const queryRef = useRef(false)
    const params = useParams()
    const router = useRouter()
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)

    // mutual data
    const [thumbnail,setThumbnail] = useState('')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [categoryName,setCategoryName] = useState('')
    const [type,setType] = useState('')
    const [contentTab,setContentTab] = useState('course')
    const [accessibilityTab,setAccessibilityTab] = useState('premium')
    const [courseContentType,setCourseContentType] = useState('both')

    const [saveEdit,setSaveEdit] = useState(false)
    // course related data
    const [contentArray,setContentArray] = useState([])
    const [addModal,setAddModal] = useState(false)

    // file related data
    const [file,setFile] = useState('')
    const [duration,setDuration] = useState('')


    //content added related
    const [showContent,setShowContent] = useState(false)
    const [contentThumbnail,setContentThumbnail] = useState('')
    const [contentTitle,setContentTitle] = useState('')
    const [contentAccessType,setContentAccessType] = useState('free')
    const [contentFile,setContentFile] = useState('')
    const [contentFileDuration,setContentFileDuration] = useState('')
    const [courseType,setCourseType] = useState('')
    const [edited,setEdited] = useState(false)
    const [editedId,setEditedId] = useState('')

    const thumbnailContentHandler = (val) => {
        setContentThumbnail(val)
    }

    const accessibilityContentTabHandler = (e) => {
        setContentAccessType(e.target.value)
    }
    const conteFileHandler = (val,duration,type) => {
        setContentFile(val)
        setContentFileDuration(duration)
        setType(type)
        if(contentArray.length == 0){
            setCourseContentType(type)
        }
    }
    const contentValidator = () => {
        let res = true
        if(contentThumbnail == ''){
            res = false
            toast.info("Add content thumbnail",{
                toastId:"djhdjn"
            })
        }else if(contentTitle.trim().length < 1){
            res = false
            toast.info("Add content title",{
                toastId:"dkjhf"
            })
        }else if(contentAccessType == ''){
            res = false
            toast.info("Select content Accessibility",{
                toastId:"dkjhf"
            })
        }else if(contentFile == ''){
            res = false
            toast.info("Upload content",{
                toastId:"dkjhf"
            })
        }
        return res
    }
    const clearContentDetails = () => {
        setContentAccessType('free')
        setContentThumbnail('')
        setContentFile('')
        setContentTitle('')
        setContentFileDuration('')
        setType('')
        setEditedId('')
    }
    const contentDataPrepareHandler = () => {
        const obj = {
            thumbnail:contentThumbnail,
            title:contentTitle,
            accessType:contentAccessType,
            media:contentFile,
            duration:contentFileDuration,
            _id: edited ? editedId : contentArray.length,
            type:type
        }
        return obj
    }
    const contentSaveHandler = () => {
        const result = contentValidator()
        if(result){
            const obj =  contentDataPrepareHandler()
            if(edited){
                updateMediaInCourseHandler(obj)
                toast.info("Updating content, It'll take some time",{
                    toastId:"sjdjdj"
                })
                setEdited(false)
            }else{
                addMediaInCourseHandler(obj)
            }
            setShowContent(false)
            clearContentDetails()
        }
    }
    const contentAddMoreHandler = () => {
        const result = contentValidator()
        if(result){
            setShowContent(false)
            const obj =  contentDataPrepareHandler()
            if(edited){
                updateMediaInCourseHandler(obj)
                toast.info("Updating content, It'll take some time",{
                    toastId:"sjdjdj"
                })
                setEdited(false)
            }else{
                addMediaInCourseHandler(obj)
            }
            clearContentDetails()
            setTimeout(()=>{
                setShowContent(true)
            },[100])
        }
    }



    const [categoryData,setCategoryData] = useState([])
    const dropdownHandler = (val) => {
        setCategory(val._id)
        setSaveEdit(true)
    }

    // mutual related data
    const accessibilityTabHandler = (e) => {
        setAccessibilityTab(e.target.value)
        setSaveEdit(true)
    }
    const thumbnailHandler = (val) => {
        setSaveEdit(true)
        setThumbnail(val)
    }
    const dataSetter = async (val) => {
        const response = await getAllCategories()
        if(response?.status){
            setCategoryData(response.data.results)
        }else{
            toast.error(response?.message,{
                toastId:"djhgf"
            })
        }
    }
    
    const validator = () => {
        let res = true
        if(thumbnail == ''){
            res = false
            toast.info("Add thumbnail",{
                toastId:"djhdjn"
            })
        }else if(title.trim().length < 1){
            res = false
            toast.info("Add title",{
                toastId:"dkjhf"
            })
        }else if(category == ''){
            res = false
            toast.info("Select category",{
                toastId:"dkjhf"
            })
        }else if(accessibilityTab == ''){
            res = false
            toast.info("Select Accessibility",{
                toastId:"dkjhf"
            })
        }else if(description.trim().length < 1){
            res = false
            toast.info("Add description",{
                toastId:"dkjhf"
            })
        }else if(contentTab == 'single' && file == ''){
            res = false
            toast.info("Upload content",{
                toastId:"dkjhf"
            })
        }else if(contentTab == 'course' && contentArray.length == 0){
            res = false
            toast.info("Select content",{
                toastId:"dkjhf"
            })
        }
        return res 
    }

    // course related data
    const addModalHandler = () => {
        setAddModal(!addModal)
    }
    const selectHandler = (arr) => {
        setContentArray(arr)
        addModalHandler()
    }
    const updateHandler = (obj) => {
        setContentAccessType(obj.accessType)
        setContentThumbnail(obj?.thumbnail)
        setContentFile(obj?.media)
        setContentTitle(obj.title)
        setContentFileDuration(obj.duration)
        setShowContent(true)
        setEdited(true)
        setType(obj.type)
        setEditedId(obj._id)
    }
    const deleteHandler = async (val) => {
        if(contentArray.length > 1){
            const filter = contentArray.filter((item)=>item._id != val)
            
            if(typeof(val) == 'string'){
                const response = await deleteMediaFromCourse(params.id,val)
                if(response?.status){
                    setContentArray(filter)
                    fetchDetails()
                }
            }else{
                setContentArray(filter)
            }
        }else{
            toast.info("Atleast one chapter is required.")
        }
    }
    // files related data
    const audioHandler = (val,duration,type) => {
        setFile(val)
        setDuration(duration)
    }
    const submitHanlder = async (e) => {
        e.preventDefault()
        const result = validator()
        if(result){
            const formdata = new FormData();
            if(thumbnail != data?.thumbnail?.url){
                formdata.append("thumbnail", thumbnail);
            }
            formdata.append("courseType",courseType)
            formdata.append("category", category);
            formdata.append("accessibility", accessibilityTab);
            formdata.append("description", description);
            formdata.append("title", title);
            setLoading(true)
            const response = await updateCourse(formdata,params.id)
            if(response?.status){
                router.push("/content-management")
            }else{
                setLoading(false)
                toast.error(response?.message,{
                    toastId:"jdhg"
                })
            }
        }
    }
    const addMediaInCourseHandler = async (item) => {
        toast.info("Uploading your content. This may take a moment. Once the upload is complete, your content will appear in the content section.",{
            toastId:"sjdjdj"
        })
        const formdata = new FormData();
        formdata.append("thumbnail", item.thumbnail);
        formdata.append("category", category);
        formdata.append("accessibility", item.accessType);
        formdata.append("title", item.title);
        formdata.append("media", item.media);
        formdata.append("durationInMinutes", item.duration);            
        const response = await addChapterInCourse(params.id,formdata)
        if(response?.status){
            setContentArray([...contentArray,item])
            fetchDetails()
            toast.success("Content added successfully",{
                toastId:"mdjd"
            })
        }
    }
    const updateMediaInCourseHandler = async (item) => {
        const formdata = new FormData();
        if(typeof(item.thumbnail) != 'string'){
            formdata.append("thumbnail", item.thumbnail);
        }
        formdata.append("category", category);
        formdata.append("title", item.title);
        if(typeof(item.media) != 'string'){
            formdata.append("media", item.media);
            formdata.append("durationInMinutes", item.duration);   
        }         
        updateAccessibility(item._id,item.accessType)
        const response = await updateChapterInCourse(item._id,formdata)
        if(response?.status){
            fetchDetails()
            toast.success("Content updated successfully",{
                toastId:"mdjd"
            })
        }
    }
    const updateAccessibility = async (chapterId,type) => {
        const obj = {
            accessibility:type
        }
        const response = await updateChapterAccessibility(chapterId,obj)
    }
    const fetchDetails = async () => {
        const response = await getSingleCourse(params.id)
        if(response?.status){
            setThumbnail(response.data.thumbnail.url)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setAccessibilityTab(response.data.accessibility)
            setCategory(response.data.category._id)
            setCategoryName(response.data.category.title)
            setCourseType(response.data.courseType)
            setCourseContentType(response?.data?.courseContentType)
            const temp = []
            response.data.chapters.map((item)=>{
                const obj = {
                    thumbnail:item.thumbnail?.url,
                    title:item.title,
                    accessType:item.accessibility,
                    media:item.media.url,
                    duration:item.durationInMinutes,
                    type:item.type,
                    _id:item._id
                }
                temp.push(obj)
            })
            setContentArray(temp)
            allChapters(temp)
            setData(response.data)
        }else{
         
        }
    }
    const allChapters = async (temp) => {
        setTimeout(()=>{
            temp.map((ele)=>{
                singleChapterHandler(ele._id,temp)
            })
        },[2000])
    }
    const singleChapterHandler = async (id,temp) => {
        const response = await getSingleChapter(id)
        if(response?.status){
            const obj = {
                thumbnail:response.data?.thumbnail?.url,
                title:response.data.title,
                accessType:response.data.accessibility,
                media:response.data?.media?.url,
                duration:response.data.durationInMinutes,
                type:response.data.type,
                _id:response.data._id
            }
            temp?.map((item,ind)=>{
                if(item._id == obj._id){
                    temp[ind] = obj
                }
            })
            setContentArray([])
            setTimeout(()=>{
                setContentArray(temp)
            },[50])
        }
    }
    const cancelHandler = () => {
        clearContentDetails()
        setShowContent(false)
        setEdited(false)
    }
    useEffect(()=>{
        if(!queryRef.current){
            fetchDetails()
            dataSetter()
        }
        queryRef.current = true
    },[])
  return (
    <div className='w-full'>
        <div className='w-full flex items-center gap-3'>
            <Link href="/content-management" className='btn-back'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.21894 7.33327H13.3333V8.6666H5.21894L8.79492 12.2425L7.85212 13.1853L2.66666 7.99993L7.85212 2.81445L8.79492 3.75726L5.21894 7.33327Z" fill="#252322"/>
                </svg>
                <h6 className='text-[#252322] font-semibold text-sm'>Back</h6>
            </Link>
            <h2 className='text-xl2 font-semibold text-[#17161D]'>Edit Course Content</h2>
        </div>
        {data && <div className='w-1/2 xs:w-full sm:w-full md:w-2/3 lg:w-2/3  success pb-8'>
            {/* <h6 className='text-[#252322] font-semibold mt-10 text-sm'>Content</h6> */}
            {/* <div  className='grid grid-cols-2 p-1 bg-[#DADDF1] rounded-[80px] mt-12'>
                <h6 onClick={e=>setContentTab("course")} className={`text-sm p-2 text-center rounded-[80px] cursor-pointer ${contentTab == "course" ? "font-semibold text-[#00] bg-white":"font-normal text-[#818181] bg-transparent "} `}>Course</h6>
                <h6  onClick={e=>setContentTab("single")} className={`text-sm p-2 text-center rounded-[80px] cursor-pointer ${contentTab == "single" ? "font-semibold text-[#00] bg-white":"font-normal text-[#818181] bg-transparent "} `}>Single</h6>
            </div> */}
            <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Thumbnail</h6>
            <ImageUploader callback={thumbnailHandler} fileAdded={thumbnail} uploaded={true} />
            <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Title</h6>
            <input type="text" value={title} onChange={e=>{
                setTitle(e.target.value)
                setSaveEdit(true)
            }} placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4'/>
              
            {categoryName != '' && <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                    <h6 className='text-[#252322] font-semibold text-sm mb-1'>Category</h6>
                    <Dropdown placeholder={categoryName} data={categoryData} callback={dropdownHandler} />
                </div>
                <div>
                    <h6 className='text-[#252322] font-semibold text-sm mb-1'>Type</h6>
                    <input type="text" value={courseType} onChange={e=>{
                        setCourseType(e.target.value)
                        setSaveEdit(true)    
                    }} placeholder='Ex. Blog' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4'/>   
                </div>
            </div>}
            <h6 className='text-[#252322] font-semibold mt-5 text-sm'>Accessibility</h6>
            <div className='grid grid-cols-2 gap-5 mt-1'>
                <label htmlFor='free' className={`bg-white cursor-pointer flex items-center justify-between border-solid border-2  rounded-xl px-4 py-3 ${accessibilityTab != "free" ?"border-[#E7E5E4]":"border-[#08A03C]" }`}>
                    <h6 className='font-semibold text-sm'>Free</h6>
                    {accessibilityTab == "free" ? <input type='radio' id="free" name="Accessibility" checked value="free" onChange={accessibilityTabHandler}/>:<input type='radio' id="free" name="Accessibility" value="free" onChange={accessibilityTabHandler}/>}
                </label>
                <label htmlFor='premium' className={`bg-white cursor-pointer flex items-center justify-between border-2 border-solid  rounded-xl px-4 py-3 ${accessibilityTab != "premium" ?"border-[#E7E5E4]":"border-[#08A03C]" }`}>
                    <h6 className='font-semibold text-sm'>Premium</h6>
                    {accessibilityTab == "premium" ? <input type='radio' id="premium" name="Accessibility" checked value="premium" onChange={accessibilityTabHandler} />:<input type='radio' id="premium" name="Accessibility" value="premium" onChange={accessibilityTabHandler} />}
                </label>
            </div>
            <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Description</h6>
            <textarea rows="4" value={description} onChange={e=>{
                setDescription(e.target.value)
                setSaveEdit(true)    
            }} placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4 resize-none'/>
            {contentTab == 'course' && contentArray.length > 0 && !edited && <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Content</h6>}
            {contentTab == 'course' && contentArray.length == 0 &&  !showContent  &&  <div onClick={e=>{
                setShowContent(true)
                toast.info("Content will save directly after clicking on save",{
                    toastId:"dkjhfgdh"
                })    
            }} className='bg-[#3090E920] w-fit cursor-pointer mt-5 rounded-3xl px-3 py-2 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15.1427 10.8554H10.857V15.1411C10.857 15.3685 10.7667 15.5865 10.6059 15.7472C10.4452 15.908 10.2272 15.9983 9.99983 15.9983C9.7725 15.9983 9.55449 15.908 9.39374 15.7472C9.233 15.5865 9.14269 15.3685 9.14269 15.1411V10.8554H4.85698C4.62965 10.8554 4.41163 10.7651 4.25088 10.6044C4.09014 10.4436 3.99983 10.2256 3.99983 9.99829C3.99983 9.77096 4.09014 9.55294 4.25088 9.3922C4.41163 9.23145 4.62965 9.14115 4.85698 9.14115H9.14269V4.85543C9.14269 4.62811 9.233 4.41009 9.39374 4.24934C9.55449 4.0886 9.7725 3.99829 9.99983 3.99829C10.2272 3.99829 10.4452 4.0886 10.6059 4.24934C10.7667 4.41009 10.857 4.62811 10.857 4.85543V9.14115H15.1427C15.37 9.14115 15.588 9.23145 15.7488 9.3922C15.9095 9.55294 15.9998 9.77096 15.9998 9.99829C15.9998 10.2256 15.9095 10.4436 15.7488 10.6044C15.588 10.7651 15.37 10.8554 15.1427 10.8554Z" fill="#3090E9"/>
                </svg>
                <h5 className='text-[#3090E9] text-sm font-normal'>Add content</h5>
            </div>}
            {contentTab == 'course' && contentArray.length > 0 && !edited && <div className='w-full bg-white rounded-xl p-5 xs:p-2'>
                {contentArray.length > 0 && contentArray?.map((item,index)=><SingleContentAdded key={index} data={item} update={updateHandler} delete={deleteHandler} edit={true} length={contentArray.length > 1 ? true :false} index={index} />)}
            </div>}
            {contentTab == 'course' && contentArray.length > 0 && !edited && <div onClick={e=>{
                setShowContent(true)
                toast.info("Content will save directly after clicking on save",{
                    toastId:"dkjhfgdh"
                })    
            }} className='bg-[#3090E920] mt-5 w-fit cursor-pointer rounded-3xl px-3 py-2 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15.1427 10.8554H10.857V15.1411C10.857 15.3685 10.7667 15.5865 10.6059 15.7472C10.4452 15.908 10.2272 15.9983 9.99983 15.9983C9.7725 15.9983 9.55449 15.908 9.39374 15.7472C9.233 15.5865 9.14269 15.3685 9.14269 15.1411V10.8554H4.85698C4.62965 10.8554 4.41163 10.7651 4.25088 10.6044C4.09014 10.4436 3.99983 10.2256 3.99983 9.99829C3.99983 9.77096 4.09014 9.55294 4.25088 9.3922C4.41163 9.23145 4.62965 9.14115 4.85698 9.14115H9.14269V4.85543C9.14269 4.62811 9.233 4.41009 9.39374 4.24934C9.55449 4.0886 9.7725 3.99829 9.99983 3.99829C10.2272 3.99829 10.4452 4.0886 10.6059 4.24934C10.7667 4.41009 10.857 4.62811 10.857 4.85543V9.14115H15.1427C15.37 9.14115 15.588 9.23145 15.7488 9.3922C15.9095 9.55294 15.9998 9.77096 15.9998 9.99829C15.9998 10.2256 15.9095 10.4436 15.7488 10.6044C15.588 10.7651 15.37 10.8554 15.1427 10.8554Z" fill="#3090E9"/>
                </svg>
                <h5 className='text-[#3090E9] text-sm font-normal'>Add content</h5>
            </div>}
            {contentTab == 'single' && <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Upload content</h6>}
            {contentTab == 'single' && <AudioVideoUploader contentType={courseContentType} callback={audioHandler} />}
            {!showContent && saveEdit &&  <button onClick={submitHanlder} className='p-4 text-white font-black mt-5 bg-[#AE445A] rounded-xl w-3/12 flex justify-center'>
                {!loading ? "Save":<LoaderSmall />}
            </button>}


            {/* content upload stuff */}
            {showContent && <div className='w-full'>
                <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Add content to course</h6>
                <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Thumbnail</h6>
                {!edited && <ImageUploader callback={thumbnailContentHandler} />}
                {edited && <ImageUploader uploaded={true} fileAdded={contentThumbnail} callback={thumbnailContentHandler} />}
                
                <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Title</h6>
                <input type="text" value={contentTitle} onChange={e=>setContentTitle(e.target.value)} placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4'/>
    
                <h6 className='text-[#252322] font-semibold mt-5 text-sm'>Accessibility</h6>
                <div className='grid grid-cols-2 gap-5 mt-1'>
                    <label htmlFor='freeC' className={`bg-white cursor-pointer flex items-center justify-between border-solid border-2  rounded-xl px-4 py-3 ${contentAccessType != "free" ?"border-[#E7E5E4]":"border-[#08A03C]" }`}>
                        <h6 className='font-semibold text-sm'>Free</h6>
                        {contentAccessType == "free" ? <input type='radio' id="freeC" name="AccessibilityC" checked value="free" onChange={accessibilityContentTabHandler}/>:<input type='radio' id="freeC" name="AccessibilityC" value="free" onChange={accessibilityContentTabHandler}/>}
                    </label>
                    {accessibilityTab == 'premium' && <label htmlFor='premiumC' className={`bg-white cursor-pointer flex items-center justify-between border-2 border-solid  rounded-xl px-4 py-3 ${contentAccessType != "premium" ?"border-[#E7E5E4]":"border-[#08A03C]" }`}>
                        <h6 className='font-semibold text-sm'>Premium</h6>
                        {contentAccessType == "premium" ? <input type='radio'  id="premiumC" name="AccessibilityC" checked value="premium" onChange={accessibilityContentTabHandler} />:<input type='radio' id="premiumC" name="AccessibilityC" value="premium" onChange={accessibilityContentTabHandler} />}
                    </label>}
                    {accessibilityTab == 'free' && <label htmlFor='premiumC' className={`bg-white opacity-35 cursor-pointer flex items-center justify-between border-2 border-solid  rounded-xl px-4 py-3 ${contentAccessType != "premium" ?"border-[#E7E5E4]":"border-[#08A03C]" }`}>
                        <h6 className='font-semibold text-sm'>Premium</h6>
                        {contentAccessType == "premium" ? <input type='radio' readOnly id="premiumC" name="AccessibilityC" checked value="premium" />:<input type='radio' id="premiumC" name="AccessibilityC" value="premium" />}
                    </label>}
                </div>
                <h6 className='text-[#252322] font-semibold mt-5 text-sm mb-1'>Upload content</h6>
                {!edited && <AudioVideoUploader contentType={courseContentType} callback={conteFileHandler} />}
                {edited && <AudioVideoUploader type={type} contentType={courseContentType} uploaded={true} fileAdded={contentFile} callback={conteFileHandler} />}
                
                <div className='mt-5 flex flex-wrap gap-5'>
                    <div onClick={contentAddMoreHandler} className='bg-[#3090E920] w-fit cursor-pointer rounded-3xl p-4 flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15.1427 10.8554H10.857V15.1411C10.857 15.3685 10.7667 15.5865 10.6059 15.7472C10.4452 15.908 10.2272 15.9983 9.99983 15.9983C9.7725 15.9983 9.55449 15.908 9.39374 15.7472C9.233 15.5865 9.14269 15.3685 9.14269 15.1411V10.8554H4.85698C4.62965 10.8554 4.41163 10.7651 4.25088 10.6044C4.09014 10.4436 3.99983 10.2256 3.99983 9.99829C3.99983 9.77096 4.09014 9.55294 4.25088 9.3922C4.41163 9.23145 4.62965 9.14115 4.85698 9.14115H9.14269V4.85543C9.14269 4.62811 9.233 4.41009 9.39374 4.24934C9.55449 4.0886 9.7725 3.99829 9.99983 3.99829C10.2272 3.99829 10.4452 4.0886 10.6059 4.24934C10.7667 4.41009 10.857 4.62811 10.857 4.85543V9.14115H15.1427C15.37 9.14115 15.588 9.23145 15.7488 9.3922C15.9095 9.55294 15.9998 9.77096 15.9998 9.99829C15.9998 10.2256 15.9095 10.4436 15.7488 10.6044C15.588 10.7651 15.37 10.8554 15.1427 10.8554Z" fill="#3090E9"/>
                        </svg>
                        <h5 className='text-[#3090E9] text-sm font-normal'>Save & Add more lessons</h5>
                    </div>
                    <button onClick={cancelHandler} className='p-4 text-[#AE445A] font-black border border-[#AE445A] rounded-xl flex w-3/12 justify-center'>Cancel</button>
                    <button onClick={contentSaveHandler} className='p-4 text-white font-black bg-[#AE445A] rounded-xl flex w-3/12 justify-center'>Save</button>
                </div>
            </div>}
        </div>}
        {!data && <div className='w-full py-10 flex justify-center'>
          <LoaderLarge />
        </div>}
    </div>
  )
}