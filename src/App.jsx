import NavBar from './components/NavBar.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import HomeFeed from './pages/HomeFeed';
import PostInfo from './pages/PostInfo';
import NotFound from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for home feed */}
        <Route path="/" element={<HomeFeed />} />
        
        {/* Route for creating a new post */}
        <Route path="/create" element={<CreatePost />} />
        
        {/* Route for viewing details of a specific post */}
        <Route path="/post/:id" element={<PostInfo />} />
        
        {/* Route for editing a specific post */}
        <Route path="/edit/:id" element={<EditPost />} />
        
        {/* Catch-all route for undefined paths, rendering a "Not Found" page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Render the navigation bar that appears across all pages */}
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
