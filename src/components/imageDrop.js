/* eslint-disable import/first */

import React, {Component} from 'react';

const electron = window.require('electron');
const {ipcRenderer} = electron;
const {dialog} = electron.remote;
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');

import imagemin from 'imagemin';

import { NonIdealState, Button, Text } from '@blueprintjs/core';

import { Scrollbars } from 'react-custom-scrollbars';

class ImageDropper extends Component {
    state = {
        readyFiles: [],
        optimFiles: []
    }

    openFileExplorerWindow = () => {
        dialog.showOpenDialog({filters: [
            {name: 'Images', extensions: ['jpg', 'png']}], buttonLabel: 'Optimize Images', properties:[
            'openFile', 'multiSelections',] }, (filePaths) => {
                console.log(filePaths);
                for(let eachPath in filePaths){
                    let itemPath = filePaths[eachPath];
                    let itemName = path.basename(filePaths[eachPath]);
                    let itemSize;
                    fs.stat(filePaths[eachPath], (error, data)=>{
                        if (error) throw error;
                        itemSize = data.size;

                        let nState = this.state.readyFiles.slice();
                        nState.push({"filePath": itemPath, "fileName": itemName, "fileSize": itemSize});
                        this.setState({readyFiles:nState});
                    });


                }
                if(filePaths === null){
                    ipcRenderer.send('onFileAdded', [...filePaths]);
                }
                

                
            }
        );
    }

    handleFileDrag = (event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        ipcRenderer('ondragstart', "testing");
        
    }

    generateTableLayout = () => {
        let tableElement = this.state.readyFiles.map((item,i)=>{
            return(
                <tr key={i}>
                    <td><Text ellipsize={true}>{item.fileName}</Text></td>
                    <td>{item.fileSize}</td>
                    <td>compressing...</td>
                </tr>
            );
        });

        let table = (
            <table className="pt-html-table pt-small image-table">
            <thead>
                <tr>
                    <th>filename</th>
                    <th>file size</th>
                    <th>new file size</th>
                </tr>
            </thead>
            <tbody>
                {tableElement}
            </tbody>
            </table>
        );
        return table;
    }

    render(){
        return(
            <div className="divDropper"
                onDrop={(e)=>{this.handleFileDrag(e)}}>

                {
                
                this.state.readyFiles.length > 0 ? 

                <Scrollbars autoHide universal
                autoHideTimeout={50}
                autoHideDuration={0}>
                    <div className="tableDropper">
                        <Button className="pt-minimal pt-intent-primary" text="Add More Files" onClick={this.openFileExplorerWindow}/>
                        {this.generateTableLayout()}
                    </div>
                </Scrollbars>
                
                : 
                
                <div className="niDropper" 
                onClick={this.openFileExplorerWindow}>
                    <NonIdealState
                    title="Drop me a file!"
                    visual="folder-open"
                    description="(or just click on me to open a window.)"/>
                </div>

                }
            </div>
        );
    }
}

export default ImageDropper;