import { CiSearch } from "react-icons/ci";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col text-center items-center justify-center pt-20 text-3xl">
        <p className="font-bold text-black">
          Welcome to TripHack! Find all your trip planning needs in one spot!
        </p>
        <div className="mt-5">
          <p className="font-bold text-black">Where to?</p>
        </div>

        <div className="mt-5 flex w-400 h-12 justify-center">
          <form className="flex items-center w-full max-w-lg border border-black rounded-full overflow-hidden">
            <button className="pl-3 hover:cursor-pointer">
              <CiSearch/>
            </button>
            <input
              type="text"
              placeholder="Enter Destination..."
              className="flex-1 p-3  outline-none placeholder:text-gray-500 text-sm"
            />
          </form>
        </div>
      </div>
    </>
  );
}
