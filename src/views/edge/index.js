import React from 'react'
import {Card} from "antd";

class DashBoard extends React.Component {
    componentDidMount() {
    }

    constructor(props) {
        super(props);
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
