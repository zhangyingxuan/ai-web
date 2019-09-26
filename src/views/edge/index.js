import React from 'react'
import {Card} from "antd";
import API from "../../api";
import {changeVideoSource} from '@/utils'

class DashBoard extends React.Component {
    componentWillMount() {
        // person，hat，lg，wei，face
        // video，rtsp
        // 切花直播内容
        changeVideoSource('hat', 'rtsp')

        this.loadBarData()
    }

    constructor(props) {
        super(props);
    }

    loadBarData() {
        API.electronic.fetchCurrentData(1).then((res) => {

        }).catch((err) => {

        }).finally(() => {

        })
        API.electronic.fetPieData(1).then((res) => {

        }).catch((err) => {

        }).finally(() => {

        })
        API.electronic.fetchBarData(1).then((res) => {

        }).catch((err) => {

        }).finally(() => {

        })
    }


    render() {
        return (
            <Card bordered={false}>
                边缘监测
            </Card>
        );
    }
}

export default DashBoard
