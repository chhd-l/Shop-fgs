import React from "react"
import { jugeLoginStatus } from '@/utils/utils'
import UnloginCart from './modules/unLoginCart'
import LoginCart from './modules/loginCart'
import "./index.css"

export default class Cart extends React.Component {
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  render () {
    return (
      <React.Fragment>
        {
          jugeLoginStatus()
            ? <LoginCart history={this.props.history} />
            : <UnloginCart history={this.props.history} />
        }
      </React.Fragment>
    )
  }
}