import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { queryStoreCateIds } from "@/utils/utils.js"

class RouteFilter extends Component {
  shouldComponentUpdate (nextProps) {
    // 切换路由时，刷新下页面，解决外部组件无法初始化问题
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
      if (searchArr[i][0] == name) {
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
      localStorage.setItem('rc-clinics-id', clinicsId)
    }

    return <React.Fragment />
  }
}

export default withRouter(RouteFilter)