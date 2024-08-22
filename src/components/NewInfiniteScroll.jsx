import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

function NewInfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const targetRef = useRef(null);
  const [fetching, setFetching] = useState(false); // Add fetching state

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const debounce = (cb, delay = 1000) => {
    let timerId;
    return (...args) => {
      timerId = setTimeout(() => {
        clearTimeout(timerId);
        console.log("timer excuted");
      }, delay);
    };
  };

  const fetchUsers = async () => {
    if (loading || !hasMore || fetching) return;

    setLoading(true);
    setFetching(true); // Set fetching to true when starting a request

    try {
      const response = await fetch(
        `http://localhost:4000/newUsers?page=${page}&limit=20`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...data]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      console.log("finally");
      setFetching(false); // Set fetching to false when request is done
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log("useEffect1");
  }, [page]);

  useEffect(() => {
    console.log("useEffect2");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !fetching) {
            setPage((prevPage) => prevPage + 1);
          }
        });
      },
      { threshold: 0.5 }
    );

    const targetElement = targetRef.current;
    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [hasMore, fetching]); // Include fetching in the dependency array

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <h1>Infinite Scroll</h1>
      <ul>
        {items.length > 0 &&
          items.map((user) => (
            <li key={user.id} className="py-4">
              {`${user.id}. ${user.name}`}
            </li>
          ))}
      </ul>

      {loading && <p>Loading...</p>}
      {error && <p>No data found: {error}</p>}
      {
        <div ref={targetRef} className="load-more">
          Loading more...
        </div>
      }
    </div>
  );
}

export default NewInfiniteScroll;
