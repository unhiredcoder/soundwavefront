import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/style.css"

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  // cosnt link="https://soundwaves-unhiredcoder.vercel.app"
  //  ⚠️⚠️⚠️THIS MAY NOT WORK COZ VERCEL NOT PROVIDE CLOUD STORAGE TO HSNDLE FILE UPLOADS ⚠️⚠️⚠️
  const link = "http://localhost:4000"

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${link}/users`);

      if (!response.ok) {
        throw new Error('Error retrieving users.');
      }
      const data = await response.json();
      setUsers(data);
      // setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(users);

  const deleteUser = async (user) => {
    try {
      const response = await fetch(`https://soundwaves-unhiredcoder.vercel.app/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),   // sending whole object to backend , backend will get id , image ,audio and dellete from uplods folder 
      });

      if (response.ok) {
        console.log('User deleted successfully');
        fetchUsers();
      } else {
        console.log('Error deleting user:', response.status);
      }
    } catch (error) {
      console.log(`Error deleting user: ${error.message}`);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="search-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <input
            type="search"
            placeholder="Search by song name"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {!users.length > 0 ? (
          <div
            className='not-found'
          >Not Found ❌</div>
        ) : (
          users.map((user) => (
            <motion.div
              key={user._id}
              className="p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mycls bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-contain object-center mb-6"
                  src={isLoading ? "./Spinner.svg" : `${link}/uploads/${user.image}`}
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  Added On Date: {new Date(user.date).toLocaleDateString('en-GB')}
                </h3>
                <h2 className="text-l text-gray-900 font-small title-font my-2">{user.username}</h2>
                <div className="audio-container">
                  <audio controls className="responsive-audio">
                    <source src={`${link}/uploads/${user.audio}`} type="audio/mpeg" />
                  </audio>
                </div>
                <button
                  style={{ borderRadius: "10px" }}
                  onClick={() => deleteUser(user)}
                  className="text-l bg-red-400 text-white pt-1 pb-1 pl-4 pr-4 my-2"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
};
export default Home;
