import React, { useEffect } from 'react';

const Demo = () => {
  useEffect(() => {
    const fetchData = async () => {
        console.log("object");
      try {
        const response = await fetch('https://shy-gray-dove-wrap.cyclic.app/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any other headers you need
          },
          body: JSON.stringify({
            // Add data to send in the request body
            key1: 'value1',
            key2: 'value2',
          }),
        });

        if (!response.ok) {
          throw new Error('Error fetching data.');
        }

        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Demo</h1>
    </>
  );
};

export default Demo;
