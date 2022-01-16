import axios from "axios";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { IChanel } from "../../interfaces/chanelinterface";
import { deleteChanel } from "../../slices/chanelslice";

type ActionType = {
  action: string;
  symbol: ReactNode;
  hasChild: boolean;
};

const actions: ActionType[] = [
  {
    action: "Your channel",
    symbol: <i className="fas fa-user"></i>,
    hasChild: false,
  },
  {
    action: "Purchases and memberships",
    symbol: <i className="fas fa-dollar-sign"></i>,
    hasChild: false,
  },
  {
    action: "YouTube Studio",
    symbol: <i className="fab fa-youtube"></i>,
    hasChild: false,
  },
  {
    action: "Switch account",
    symbol: <i className="fas fa-clone"></i>,
    hasChild: true,
  },
  {
    action: "Sign out",
    symbol: <i className="fas fa-sign-out-alt"></i>,
    hasChild: false,
  },
  {
    action: "Appearance: Device theme",
    symbol: <i className="fas fa-moon"></i>,
    hasChild: false,
  },
  {
    action: "Language:",
    symbol: <i className="fas fa-language"></i>,
    hasChild: true,
  },
  {
    action: "Location:",
    symbol: <i className="fas fa-globe-americas"></i>,
    hasChild: true,
  },
  {
    action: "Settings",
    symbol: <i className="fas fa-cog"></i>,
    hasChild: false,
  },
  {
    action: "Your data in YouTube",
    symbol: <i className="fas fa-user-shield"></i>,
    hasChild: false,
  },
  {
    action: "Help",
    symbol: <i className="fas fa-question-circle"></i>,
    hasChild: false,
  },
  {
    action: "Send feedback",
    symbol: <i className="fas fa-exclamation-circle"></i>,
    hasChild: false,
  },
  {
    action: "Keyboard shortcuts",
    symbol: <i className="fas fa-keyboard"></i>,
    hasChild: false,
  },
];

// Yui Hatano
// Manage your Google Account
type ChanelOptionsProps = {
  chanel: IChanel | null;
};
const ChanelOptions = ({ chanel }: ChanelOptionsProps) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const handleActions = async ({ action }: ActionType) => {
    if (action === "Sign out") {
      try {
        await axios.delete(
          process.env.REACT_APP_BASE_URL_SERVER + "/chanels/delete-cookie",
          {
            headers: {
              "content-types": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(deleteChanel());
        navigation("/sign-in");
      } catch (error) {
        console.log({ error });
      }
    }
  };
  return (
    <div className="absolute top-full right-0 w-52 flex flex-col justify-start items-start bg-bg_gray_202020 border border-lightgray_323232">
      {chanel && (
        <div className="px-2 flex justify-start items-center space-x-3 py-3 border-b border-lightgray_323232">
          <div className={`w-7 h-7`}>
            {!chanel.imageProfileUrl ? (
              <div className="w-full h-full grid place-content-center rounded-full bg-pink-700 text-gray-50">
                {chanel.username[0]}
              </div>
            ) : (
              <div className="w-6 h-6">
                <img
                  src={chanel.imageProfileUrl}
                  alt="user profile"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start items-start text-11px font-medium text-gray-200 space-y-1">
            <div className="truncate">
              <h1>{chanel.username}</h1>
            </div>
            <div>
              <a
                href="/manger-account"
                className="text-9px font-light text-blue-500"
              >
                Manage your Google Account
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="py-2">
        {actions.map((action, index) => {
          if (action.hasChild) {
            return (
              <button
                key={index}
                onClick={() => handleActions(action)}
                className="text-9px font-medium text-gray-300 hover:bg-lightgray_323232 flex justify-between items-center w-full px-2 py-1"
              >
                <div className="flex justify-start items-center  space-x-2">
                  <div className="text-xs w-5 h-5 grid place-content-center">
                    {action.symbol}
                  </div>
                  <div>
                    <span>{action.action}</span>
                  </div>
                </div>
                <div>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={() => handleActions(action)}
              className="text-9px font-medium text-gray-300 hover:bg-lightgray_323232 w-full px-2 py-1"
            >
              <div className="flex justify-start items-center  space-x-2">
                <div className="text-xs w-5 h-5 grid place-content-center">
                  {action.symbol}
                </div>
                <div>
                  <span>{action.action}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChanelOptions;
