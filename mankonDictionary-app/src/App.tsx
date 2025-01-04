import Header from "./headerItems/Header"
import Alphabet from "./alphabetItems/Alphabet"
import Browse from "./browseItems/Browse";
import Home from "./homeItems/Home";
import About from "./aboutItems/About";
import Entry from "./entryItems/Entry";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/browse-dictionary" element={<Browse />} />
        <Route path="/language-help" element={<Alphabet />} />
        <Route path="/entry" element={<Entry />} />
      </Routes>
    </Router>
    </>
  );
}
export default App
