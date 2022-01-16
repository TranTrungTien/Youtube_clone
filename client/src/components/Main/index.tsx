import Sidebar from "../../parts/sidebar";
import Container from "../Container";

const Main = () => {
  return (
    <div className="relative flex justify-start items-start h-full w-full">
      <Sidebar />
      <Container />
    </div>
  );
};

export default Main;
