// src/components/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Settings } from './Settings';
import { Models } from './Models';
import { Configuration } from './Configuration';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/models" element={<Models />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
