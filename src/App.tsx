import './App.css'
import 'flowbite';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SeedPhrase from './components/SeedPhrase';
import Wallet from './components/Wallet';
import SeedPhraseValidate from './components/SeedPhraseValidate';
import { WalletProvider } from './context/WalletContext';
import CreatePassword from './components/CreatePassword';
import CreateWallet from './components/CreateWallet';
import Test from './components/test';

function App() {

  return (
   <WalletProvider>
   <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/create-wallet' element={<CreateWallet />} />
          <Route path='/seed-phrase' element={<SeedPhrase />} />
          <Route path='/seed-phrase/validate' element={<SeedPhraseValidate />} />
          <Route path='/create-password' element={<CreatePassword />} />
          <Route path='/wallet' element={<Wallet />}/>
          <Route path='/test' element={<Test />} />
      </Routes>
   </BrowserRouter>
   </WalletProvider>
  )
}

export default App
