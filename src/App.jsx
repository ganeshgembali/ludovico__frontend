import { useState } from "react";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import AppRoutes from "./routes/AppRoutes";

// The opening splash only plays when the app is opened on these pages.
// Refreshing /home (or any other page) goes straight to that page.
const SPLASH_PATHS = ["/", "/signin"];

function App() {
  const [showSplash, setShowSplash] = useState(() =>
    SPLASH_PATHS.includes(window.location.pathname),
  );

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <AppRoutes />;
}

export default App;
