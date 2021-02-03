import React, { Component } from "react"
import axios from 'axios';
import Loading from '@/components/Loading';
import "./css/index.less"

export default class LanguagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            loading:true
        }
    }
    placeCurrentCountryToFirst() {
        let newAllData = [...this.state.allData]
        let currentCountryData = newAllData.find(element => {
            return element.IsCurrent == true
        })
        let currentCountryDataIndex = newAllData.findIndex(element => {
            return element.IsCurrent == true
        })

        newAllData.splice(currentCountryDataIndex, 1)
        newAllData.unshift(currentCountryData)
        this.setState({
            allData: newAllData
        })
    }
    getAllData() {
        axios.get('/languagepicker/getcountries')
            .then((response) => {
                this.setState({ allData: response.data }, () => {
                    this.placeCurrentCountryToFirst()
                })
            });
    }
    selectCountry() {
        alert(123)
    }
    render() {
        return (
            <div className="languagePage">
                {this.state.loading ? <Loading bgColor={'#fff'} /> : null}
                <aside className="language-picker-modal rc-modal rc-modal--full" data-modal-target="country-lang-selector" data-rc-feature- modal-setup="true" data-rc-modal-active="true" >
                    <div className="rc-modal__container" data-control="filter-panel">
                        <header className="rc-modal__header">
                            <button className="rc-modal__close rc-btn rc-btn--icon-label rc-icon rc-close--xs rc-iconography" data-modal-trigger="country-lang-selector">
                                Fermer
                        </button>
                        </header>
                        <section className="rc-modal__content rc-max-width--xl">
                            <div data-component="languagepicker">
                                <div className="rc-alpha rc-modal__title rc-text--center" id="title">
                                    Seleccioná tu ubicación
                                </div>
                                <div className="modal-select">
                                    <span className="rc-select rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop rc-select-processed">
                                        <label className="rc-select__label" htmlFor="id-country-select">Country</label>
                                        <select data-js-select="" id="id-country-select">
                                            {
                                                this.state.allData.map((item, index) => {
                                                    return (
                                                        <option disabled={item.IsCurrent} selected={item.IsCurrent} value={item.Name} key={`country-${index}`}>{item.Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </span>
                                </div>

                                <div className="modal-select">
                                    <span className="rc-select rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop rc-select-processed">
                                        <label className="rc-select__label" htmlFor="id-language-select">Language</label>
                                        <select data-js-select="" id="id-language-select">
                                            {
                                                this.state.allData.filter((item) => {
                                                    return item.IsCurrent == true
                                                }).map((item2, index2) => {
                                                    return (
                                                        <option disabled={item2.IsCurrent} selected={item2.IsCurrent} value={item2.Name} key={`lang-${index2}`}>{item2.Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </span>
                                </div>

                                <div className="modal-button">
                                    <a id="id-button-language" className="rc-btn rc-btn--one" data-ref="filter-search-button" type="button" href="#">
                                        Submit
                                </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </aside >
            </div>

        )
    }
    componentDidMount() {
        this.getAllData()

        window.onload = ()=> {
            this.setState({loading:false})
            const choiceDomArr = document.querySelectorAll('.choices__item')
            for (let i=0;i<choiceDomArr.length;i++){
                console.log(choiceDomArr[i])
                choiceDomArr[i].onclick = function(e){
                    e.stopPropagation()
                    e.preventDefault()
                    alert(i)
                    console.log(123)
                }
            }
        }

    }
}