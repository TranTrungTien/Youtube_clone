import TopHeader from "./topheader";
type HeaderProps = {
  searchQuery?: string;
};
const Header = ({ searchQuery }: HeaderProps) => {
  return (
    <header className="bg-bg_gray_202020 sticky top-0 left-0 w-full z-40">
      <TopHeader searchQuery={searchQuery} />
    </header>
  );
};

export default Header;
