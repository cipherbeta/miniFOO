/* eslint-disable import/first */

// Import Remote for Electron so we can control the browser window via icons.
const electron = window.require('electron');
const remote = electron.remote;

import React from 'react';

// Import BlueprintJS Modules
import {Navbar, NavbarGroup, NavbarHeading, 
    NavbarDivider, Alignment, Button, ButtonGroup,
    Tooltip, Position, Dialog, Slider, Switch} from '@blueprintjs/core';

const Header = (props) => {
    return(
    <Navbar className="pt-navbar pt-fixed-top pt-dark">
        <NavbarGroup align={Alignment.LEFT}>
        mini
            <NavbarHeading>FOO</NavbarHeading>
            <small>v0.1.0</small>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
        <Tooltip content="Change settings." position={Position.BOTTOM}>
            <Button className="pt-minimal" icon="settings" onClick={props.toggleSettingsDialog}/> 
        </Tooltip>

            
            <NavbarDivider />
            <ButtonGroup>
                <Button className="pt-minimal" icon="minus" onClick={()=>{remote.getCurrentWindow().minimize()}}/>
                <Button className="pt-minimal" icon="cross" onClick={()=>{remote.getCurrentWindow().close()}}/>
            </ButtonGroup>
        </NavbarGroup>

        <Dialog
            icon="settings"
            isOpen={props.settingsOpen}
            onClose={props.toggleSettingsDialog}
            title="miniFOO Settings"
            className="pt-dark">
            <div className="pt-dialog-body">
                Image Quality ({props.imageQuality})
                <Slider min={10} max={100} stepSize={1} 
                    labelStepSize={90} initialValue={0}
                    labelRenderer={false}
                    value={props.imageQuality} 
                    onChange={props.handleImageQualityChange}/>
                    <hr/>
                <Switch checked={props.willCompressLossy}
                label="Enable Lossy Compression" onChange={props.handleWillCompressLossy}/>

                <Switch checked={props.willOverwriteImage}
                label="Overwrite Files with optimized versions" onChange={props.handleImageOverwriteChange}/>

                <Switch checked={props.willAutoOptimize}
                label="Start optimizing as soon as a file is added" onChange={props.handleAutoOptimizeChange}/>

                <Switch checked={props.prefixEnabled}
                label="Save files with prefix" onChange={props.handlePrefixSuffixToggle}/>

                { props.prefixEnabled ? <input className="pt-input" type="text" placeholder="image prefix"/> : null }
            </div>
            <div className="pt-dialog-footer">
                <div className="pt-dialog-footer-actions">
                
                </div>
            </div>
        </Dialog>
    </Navbar>

    );
}

export default Header;