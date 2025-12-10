import API from "./api";
export const loginUser = (formData) => {
  return API.post("/user/login", formData);
}
export const signupUser = (formData) => {
  console.log(formData);
  
  const res =  API.post("/user/signup", formData);
  console.log("after api call");
  console.log(res);
  
  return res;
}