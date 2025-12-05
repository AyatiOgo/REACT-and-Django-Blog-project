import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get_Username } from "./services/apiBlogs";

const App = () => {
  const [username, setUsername] = useState(null)
  const [isAuntheticated, setIsAuthenticated] = useState(false)

  const {data} = useQuery({
    queryKey : ['username'],
    queryFn: get_Username
  })

  useEffect (()=>{
    if(data){
    setIsAuthenticated(true)
    setUsername(data.username)

    }

  }, [data])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout isAuntheticated={isAuntheticated} username={username} setIsAuthenticated={setIsAuthenticated} />}>
          <Route index element={<HomePage />} />
          <Route path="blogs/:id/" element={<DetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create-post" element={ <ProtectedRoute> <CreatePostPage /> </ProtectedRoute> } />
          <Route path="/signin" element={<LoginPage setIsAuthenticated={setIsAuthenticated}  setUsername={setUsername} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;