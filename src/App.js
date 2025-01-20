import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected";

import Login from "./components/auth/login";
import List from "./components/blog/list";
import Create from "./components/blog/create";
import Edit from "./components/blog/edit";
import PageNotFound from "./components/404";
import View from "./components/blog/view";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog/list"
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/edit/:id"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/view/:id"
            element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
