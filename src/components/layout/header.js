/* eslint-disable import/first */

// Import Remote for Electron so we can control the browser window via icons.
const electron = window.require('electron');
const remote = electron.remote;

import React, {Component} from 'react';

// Import BlueprintJS Modules
import {Navbar, NavbarGroup, NavbarHeading, 
    NavbarDivider, Alignment, Button, ButtonGroup,
    Tooltip, Position, Dialog, Slider, Switch} from '@blueprintjs/core';

class Header extends Component {
    state = {
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

    toggleSettingsDialog = () => {
        this.setState({settingsIsOpen: !this.state.settingsIsOpen});
    }

    render(){
        console.log(this.state.settings);
            return(

            <Navbar className="pt-navbar pt-fixed-top pt-dark">
                <NavbarGroup align={Alignment.LEFT}>
                mini
                    <NavbarHeading>FOO</NavbarHeading>
                    <small>v0.1.0</small>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                <Tooltip content="Change settings." position={Position.BOTTOM}>
                    <Button className="pt-minimal" icon="settings" onClick={()=>{this.toggleSettingsDialog()}}/> 
                </Tooltip>

                    
                    <NavbarDivider />
                    <ButtonGroup>
                        <Button className="pt-minimal" icon="minus" onClick={()=>{remote.getCurrentWindow().minimize()}}/>
                        <Button className="pt-minimal" icon="cross" onClick={()=>{remote.getCurrentWindow().close()}}/>
                    </ButtonGroup>
                </NavbarGroup>

                <Dialog
                    icon="settings"
                    isOpen={this.state.settingsIsOpen}
                    onClose={this.toggleSettingsDialog}
                    title="miniFOO Settings"
                    className="pt-dark">
                    <div className="pt-dialog-body">
                        Image Quality ({this.state.settings.imageQuality})
                        <Slider min={10} max={100} stepSize={1} 
                            labelStepSize={90} initialValue={0}
                            labelRenderer={false}
                            value={this.state.settings.imageQuality} 
                            onChange={this.handleImageQualityChange}/>
                            <hr/>
                        <Switch checked={this.state.settings.willCompressLossy}
                        label="Enable Lossy Compression" onChange={this.handleImageLossyChange}/>

                        <Switch checked={this.state.settings.willOverwriteImage}
                        label="Overwrite Files with optimized versions" onChange={this.handleImageOverwriteChange}/>

                        <Switch checked={this.state.settings.willAutoOptimize}
                        label="Start Optimize as soon as file is added" onChange={this.handleAutoOptimizeChange}/>

                        <Switch checked={this.state.settings.prefixEnabled}
                        label="Save files with prefix" onChange={()=>{this.handlePrefixSuffixToggle("prefix")}}/>

                        { this.state.settings.prefixEnabled ? <input className="pt-input" type="text" placeholder="image prefix"/> : null }
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                        
                        </div>
                    </div>
                </Dialog>
            </Navbar>

        );
    }
};

export default Header;