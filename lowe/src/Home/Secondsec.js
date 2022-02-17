import axios from 'axios';
import { Component } from "react";
import Goodslist from './Goodslist';
import Filter from "./Filter";
import "./Secondsec.css";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Allgoods: "",
            Showgoods: "",
            promotion: "",
            category: "",
            filter: false,
            status: "최신순",
            banner: '',
        };
    }

    componentDidMount = () => {
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getAllBoard", {})
            .then((res) => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].open === '1') {
                        arr.push(res.data[i])
                    }
                }
                this.setState({ Allgoods: arr, Showgoods: arr, category: 0, number: 10 });
            }).catch((err) => {
                console.log(err)
            })


        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getAllBanner", {})
            .then((res) => {
                if (res.data.length) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 4) {
                            this.setState({ banner: res.data[i] })
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    onclickPromotion = () => {
        let arr = [];
        for (let i = 0; i < this.state.Allgoods.length; i++) {
            if (this.state.Allgoods[i].eventType) {
                arr.push(this.state.Allgoods[i]);
            }
        }
        this.setState({ Showgoods: arr, promotion: "promotion", category: 0, status: "최신순" });
    }

    onclickAll = () => {
        this.setState({ Showgoods: this.state.Allgoods, promotion: "", category: 0, status: "최신순" })
    }

    onclickCategory = (e) => () => {
        let arr = [];

        if (e === 0) {
            if (!this.state.promotion) {
                arr = this.state.Allgoods;
            } else {
                for (let i = 0; i < this.state.Allgoods.length; i++) {
                    if (this.state.Allgoods[i].eventType) {
                        arr.push(this.state.Allgoods[i]);
                    }
                }
            }
        } else {
            if (!this.state.promotion) {
                for (let i = 0; i < this.state.Allgoods.length; i++) {
                    if (this.state.Allgoods[i].category === e) {
                        arr.push(this.state.Allgoods[i]);
                    }
                }
            } else {
                for (let i = 0; i < this.state.Allgoods.length; i++) {
                    if (this.state.Allgoods[i].category === e && this.state.Allgoods[i].eventType) {
                        arr.push(this.state.Allgoods[i]);
                    }
                }
            }
        }
        this.setState({ category: e, Showgoods: arr, status: "최신순"})
    }



    onClickFilter = () => {
        this.setState({ filter: true })
    }
    onClickclose = () => {
        this.setState({ filter: false })
    }

    onclickdataFilter = (e) => async () => {
        this.setState({ filter: false, status: e })
        let arr = this.state.Showgoods;
        if (arr.length) {
            if (e === "최신순") {
                arr.sort(await (function (a, b) {
                    if (a.id > b.id) {
                        return -1;
                    }
                    if (a.id < b.id) {
                        return 1;
                    }
                    return 0;
                }))
                this.setState({ Showgoods: arr })
            }
            if (e === "인기순") {
                arr.sort(await function (a, b) {
                    let alike = 0;
                    let blike = 0;
                    for (let i = 0; i < a.Wishes.length; i++) {
                        if (a.Wishes[i].heart === 1) {
                            alike = alike + 1;
                        }
                    }
                    for (let j = 0; j < b.Wishes.length; j++) {
                        if (b.Wishes[j].heart === 1) {
                            blike = blike + 1;
                        }
                    }
                    if (alike > blike) {
                        return -1;
                    }
                    if (alike < blike) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ Showgoods: arr })
            }

            if (e === "리뷰 많은 순") {
                arr.sort(await function (a, b) {
                    if (a.Reviews.length > b.Reviews.length) {
                        return -1;
                    }
                    if (a.id < b.id) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ Showgoods: arr })
            }
        }
    }

    render() {
        const category = [{ id: 0, category: "전체" }, { id: 1, category: "컷" }, { id: 2, category: "펌" }, { id: 3, category: "염색" }, { id: 5, category: "클리닉" }];
        return (
            <section className="Mainpage_second_section">
                <Filter
                    onclickPromotion={this.onclickPromotion}
                    onclickAll={this.onclickAll}
                    promotion={this.state.promotion}
                    category={category}
                    onclickCategory={this.onclickCategory}
                    categorySelect={this.state.category}
                    onClickFilter={this.onClickFilter}
                    onClickclose={this.onClickclose}
                    filter={this.state.filter}
                    status={this.state.status}
                    onclickdataFilter={this.onclickdataFilter} />
                <div className="goods_list">
                    {
                        this.state.Showgoods.length ?
                            this.state.Showgoods.map((e, i) => (
                                <>
                                    <div key={e.id}>
                                        <Goodslist e={e} />
                                    </div>
                                    {
                                        (i + 1) % 10 === 0 ?
                                            <a href={this.state.banner.url} className="middle_banner">
                                                <img src={this.state.banner.img} alt="띠 배너" />
                                            </a> : null
                                    }
                                </>
                            )) :
                            <div style={{ height:"100px", textAlign: "center",lineHeight: "100px", width: "100%"}}>
                                곧 새로운 스타일을 보여드릴게요 :)
                            </div>
                    }
                </div>
            </section>
        )
    }
}

export default Secondsec;