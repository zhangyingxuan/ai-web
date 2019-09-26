import React from "react";
import videojs from "video.js/dist/video.js";
import "video.js/dist/video-js.css";
// videojs.options.flash.swf = require('videojs-swf/dist/video-js.swf');
import "videojs-flash"

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "", // VMS token
            resourceData: [], // 资源数
            videoFileStream: "rtmp://106.13.139.118:1935/vod/car.mp4", // 实时视频流地址
            visible: false,
        };
    }

    componentDidMount() {
        // this.authPremission();
        this.reloadPlayer();
    }

    componentWillUnmount() {
        const myVideoElem = document.getElementById("myVideo");
        if (myVideoElem.length > 0) {
            const player = videojs('myVideo');
            player.dispose();
        }
    }

// 视频加载并播放
    reloadPlayer = () => {
        const {videoFileStream} = this.state;
        const options = {
            width: "1298px",
            height: "600px",
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


    render() {
        // const { videoFileStream } = this.state;

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

export default Video;