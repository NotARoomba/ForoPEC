import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './tsx/pages/Home';
import './css/index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Error from './tsx/pages/Error';
import Acerca from './tsx/pages/Acerca';
import Salones from './tsx/pages/Salones';
import Programacion from './tsx/pages/Programacion';
import Mapa from './tsx/pages/Mapa';
import NavbarWrapper from './tsx/components/nav/NavBarWrapper';
import Historia from './tsx/pages/Historia';
const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    errorElement: <Error />,
    children: [
      {
        path: '/', // yes, again
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/acerca',
        element: <Acerca />,
        errorElement: <Error />,
      },
      {
        path: '/historia',
        element: <Historia />,
        errorElement: <Error />,
      },
      {
        path: '/salones',
        element: <Salones />,
        errorElement: <Error />,
      },
      {
        path: '/programacion',
        element: <Programacion />,
        errorElement: <Error />,
      },
      {
        path: '/mapa',
        element: <Mapa />,
        errorElement: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
