import axios from "axios";
import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { saveChanel } from "../../slices/chanelslice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: {
        value: string;
      };
      password: {
        value: string;
      };
    };
    const data = {
      email: target.email.value,
      password: target.password.value,
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL_SERVER + "/chanels/login",
        data,
        {
          headers: {
            "content-types": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(saveChanel(response.data));
      const currentUrl = location.state ? location.state : "/";
      navigation(currentUrl, { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" id="email" placeholder="Email" />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
