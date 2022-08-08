/*
 * Created By Zuoqin On 2021/05/21
 * 封装GoogleTagManager、Header、Helmet组件，再以组件方式使用，达到优化代码目的
 */
import React from 'react';
import { GoogleTagManager, Header } from '@/components';
import { Helmet } from 'react-helmet';
import { setSeoConfig } from '@/utils/utils';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Canonical } from '@/components/Common';

@observer
class PageBaseInfo extends React.Component {
  static defaultProps = {
    seoConfigParams: {} //请求setSeoConfig方法的参数
  };

  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      }
    };
  }

  componentDidMount() {
    setSeoConfig(this.props.seoConfigParams).then((res) => {
      this.setState({ seoConfig: res });
    });
  }

  render() {
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={this.props.additionalEvents}
        />
        <Canonical />
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
      </div>
    );
  }
}

export default withRouter(PageBaseInfo);
