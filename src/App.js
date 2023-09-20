import { useAuth0 } from "@auth0/auth0-react";
import Gallery from "./components/Gallery";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Search from "./components/Search";
import "./App.css";

function App() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="App">
      <header className="Header">
        {isAuthenticated ? (
          <div className="profile-bar">
            <p className="greetings">Hello, {user.name}!</p>
            <LogoutButton />
          </div>
        ) : (
          <div className="profile-bar">
            <p className="greetings">Hello, Guest</p>
            <LoginButton />
          </div>
        )}
        <Search />
      </header>
      <Gallery />
    </div>
  );
}

export default App;
