// 条款组件
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './index.css';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import Consent from '@/components/Consent';

class TermsCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    document
      .getElementById(`${this.props.id}`)
      .addEventListener('click', (e) => {
        if (e.target.localName === 'span') {
          let keyWords = e.target.innerText;
          let index = Number(
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.id
          );
          let arr = this.state.list[index].detailList.filter((item) => {
            return item.contentTitle == keyWords;
          });

          let tempArr = [...this.state.list];
          tempArr[index].innerHtml = tempArr[index].innerHtml
            ? ''
            : arr[0]
            ? arr[0].contentBody
            : '';

          this.setState({ list: tempArr });
        }
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.listData
    });
  }
  //从子组件传回
  sendList = (list) => {
    this.setState({ list });
  };
  render() {
    return (
      <div
        className="required-wrap"
        id={`${this.props.id}`}
        style={{ marginTop: '10px', marginLeft: '25px' }}
      >
        {/* checkbox组 */}
        <Consent list={this.state.list} sendList={this.sendList} />
      </div>
    );
  }
}

export default injectIntl(TermsCommon);
