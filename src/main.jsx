import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import CreatePost from './pages/CreatePost.jsx';
import HomeFeed from './pages/HomeFeed.jsx';
import PostDetails from './pages/PostDetails.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
