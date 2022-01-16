import { IVideo } from "../../interfaces/videointerface";
import Sidebar from "../../parts/sidebar";
import SearchVideoCard from "../videocard/search";

type SearchResultProps = {
  list: IVideo[] | null;
};

const SearchResult = ({ list }: SearchResultProps) => {
  return (
    <div className="relative flex justify-start items-start h-full w-full">
      <Sidebar />
      <div className="h-screen overflow-y-auto flex-1 bg-bg_gray_181818 w-full relative pb-14">
        <div className="w-full md:w-1/2 mx-auto space-y-4 mt-3 px-3 md:px-0">
          <div className="space-x-2 flex justify-start items-center border-b border-lightgray_323232 w-full py-1 px-2">
            <div className="text-xs text-gray-300">
              <i className="fas fa-filter"></i>
            </div>
            <div className="text-11px font-light text-gray-300">
              <span>FILTER</span>
            </div>
          </div>
          <div className="space-y-3">
            {list &&
              list.map((video, index) => (
                <SearchVideoCard key={index} video={video} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
