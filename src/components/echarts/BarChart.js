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

class BarChart extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			options: {}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if ((!_.isEqual(prevProps.dataAxis, this.props.dataAxis) || !_.isEqual(prevProps.data, this.props.data)) && !_.isEmpty(this.state.options)) {
			this.updateOptionData()
		}
	}

	/**
	 *  更新饼图数据
	 */
	updateOptionData() {
		const {options} = this.state
		const {data, dataAxis} = this.props

		let series = this.state.options.series[0]
		series.data = data
		this.setState({
			options: {
				...options,
				// xAxis: {
				// 	...options.xAxis,
				// 	data: dataAxis
				// },
			}
		})
	}

	componentWillMount() {
		const {text, subtext, seriesName, dataAxis, data} = this.props
		const optionPie = this.getCommonOptions(text, subtext, seriesName, dataAxis, data)
		this.setState({
			options: optionPie
		})
	}

	getCommonOptions(text, subtext, seriesName, dataAxis, data) {
		return {
			color: '#71A9C8',
			title: {
				text: text,
				subtext: subtext
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
					name: seriesName,
					type:'bar',
					barWidth: '60%',
					data: data
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

BarChart.propTypes = {
	loading: PropTypes.bool,
	loadingOption: PropTypes.object,
	timeInterval: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	loopQuery: PropTypes.bool,
	query: PropTypes.func,
	onReadyCallBack: PropTypes.func,
};
BarChart.defaultProps = {
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

export default BarChart