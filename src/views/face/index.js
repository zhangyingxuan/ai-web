import React from 'react'
import {Button, Card, Icon} from "antd";
import Video from "../../components/widget/customVidio";
import {changeVideoSource} from '@/utils'

const pageName = 'face'

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barData: {},
            barDataAxis: {},
            pieData: {},
            lineDataSetSource: {},
            optionBar: {},
            optionLine: {},
            tableData: [],
            tableLoading: false,
            videoUrl: "rtmp://192.168.1.101:1935/live/5"
        }
    }

    componentWillMount() {
        // 切花直播内容
        changeVideoSource(pageName, 'rtsp')
    }

    handleRedioChange(value) {
        changeVideoSource(pageName, value)
        if (value === 'rtmp') {
            this.setState({
                videoUrl: "rtmp://192.168.1.101:1935/live/5"
            })
        } else {
            this.setState({
                videoUrl: "rtmp://192.168.1.101:1935/live/6"
            })
        }
    }

    render() {
        const {videoUrl} = this.state

        return (
            <Card bordered={false}
                  hoverable
                  className='container-content'
                  style={{height: 985, width: 1832}}
                  actions={[
                      <Button type="primary" shape="round" onClick={this.handleRedioChange.bind(this, 'rtmp')}>
                          <Icon type="step-backward" />摄像头
                      </Button>,
                      <Button type="primary" shape="round" onClick={this.handleRedioChange.bind(this, 'video')}>
                          播放视频<Icon type="step-forward" />
                      </Button>
                  ]} >
                <Video videoFileStream={videoUrl}
                       width='1784px'
                       height='880px'/>
            </Card>
        );
    }
}

export default index