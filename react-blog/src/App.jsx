import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogContainer from "./ui_components/BlogContainer";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import NavBar from "./ui_components/NavBar";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blogs/:id/" element={<DetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create-post" element={ <ProtectedRoute> <CreatePostPage /> </ProtectedRoute> } />
          <Route path="/signin" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;