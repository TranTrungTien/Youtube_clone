import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../../components/seachresult";
import { IVideo } from "../../interfaces/videointerface";
import Header from "../../parts/header";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query") ?? undefined;
  const [searchResult, setSearchResult] = useState<{
    loading: boolean;
    videos: IVideo[] | null;
    err: Error | null;
  }>({ loading: true, videos: null, err: null });
  console.log({ searchQuery });
  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get<IVideo[]>(
          process.env.REACT_APP_BASE_URL_SERVER + "/videos/search",
          {
            headers: {
              "content-types": "application/json",
            },
            params: {
              queryString: searchQuery,
            },
          }
        );
        setSearchResult({ loading: false, videos: response.data, err: null });
      } catch (error) {
        console.log({ error });
      }
    };
    if (searchQuery) {
      search();
    }
  }, [searchQuery]);
  return (
    <div className="relative w-screen flex  flex-col justify-start items-start h-full overflow-hidden">
      <Header searchQuery={searchQuery} />
      <SearchResult list={searchResult.videos} />
    </div>
  );
};

export default SearchPage;
