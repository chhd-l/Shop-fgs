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
  static defaultProps = {
    updateValidStatus: () => {}
  };
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
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode.id
          );
          let arr = this.state.list[index].detailList.filter((item) => {
            return item.contentTitle === keyWords;
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
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(
      {
        list: nextProps.listData
      },
      () => {
        // this.valid();
      }
    );
  }
  valid() {
    this.props.updateValidStatus(
      this.state.list
        .filter((ele) => ele.isRequired)
        .every((el) => el.isChecked)
    );
  }
  //从子组件传回
  sendList = (list) => {
    this.setState({ list }, () => {
      this.valid();
    });
  };
  render() {
    return (
      <div
        className="required-wrap text-break"
        id={`${this.props.id}`}
        style={{ marginTop: '10px', marginLeft: '25px' }}
      >
        {/* checkbox组 */}
        <Consent
          list={this.state.list}
          sendList={this.sendList}
          key="payment"
          id={this.props.id}
        />
        {process.env.REACT_APP_LANG === 'de' ? (
          <div style={{ paddingLeft: '20px', marginTop: '20px' }}>
            <a
              href="javascript:;"
              style={{ color: '#7F6666', cursor: 'default' }}
            >
              Informationen zu Ihrem Widerrufsrecht finden Sie{' '}
              <Link
                target="_blank"
                rel="nofollow"
                to="/Widerrufsbelehrung"
                className="rc-styled-link"
              >
                hier
              </Link>
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default injectIntl(TermsCommon);
