/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Icon, Layout, PageHeader, Row, Col} from 'antd';
import { withRouter} from 'react-router-dom';
const {Header} = Layout;

class HeaderCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            visible: false,
        }
    }

    componentDidMount() {

    };

    render() {
        return (
            <Header className="custom-header">
                <Row>
                    <Col span={1}>
                        {/*<Icon*/}
                        {/*    className="header__trigger custom-trigger"*/}
                        {/*    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                        {/*    onClick={this.props.toggle}*/}
                        {/*/>*/}
                    </Col>
                    <Col span={10} style={{fontSize: '32px', color: '#FF9800'}}>
                        AI视觉智能分析平台
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(HeaderCustom);
