import React, { Component } from 'react';
import "./customPageLoading.scss"

class customPageLoading extends Component {
    state = {
    }
    render() {
        const { hasMask, isShow } = this.props;
        return (
            <div className='spinner-container'>
                <div className='spinner-mask'></div>
                <div className="spinner">
                    <div className="spinner-container container1">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container2">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container3">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default customPageLoading;