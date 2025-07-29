import { HiOutlineUser } from "react-icons/hi2"; // Clean modern user icon as default

function TopicName({inputData, handleChange}) {
  return (
    <div className="mb-6">
        {/* Label for Topic Name */}
        <label htmlFor="topicname" className="font-medium">Topic Name</label>
      {/* Input Field with Icon */}
      <div className="flex items-center h-12 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 overflow-hidden transition-all">
        <HiOutlineUser className="text-gray-500 text-lg" />
        <input
          type="text"
            id="topicname"
            name="topicname"
            value={inputData.topicname}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter Topic name"
            required
        />
      </div>
    </div>
  );
}

export default TopicName;
