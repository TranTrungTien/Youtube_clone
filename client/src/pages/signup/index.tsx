import axios from "axios";
import { SyntheticEvent } from "react";
import { IChanel } from "../../interfaces/chanelinterface";

const SignUp = () => {
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: {
        value: string;
      };
      email: {
        value: string;
      };
      password: {
        value: string;
      };
    };

    const data = {
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
    };

    try {
      console.log("pass data");
      const response = await axios.post<IChanel>(
        process.env.REACT_APP_BASE_URL_SERVER + "/chanels/create",
        data,
        {
          headers: {
            "content-types": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
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

export default SignUp;
