import React from "react";
import videojs from "video.js/dist/video.js";
import "video.js/dist/video-js.css";
// videojs.options.flash.swf = require('videojs-swf/dist/video-js.swf');
import "videojs-flash"
import PropTypes from 'prop-types';
import AutoRefreshChart from "../LineChart";
import _ from "lodash";

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.videoFileStream, this.props.videoFileStream) && !_.isEmpty(this.props.videoFileStream)) {
            this.reloadPlayer()
        }
    }

    componentDidMount() {
        this.reloadPlayer();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount Video')
        if (this.player) {
            this.closePlayer()
        }
    }

// 视频加载并播放
    reloadPlayer = () => {
        const {width, height, videoFileStream} = this.props
        console.log(videoFileStream)
        const options = {
            width,
            height,
            // aspectRatio: '16:8',
            controls: 'controls',
            preload: "auto",
            autoPlay: 'autoPlay',
        };
        this.player = videojs('myVideo', options);
        this.player.src({
            src: videoFileStream,
            type: 'rtmp/flv',
        });
        this.player.load();
        this.player.play();
    }

    closePlayer() {
        this.player.pause();//暂停 相当于停止效果
        this.player.dispose()
    }

    render() {
        return (
            <div className='my-video-container'>
                <video
                    id="myVideo"
                    // data-setup='{"aspectRatio": "12:4"}'
                    // data-setup='{"fluid": true, "aspectRatio": "16:9"}'
                    className="video-js vjs-default-skin vjs-big-play-centered"
                >
                    {/* <source */}
                    {/* src="" */}
                    {/* type="rtmp/flv" */}
                    {/* /> */}
                    <p className="vjs-no-js">
                        您的浏览器不支持HTML5，请升级浏览器。
                    </p>
                    <track kind="captions"/>
                </video>
            </div>
        );
    }
}

Video.defaultProps = {
    width: '1298px',
    height: '881px',
    videoFileStream: "rtmp://106.13.139.118:1935/vod/car.mp4", // 实时视频流地址
}

export default Video;