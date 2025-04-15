import Cookies from "js-cookie";
import { apiError, responseValidator, tokenValidator } from "./helper";

// chapters
export async function createUnitaryCourse(formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/unitary",
      requestOptions
    );
    return responseValidator(response, true, "Created successfully");
  } catch (e) {
    apiError(e);
  }
}
export async function createUnitaryCourseNew(formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/unitary2",
      requestOptions
    );
    return responseValidator(response, true, "Created successfully");
  } catch (e) {
    apiError(e);
  }
}
export async function getAllUnitaryCourses(query) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/unitary" + query,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}

// courses
export async function createCourse(formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/standard",
      requestOptions
    );
    return responseValidator(response, true, "Course created successfully");
  } catch (e) {
    apiError(e);
  }
}
export async function createCourseTwo(formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/standard2",
      requestOptions
    );
    return responseValidator(response, true, "Course created successfully");
  } catch (e) {
    apiError(e);
  }
}
export async function updateCourse(formdata, id) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/" + id,
      requestOptions
    );
    return responseValidator(response, true, "Course updated successfully");
  } catch (e) {
    apiError(e);
  }
}
export async function updateCourseTwo(formdata, id) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/" + id + "/2",
      requestOptions
    );
    return responseValidator(response, true, "Course updated successfully");
  } catch (e) {
    apiError(e);
  }
}
export async function addChapterInCourse(id, formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/standard/" + id + "/chapters",
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function addChapterInCourseTwo(id, formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/standard/" + id + "/chapters2",
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function deleteMediaFromCourse(id, cid) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        "/courses/standard/" +
        id +
        "/chapters/" +
        cid,
      requestOptions
    );
    return responseValidator(
      response,
      true,
      "Content removed successfully from course."
    );
  } catch (e) {
    apiError(e);
  }
}
export async function updateChapterInCourse(id, formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/chapters/" + id,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function updateChapterInCourseTwo(id, formdata) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/chapters/" + id + "/2",
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function updateChapterAccessibility(id, payload) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = JSON.stringify(payload);
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/chapters/" + id + "/accessibility",
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}

export async function getAllCourses(query) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/standard/" + query,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}

export async function getAllCategories() {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/categories?limit=200",
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function getSingleCourse(id) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/" + id,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function deleteSingleCourse(id) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/courses/" + id,
      requestOptions
    );
    return responseValidator(response, true, "Course deleted successfully");
  } catch (e) {
    apiError(e);
  }
}

export async function getSingleChapter(id) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/chapters/" + id,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function getUploadLink(file, media) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", file.type);
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/get-signed-url?type=${media}&fileType=${file.type}`,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
export async function uploadToS3(url, file) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", file.type);
  // myHeaders.append("Authorization", "Bearer "+token);
  var requestOptions = {
    method: "PUT",
    body: file,
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url, requestOptions);
    if (response?.status > 199 && response.status < 300) {
      return true;
    }
  } catch (e) {
    apiError(e);
  }
}
export async function removeFileFromS3(payload) {
  const token = await tokenValidator();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/delete-file`,
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    apiError(e);
  }
}
