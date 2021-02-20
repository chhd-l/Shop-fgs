import React, { Component } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import Selection from './Selection';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import queryCountries from './mock';
import './css/index.less';

export default class LanguagePage extends Component {
  static defaultProps = {
    onClose: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      loading: true,
      submitUrl: ''
    };
  }
  componentDidMount() {
    this.getAllData();
  }
  get countryComputedList() {
    return this.state.allData.map((ele) => {
      return {
        value: ele.Name,
        name: ele.Name,
        ...ele
      };
    });
  }
  get languageComputedList() {
    return this.state.allData
      .filter((item) => {
        return item.IsCurrent;
      })[0]
      .Languages.map((ele) => {
        return {
          value: ele.Name,
          name: ele.Name,
          ...ele
        };
      });
  }
  get currentCountry() {
    return this.state.allData.filter((item) => {
      return item.IsCurrent;
    })[0].Name;
  }
  get currentCountryFirstLanguage() {
    return this.state.allData.filter((item) => {
      return item.IsCurrent;
    })[0].Languages[0].Name;
  }
  handleClickClose = () => {
    this.props.onClose();
  };
  placeCurrentCountryToFirst() {
    let newAllData = [...this.state.allData];

    let currentCountryData = newAllData.find((element) => {
      return element.IsCurrent == true;
    });
    this.setState({
      submitUrl: currentCountryData.Languages[0].Url
    });

    let currentCountryDataIndex = newAllData.findIndex((element) => {
      return element.IsCurrent == true;
    });

    newAllData.splice(currentCountryDataIndex, 1);
    newAllData.unshift(currentCountryData);
    this.setState({
      allData: newAllData
    });
  }
  async getAllData() {
    try {
      // const langResult = await axios.get('/languagepicker/getcountries');
      const langResult = await queryCountries();
      this.setState({ allData: langResult.data }, () => {
        this.placeCurrentCountryToFirst();
      });
    } catch (err) {
    } finally {
      this.setState({ loading: false });
    }
  }
  handleSelectedCountryChange = (data) => {
    let tempData = [...this.state.allData];
    tempData.forEach((element) => {
      if (element.IsCurrent) {
        element.IsCurrent = false;
      }
    });
    tempData.forEach((element) => {
      if (element.Name == data.Name) {
        element.IsCurrent = true;
      }
    });
    this.setState({ allData: tempData });
    this.setState({
      submitUrl: data.Languages[0].Url
    });
  };
  handleSelectedLangChange = (data) => {
    this.setState({
      submitUrl: data.Url
    });
  };
  render() {
    if (this.state.allData.length == 0) return null;
    return (
      <div className="languagePage">
        {this.state.loading ? <Loading bgColor={'#fff'} /> : null}
        <aside className="language-picker-modal rc-modal rc-modal--full">
          <div className="rc-modal__container">
            <header className="rc-modal__header">
              <button
                className="rc-modal__close rc-btn rc-btn--icon-label rc-icon rc-close--xs rc-iconography"
                data-modal-trigger="country-lang-selector"
                onClick={this.handleClickClose}
              >
                <FormattedMessage id="lang.close" />
              </button>
            </header>
            <section className="rc-modal__content rc-max-width--xl">
              <div>
                <div
                  className="rc-alpha rc-modal__title rc-text--center"
                  id="title"
                >
                  <FormattedMessage id="lang.selectYourLocation" />
                </div>
                <div className="modal-select" id="country">
                  <span className="rc-select rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop rc-select-processed">
                    <label className="rc-select__label">
                      <FormattedMessage id="lang.country" />
                    </label>
                    <Selection
                      customCls="flex-grow-1"
                      selectedItemChange={this.handleSelectedCountryChange}
                      optionList={this.countryComputedList}
                      selectedItemData={{
                        value: this.currentCountry
                      }}
                      key={'country'}
                    />
                  </span>
                </div>
                
                <div className="modal-select" id="language">
                  <span className="rc-select rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop rc-select-processed">
                    <label className="rc-select__label">
                      <FormattedMessage id="lang.language" />
                    </label>
                   
                    <Selection
                      customCls="flex-grow-1"
                      selectedItemChange={this.handleSelectedLangChange}
                      optionList={this.languageComputedList}
                      selectedItemData={{
                        value: this.currentCountryFirstLanguage
                      }}
                      key={'lang'}
                    />
                  </span>
                </div>

                <div className="modal-button">
                  <a
                    id="id-button-language"
                    className="rc-btn rc-btn--one"
                    data-ref="filter-search-button"
                    type="button"
                    href={this.state.submitUrl}
                  >
                    <FormattedMessage id="lang.submit" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    );
  }
}
