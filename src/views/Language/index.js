import React, { Component } from "react"

export default class LanguagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <aside class="language-picker-modal rc-modal rc-modal--full" data-modal-target="country-lang-selector" data-rc-feature- modal-setup="true" data-rc-modal-active="true" >
                <div class="rc-modal__container" data-control="filter-panel">
                    <header class="rc-modal__header">
                        <button class="rc-modal__close rc-btn rc-btn--icon-label rc-icon rc-close--xs rc-iconography" data-modal-trigger="country-lang-selector">
                            Fermer
                        </button>
                    </header>
                    <section class="rc-modal__content rc-max-width--xl">
                        <div data-component="languagepicker">
                            <div class="rc-alpha rc-modal__title rc-text--center">
                                Sélectionnez votre emplacement
                            </div>
                            <span class="rc-select">
                                <label class="rc-select__label" for="id-single-select">Country</label>
                                <select data-js-select="" id="id-single-select">
                                    <option selected="" disabled="true" value="">Select an option</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                    <option data-custom="Some data">Option 4</option>
                                    <option>Option 5</option>
                                    <option>Option 6</option>
                                    <option>Option 7</option>
                                    <option>Option 8</option>
                                    <option>Option 9</option>
                                </select>
                            </span>
                            <div class="modal-button">
                                <a id="id-button-language" class="rc-btn rc-btn--one" data-ref="filter-search-button" type="button" href="#">
                                    Submit
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </aside >
        )
    }
}