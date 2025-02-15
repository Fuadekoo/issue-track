"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [users, setUsers] = useState<
    { id: number; name: string; email: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>users</h1>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Page;
