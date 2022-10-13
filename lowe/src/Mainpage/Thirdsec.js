import { Component } from "react";
import "./Thirdsec.css";
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll';
import ThirdReview from "./ThirdReview";
import ModalReview from "../Board/ModalReview";
import Goodslist from "../Home/Goodslist";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TagManager from "react-gtm-module";

class Thirdsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            slider: "",
            modal: false,
            favorite: [],
            banner: [],
        };
    }

    componentDidMount = () => {

        axios.post("https://server.lowehair.kr/getAllBanner", {})
            .then((res) => {
                let arr = [];
                if (res.data.length) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 2) {
                            arr.push(res.data[i]);
                        }
                    }
                    this.setState({ banner: arr })
                }
            }).catch((err) => {
                console.log(err)
            })

        axios.post("https://server.lowehair.kr/getBoard", {
            order: "payment", isPayment: true, open: "1", isDesigner: true, isHashtag: true
        }).then((res) => {
            this.setState({ favorite: res.data.slice(0, 8) })
        })

        axios.post("https://server.lowehair.kr/getReview", {
            isDesigner: true
        }).then((res) => {
            let review = []
            for (let i = 0; i < res.data.length; i++) {
                if (review.length >= 8) {
                    break;
                }
                if (res.data[i].Images.length && res.data[i].BoardId !== 122) {
                    review.push(res.data[i])
                }
            }
            this.setState({ review: review })
        })
    }


    openmodal = (e) => () => {
        this.setState({ modal: true, slider: e });
    };
    closemodal = () => {
        this.setState({ modal: false });
    };

    onclickimg = (e) => () => {
        let num = 0
        for (let i = 0; i < this.state.review.length; i++) {
            if (e.id === this.state.review[i].id) {
                num = i;
                break
            }
        }
            const tagManagerArgs = {
              dataLayer: {
                event: "click_main_real_review_image",
                item_id: e.Board.id,
                item_name: e.Board.name,
                price: e.Board.price,
                branch: e.Board.store,
                designer: e.Board.designer_name,
                index: num,
                name: e.User.name
              },
            };
            TagManager.dataLayer(tagManagerArgs);
            this.setState({ modal: true, slider: num });
    }

    onClickBannerimg = (e) => async() => {
        const tagManagerArgs = {
          dataLayer: {
            event: "click_main_middle_banner",
            title: e.title
          },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    render() {
        var setting = {
            dots: true,
            infinite: true,
            autoplaySpeed: 10000,
            pauseOnHover: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            touchMove: true,
            draggable: true,
        };
        return (
            <section className="Mainpage_third_section">
                <div className="Mainpage_third_review">
                    <div>방문고객 리얼 리뷰 👀</div>
                </div>

                <ScrollContainer className="Recent_total_slide" style={{ marginTop: "20px", height: "345px" }} >
                    {this.state.review.length ?
                        this.state.review.map((e,i) => (
                            <ThirdReview e={e} i={i} key={e.id} onclickimg={this.onclickimg}  event="click_main_real_review_product" wish="click_main_real_review_product_wish" />
                        )) : null
                    }
                </ScrollContainer>

                <div className="Mainpage_third_recommand">
                    <div style={{ paddingLeft: "12px" }}>지금 가장 핫한 시술 🔥 </div>
                    <div className="Recent_total_list" id="special_recent_list">
                        <ScrollContainer className="Recent_total_slide" style={{ marginTop: "20px", height: "280px" }} >
                            {
                                this.state.favorite.map((e, i) => (
                                    <Goodslist e={e} key={e.id} i={i} event="click_main_hot_product" wish="click_main_hot_product_wish" />
                                ))
                            }
                        </ScrollContainer>
                    </div>
                </div>
                <div className="Mainpage_third_banner">
                    <Slider {...setting}>
                        {
                            this.state.banner.map((e) =>
                            (
                                <a href={e.url} key={e.id} onClick={this.onClickBannerimg(e)}>
                                    <img src={e.img} alt="로위 배너" />
                                </a>
                            ))
                        }
                    </Slider>
                </div>
                {this.state.modal ?
                    <ModalReview data={this.state.review} close={this.closemodal} slider={this.state.slider} mainpage={true} /> : null
                }
            </section>
        )
    }
}

export default Thirdsec;
