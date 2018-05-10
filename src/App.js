import React, { Component } from 'react';
import './App.css';

import Layout from './hoc/layout';
import ImageDropper from './components/imageDrop';

class App extends Component {
  render() {
    return (
      <div className="App pt-dark">
        <Layout>
          <ImageDropper/>
        </Layout>
      </div>
    );
  }
}

export default App;
