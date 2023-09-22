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

function Gallery() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(importedImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);


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


  const onDragStart = (e, image) => {
    e.dataTransfer.setData('text/plain', image.id.toString());
    setDraggedImage(image);
    console.log(`Start dragging poster${image.id}`)
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetImage) => {
    e.preventDefault();
    if (!draggedImage || draggedImage.id === targetImage.id) {
      return;
    }

    const updatedImages = filteredImages.map((img) => {
      if (img.id === draggedImage.id) {
        return targetImage;
      } else if (img.id === targetImage.id) {
        return draggedImage;
      }
      return img;
    });

    setFilteredImages(updatedImages);
    setDraggedImage(null);
    console.log(`Dropped poster ${draggedImage.id} onto poster ${targetImage.id}`);

  };

  const onTouchStart = (e, image) => {
    e.preventDefault();
    setDraggedImage(image);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
  };

  const onTouchEnd = (e, targetImage) => {
    e.preventDefault();

    if (!draggedImage || draggedImage.id === targetImage.id) {
      return;
    }

    const updatedImages = filteredImages.map((img) => {
      if (img.id === draggedImage.id) {
        return targetImage;
      } else if (img.id === targetImage.id) {
        return draggedImage;
      }
      return img;
    });

    setFilteredImages(updatedImages);
    setDraggedImage(null);
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
      >
        {filteredImages.map((image) => (
                <div className="Gallery-item"
          key={image.id}
          draggable="true"
          onDragStart={(e) => onDragStart(e, image)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, image)}
          onTouchStart={(e) => onTouchStart(e, image)}
              onTouchMove={onTouchMove}
              onTouchEnd={(e) => onTouchEnd(e, image)}
          >
          <img src={`${image.src}`} alt={image.title} />
          <p>{image.tag}</p>
        </div>
        ))}
      </div>
      )}
    </section>
  );
}

export default Gallery;