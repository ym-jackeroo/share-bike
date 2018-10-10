import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from '../views/home'
import Admin from '../views/admin'
import NotMatch from '../views/notMatch'
import SecondPage from '../views/secondPage'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/admin' render={() => 
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/secondPage' component={SecondPage}></Route>
                            </Admin>
                        }></Route>
                        <Admin>
                            <Route component={NotMatch}></Route>
                        </Admin>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default Router;


