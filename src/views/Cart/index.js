import React from "react"
import { jugeLoginStatus } from '@/utils/utils'
import UnloginCart from './modules/unLoginCart'
import LoginCart from './modules/loginCart'
import "./index.css"

export default class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <React.Fragment>
        {
          jugeLoginStatus()
            ? <LoginCart />
            : <UnloginCart />
        }
      </React.Fragment>
    )
  }
}