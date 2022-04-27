import { Component } from "react";
import Header from "../Nav/Header";
import "./Promotion2.css"
import promotion from "../data/Promotion";
import Promotion2List from "./Promotion2List";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProFooter from "./ProFooter";

AOS.init();

class Promotion2 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <Header header="clear" />
                <section className="Promotion_spring04">
                    <div className="Promotion_spring04_firstdiv">
                        <img className="Promotion_spring04_firstimg" src={`${process.env.PUBLIC_URL}/image/promotion/02/01.jpg`} alt="로위 프로모션" />
                        <img className="Promotion_spring04_animation" data-aos="zoom-in" data-aos-duration="2000" src={`${process.env.PUBLIC_URL}/image/promotion/02/01_02.png`} alt="로위 프로모션" />
                        <img className="Promotion_spring04_animation" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="2000" src={`${process.env.PUBLIC_URL}/image/promotion/02/01_01.png`} alt="로위 프로모션" />
                    </div>
                    <img className="Promotion_spring04_img" src={`${process.env.PUBLIC_URL}/image/promotion/02/02.png`} alt="로위 프로모션" />
                    <div className="Promotion_spring04_seconddiv">
                        {
                            promotion.map((e) => (
                                e.promotion === 1 ?
                                    <Promotion2List data={e} key={e.id} /> : null
                            ))
                        }
                    </div>
                    <img className="Promotion_spring04_img" src={`${process.env.PUBLIC_URL}/image/promotion/02/03.jpg`} alt="로위 프로모션" />
                    <img className="Promotion_spring04_img" style={{marginTop: "-4px"}} src={`${process.env.PUBLIC_URL}/image/promotion/02/04.jpg`} alt="로위 프로모션" />
                    <div className="Promotion_spring04_thirddiv">
                        {
                            promotion.map((e) => (
                                e.promotion === 2 ?
                                    <Promotion2List data={e} key={e.id} /> : null
                            ))
                        }
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/image/promotion/02/05.jpg`} alt="로위 프로모션" />
                <ProFooter />
                </section>
            </>
        )
    }
}

export default Promotion2;
