import React from 'react'
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

class AutoRefreshChart extends React.PureComponent {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.initChart()
	}

	componentWillUnmount() {
		this.closeTimer()
	}

	initChart () {
		if (this.props.loopQuery) {
			if(this.props.query && this.props.query instanceof Function) {
				this.props.query()
			}
			this.setTimer()
		}
	}

	setTimer () {
		if (!this.timer) {
			const {timeInterval} = this.props
			let intervalStep = timeInterval * 1000
			if(isNaN(timeInterval)) {
				intervalStep = 60 * 1000
			}
			this.timer = setInterval(() => {
				if(this.props.query && this.props.query instanceof Function) {
					this.props.query()
				}
			}, intervalStep)
		}
	}

	closeTimer () {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}

	onChartReadyCallback() {
		// 数据准备完成
		if(this.props.onReadyCallBack && this.props.onReadyCallBack instanceof Function) {
			this.props.onReadyCallBack()
		}
	}

	getOption() {

	}

	render() {
		const {width, height, loadingOption, loading, options} = this.props

		const getOptions = () => {
			return {
				...options
			}
		}

		return <ReactEcharts style={{height, width}}
			// notMerge={true} // 是否不跟之前设置的 option 进行合并，默认为 false，即合并。
			// lazyUpdate={true} // 在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
			// theme={"theme_name"}
							 onChartReady={this.onChartReadyCallback.bind(this)}
							 ref={(e) => { this.echartsReact = e; }}
							 loadingOption={loadingOption}
							 option={getOptions()}
							 showLoading={loading}>
		</ReactEcharts>
	}
}

AutoRefreshChart.propTypes = {
	loading: PropTypes.bool,
	loadingOption: PropTypes.object,
	options: PropTypes.object.isRequired,
	timeInterval: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	loopQuery: PropTypes.bool,
	query: PropTypes.func,
	onReadyCallBack: PropTypes.func,
};
AutoRefreshChart.defaultProps = {
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

export default AutoRefreshChart