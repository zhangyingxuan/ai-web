import React from 'react'
import PropTypes from 'prop-types';
import AutoRefreshChart from './AutoRefreshChart'
import _ from 'lodash'

class PieChart extends React.PureComponent {
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

	getCommonOptions(text, subtext, seriesName, data, radius = ['50%', '75%']) {
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

PieChart.propTypes = {
	loading: PropTypes.bool,
	loadingOption: PropTypes.object,
	timeInterval: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	loopQuery: PropTypes.bool,
	query: PropTypes.func,
	onReadyCallBack: PropTypes.func,
};
PieChart.defaultProps = {
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

export default PieChart