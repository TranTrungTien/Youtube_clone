import { useAppSelector } from "../../app/hooks";

const Sidebar = () => {
  const chanel = useAppSelector((state) => state.user);
  return (
    <div
      style={{ fontSize: "10px", maxWidth: "160px" }}
      className="h-full bg-bg_gray_202020 sticky left-0 top-0 z-50 py-2 md:flex flex-col justify-start items-start font-thin text-gray-300 hidden "
    >
      <div className="overflow-y-auto space-y-4 w-full pb-10">
        <div>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-home"></i>
            </div>
            <div className="flex-1">
              <span>Home</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-compass"></i>
            </div>
            <div className="flex-1">
              <span>Explore</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-address-book"></i>
            </div>
            <div className="flex-1">
              <span>Subscriptions</span>
            </div>
          </button>
        </div>
        <div className="border-b border-lightgray_323232"></div>
        <div>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-photo-video"></i>
            </div>
            <div className="flex-1">
              <span>Library</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-history"></i>
            </div>
            <div className="flex-1">
              <span>History</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-film"></i>
            </div>
            <div className="flex-1">
              <span>Your Videos</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-4 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div className="flex-1">
              <span>Liked Videos</span>
            </div>
          </button>
        </div>
        <div className="border-b border-lightgray_323232"></div>
        <div className="w-full space-y-px">
          {chanel.user &&
            chanel.user.subscriptions.length > 0 &&
            chanel.user.subscriptions.map((chanel, index) => (
              <div
                key={index}
                className="flex justify-start items-center space-x-3 px-5 py-1 rounded-sm hover:bg-lightgray_323232 text-gray-200"
              >
                <div className="w-4 h-4">
                  {chanel.imageProfileUrl ? (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWAA1UX2kbZH14IVPWoYsNERKJvqIjUAtuL7tGQDwcwm2pBCFkqz0C6fkUTUaDzaNRVQA&usqp=CAU"
                      alt="chanel profile"
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-pink-700 text-gray-50 grid place-content-center">
                      <h1>{chanel.username[0]}</h1>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 min-w-0">
                  <p className="truncate">{chanel.username}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="border-b border-lightgray_323232"></div>
        <div>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-gamepad"></i>
            </div>
            <div className="flex-1">
              <span>Gaming</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-wifi"></i>
            </div>
            <div className="flex-1">
              <span>Live</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="flex-1">
              <span>Sport</span>
            </div>
          </button>
        </div>
        <div className="border-b border-lightgray_323232"></div>
        <div>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-cog"></i>
            </div>
            <div className="flex-1">
              <span>Settings</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-flag"></i>
            </div>
            <div className="flex-1">
              <span>Report history</span>
            </div>
          </button>
          <button className="flex justify-start text-left py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-question-circle"></i>
            </div>
            <div className="flex-1">
              <span>Help</span>
            </div>
          </button>
          <button className="flex justify-start py-1 rounded px-5 items-center space-x-3 hover:bg-lightgray_323232 text-gray-200 w-full">
            <div className="text-xs">
              <i className="fas fa-comment-alt"></i>
            </div>
            <div>
              <span>Send feedback</span>
            </div>
          </button>
        </div>
        <div className="border-b border-lightgray_323232"></div>
        <div
          style={{ fontSize: "10px" }}
          className="text-gray-400 leading-4 px-4"
        >
          <span>
            About Press Copyright <br /> Contact us Creators <br /> Advertise
            Developers
          </span>
        </div>
        <div
          style={{ fontSize: "10px" }}
          className="text-gray-400 leading-4 px-4"
        >
          <span>
            Terms <br /> PrivacyPolicy & Safety How <br /> YouTube works <br />
            Test new features
          </span>
        </div>
        <div
          style={{ fontSize: "6x" }}
          className="text-gray-400 leading-4 px-4"
        >
          <span>© 2022 Google LLC</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
