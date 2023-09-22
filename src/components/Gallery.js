import React, { useState, useEffect } from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import image10 from "../images/image10.jpg";
import image11 from "../images/image11.jpg";
import image12 from "../images/image12.jpg";

const importedImages = [
  { id: "1", src: image1, tag: "Crime" },
  { id: "2", src: image2, tag: "Drama" },
  { id: "3", src: image3, tag: "Crime" },
  { id: "4", src: image4, tag: "Crime" },
  { id: "5", src: image5, tag: "Drama" },
  { id: "6", src: image6, tag: "Drama" },
  { id: "7", src: image7, tag: "Cartoon" },
  { id: "8", src: image8, tag: "Crime" },
  { id: "9", src: image9, tag: "Cartoon" },
  { id: "10", src: image10, tag: "Action" },
  { id: "11", src: image11, tag: "Action" },
  { id: "12", src: image12, tag: "Drama" },
];

function GalleryItem(props) {
  return (
    <div className="Gallery-item">
      <img src={`${props.image.src}`} alt={props.image.title} />
      <p>{props.image.tag}</p>
    </div>
  );
}

function Gallery() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(importedImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);


    // Simulate loading images
    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
       setImages(importedImages)
      }, 2000); 
      }, []);
      

      useEffect(() => {
        const filtered = images.filter((item) =>
          item.tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredImages(filtered);
      }, [images, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const onDragStart = (e, index) => {
      e.dataTransfer.setData("text/plain", index.toString());
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  return (
    <section className="Gallery">
      <input
        className="search-input"
        type="text"
        placeholder="Search by image tag"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <h2 className="heading">Gallery</h2>
      {loading ? (
        <div className="loader"></div>
      ) : (
      <div
        className="Gallery-inner"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, images.length)}
      >
        {filteredImages.map((image) => (
          <GalleryItem
            key={image.id}
            image={image}
            draggable="true"
            onDragStart={(e) => onDragStart(e, image.id)}
          />
        ))}
      </div>
      )}
    </section>
  );
}

export default Gallery;
