import React, { useRef, useState } from "react";
import axios from "axios";
import "./imagegenerator.css"; // Ensure this path is correct

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const query = inputRef.current.value;
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            per_page: 1,
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`, // Use environment variable
          },
        }
      );

      if (response.data && response.data.results && response.data.results[0]) {
        setImageUrl(response.data.results[0].urls.regular);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to retrieve image. Check console for details.');
    }
  };

  return (
    <div className="ai-image-gene">
      <div className="header">
        image <span>generator</span>
      </div>
      <div className="image-generator-container">
        <div className="image"><img src={imageUrl} alt="Generated" /></div>
        <div className="search">
          <input
            type="text"
            className="input-search"
            placeholder="Search..."
            ref={inputRef}
          />
        </div>
        <div className="gen-btn" onClick={imageGenerator}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
