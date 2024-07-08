import Cookies from 'js-cookie';
import { apiError, responseValidator } from './helper';


// chapters
export async function createUnitaryCourse(formdata){
    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:formdata,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/unitary", requestOptions)
        return responseValidator(response,true,"Created successfully")
    }
    catch(e){
        apiError(e)
    }
}
export async function getAllUnitaryCourses(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/unitary", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}


// courses
export async function createCourse(formdata){
    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:formdata,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/standard", requestOptions)
        return responseValidator(response,true,"Course created successfully")
    }
    catch(e){
        apiError(e)
    }
}
export async function updateCourse(formdata,id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body:formdata,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/"+id, requestOptions)
        return responseValidator(response,true,"Course updated successfully")
    }
    catch(e){
        apiError(e)
    }
}
export async function addChapterInCourse(id,formdata){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:formdata,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/standard/"+id+'/chapters', requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}
export async function deleteMediaFromCourse(id,cid){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/standard/"+id+'/chapters/'+cid, requestOptions)
        return responseValidator(response,true,"Content removed successfully from course.")
    }
    catch(e){
        apiError(e)
    }
}
export async function updateChapterInCourse(id,formdata){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body:formdata,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/chapters/"+id, requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}
export async function updateChapterAccessibility(id,payload){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    const raw = JSON.stringify(payload)
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body:raw,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/chapters/"+id+"/accessibility", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}

export async function getAllCourses(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/standard", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}

export async function getAllCategories(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/course-categories", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}
export async function getSingleCourse(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/"+id, requestOptions)
        return responseValidator(response)
    }
    catch(e){
        apiError(e)
    }
}
export async function deleteSingleCourse(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookies.get("auth"));
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
    };
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_URL+"/courses/"+id, requestOptions)
        return responseValidator(response,true,"Course deleted successfully")
    }
    catch(e){
        apiError(e)
    }
}