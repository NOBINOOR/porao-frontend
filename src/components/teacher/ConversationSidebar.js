import React from "react";
import "../../pages/conversation/Conversation.css";
import { BiSearchAlt2 } from "react-icons/bi";
import EnrolledTeachers from "../../pages/conversation/EnrolledTeachers";
import { logout } from "../../redux/reducers/auth/authSlice";
import { useDispatch } from "react-redux";

const ConversationSidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="border-r  p-4 flex flex-col ">
      <h2 className="text-gray-900 text-xl text-start mb-4">Chats</h2>
      <form action="" className="flex items-center gap-2">
        <input
          // value={search}
          // onChange={(e)=>setSearch(e.target.value)}
          className=" outline-none h-10 border  rounded pl-4"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="bg-black w-12 h-10 ">
          <BiSearchAlt2 className="text-3xl pl-4 text-white" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <div className="overflow-y-scroll h-96 scrollbar-hide">
        <EnrolledTeachers />
      </div>
      <div className="mt-2">
        <button
          className="w-full h-10 bg-red-500 text-white"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ConversationSidebar;
