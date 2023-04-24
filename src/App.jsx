import { Navbar, Welcome, Footer, CryptoPrices, Learn, BlogarticleBitcoin, Wallet} from "./components";
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
    <Wallet/>
    <Footer/>
  </div>
);

export default App;
