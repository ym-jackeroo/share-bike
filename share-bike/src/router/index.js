import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from '../views/home'
import Admin from '../views/admin'
import NotMatch from '../views/notMatch'
import Order from '../views/order'
import Pie from '../views/echarts/pie'
import Bar from '../views/echarts/bar'
import OrderDetails from '../views/order/details'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Switch> 
                        <Route path='/common/order/details/:id' component={OrderDetails}></Route>
                        <Route path='/admin' render={() => 
                            <Admin>
                                <Switch>
                                    <Route path='/admin/home' component={Home}></Route>
                                    <Route path='/admin/order' component={Order}></Route>
                                    <Route path='/admin/echarts/pie' component={Pie}></Route>
                                    <Route path='/admin/echarts/bar' component={Bar}></Route>
                                    <Route component={NotMatch}></Route>
                                </Switch>
                            </Admin>
                        }></Route>
                        <Route component={NotMatch}></Route>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default Router;


