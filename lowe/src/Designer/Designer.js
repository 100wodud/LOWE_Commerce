import React from "react";
import DHeader from "./DHeader";
import "./Designer.css"
import DesignerList from "./DesignerList";
import Footer from "../Nav/Footer";
import ModalFilter from "./ModalFilter";
import axios from "axios";

class Designer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 1,
            location: "전체",
            category: "전체",
            data: "",
            showdata: "",
            modal: false,
            filter: false,
            search: "",
            likedata: []
        };
    }
    componentDidMount = () => {
        let designer = JSON.parse(window.localStorage.getItem("designer_list"));
        if(!designer){
            localStorage.setItem("designer_list", JSON.stringify([]));
        }
        this.setState({ data: designer, showdata: designer })
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getDesignerList", {
        }).then((res) => {
            this.setState({ data: res.data, showdata: res.data })
            localStorage.setItem("designer_list", JSON.stringify(res.data));
        })

    }

    onclickList = (e) => () => {
        this.setState({ list: e })

        let user_id = Number(window.localStorage.getItem("id"));
        if(user_id){
        axios.post(`https://d205rw3p3b6ysa.cloudfront.net/getFavorite`,{
            user_id: user_id,
        })
            .then((res) => {
                this.setState({ likedata: res.data })
            }).catch((err) => {
                console.log(err)
            });
        }

    }

    onClickClose = () => {
        this.setState({ modal: false })
    }

    onClickOpen = () => {
        this.setState({ modal: true })
    }

    onclicklocation = (e) => () => {
        this.setState({ location: e })
    }

    onclickcategory = (e) => () => {
        this.setState({ category: e })
    }

    onChangeSearch = (key) => (e) => {
        this.setState({ search: e.target.value })
    }

    onclickReset = () => {
        let data = this.state.data
        this.setState({
            location: "전체",
            category: "전체",
            showdata: data,
            modal: false,
            filter: false,
            search: ""
        })
    }

    handleInputSearch = () => {
        let search = this.state.search;
        let data = this.state.data;
        let arr = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].Hashtags.length) {
                for (let j = 0; j < data[i].Hashtags.length; j++) {
                    if (data[i].Hashtags[j].content.indexOf(search) !== -1) {
                        arr.push(data[i])
                        break;
                    }
                }
            }
        }
        this.setState({ showdata: arr, modal: false, filter: false })
    }

    onclickFilter = () => {
        let data = this.state.data;
        let arr = [];
        let category = this.state.category;
        let location = this.state.location;

        for (let i = 0; i < data.length; i++) {
            if (data[i].store.indexOf(location) !== -1 || this.state.location === "전체") {
                for (let j = 0; j < data[i].Hashtags.length; j++) {
                    if (data[i].Hashtags[j].content.indexOf(category) !== -1 || this.state.category === "전체") {
                        arr.push(data[i])
                        break;
                    }
                }
            }
        }
        this.setState({ showdata: arr, modal: false, filter: true })
    }

    render() {
        return (
            <>
                <DHeader onChangeSearch={this.onChangeSearch} handleInputSearch={this.handleInputSearch} />
                <section className="Designer_section">
                    <div className="Designer-filter">
                        <p style={{lineHeight: "40px"}} className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>디자이너</p>
                        <p style={{lineHeight: "40px"}} className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>즐겨찾기</p>
                    </div>
                    {
                        this.state.list === 1 ?
                            this.state.showdata ?
                                <>
                                    <div className="Designer_filter_div">
                                        <div className="Designer_filter">
                                            <span className={this.state.filter ? "Designer_filter_true" : "Designer_filter_false"} onClick={this.onClickOpen}>{this.state.filter ? this.state.location : "지역 " + this.state.location}<span style={{marginLeft: "8px"}}><img src={process.env.PUBLIC_URL + "/image/nav/designer_filter_arrow.svg"} alt="필터 보기" /></span></span>
                                            <span className={this.state.filter ? "Designer_filter_true" : "Designer_filter_false"} onClick={this.onClickOpen}>{this.state.filter ? this.state.category : "시술 " + this.state.category}<span style={{marginLeft: "8px"}}><img src={process.env.PUBLIC_URL + "/image/nav/designer_filter_arrow.svg"} alt="필터 보기" /></span></span>
                                        </div>
                                        <div onClick={this.onclickReset} style={{ cursor: "pointer" }}>
                                            <span style={{ font: "500 14px 'Noto Sans'" }}>초기화</span>
                                            <span><img src={process.env.PUBLIC_URL + "/image/nav/reset.svg"} alt="리셋버튼" /></span>
                                        </div>
                                    </div>
                                    {this.state.showdata.map((e) => (
                                        <DesignerList data={e} key={e.id} />
                                    ))
                                    }
                                </>
                                :
                                <div style={{ height: "100px", textAlign: "center", lineHeight: "100px", width: "100%", marginTop: "20px" }}>
                                    곧 새로운 스타일을 보여드릴게요 :)
                                </div>
                            :

                            this.state.likedata.length ?
                                <>
                                    {this.state.likedata.map((e) => (
                                        <DesignerList data={e.Manager} key={e.id} />
                                    ))
                                    }
                                </> :
                                <div style={{ height: "100px", textAlign: "center", lineHeight: "100px", width: "100%", marginTop: "20px" }}>
                                    즐겨찾기 한 디자이너가 없습니다 :)
                                </div>
                    }
                </section>
                <Footer />
                {this.state.modal ?
                    <ModalFilter close={this.onClickClose} onclicklocation={this.onclicklocation} location={this.state.location} onclickcategory={this.onclickcategory} category={this.state.category} onclickFilter={this.onclickFilter} onclickReset={this.onclickReset} />
                    : null
                }
            </>
        );
    }
}

export default Designer;