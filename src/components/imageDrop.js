/* eslint-disable import/first */

import React, {Component} from 'react';

const {shell, app} = window.require('electron');

import { NonIdealState } from '@blueprintjs/core';

class ImageDropper extends Component {
    state = {
        droppedFiles: [],
        optimFiles: []
    }

    onOpenFileClickHandler = () => {
        console.log("got clicked");
    }

    render(){
        return(
            <div onClick={this.onOpenFileClickHandler}>
                <NonIdealState
                    title="Drop me a file!"
                    visual="folder-open"
                    description="(just drag and drop to get started.)"/>
            </div>
        );
    }
}

export default ImageDropper;