import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
