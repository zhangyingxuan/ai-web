import React from 'react';
import SiderCustom from "./SiderCustom"
import HeaderCustom from "./HeaderCustom"
import { ThemePicker } from '../widget';

import 'antd/dist/antd.css';
import '../../res/styles/index.scss';
import {Layout} from 'antd';
import Routes from '../../routes'
import routes from '../../routes/config'
const { Content, Footer } = Layout;
const noAuthMenus = [{ id: 0, url: '/app/personalCenter', title: '个人设置', component: 'PersonalCenter' }]
// 默认展示的路由；链式菜单对象，用于动态生成tabs的时候使用
let canAccessMenus = [
    ...noAuthMenus
];

class MyLayout extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 1;
        this.state = {
            collapsed: true,
            user: {},
            activeKey: 'newTab0',
            // 左侧菜单
            menus: [],
            panes: [],
            pageRoutes: [],
            currentPath: ''
        };
    }

    componentWillMount() {
        this.setState({menus: routes.menus})
    }

    componentDidMount() {
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        return (
            <Layout>
                <SiderCustom collapsed={this.state.collapsed}
                             menus={this.state.menus}/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle}
                                  pageRoutes={this.state.pageRoutes}
                                  collapsed={this.state.collapsed}
                                  user={this.state.user || {}}/>
                    <Content style={{overflow: 'initial', flex: '1 1 0', backgroundColor: '#F0F2F5'}}>
                        {/*, backgroundColor: '#27272F'*/}
                        <Routes menus={routes}/>
                    </Content>
                    {/*<Footer style={{textAlign: 'center'}}>*/}
                    {/*    trafficsys-web ©{new Date().getFullYear()} Created by 827516789@qq.com*/}
                    {/*</Footer>*/}
                </Layout>
            </Layout>
        );
    }
}

export default MyLayout;