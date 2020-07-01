import React from 'react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dataFAQ from './FAQ.json'
import { Link } from "react-router-dom"
import FAQ1 from "@/assets/images/FAQ1.jpg"
import './index.less'

class FAQ extends React.Component {
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  render (h) {
    console.log(dataFAQ);
    const event = {
      "page": {
        "type": "Content",
        "theme": ""
      }
    }

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header history={this.props.history} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3"  >
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            style={{ maxWidth: "70%" }} >
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-margin-bottom--xs rc-padding-left--none">
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h1 style={{ textAlign: "center" }}>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>Preguntas frecuentes</font>
                        </font>
                      </h1>
                      <p style={{ textAlign: "center" }}>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>Tiene una pregunta </font>
                          <font style={{ verticalAlign: "inherit" }}>Mire a continuación para ver si hay una respuesta. </font>
                          <font style={{ verticalAlign: "inherit" }}>Si no puede encontrar lo que está buscando,&nbsp; </font>
                        </font>
                        <Link to="/help" style={{ fontSize: "14px" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>haga clic aquí </font>
                          </font>
                        </Link>
                        <span style={{ fontSize: "14px" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>&nbsp;para contactarnos.</font>
                          </font>
                        </span>
                      </p>
                      <p style={{ textAlign: "center" }}>&nbsp;</p>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>

            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-margin-bottom--xs rc-padding-left--none">
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2>
                        <font style={{ verticalAign: "inherit" }}>
                          <font style={{ verticalAign: "inherit" }}>La entrega</font>
                        </font>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>

            <dl data-toggle-group="" data-toggle-effect="rc-expand--vertical" className="">
              {
                dataFAQ.map((item, index) => (
                  <div className="rc-list__accordion-item test-color" key={index}>
                    <dt>
                      <button className="rc-list__header" id={"heading-" + index} data-toggle={"content-" + index}>{item.frequently}</button>
                    </dt>
                    <dd className="rc-list__content" id={"content-" + index} aria-labelledby={"heading-" + index}>
                      <p>{item.questions}</p>
                      {item.img ? <img src={FAQ1} alt="" title="" /> : <span></span>}
                    </dd>
                  </div>
                ))
              }

            </dl>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default FAQ