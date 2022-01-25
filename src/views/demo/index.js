import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import './index.less';
import ImageMagnifier from './ImageMagnifier';
const product = {
  id: 'ff80808173a2adef0173b3e7a602006f',
  spuId: '2612',
  label: 'PEDIATRIC WEANING',
  description:
    'Aliment complet pour chats - Spécial chatons de 4 semaines à 4 mois.',
  mainImage: {
    url: 'https://d2cstgstorage.z13.web.core.windows.net/202012240714391113.png',
    alt: 'PEDIATRIC WEANING'
  },
  goodsSpecs: [{ specName: 'Gewicht', specId: 20550 }],
  goodsSpecDetails: [{ label: '2 kg', specId: 20550, specDetailId: 29632 }],
  images: [
    {
      url: 'https://d2cstgstorage.z13.web.core.windows.net/202012240714391113.png',
      alt: 'PEDIATRIC WEANING'
    }
  ],
  tab: [
    {
      label: 'Analytische Bestandteile',
      content:
        '<p>Protein: 34 % - Fettgehalt: 25 % - Rohasche: 7,4 % - Rohfaser: 1,9 % - DHA: 1,87 g/kg.</p>',
      contentType: 'text',
      descriptionName: 'Analytische Bestandteile'
    },
    {
      label: 'Zusatzstoffe',
      content:
        '<p>(Pro kg): Ernährungsphysiologische Zusatzstoffe: Vitamin A: 25500 IE, Vitamin D3: 1000 IE, Vitamin E: 600 mg, E1 (Eisen): 31,8 mg, E2 (Jod): 3,2 mg, E4 (Kupfer): 9,8 mg, E5 (Mangan): 41,4 mg, E6 (Zink): 118,1 mg, E8 (Selen): 0,04 mg - Technologische Zusatzstoffe: Klinoptilolith sedimentären Ursprungs: 5 g - Konservierungsstoffe - Antioxidanzien.</p>',
      contentType: 'text',
      descriptionName: 'Zusatzstoffe'
    },
    {
      label: 'Produktbeschreibung',
      content:
        '<p>Alleinfuttermittel für Katzenwelpen von der 4. Woche bis zum 4. Monat.</p><p>Werden neu geborene Kätzchen in den ersten Lebenswochen noch von ihrer Mutter gesäugt, braucht es schon bald eine andere Ernährung, um sicherzustellen, dass sich Ihre Kätzchen optimal entwickelt. ROYAL CANIN Pediatric Weaning ist ein Trockenfutter, das speziell für die Entwöhnungszeit im Alter von circa 4 Wochen bis 4 Monaten konzipiert ist. Das Kätzchenfutter versorgt Katzenkinder mit hoch verdaulichen Proteinen und Präbiotika, die zum Erhalt der Darmgesundheit beitragen können. Außerdem enthält das Trockenfutter einen synergetischen Antioxidanzien-Komplex, der die natürliche Funktion der körpereigenen Abwehrkräfte unterstützen kann. Dank seines abgestimmten Nährstoffprofils eignet es sich gut als Alleinfutter für Kätzchen, aber auch für trächtige und säugende Kätzinnen.</p>',
      contentType: 'text',
      descriptionName: 'Produktbeschreibung'
    },
    {
      label: 'Produktvorteile',
      content:
        '<ul class="ui-star-list list-paddingleft-2"><li><p class="list_title">Natürliche Abwehrkräfte</p><p class="list_item">Ein synergistischer Antioxidanzienkomplex aus Vitamin E, Vitamin C, Taurin und Lutein hilft, die natürlichen Abwehrkräfte zu unterstützen.</p></li><li><p class="title">Verdauungssicherheit</p><p class="item">Die Rezeptur fördert die Verdaulichkeit. Die Kombination hochverdaulicher Proteine mit Präbiotika hilft, die Darmgesundheit zu unterstützen.</p></li></ul>',
      contentType: 'text',
      descriptionName: 'Produktvorteile'
    }
  ],
  goodsInfos: [
    {
      skuId: '2c91808576903fd8017690435813003d',
      cateId: 1131,
      label: 'PEDIATRIC WEANING',
      price: 26.74,
      listPrice: 0,
      subscriptionPrice: 25.4,
      subscriptionStatus: 1,
      mockSpecDetailIds: [29632],
      mockSpecIds: [20550],
      stock: 83,
      addedflag: 1,
      subscriptionPercentage: '5%'
    }
  ],
  defaultGoodsInfo: {
    skuId: '2c91808576903fd8017690435813003d',
    cateId: 1131,
    label: 'PEDIATRIC WEANING',
    price: 26.74,
    listPrice: 0,
    subscriptionPrice: 25.4,
    subscriptionStatus: 1,
    mockSpecDetailIds: [29632],
    mockSpecIds: [20550],
    stock: 83,
    addedflag: 1,
    subscriptionPercentage: '5%'
  },
  reviewsCount: 0,
  averageRating: null,
  tagging: {
    taggingFillColor: '',
    taggingFontColor: '',
    taggingImgUrl: '',
    taggingName: '',
    taggingType: '',
    taggingDisplayStatus: '',
    showPage: ''
  }
};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        right: '-5%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      <span className="iconjiantouyou1 iconfont rc-text-colour--text font-weight-bold ui-cursor-pointer" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        left: '-5%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      <span className="iconjiantouzuo1 iconfont rc-text-colour--text font-weight-bold ui-cursor-pointer" />
    </div>
  );
}
const AsNavFor = (props) => {
  const dataList = [
    {
      imageId: 381892,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'master',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381893,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'other',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_328049.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381894,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'hero',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_hero_508324.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381895,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'other',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_508353.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381896,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'bag',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_bag_498159.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381897,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'other',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_633479.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381898,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'kibble',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_kibble_328050.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    }
  ];
  const [currentSliderSize, setCurrentSliderSize] = useState({});
  const [idx, setIdx] = useState(0);
  const sliderImageMagnifierBox = useRef({});
  const sliderRef = useRef({});
  const navToSlide = (idx) => {
    console.info('idx', idx);
    setIdx(idx);
    sliderRef.current.slickGoTo(idx);
    let currentSlider = document.querySelectorAll('.slick-list img')[idx];
    let width = currentSlider.clientWidth;
    let height = currentSlider.clientHeight;
    setCurrentSliderSize({ width, height });
  };
  return (
    <div ref={sliderImageMagnifierBox}>
      <div className="demo-css">
        <div className="relative">
          <Slider
            ref={(slider) => (sliderRef.current = slider)}
            swipeToSlide={false}
            arrows={false}
            touchMove={false}
            swipe={false}
            infinite={false}
          >
            {dataList.map((item, index) => (
              <img src={item.artworkUrl} />
            ))}
          </Slider>
          <div
            className="absolute"
            style={{
              top: 0,
              marginLeft: '50%',
              transform: 'translate(-50%)',
              zIndex: 999
            }}
          >
            <ImageMagnifier
              minImg={dataList[idx].artworkUrl}
              magnifierContainerLeft={
                sliderImageMagnifierBox.current.clientWidth
              }
              currentSliderSize={currentSliderSize}
              maxImg={dataList[idx].artworkUrl}
            />
          </div>
        </div>
        <Slider
          slidesToShow={5}
          swipeToSlide={false}
          arrows={true}
          infinite={false}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {dataList.map((item, index) => (
            <div
              className={`slider-item`}
              onMouseOver={() => {
                navToSlide(index);
              }}
            >
              <div className={`pic-item-box ${index == idx ? 'active' : ''}`}>
                <div
                  className={`pic-item`}
                  style={{
                    height: 0,
                    paddingTop: '100%',
                    backgroundImage: `url('${item.artworkUrl}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default AsNavFor;
// export default class AsNavFor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }

//   componentDidMount() {
//     this.setState({});
//   }

//   render() {
//     let switchSides = false;

//   }
// }
