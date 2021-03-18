import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import BannerTip from '@/components/BannerTip';
import { getFaq } from '../../api/faq';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';
import BreadCrumbs from '../../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';
import { ADDRESS_RULE } from '@/utils/constant';
import { validData } from '@/utils/utils';

import './index.less';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
        cityId: '',
        city: '',
        provinceNo: '',
        provinceName: '',
        province: '',
        postCode: '',
        phoneNumber: ''
      },
      isValid: false
    };
  }
  componentWillUnmount() {}
  componentDidMount() {}
  validData = async ({ data }) => {
    console.log('------------------- > validData data: ', data);
    try {
      await validData(ADDRESS_RULE, data);
      // this.setState({ isValid: true, form: data }, () => {
      //   this.props.updateFormValidStatus(this.state.isValid);
      // });
      this.setState({ isValid: true, form: data }, () => {
        console.log('------------------- > try isValid: ', this.state.isValid);
      });
    } catch (err) {
      // this.setState({ isValid: false, validationLoading: false }, () => {
      //   this.props.updateFormValidStatus(this.state.isValid);
      // });
      this.setState({ isValid: false }, () => {
        console.log(
          '------------------- > catch isValid: ',
          this.state.isValid
        );
      });
    }
  };
  handleEditFormChange = (data) => {
    this.validData({ data });
  };
  // 确认
  handleClickConfirm = () => {
    const { isValid } = this.state;
  };
  render() {
    const { form, isValid } = this.state;
    return (
      <div style={{ padding: '30px' }}>
        <Form
          type="delivery"
          initData={form}
          isLogin={false}
          updateData={this.handleEditFormChange}
        />
        <div className="d-flex justify-content-end mb-2">
          <button
            className="rc-btn rc-btn--one rc-btn--sm"
            onClick={this.handleClickConfirm}
            disabled={!isValid}
          >
            <FormattedMessage id="clinic.confirm3" />
          </button>
        </div>
      </div>
    );
  }
}

export default Test;
