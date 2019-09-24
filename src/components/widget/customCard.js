import React, { Component } from 'react';
import "./customPageLoading.scss"

class customPageLoading extends Component {
    state = {
    }
    render() {
        const { hasMask, isShow } = this.props;
        return (
            <div className="detail-monitor-status StatusCircle__card--ys1gr">
                < img className="StatusCircle__cardImg--2CRny"
                      src={require('@/assets/common/banner-icon-1.svg')} alt='img'/>
                <div className="StatusCircle__chart--T-Rca">
                </div>
                <div className="StatusCircle__status--3UJij">
                    <div className="StatusCircle__title--1hjbI">容器使用情况</div>
                    <div className="StatusCircle__detail--34HFh">
                    </div>
                </div>
            </div>
        )
    }
}

export default customPageLoading;