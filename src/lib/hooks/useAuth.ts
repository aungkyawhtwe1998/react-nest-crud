import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../fetcher";
import { loggedIn, loggedOut } from "../store/userSlice";
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(body: { email: string; password: string }) {
    try {
      const data = await postData("auth/local/signin", body);
      if (data.error) {
        throw {
          msg: data.message,
        };
      }

      const { access_token, refresh_token, ...rest } = data ;
      localStorage.setItem("at", access_token);
      localStorage.setItem("info", JSON.stringify(rest));
      console.log(data)
      dispatch(
        loggedIn({
          email: data.user.email,
          isAdmin: true,          
          company:data.user.company
        })
      );
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  async function handleSignup(body:{username:string, email:string, password: string}) {
    try {
      const data = await postData("auth/local/signup", body);
      if(data.error){
        throw{
          msg: data.message
        };
      }

      navigate("/login");
      
    } catch (error:any) {
      throw error;
    }
  }

  function handleLogout() {
    dispatch(loggedOut());
    localStorage.removeItem("at");
    localStorage.removeItem("info");
    navigate("/login");
  }
  return { handleLogin, handleLogout , handleSignup};
};

export default useAuth;