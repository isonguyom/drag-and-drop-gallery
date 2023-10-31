import { useAuth0 } from "@auth0/auth0-react";
import Gallery from "./components/Gallery";
import GalleryNotDraggable from "./components/GalleryNotDraggable";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import "./App.css";

function App() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <header className="Header">
            <div className="profile-bar">
              <p className="greetings">Hello, {user.name}!</p>
              <LogoutButton />
            </div>
          </header>
          <Gallery />
        </div>
      ) : (
        <div>
          <header className="Header">
            <div className="profile-bar">
              <p className="greetings">Hello, Guest </p>
              <LoginButton /> 
              <p className="greetings2">to use drag and drop</p>
            </div>
          </header>
          <GalleryNotDraggable />
        </div>
      )}
    </div>
  );
}

export default App;
