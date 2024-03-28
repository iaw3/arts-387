import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';

import TitlePage from './pages/titlePage';
import StartPage from './pages/startPage';
import LocationPage from './pages/locationPage';
import GeneralPage from './pages/generalPage';
import SoundToggle from './components/soundToggleComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<TitlePage />} />
            <Route path="start" element={<StartPage />} />
            <Route path="space" element={<LocationPage />} />
            <Route path="a-healing-place" element={<GeneralPage />}/>
            <Route path="a-soft-place" element={<GeneralPage />}/>
            <Route path="a-chaotic-place" element={<GeneralPage />}/>
            <Route path="an-eternal-place" element={<GeneralPage />}/>
            <Route path="an-empty-place" element={<GeneralPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>      
    </div>

  )
}

export default App