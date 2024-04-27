import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import PostDetail from './components/PostDetail';


const App = () => {

  // Default sort is to sort by review date
  const [sortType, setSortType] = useState('created_at');  
  const [searchQuery, setSearchQuery] = useState('');

  const posts = []

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts sortType={sortType} searchQuery={searchQuery} />
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path: "/posts/:id",
      element: <PostDetail />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1> Burn</h1>
        <Link to="/"><button className="headerBtn"> Feed  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit a Review </button></Link>
        <button className="headerBtn" onClick={() => setSortType('created_at')}> Newest </button>
        <button className="headerBtn" onClick={() => setSortType('rating')}> Most Popular </button>
        <input
          className= "searchBox"
          type="text"
          placeholder="Search by Workout or Gym..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p> Get authentic reviews from real people that attended your favorite gym or workout class.</p>
      </div>
        
        {element}
    </div>
  );
}

export default App;