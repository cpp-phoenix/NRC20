import logo from './logo.svg';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Faucet from './pages/Faucet';
import Home from './pages/Home';
import Liquidity from './pages/Liquidity';
import Trade from './pages/Trade';

export const filecoin = {
  id: 314_159,
  name: 'Filecoin',
  network: 'Filecoin',
  iconUrl: 'https://filecoin-io.ipns.dweb.link/images/filecoin-logo.svg',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
    default: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    etherscan: { name: 'calibration', url: 'https://calibration.filscan.io' },
    default: { name: 'calibration', url: 'https://calibration.filscan.io' },
  },
}

const { chains, publicClient } = configureChains(
  [filecoin],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Fluidity',
  projectId: '6160c615f05244c0838315aec9610295',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="bg-[#1d2839] w-screen h-screen">
          <Router>
            <Navbar/>  
            <Routes>
              <Route path='/' exact element={<Home/>}/>
              <Route path='/faucet' exact element={<Faucet/>}/>
              <Route path='/liquidity' exact element={<Liquidity/>}/>
              <Route path='/trade' exact element={<Trade/>}/>
            </Routes>
          </Router>
        </div>  
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
