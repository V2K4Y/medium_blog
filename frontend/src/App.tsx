import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import { Singin } from './pages/Singin';
import { Singup } from './pages/Singup';
import { NotFound } from './pages/NotFound';
import { Blogs } from './pages/Blogs';
import { FullBlog } from './pages/FullBlog';
import { Publish } from './pages/Publish';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/signin' element = {<Singin/>} />
        <Route path='/signup' element = {<Singup/>}/>
        <Route path='/blogs' element = {<Blogs />}/>
        <Route path='/profile' element = {<Profile />}/>
        <Route path='/blog/:id' element = { <FullBlog />} />
        <Route path='/publish' element = {<Publish />} />
        <Route path='*' element = {<NotFound />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
