import React, { Component, Fragment } from 'react'

class ListBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
                <div className="rc-max-width--lg rc-padding-x--sm">
                    <div className="rc-layout-container rc-three-column">
                        <div className="rc-column rc-double-width">
                            <h1 className="rc-gamma rc-margin--none">
                                Le bon régime alimentaire pour votre chien
                            </h1>
                            <div>
                                Du Chihuahua au Rottweiler, les besoins physiques des différentes races de chiens diffèrent également. Trouver la nourriture qui répond le mieux à leurs besoins nécessite donc une approche prudente. Royal Canin produit des aliments adaptés aux différentes races de chiens, en tenant compte de leur taille, de leur âge, de leur sensibilité et de leur mode de vie. En utilisant les filtres de cette page, vous pouvez trouver la bonne nourriture pour votre chien.
                            </div>
                        </div>
                        <div className="rc-column">
                            <img className="mx-auto" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw362b0411/slider3.png?sw=300&sh=150&sm=fit&cx=0&cy=73&cw=670&ch=335&sfrm=png" alt="Le bon régime alimentaire pour votre chien"></img>
                        </div>
                    </div>
                </div>
        )
    }
}
export default ListBanner