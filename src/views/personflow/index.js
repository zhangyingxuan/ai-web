import React from 'react'
import {Card, Col, Row, Table, Tag} from "antd";
import AutoRefreshChart from "../../components/echarts/AutoRefreshChart";
import './index.scss'
import Video from "../../components/widget/customVidio2";
import API from '../../api'

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
    componentDidMount() {
    }

    constructor(props) {
        super(props);
        this.state = {
            optionBar: {},
            optionPie: {},
            optionLine: {}
        }
    }

    componentWillMount() {
        this.initChartOptions().then((res) => {
            this.loadPieData()
            this.loadLineData()
            this.loadBarData()
        }).catch(() => {

        })
    }

    loadPieData() {
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
            // this.state.optionPie.series[0].data = data
            // this.setState({})
            const {optionPie} = this.state
            this.setState({
                optionPie: {
                    ...optionPie,
                    series: [{
                        ...optionPie.series[0],
                        data
                    }]
                },
                currentPieData: data
            })
        }).catch((err) => {
            console.log(err)
        }).finally(() => {

        })
    }

    loadBarData() {
        API.personflow.fetchBarData(1).then((res) => {

        }).catch((err) => {

        }).finally(() => {

        })


        const {optionBar} = this.state
        var dataAxis = ['点', '击', '柱', '子', '或', '者', '两'];
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
                const optionPie = this.getCommonOptions('使用情况', 'cpu', '使用率', defaultPodData)
                const optionLine = this.getLineOptions()
                const optionBar = this.getBarOptions()
                this.setState({
                    optionPie,
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

    getCommonOptions(text, subtext, seriesName, data, radius = ['30%', '55%']) {
        return {
            color: ['#329DCE', '#FF9800', '#AA314D', '#FAD860', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
            // color: ['#329DCE', '#60C0DD', '#9BCA63', '#FAD860', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
            title: {
                show: false,
                text: text,
                subtext: subtext,
                x: 'center',
                y: 'bottom',
                textStyle: {
                    align: 'center',
                    baseline: 'middle',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                    color: '#333',
                    fontWeight: 'bolder'
                }
            },
            tooltip: {
                trigger: 'item',
                // 相对位置，放置在容器正中间
                position: ['5%', '40%'],
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // legend: {
            //   orient: 'vertical',
            //   left: 'left',
            //   data: ['0~2%', '2%~20%', '20%~50%', '50%~100%']
            // },
            series: [
                {
                    name: seriesName,
                    type: 'pie',
                    radius,
                    center: ['50%', '50%'],
                    data: data,
                    label: {
                        normal: {
                            show: false,
                            position: 'inside',
                            formatter: '{d}%',
                            // 模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                            textStyle: {
                                align: 'center',
                                baseline: 'middle',
                                fontFamily: '微软雅黑',
                                fontSize: 13,
                                fontWeight: 'bolder'
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    getLineOptions() {
        return {
            title: {
                text: '利用率（%）',
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
                text: '柱状图',
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
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
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

    render() {
        const {optionBar, optionPie, optionLine, currentPieData} = this.state
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '3',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            }
        ];
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        const tagColors = ['#329DCE', '#FF9800', '#AA314D']
        // const tagColors = ['#2db7f5', '#f50' , '']

        return (
            <Row gutter={16} className='person-flow-container'>
                <Col span={18}>
                    <Card bordered={false} hoverable className='video-container-card' style={{height: 647}}>
                        <Video/>
                    </Card>
                    <Row gutter={16}>
                        <Col span={14}>
                            <Card bordered={false} hoverable style={{height: 315}}>
                                <AutoRefreshChart options={optionLine} height='265px' width='100%'/>
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card bordered={false} hoverable style={{height: 315}}>
                                <Table columns={columns}
                                       pagination={false}
                                       dataSource={dataSource}/>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={6} className='charts-group'>

                    <Card title='柱状图' style={{height: 315}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionBar} height='165px' width='100%'/>
                    </Card>

                    <Card title='饼状图' style={{height: 315}}
                          bordered={false}
                          hoverable>
                        <Row>
                            <Col span={12}>
                                {/*<CustomCard/>*/}
                                <AutoRefreshChart options={optionPie} width='180px' height='200px'/>
                            </Col>
                            <Col span={12}>
                                <div className='pie-data'>
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

                    <Card title='线形图' style={{height: 315}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionLine} height='165px' width='100%'/>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default index
