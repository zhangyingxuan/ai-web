import React from 'react'
import {Radio, Card, Col, Row, Table, Tag} from "antd";
import AutoRefreshChart from "../../components/echarts/AutoRefreshChart";
import './index.scss'
import Video from "../../components/widget/customVidio";
import PieChart from '@/components/echarts/PieChart'
import API from '../../api'
import {changeVideoSource} from '@/utils'

const xAxisCommonStyle = {
    type: 'time',
    gridIndex: 0,
    axisLine: {
        lineStyle: {
            color: '#ABB4BE', // x轴的颜色
            width: 1// 轴线的宽度
        }
    },
    boundaryGap: ['0', '0'],
    min: 'dataMin',
    max: 'dataMax',
    interval: 3 * 60 * 1000,
    axisLabel: {
        color: '#8591A5',
        fontSize: 12
    }
    // minInterval: 300 * 1000,
    // maxInterval: 300 * 1000
}

const yAxisCommonStyle = {
    show: true,
    axisLine: {
        lineStyle: {
            color: '#ABB4BE', // x轴的颜色
            width: 1// 轴线的宽度
        }
    },
    boundaryGap: ['0', '0'],
    axisLabel: {
        color: '#8591A5',
        fontSize: 12
    }
    // name: 'Mi'
}

const titleCommonStyle = {
    color: '#242E42',
    fontWeight: '600',
    fontSize: '16'
}

const grid = {
    left: '2%',
    right: '2%',
    bottom: '3%',
    containLabel: true
}

const legend = {
    right: '2%',
    top: '10%'
}

const lineStyleArr = [{
    normal: {
        color: '#3485B0',
        // 折线点的颜色
        lineStyle: {
            color: '#3485B0',
            width: 1
            // 折线的颜色
        }
    }
}, {
    normal: {
        color: '#5FC091',
        // 折线点的颜色
        lineStyle: {
            color: '#5FC091',
            width: 1
            // 折线的颜色
        }
    }
}, {
    normal: {
        color: '#DFAF4F',
        // 折线点的颜色
        lineStyle: {
            color: '#DFAF4F',
            width: 1
            // 折线的颜色
        }
    }
}]

class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optionBar: {},
            optionLine: {},
            tableData: [],
            tableLoading: false,
            videoUrl: "rtmp://106.13.139.118:1935/vod/car.mp4"
        }
    }

    componentWillMount() {
        // 切花直播内容
        changeVideoSource('person', 'rtsp')

        this.loadTop10()
        this.initChartOptions().then((res) => {
            this.loadPieData()
            this.loadLineData()
            this.loadBarData()
        }).catch(() => {

        })
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

        }).catch((err) => {

        }).finally(() => {

        })


        const {optionBar} = this.state
        var dataAxis = ['1', '2', '3', '4', '5', '6', '7'];
        var data = [10, 52, 200, 334, 390, 330, 220];
        var yMax = 500;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }

        let series = this.state.optionBar.series[0]
        series.data = data
        this.setState({
            optionBar: {
                ...optionBar,
                xAxis: {
                    ...optionBar.xAxis,
                    data: dataAxis
                },
            }
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


        const {optionLine} = this.state
        let dataSetSource = []
        let series = []

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
        dataSetSource.push(date, data)
        series.push({
            type: 'line',
            smooth: true,
            areaStyle: '#D7E2D8',
            itemStyle: lineStyleArr[0],
            seriesLayoutBy: 'row',
            encode: {x: 0, y: 1, legend: 1, seriesName: 1},
            showSymbol: false
        })

        this.setState({
            optionLine: {
                ...optionLine,
                dataset: {
                    source: dataSetSource
                },
                series
            }
        })
    }

    initChartOptions() {
        return new Promise((resolve, reject) => {
            const defaultPodData = [
                {value: 1, name: '轻微'},
                {value: 0, name: '中等'},
                {value: 0, name: '严重'},
            ]
            try {
                const optionLine = this.getLineOptions()
                const optionBar = this.getBarOptions()
                this.setState({
                    optionLine,
                    optionBar
                }, () => {
                    resolve(true)
                })
            }catch (e) {
                reject(false)
            }
        })
    }

    getLineOptions() {
        return {
            title: {
                text: '当前实时人流',
                left: '2%',
                top: 'top',
                textStyle: titleCommonStyle
            },
            tooltip: {
                trigger: 'axis',
                // formatter: (params) => {
                //     // '{a} <br/>{b} : {c} ({d}%)'
                //     const tooltipInfo = []
                //     params.forEach((param, index) => {
                //         const addition = param.seriesName && param.seriesName.indexOf('利用率') > -1 ? '%' : ''
                //         tooltipInfo.push(`${param.seriesName}: ${param.value[index + 1]}` + addition)
                //     })
                //     return tooltipInfo.join('<br/>')
                // }
            },
            dataset: {
                source: []
            },
            legend,
            grid,
            xAxis: xAxisCommonStyle,
            yAxis: yAxisCommonStyle,
            series: [
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    encode: {x: 0, y: 1, legend: 1, seriesName: 1},
                    showSymbol: false
                }
            ]
        }
    }

    getBarOptions() {
        return {
            color: '#71A9C8',
            title: {
                text: '过去6小时人流趋势图',
                subtext: ''
            },
            xAxis: {
                data: [],
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            legend,
            grid,
            series: [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data: []
                }
            ]
        }
    }

    handleRedioChange(e) {
        if(e.target.value === '0') {
            this.setState({
                videoUrl: "rtmp://106.13.139.118:1935/vod/car.mp4"
            })
        } else {
            this.setState({
                videoUrl: "rtmp://106.13.139.118:1935/vod/flowcount.mp4"
            })
        }
    }

    render() {
        const {optionBar, pieData, optionLine, currentPieData, tableData, tableLoading, videoUrl} = this.state
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
            <Row gutter={16} className='person-flow-container'>
                <Col span={18}>
                    <Card bordered={false} hoverable className='video-container-card' style={{height: 978}}>
                        <Video videoFileStream={videoUrl}/>
                    </Card>
                </Col>
                <Col span={6} className='charts-group'>

                    <Card style={{height: 85}}
                          bordered={false}
                          hoverable>
                        <Radio.Group defaultValue="0" buttonStyle="solid" onChange={this.handleRedioChange.bind(this)}>
                            <Radio.Button value="0">摄像头</Radio.Button>
                            <Radio.Button value="1">播放视频</Radio.Button>
                        </Radio.Group>
                    </Card>

                    <Card style={{height: 213}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionBar} height='165px' width='100%'/>
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

                    <Card bordered={false} hoverable style={{height: 265}}>
                        <Table columns={columns}
                               size='middle'
                               loading={tableLoading}
                               scroll={{y: 240}}
                               pagination={{pageSize: 3}}
                               dataSource={tableData}/>
                    </Card>

                    <Card style={{height: 213}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionLine}
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
