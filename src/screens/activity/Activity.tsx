import Search from "../auth/components/Search";
import ButtonNew from "../auth/components/ButtonNew";
import Post from "../auth/components/post";

const Activity = () => {
  return (
    <div className="w-screen h-screen flex-col justify-center items-center bg-[#EDF1D6]">
      <div className="w-screen h-20 bg-amber-600 justify-center">header</div>
      <div className="flex-col justify-center items-center p-3">
        <div className="my-3 flex">
          <ButtonNew />
          <Search />
        </div>
        <Post />
      </div>
    </div>
  );
};

export default Activity;
