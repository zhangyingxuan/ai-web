import React from 'react'
import {Button, Card, Col, Icon, Radio, Row, Table, Tag} from "antd";
import Video from "../../components/widget/customVidio";
import PieChart from '@/components/echarts/PieChart'
import LineChart from '@/components/echarts/LineChart'
import BarChart from '@/components/echarts/BarChart'
import API from '../../api'
import {changeVideoSource, getRandomNumberByRange} from '@/utils'

const pageName = 'hat'
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

        this.loadTop10()
        this.loadPieData()
        this.loadBarData()
        this.loadLineData()
    }

    loadTop10() {
        API.hat.fetchTop10(1).then((res) => {
            if (res.status === 200) {
                this.setState({
                    tableData: res.data
                })
            }
        }).catch((err) => {

        }).finally(() => {

        })
    }

    loadPieData() {
        this.setState({
            tableLoading: true
        })
        API.hat.fetPieData(1).then((res) => {
            console.log(res)
            const results = res.data
            let data = []
            if (results && Array.isArray(results) && results.length > 0) {
                results.map((result) => {
                    data.push({
                        value: result.warning_times || 0,
                        name: result.cameraStatus
                    })
                })
            }
            this.setState({
                pieData: data,
                currentPieData: data
            })
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            this.setState({
                tableLoading: false
            })
        })
    }

    loadBarData() {
        API.hat.fetchBarData(1).then((res) => {
        }).catch((err) => {

        }).finally(() => {
        })

        var dataAxis = ['1', '2', '3', '4', '5', '6', '7'];
        var data = [];
        const dataLen = 10
        for(let i = 0; i < dataLen; i++) {
            data.push(getRandomNumberByRange(10, 50))
        }

        this.setState({
            barData: data,
            barDataAxis: dataAxis
        })
    }

    /**
     *  获取线形图数据
     */
    loadLineData() {
        API.hat.fetchCurrentData(1).then((res) => {
            console.log(res)
        }).catch((err) => {

        }).finally(() => {

        })

        let lineDataSetSource = []
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        var data = [getRandomNumberByRange(0, 5)];

        for (var i = 1; i < 50; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(getRandomNumberByRange(0, 5));
        }
        data.unshift('线形图')
        lineDataSetSource.push(date, data)

        this.setState({
            lineDataSetSource
        })
    }

    handleRedioChange(value) {
        changeVideoSource(pageName, value)
        if(value === 'rtmp') {
        // if(e.target.value === 'rtmp') {
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
        const {pieData, barData, barDataAxis, lineDataSetSource, currentPieData, tableData, tableLoading, videoUrl} = this.state
        const columns = [
            {
                title: '设备ID',
                dataIndex: 'cameraId',
                key: 'cameraId',
            },
            {
                title: '告警时间',
                dataIndex: 'warningTime',
                key: 'warningTime',
                render: (text) => text ? text.split(" ")[0] : ''
            },
        ];
        const tagColors = ['#329DCE', '#FF9800', '#AA314D']
        // const tagColors = ['#2db7f5', '#f50' , '']

        return (
            <Row gutter={16} className='person-flow-container container-content'>
                <Col span={18}>
                    <Card bordered={false}
                          actions={[
                              <Button type="primary" shape="round" onClick={this.handleRedioChange.bind(this, 'rtmp')}>
                                  <Icon type="step-backward" />摄像头
                              </Button>,
                              <Button type="primary" shape="round" onClick={this.handleRedioChange.bind(this, 'video')}>
                                  播放视频<Icon type="step-forward" />
                              </Button>
                          ]}
                          hoverable className='video-container-card' style={{height: 978}}>
                        <Video videoFileStream={videoUrl}/>
                    </Card>
                </Col>
                <Col span={6} className='charts-group'>

                    {/*<Card style={{height: 85}}*/}
                    {/*      bordered={false}*/}
                    {/*      hoverable>*/}
                    {/*    <Radio.Group defaultValue="rtmp" buttonStyle="solid" onChange={this.handleRedioChange.bind(this)}>*/}
                    {/*        <Radio.Button value="rtmp">摄像头</Radio.Button>*/}
                    {/*        <Radio.Button value="video">播放视频</Radio.Button>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Card>*/}

                    <Card style={{height: 213}}
                          bordered={false}
                          hoverable>

                        <BarChart dataAxis={barDataAxis}
                                  data={barData}
                                  title='前一天安全帽佩戴报警次数'
                                  subtitle=''
                                  height='165px'
                                  width='100%'
                                  timeInterval={60}
                                  query={this.loadBarData.bind(this)}
                                  loopQuery={true}
                                  seriesName='前一天安全帽佩戴报警次数'/>
                    </Card>

                    <Card style={{height: 135}}
                          bordered={false}
                          hoverable>
                        <Row>
                            <Col span={6}>
                                {/*<CustomCard/>*/}
                                <PieChart data={pieData}
                                          title='安全帽报警次数占比'
                                          subtitle=''
                                          seriesName='安全帽报警次数占比'/>
                            </Col>
                            <Col span={18}>
                                <h3 style={{textAlign: 'center', fontWeight: 700}}>当前人流密度分类占比</h3>
                                <div className='pie-data flex-row'>
                                    {
                                        currentPieData && Array.isArray(currentPieData) && (currentPieData.map((pieData, index) => {
                                            return <div>
                                                <Tag color={tagColors[index]}>{pieData.name}</Tag>
                                                <span style={{fontSize: 18, fontWeight: 500}}>{pieData.value}</span>
                                            </div>
                                        }))
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    <Card bordered={false} hoverable style={{height: 380}}>
                    {/*<Card bordered={false} hoverable style={{height: 265}}>*/}
                        <Table columns={columns}
                               size='middle'
                               loading={tableLoading}
                               scroll={{y: 240}}
                               pagination={{pageSize: 5}}
                               dataSource={tableData}/>
                    </Card>

                    <Card style={{height: 213}}
                          bordered={false}
                          hoverable>

                        <LineChart data={lineDataSetSource}
                                   title='当前安全帽佩戴报警次数'
                                   subtitle=''
                                   seriesName='当前安全帽佩戴报警次数'
                                   timeInterval={30}
                                   query={this.loadLineData.bind(this)}
                                   loopQuery={true}
                                   height='165px'
                                   width='100%'/>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default index