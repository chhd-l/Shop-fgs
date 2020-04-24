import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createHashHistory } from 'history'
import { queryStoreCateIds } from "@/utils/utils.js"

class RouteFilter extends Component {
  shouldComponentUpdate (nextProps) {
    // 切换路由时，刷新下页面，解决外部组件无法初始化问题
    // debugger
    if (nextProps.location.pathname === '/prescription' && (this.getParaByName('clinics') || sessionStorage.getItem('rc-clinics-id'))) {
      createHashHistory().push('/payment/shipping')
    }
    if (this.props.location !== nextProps.location) {
      window.location.reload()
      return false
    }
  }
  getParaByName (search, name) {
    search = search.substr(1);
    if (typeof name === 'undefined') return search
    let searchArr = search.split('&');
    for (let i = 0; i < searchArr.length; i++) {
      let searchStr = searchArr[i];
      searchArr[i] = searchStr.split('=');
      if (searchArr[i][0] === name) {
        return searchStr.replace(name + '=', '');
      }
    }
    return ''
  }
  async componentDidMount () {
    queryStoreCateIds()
  }
  render () {
    const { location } = this.props;
    let clinicsId = this.getParaByName(location.search, 'clinics')
    if (clinicsId) {
      sessionStorage.setItem('rc-clinics-id', clinicsId)
    }

    return <React.Fragment />
  }
}

export default withRouter(RouteFilter)