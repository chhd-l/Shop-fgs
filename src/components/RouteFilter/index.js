import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createHashHistory } from 'history'

class RouteFilter extends Component {
  shouldComponentUpdate (nextProps) {
    console.log(1111)
    // 切换路由时，刷新下页面，解决外部组件无法初始化问题
    if (this.props.location !== nextProps.location) {
      console.log(222)
      // createHashHistory().go(0)
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