import { Navbar, Footer, CryptoPrices, Learn, BlogarticleBitcoin, Wallet, Blog, Quiz} from "./components";
import {BrowserRouter as Router, Route, Routes} from'react-router-dom';


const App = () => (
  

  <div className="min-h-screen">
    <div className="gradient-bg">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<><CryptoPrices /><Learn /><Wallet/></>} />
          <Route path='/blogarticlebitcoin' element={<BlogarticleBitcoin />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </Router>
    
    
    <Footer/>
    </div>
  </div>
);

export default App;
