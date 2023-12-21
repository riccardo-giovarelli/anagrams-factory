import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home';


const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <div className='app_container'>
    <RouterProvider router={router} />
  </div>
}

export default App
