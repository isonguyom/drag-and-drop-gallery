import { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

function GalleryItem(props) {
  return (
    <div className="Gallery-item">
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.image.poster_path}`}
        alt={props.image.title}
      />
    </div>
  );
}

function Gallery() {
    // const { user, isAuthenticated, isLoading } = useAuth0();
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    // Fetch images from TMDB API
    const fetchImages = async () => {
      const apiKey = "157f8b6f3dd6720eb58c49ebb5454947";
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        const data = await response.json();
        setGalleryImages(data.results.slice(0, 12));
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    fetchImages();
  }, []);

  if (galleryImages.length === 0) {
    return <div>Loading top movies...</div>;
  }
//   if (!isAuthenticated) {
//     e.preventDefault(); // Prevent dragging if the user is not logged in
//   }

  return (
    <section className="Gallery">
      {galleryImages.map((image) => (
        <GalleryItem key={image.id} image={image} />
      ))}
    </section>
  );
}
export default Gallery;
