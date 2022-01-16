import { IChanel } from "../../interfaces/chanelinterface";

const actions = [
  "HOME",
  "VIDEOS",
  "PLAYLISTS",
  "COMMUNITY",
  "CHANELS",
  "ABOUT",
];

type ChanelHeaderProps = {
  chanel: IChanel | null;
};

const ChanelHeader = ({ chanel }: ChanelHeaderProps) => {
  return (
    <div className="pt-6  w-full bg-bg_gray_202020 relative">
      <div className=" w-full px-2 md:px-0 md:w-2/3 mx-auto">
        <div className="flex justify-between items-start">
          {chanel && (
            <div className="flex justify-start items-center space-x-4">
              <div className="w-10 h-10 absolute md:static -top-1/3 md:transform-none transform translate-y-1/3 left-5 md:w-14 md:h-14 ">
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
              <div className="text-gray-200 flex flex-col justify-start items-start space-y-px">
                <div>
                  <h1 className="font-medium">{chanel.username}</h1>
                </div>
                <div className="text-9px font-light">
                  <span>{chanel.subscriptions.length} subscribers</span>
                </div>
              </div>
            </div>
          )}
          <div>
            <div className="flex justify-center items-center space-x-3">
              <button className="px-3 py-1 text-xs rounded-sm font-medium bg-transparent border border-blue-700 text-blue-700">
                JOIN
              </button>
              <button
                style={{ backgroundColor: "#cc0000" }}
                className="px-3 py-1 text-xs rounded-sm font-medium text-gray-100 "
              >
                SUBSCRIBE
              </button>
              <button className="text-gray-400 hover:text-gray-200">
                <i className="fas fa-bell"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="text-10px flex justify-evenly md:justify-start items-center font-light mt-2">
          {actions.map((action, index) => {
            if (
              action === "COMMUNITY" ||
              action === "CHANELS" ||
              action === "ABOUT"
            ) {
              return (
                <button
                  key={index}
                  className="hidden md:block text-gray-300 hover:text-gray-200 px-6 py-2"
                >
                  {action}
                </button>
              );
            }
            return (
              <button
                key={index}
                className="text-gray-300 hover:text-gray-200 px-6 py-2"
              >
                {action}
              </button>
            );
          })}
          <button className="text-gray-300 hover:text-gray-200 hidden md:block">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChanelHeader;
