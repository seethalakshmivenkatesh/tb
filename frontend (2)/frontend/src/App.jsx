import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeadFoot from './HeadFoot';
import Register from './InOut/Register';
import Login from './InOut/Login';
import HomeParent from './Home/HomeParent';
import CollectionsParent from './Collections/CollectionsParent';
import About from './About/AboutContent';
import Contact from './Contact/ContactContent';
import Logout from './InOut/LogOut';
import CartPage from './CartPage';
import PrivateRoute from './protection/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HeadFoot />}>


          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="homeparent" element={
            <PrivateRoute><HomeParent /></PrivateRoute>} />

          <Route
            path="collectionsparent"
            element={
              <PrivateRoute>
                <CollectionsParent />
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="cartpage"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
