import React, { useEffect, useState } from "react";

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/newUsers?page=${page}&limit=20`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error ! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length <= 0) {
        setHasMore(false);
      } else {
        setItems([...items, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMore
      ) {
        fetchUsers();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, hasMore]);

  return (
    <div>
      <h1>InfiniteScroll</h1>
      <ul>
        {items.length > 0 &&
          items.map((user) => (
            <li key={user.id} className="py-4">{`${user.id}. ${user.name}`}</li>
          ))}
      </ul>
      {error && <p>No data found : {error}</p>}
    </div>
  );
}

export default InfiniteScroll;
