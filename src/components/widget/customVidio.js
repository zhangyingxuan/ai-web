import React, { Component } from 'react';
import { Player } from 'video-react';
import "node_modules/video-react/dist/video-react.css";

class customPageLoading extends Component {
    state = {
    }
    render() {
        return (
            <Player ref="player" videoId="video-1">

                <source src={this.state.inputVideoUrl}/>

            </Player>
        )
    }
}

export default customPageLoading;