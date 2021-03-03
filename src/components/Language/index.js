import React from 'react';
import LanguagePage from './modules';
import { FormattedMessage } from 'react-intl';

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = { languagePopVisible: false, loading: false };
  }
  handleClickShowLanguage = () => {
    this.setState({ languagePopVisible: true });
  };
  onLanguagePopClose = () => {
    this.setState({ languagePopVisible: false });
  };
  updateLoadingStatus = (status) => {
    this.setState({ loading: status });
  };
  render() {
    const { className, style, children } = this.props;
    const { languagePopVisible, loading } = this.state;
    return (
      <>
        <span
          className={`${className} ${
            loading ? 'ui-btn-loading ui-btn-loading-border-red' : ''
          }`}
          style={style}
          onClick={this.handleClickShowLanguage}
        >
          {children || <FormattedMessage id="language" />}
        </span>
        {languagePopVisible ? (
          <LanguagePage
            onClose={this.onLanguagePopClose}
            updateLoadingStatus={this.updateLoadingStatus}
          />
        ) : null}
      </>
    );
  }
}
export default Language;
