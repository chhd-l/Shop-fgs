import React,{Component} from 'react'
import { queryStoreCateList } from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
import "./css/HubSalesCategory.less"
import catsImg from "./images/cats.png";
import dogsImg from "./images/dogs.png";

export default class HubSalesCategory extends Component {
    static defaultProps = {

    }
    constructor(props) {
        super(props);
        this.state = {
          cateGoryList_cat: [],
          cateGoryList_dog: [],
          listLoading: true,
        };
    }
    componentDidMount() {
      queryStoreCateList().then((res) => {
        this.setState({ listLoading: false });
        this.rebindCategoryList(res);
      });
    }
    rebindCategoryList(res) {
      let cateGoryList_dog = [];
      let cateGoryList_cat = [];
      cateGoryList_dog = res
          .filter((item) => {
            return item.cateType === "dog";
          })
          .map((item2) => {
            return {
              imgSrc:
                typeof item2.cateImg === "string" &&
                JSON.parse(item2.cateImg)[0].artworkUrl,
              cateName: item2.cateName,
              altName: item2.altName,
              cateRouter: item2.cateRouter,
            };
          });
  
        cateGoryList_cat = res
          .filter((item) => {
            return item.cateType === "cat";
          })
          .map((item2) => {
            return {
              imgSrc:
                typeof item2.cateImg === "string" &&
                JSON.parse(item2.cateImg)[0].artworkUrl,
              cateName: item2.cateName,
              altName: item2.altName,
              cateRouter: item2.cateRouter,
            };
          });
      this.setState({ cateGoryList_dog, cateGoryList_cat });
    }
    render() {
        return (
          <div className="hub-category rc-bg-colour--brand3 rc-margin-bottom--xs">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
              <div className="rc-layout-container rc-two-column">
                <div className="rc-column">
                  <div className="header-title">
                    <h1 className="rc-espilon">Pour chat</h1>
                    <img src={catsImg}></img>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    {this.state.listLoading ? (
                      <div style={{ width: "100%" }}>
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="10%"
                          count={4}
                        />
                      </div>
                    ) : (
                      this.state.cateGoryList_cat.map((item, index) => {
                        return (
                          <div className="rc-column category-goods" key={index}>
                            <a
                              className="rc-moblie-flex"
                              href={`${item.cateRouter}`}
                            >
                              <picture>
                                <source srcSet={item.imgSrc} />
                                <div className="text-center">
                                  <img
                                    src={item.imgSrc}
                                    alt={item.altName}
                                    title={item.altName}
                                  />
                                </div>
                              </picture>
                              <div className="d-flex justify-content-center">
                                <h3 className="rc-margin--none">{item.cateName}</h3>
                              </div>
                            </a>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="rc-column">
                  <div className="header-title">
                    <h1 className="rc-espilon">Pour chien</h1>
                    <img src={dogsImg}></img>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    {this.state.listLoading ? (
                      <div style={{ width: "100%" }}>
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="10%"
                          count={4}
                        />
                      </div>
                    ) : (
                      this.state.cateGoryList_dog.map((item, index) => {
                        return (
                          <div className="rc-column category-goods" key={index}>
                            <a
                              className="rc-moblie-flex"
                              href={`${item.cateRouter}`}
                            >
                              <picture>
                                <source srcSet={item.imgSrc} />
                                <div className="text-center">
                                  <img
                                    src={item.imgSrc}
                                    alt={item.altName}
                                    title={item.altName}
                                  />
                                </div>
                              </picture>
                              <div className="d-flex justify-content-center">
                                <h3 className="rc-margin--none">{item.cateName}</h3>
                              </div>
                            </a>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}