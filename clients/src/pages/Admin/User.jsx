import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import UserForm from "./UserForm";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        },
      );

      const data = await res.json();
      if (res.ok) {
        alert("User deleted successfully");
        fetchUsers();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h2 className="text-xl md:text-3xl font-bold w-full flex justify-center items-center p-4">
          User Management
        </h2>
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row justify-between items-center"
          >
            <div>
              <h3 className="md:text-xl font-semibold">
                Username: {user.username}
              </h3>
              <p className="text-sm md:text-lg text-gray-600">
                Email: {user.email}
              </p>
              <p className="text-sm md:text-lg text-gray-500">
                Role: {user.role}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setShowForm(true);
                }}
                className="px-2 py-1 md:px-5 md:py-2 text-sm rounded text-white bg-blue-500 cursor-pointer"
              >
                Edit User
              </button>
              <button
                className="px-2 py-1 md:px-5 md:py-2 text-sm rounded text-white bg-red-500 cursor-pointer"
                onClick={() => handleDelete(user._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div>
          {showForm && selectedUser && (
            <UserForm
              selectedUser={selectedUser}
              setShowForm={setShowForm}
              refreshUsers={fetchUsers}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default User;
