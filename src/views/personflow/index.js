import React from 'react'
import {Button, Card, Col, Icon, Radio, Row, Table, Tag} from "antd";
import './index.scss'
import Video from "../../components/widget/customVidio";
import PieChart from '@/components/echarts/PieChart'
import LineChart from '@/components/echarts/LineChart'
import BarChart from '@/components/echarts/BarChart'
import API from '../../api'
import {changeVideoSource} from '@/utils'

const pageName = 'person'
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
            videoUrl: "rtmp://192.168.1.101:1935/live/1"
            // videoUrl: "rtmp://106.13.139.118:1935/vod/car.mp4"
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
        API.personflow.fetchTop10(1).then((res) => {
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
        API.personflow.fetPieData(1).then((res) => {
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
        API.personflow.fetchBarData(1).then((res) => {
            var dataAxis = ['1', '2', '3', '4', '5', '6', '7'];
            var data = [10, 52, 200, 334, 390, 330, 220];
            var yMax = 500;

            this.setState({
                barData: data,
                barDataAxis: dataAxis
            })
        }).catch((err) => {

        }).finally(() => {

        })
    }

    /**
     *  获取线形图数据
     */
    loadLineData() {
        API.personflow.fetchCurrentPerson(1).then((res) => {
            console.log(res)
        }).catch((err) => {

        }).finally(() => {

        })

        let lineDataSetSource = []
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        var data = [Math.random() * 300];

        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
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
                videoUrl: "rtmp://192.168.1.101:1935/live/1"
            })
        } else {
            this.setState({
                videoUrl: "rtmp://192.168.1.101:1935/live/2"
                // videoUrl: "rtmp://106.13.139.118:1935/vod/flowcount.mp4"
            })
        }
    }

    render() {
        const {pieData, barData, barDataAxis, lineDataSetSource, currentPieData, tableData, tableLoading, videoUrl} = this.state
        const columns = [
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                width: 220,
                render: (text) => <span title={text} className='ellipsis-text'>{text}</span>
            },
            {
                title: '人数',
                dataIndex: 'person_count',
                key: 'age',
            },
            {
                title: '时间',
                dataIndex: 'timestamps',
                key: 'timestamps',
                render: (text) => text ? text.split(" ")[0] : ''
            },
        ];
        const tagColors = ['#329DCE', '#FF9800', '#AA314D']
        // const tagColors = ['#2db7f5', '#f50' , '']

        return (
            <Row gutter={16} className='person-flow-container container-content'>
                <Col span={18}>
                    <Card bordered={false}
                          hoverable
                          className='video-container-card'
                          style={{height: 978}}
                          actions={[
                              <Button type="primary" shape="round" onChange={this.handleRedioChange.bind(this, 'rtmp')}>
                                  <Icon type="step-backward" />摄像头
                              </Button>,
                              <Button type="primary" shape="round" onChange={this.handleRedioChange.bind(this, 'video')}>
                                  播放视频<Icon type="step-forward" />
                              </Button>
                          ]}>
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
                                  title='当前人流密度分类占比'
                                  subtitle=''
                                  height='165px'
                                  width='100%'
                                  seriesName='当前人流密度分类占比'/>
                    </Card>

                    <Card style={{height: 135}}
                          bordered={false}
                          hoverable>
                        <Row>
                            <Col span={6}>
                                {/*<CustomCard/>*/}
                                <PieChart data={pieData}
                                          title='当前人流密度分类占比'
                                          subtitle=''
                                          seriesName='当前人流密度分类占比'/>
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
                                  title='当前人流密度分类占比'
                                  subtitle=''
                                  seriesName='当前人流密度分类占比'
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
