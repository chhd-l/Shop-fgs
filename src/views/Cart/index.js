import React from "react"
import { jugeLoginStatus } from '@/utils/utils'
import UnloginCart from './modules/unLoginCart'
import LoginCart from './modules/loginCart'
import "./index.css"

export default class Cart extends React.Component {
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