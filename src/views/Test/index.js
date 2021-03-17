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

import './index.less';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {}
  componentDidMount() {}

  render() {
    return (
      <div>
        <Form />
      </div>
    );
  }
}

export default Test;
