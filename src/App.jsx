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
      <Route path="/" element={<HomeFeed/>} />
      <Route path="/create" element={<CreatePost/>} /> 
      <Route path="/post/:id" element={<PostInfo/>} />
      <Route path="/edit/:id" element={<EditPost/>} />
      <Route path="*" element={ <NotFound /> }/>
    </Routes>
    <NavBar />
  </BrowserRouter>
  )
}

export default App
