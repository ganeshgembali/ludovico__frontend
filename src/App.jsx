import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { loading } = useAuth();

  const [showSplash, setShowSplash] = useState(
    window.location.pathname === "/",
  );

  // Keep the splash visible while AuthProvider
  // is restoring the existing login session.
  if (showSplash || loading) {
    return (
      <SplashScreen
        onComplete={() => {
          if (!loading) {
            setShowSplash(false);
          }
        }}
      />
    );
  }

  return <AppRoutes />;
}

export default App;
