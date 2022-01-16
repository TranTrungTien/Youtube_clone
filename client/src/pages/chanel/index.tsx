import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChanelHeader from "../../components/chanelheader";
import PlaylistVideo from "../../components/playlistvideo";
import { IChanel } from "../../interfaces/chanelinterface";
import Header from "../../parts/header";
import Sidebar from "../../parts/sidebar";

const ChanelPage = () => {
  const [searchParams] = useSearchParams();
  const chanel_id = searchParams.get("id");
  const [chanel, setChanel] = useState<{
    loading: boolean;
    chanel: IChanel | null;
    err: Error | null;
  }>({ loading: true, chanel: null, err: null });
  useEffect(() => {
    const getChanel = async () => {
      try {
        const response = await axios.get<IChanel>(
          process.env.REACT_APP_BASE_URL_SERVER + "/chanels",
          {
            headers: {
              "content-types": "application/json",
            },
            params: {
              id: chanel_id,
            },
          }
        );
        console.log(response.data);
        setChanel({ loading: false, chanel: response.data, err: null });
      } catch (error) {
        console.log({ error });
      }
    };
    getChanel();
  }, [chanel_id]);

  return (
    <div className="relative w-screen flex  flex-col justify-start items-start overflow-hidden h-screen max-h-screen">
      {chanel && (
        <>
          <Header />
          <div className="relative flex justify-start items-start w-full h-full">
            <Sidebar />
            <div className="flex-1  h-full overflow-y-auto pb-20 overflow-x-hidden">
              <div className="w-full">
                <div className="w-full h-20 md:h-60">
                  <img
                    src="https://www.consumerprivacyworld.com/wp-content/uploads/sites/38/2021/08/nature-319.jpg"
                    alt="cover chanel"
                    className="w-full h-full object-cover object-center rounded-sm"
                  />
                </div>
              </div>
              <div className="w-full">
                <ChanelHeader chanel={chanel.chanel} />
                <div className="w-full px-2 md:px-0 md:w-2/3 mx-auto overflow-hidden">
                  <PlaylistVideo
                    title="Upload"
                    list={chanel.chanel?.yourVideos}
                  />
                  {chanel.chanel &&
                    chanel.chanel?.playlists.length > 0 &&
                    chanel.chanel.playlists.map((playlist, index) => (
                      <PlaylistVideo
                        key={index}
                        title={playlist.title}
                        list={playlist.videos}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChanelPage;
