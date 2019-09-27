import React from 'react'
import PropTypes from 'prop-types';
import AutoRefreshChart from './AutoRefreshChart'
import _ from 'lodash'

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

class LineChart extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			options: {}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!_.isEqual(prevProps.data, this.props.data) && !_.isEmpty(this.state.options)) {
			this.updateOptionData()
		}
	}

	/**
	 *  更新饼图数据
	 */
	updateOptionData() {
		const {options} = this.state
		const {data} = this.props
		this.setState({
			options: {
				...options,
				series: [{
					...options.series[0],
					data
				}]
			}
		})
	}

	componentWillMount() {
		const {text, subtext, seriesName, data, radius = ['50%', '75%']} = this.props
		const optionPie = this.getCommonOptions(text, subtext, seriesName, data, radius)
		this.setState({
			options: optionPie
		})
	}

	getCommonOptions(text, subtext, seriesName, dataSetSource, radius = ['50%', '75%']) {
		return {
			title: {
				text,
				subtext,
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
				source: dataSetSource
			},
			legend,
			grid,
			xAxis: xAxisCommonStyle,
			yAxis: yAxisCommonStyle,
			series: [
				{
					name: seriesName,
					type: 'line',
					smooth: true,
					areaStyle: '#D7E2D8',
					itemStyle: lineStyleArr[0],
					seriesLayoutBy: 'row',
					encode: {x: 0, y: 1, legend: 1, seriesName: 1},
					showSymbol: false
				}
			]
		}
	}

	render() {
		const {width, height, loadingOption, loading} = this.props
		const {options} = this.state

		return <AutoRefreshChart
			// notMerge={true} // 是否不跟之前设置的 option 进行合并，默认为 false，即合并。
			// lazyUpdate={true} // 在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
			// theme={"theme_name"}
			height={height}
			width={width}
			loadingOption={loadingOption}
			options={options}
			showLoading={loading}/>
	}
}

LineChart.propTypes = {
	loading: PropTypes.bool,
	loadingOption: PropTypes.object,
	timeInterval: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	loopQuery: PropTypes.bool,
	query: PropTypes.func,
	onReadyCallBack: PropTypes.func,
};
LineChart.defaultProps = {
	data: [
		{value: 1, name: '轻微'},
		{value: 0, name: '中等'},
		{value: 0, name: '严重'},
	],


	loading: false,
	loopQuery: false,
	width: '100px',
	height: '100px',
	loadingOption: {
		text: '',
		// text: '加载中...',
		color: '#4C7EE9',
		textColor: '#000',
		maskColor: 'rgba(255,255,255, 0.2)',
		zlevel: 999
	}
}

export default LineChart