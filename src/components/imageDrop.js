/* eslint-disable import/first */

import React, {Component} from 'react';

const electron = window.require('electron');
const {ipcRenderer} = electron;
const {dialog} = electron.remote;
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');

import { NonIdealState, Button, Text } from '@blueprintjs/core';

class ImageDropper extends Component {
    state = {
        readyFiles: [],
        optimFiles: []
    }

    openFileExplorerWindow = () => {
        dialog.showOpenDialog({buttonLabel: 'Optimize Images', properties:[
            'openFile', 'multiSelections']}, (openPath) => {
                console.log(openPath);
                for(let eachPath in openPath){
                    let itemPath = openPath[eachPath];
                    let itemName = path.basename(openPath[eachPath]);
                    let itemSize;
                    fs.stat(openPath[eachPath], (error, data)=>{
                        if (error) throw error;
                        console.log(data.size);
                        itemSize = data.size;

                        let nState = this.state.readyFiles.slice();
                        nState.push({"filePath": itemPath, "fileName": itemName, "fileSize": itemSize});
                        this.setState({readyFiles:nState});
                    });


                }

                ipcRenderer.send('onFileAdded', [...openPath]);
            }
        );
    }

    handleFileDrag = (e) => {
        e.preventDefault();
        console.log("drag completed");
        
    }

    generateTableLayout = () => {
        console.log('ready to create table');

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
            <table className="pt-html-table pt-interactive pt-small image-table">
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
        console.log(this.state.readyFiles);
        return(
            <div className="divDropper"
                onDrop={this.handleFileDrag}>


                {
                
                this.state.readyFiles.length > 0 ? 
                <div className="tableDropper">
                    <Button className="pt-minimal pt-intent-primary" text="Add More Files" onClick={this.openFileExplorerWindow}/>
                    {this.generateTableLayout()}
                </div>
                
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