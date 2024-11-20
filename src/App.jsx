import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './pages/CreatePost.jsx';
import HomeFeed from './pages/HomeFeed.jsx';
import PostDetails from './pages/PostDetails.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeFeed/>} />
      <Route path="/create-post" element={<CreatePost/>} /> 
      <Route path="/post/:id" element={<PostDetails/>} />
      <Route path="*" element={ <NotFound /> }/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
