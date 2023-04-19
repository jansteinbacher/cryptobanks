import { Navbar, Welcome, Footer, CryptoPrices, Learn, BlogarticleBitcoin} from "./components";
import {BrowserRouter as Router, Route, Routes} from'react-router-dom';


const App = () => (
  

  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<><CryptoPrices /><Learn /><Welcome /></>} />
          <Route path='/blog' element={<BlogarticleBitcoin />} />
        </Routes>
      </Router>
    </div>
    <Footer/>
  </div>
);

export default App;
