import "./tagsugguests.css";
const tags = [
  "All",
  "Mixes",
  "Music",
  "Football",
  "Gaming",
  "Comedies",
  "Drama",
  "Movie",
  "Radio",
  "Balls",
];

type ChipProps = {
  tag: string;
  isActive: boolean;
};

const Chip = ({ tag, isActive }: ChipProps) => {
  return (
    <button
      style={{ fontSize: "10px" }}
      className={`${
        isActive
          ? "bg-gray-300"
          : "bg-lightgray_323232 text-gray-200 border border-lightgray_323232 hover:bg-gray-300 hover:text-black"
      } rounded-full px-4 py-1 font-light`}
    >
      {tag}
    </button>
  );
};

type TagSuggestionsProps = {
  relativeList: boolean;
};

const TagSuggestions = ({ relativeList }: TagSuggestionsProps) => {
  return (
    <div
      className={`hidden_scrollbar hidden md:flex justify-start overflow-x-auto items-center space-x-3 py-2 sticky top-0 z-20 left-0 pl-1 ${
        !relativeList &&
        "border-b border-lightgray_323232 bg-bg_gray_202020  md:pl-10"
      }`}
    >
      {tags.map((tag, index) => {
        if (tag === "All") {
          return <Chip tag={tag} key={index} isActive={true} />;
        }
        return <Chip tag={tag} key={index} isActive={false} />;
      })}
    </div>
  );
};

export default TagSuggestions;
