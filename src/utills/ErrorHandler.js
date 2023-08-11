import { toast } from "react-toastify";

export const logout =()=>{
    localStorage.clear();
    window.location="/"
   }

export const errorHandler = (error) => {
    document.addEventListener('click')
    console.log(error)
      switch (error.response?.status) {
        case 401:
          if(error.response?.data?.message?.includes("Unauthorized User")){
          toast.error(error.response?.data?.message);
          logout();
          }
          break;
        case 400:
        case 404:
        case 422:
        case 500: toast.error(error.response?.data?.message || "something went wrong");
          break;
        default:toast("Oops!!! Something went wrong")
      }
    };