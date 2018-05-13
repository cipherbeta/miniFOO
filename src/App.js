import React, { Component } from 'react';
import './App.css';

import Header from './components/layout/header';
import Layout from './hoc/layout';
import ImageDropper from './components/imageDrop';

class App extends Component {
  state = {
    images: [],
    settingsIsOpen: false,
    settings: {
        imageQuality: 70,
        willCompressLossy: true,
        willOverwriteImage: false,
        willAutoOptimize: false,
        prefixEnabled: false,
        prefixText: "",
        suffixEnabled: false,
        suffixText: ""
    }
  }

  handleImageQualityChange = (newQuality) => {
    this.setState(({settings})=> ({settings: {
        ...settings,
        imageQuality: newQuality
    }}));
  }

  handleImageLossyChange = () => {
      this.setState(({settings})=> ({settings: {
          ...settings,
          willCompressLossy: !this.state.settings.willCompressLossy
      }}));
  }

  handleImageOverwriteChange = () => {
      this.setState(({settings})=> ({settings: {
          ...settings,
          willOverwriteImage: !this.state.settings.willOverwriteImage
      }}));
  }

  handleAutoOptimizeChange = () => {
      this.setState(({settings})=> ({settings: {
          ...settings,
          willAutoOptimize: !this.state.settings.willAutoOptimize
      }}));
  }

  handlePrefixSuffixToggle = (type) => {
      if(type === "prefix"){
          this.setState(({settings})=> ({settings: {
              ...settings,
              prefixEnabled: !this.state.settings.prefixEnabled
          }}));
      } else if(type === "suffix"){
          this.setState(({settings})=> ({settings: {
              ...settings,
              suffixEnabled: !this.state.settings.suffixEnabled
          }}));
      }
  }

  handlePrefixChange = (v) => {
    console.log(v);
    this.setState(({settings})=> ({settings: {
      ...settings,
      prefixText: v
  }}));
  }

  toggleSettingsDialog = () => {
      this.setState({settingsIsOpen: !this.state.settingsIsOpen});
  }

  render() {
    console.log(this.state.settings);
    return (
      <div className="App pt-dark">
        <Layout>
          <Header
          
            settingsOpen={this.state.settingsIsOpen}
            toggleSettingsDialog={()=>{this.toggleSettingsDialog()}}

            imageQuality={this.state.settings.imageQuality}
            handleImageQualityChange={(e)=>{this.handleImageQualityChange(e)}}

            willCompressLossy={this.state.settings.willCompressLossy}
            handleWillCompressLossy={()=>{this.handleImageLossyChange()}}

            willOverwriteImage={this.state.settings.willOverwriteImage}
            handleImageOverwriteChange={()=>{this.handleImageOverwriteChange()}}

            willAutoOptimize={this.state.settings.willAutoOptimize}
            handleAutoOptimizeChange={()=>{this.handleAutoOptimizeChange()}}

            prefixEnabled={this.state.settings.prefixEnabled}
            handlePrefixSuffixToggle={(e)=>{this.handlePrefixSuffixToggle("prefix")}}
            handlePrefixChange={(e)=>{this.handlePrefixChange(e)}}

            />
          <ImageDropper/>
        </Layout>
      </div>
    );
  }
}

export default App;
