import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ADashBord = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-blue-500 text-white shadow">
        <p className="text-4xl font-semibold pl-2">{users.length}</p>
        <p className="font-semibold pl-2">Total Users</p>
        <button
          onClick={() => navigate("/admin/user")}
          className="bg-blue-400 text-white py-1 px-4 w-full rounded-b hover:bg-blue-600 flex items-center justify-center gap-2 cursor-pointer"
        >
          More Info <FaArrowCircleRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default ADashBord;
