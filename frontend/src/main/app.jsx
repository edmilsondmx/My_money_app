import React from 'react';
import { HashRouter } from 'react-router-dom';

import Header from '../common/template/Header';
import Sidebar from '../common/template/Sidebar';
import Footer from '../common/template/Footer';

import Routes from './routes';
import Messagens from '../common/msg/Messagens';

const App = (props) => {
  return (
    <HashRouter>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <Routes />
        <Footer />
        <Messagens />
      </div>
    </HashRouter>
  );
};

export default App;
