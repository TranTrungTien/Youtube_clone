import Main from "../../components/Main";
import Header from "../../parts/header";

const Home = () => {
  return (
    <div className="relative w-screen flex  flex-col justify-start items-start h-full overflow-hidden">
      <Header />
      <Main />
    </div>
  );
};

export default Home;
