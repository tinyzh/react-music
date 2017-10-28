/**
 * Created by zhangchao on 2017/10/28.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import './header.less'

class Header extends Component{
    render(){
        return(
            <div className="components-header row">
                <img src="static/images/logo.png" alt="" width="40" className="-col-auto"/>
                <Link to="/">
                    <p className="caption">React Music Player</p>
                </Link>
            </div>
        )
    }
}

export default Header;