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
  const [touchStartPosition, setTouchStartPosition] = useState(null);

  // Simulate loading images
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setImages(importedImages);
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
    e.dataTransfer.setData("text/plain", image.id.toString());
    setDraggedImage(image);
    console.log(`Start dragging poster${image.id}`);
  };

  const onDragOver = (e, image) => {
    e.preventDefault();
    console.log(`draggedImage move over poster${image.id}`);
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
    console.log(
      `Dropped poster ${draggedImage.id} onto poster ${targetImage.id}`
    );
  };

  const onTouchStart = (e, image) => {
    // const imageId = e.currentTarget.getAttribute('data-image-id');
    e.currentTarget.style.zIndex = '10';
    setTouchStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setDraggedImage(image);
    console.log(`Touch started for poster ${image.id}`);
  };

  const onTouchMove = (e, image) => {
    if (!draggedImage) return;

    // Calculate the horizontal and vertical distance moved.
    const deltaX = e.touches[0].clientX - touchStartPosition.x;
    const deltaY = e.touches[0].clientY - touchStartPosition.y;

    // You can apply your own logic to update the element's position based on deltaX and deltaY.
    // For example, translate the element using CSS transform property.
    e.currentTarget.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    e.preventDefault();
    console.log(`Touch moved over poster ${image.id}`);
  };
  const onTouchEnd = (e, targetImage) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    // Set touchStartPosition to the end position to allow further interaction from that point.
    setTouchStartPosition({ x: touchEndX, y: touchEndY });

    // Reset any temporary styles applied during the touch drag (e.g., transform).
    e.currentTarget.style.transform = "";
     e.currentTarget.style.zIndex = 'auto';

    // Check if draggedImage and targetImage are valid and have different IDs.
    if (draggedImage && draggedImage.id === targetImage.id) {
      // Create a copy of the filteredImages array to avoid mutating state directly.
      const updatedImages = [...filteredImages];

      // Find the indices of the draggedImage and targetImage in the updatedImages array.
      const draggedImageIndex = updatedImages.findIndex(
        (img) => img.id === draggedImage.id
      );
      const targetImageIndex = updatedImages.findIndex(
        (img) => img.id === targetImage.id
      );

      // Swap the positions of the images in the updatedImages array.
      if (draggedImageIndex !== -1 && targetImageIndex !== -1) {
        const temp = updatedImages[draggedImageIndex];
        updatedImages[draggedImageIndex] = updatedImages[targetImageIndex];
        updatedImages[targetImageIndex] = temp;

        // Update the state with the new order.
        setFilteredImages(updatedImages);
        console.log(`Image dropped at poster ${targetImage.id}`);
      }
    }

    // Reset the draggedImage state to indicate that no image is being dragged.
    setDraggedImage(null);
    console.log(`Image dropped message at poster ${targetImage.id}`);

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
        <div className="Gallery-inner">
          {filteredImages.map((image, index) => (
            <div
              className="Gallery-item"
              key={image.id}
              draggable="true"
              onDragStart={(e) => onDragStart(e, image)}
              onDragOver={(e) => onDragOver(e, image)}
              onDrop={(e) => onDrop(e, image)}
              onTouchStart={(e) => onTouchStart(e, image)}
              onTouchMove={(e) => onTouchMove(e, image)}
              onTouchEnd={(e) => onTouchEnd(e, image)}
              data-image-id={image.id}
            >
              <img src={`${image.src}`} alt={`Poster ${image.id}`} />
              <p>{image.tag}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery;