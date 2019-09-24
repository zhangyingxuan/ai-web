import React from 'react'
import {Card, Col, Row, Table} from "antd";
import AutoRefreshChart from "../../components/echarts/AutoRefreshChart";
import './index.scss'


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
class DashBoard extends React.Component {
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
        this.initChartOptions()
    }

    initChartOptions() {
        const defaultPodData = [
            {value: 0, name: '0~2%'},
            {value: 0, name: '2~20%'},
            {value: 0, name: '20~50%'},
            {value: 0, name: '50~100%'},
            ]
        const optionPie = this.getCommonOptions('CPU使用情况', 'cpu', 'cpu使用率', defaultPodData)
        const optionLine = this.getLineOptions()
        this.setState({
            optionPie,
            optionLine
        })
    }

    getCommonOptions(text, subtext, seriesName, data, radius = ['30%', '55%']) {
        return {
            color: ['#329DCE', '#60C0DD', '#9BCA63', '#FAD860', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
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
                text: '容器CPU利用率（%）',
                left: '2%',
                top: 'top',
                textStyle: titleCommonStyle
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    // '{a} <br/>{b} : {c} ({d}%)'
                    const tooltipInfo = []
                    params.forEach((param, index) => {
                        const addition = param.seriesName && param.seriesName.indexOf('利用率') > -1 ? '%' : ''
                        tooltipInfo.push(`${param.seriesName}: ${param.value[index + 1]}` + addition)
                    })
                    return tooltipInfo.join('<br/>')
                }
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

    render() {
        const {optionBar, optionPie, optionLine} = this.state
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

        return (
            <Row gutter={16} className='person-flow-container'>
                <Col span={14}>
                    <Card bordered={false} hoverable style={{height: 462}}>
                        视频
                    </Card>
                    <Card bordered={false} hoverable style={{height: 350}}>
                        <Row>
                            <Col span={14}>

                            </Col>
                            <Col span={10}>
                                <Table columns={columns} dataSource={dataSource}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={10} className='charts-group'>

                    <Card title='柱状图' style={{height: 265}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionBar}/>
                    </Card>

                    <Card title='饼状图' style={{height: 265}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionPie} height='200px'/>
                    </Card>

                    <Card title='线形图' style={{height: 265}}
                          bordered={false}
                          hoverable>
                        <AutoRefreshChart options={optionLine} height='165px' width='100%'/>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default DashBoard
