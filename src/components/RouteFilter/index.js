import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createHashHistory } from 'history'
import { queryStoreCateIds } from "@/utils/utils"

class RouteFilter extends Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.location.pathname === '/prescription' && sessionStorage.getItem('rc-clinics-id')) {
      createHashHistory().push('/payment/shipping')
    }
    // 切换路由时，刷新下页面，解决外部组件无法初始化问题
    if (this.props.location !== nextProps.location) {
      window.location.reload()
      return false
    }
  }
  async componentDidMount () {
    queryStoreCateIds()
  }
  render () {
    return <React.Fragment />
  }
}

export default withRouter(RouteFilter)