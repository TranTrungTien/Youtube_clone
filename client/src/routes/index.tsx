import { Route, Routes } from "react-router-dom";
import { CreateVideo, Home, SignIn, SignUp, Video } from "../pages";
import ChanelPage from "../pages/chanel";
import SearchPage from "../pages/search";

const AppRoutes = () => {
  return (
    <div className="relative w-full bg-bg_gray_181818">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/watch" element={<Video />} />
        <Route path="/create-video" element={<CreateVideo />} />
        <Route path="/results" element={<SearchPage />} />
        <Route path="/chanel" element={<ChanelPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
