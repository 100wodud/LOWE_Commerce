import React from "react";
import DHeader from "./DHeader";
import "./Designer.css"
import DesignerList from "./DesignerList";
import Footer from "../Nav/Footer";
import ModalFilter from "./ModalFilter";
import axios from "axios";
import Style from "./Style";
import ScrollContainer from 'react-indiana-drag-scroll';

class Designer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 1,
            filterList: [],
            location: true,
            category: true,
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
        if (!designer) {
            localStorage.setItem("designer_list", JSON.stringify([]));
        }
        this.setState({ data: designer, showdata: designer })
        axios.post("http://54.180.117.244:5000/getDesignerList", {
        }).then((res) => {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].user_state === 1) {
                    arr.push(res.data[i])
                }
            }
            this.setState({ data: arr, showdata: arr })
            localStorage.setItem("designer_list", JSON.stringify(arr));
        })

    }

    onclickList = (e) => () => {
        this.setState({ list: e })
    }

    onClickClose = () => {
        this.setState({ modal: false })
    }

    onClickOpen = () => {
        this.setState({ modal: true })
    }

    onclicklocation = (e) => () => {
        const location = ["강남", "신촌", "합정", "홍대입구", "L7홍대"]
        let filters = this.state.filterList;
        let filterList = filters.filter((element, index) => {
            return location.indexOf(element) === -1;
        });
        filterList.unshift("지역 전체")
        this.setState({ filterList: filterList, location: true })
    }

    onclickcategory = (e) => () => {
        const category = ["컷", "펌", "염색", "붙임머리", "클리닉"];
        let filters = this.state.filterList;
        let filterList = filters.filter((element, index) => {
            return category.indexOf(element) === -1;
        });
        filterList.unshift("시술 전체")
        this.setState({ filterList: filterList, category: true })
    }

    onclickFilterListloc = (e) => () => {
        const location = ["강남", "신촌", "합정", "홍대입구", "L7홍대"]
        let filters = this.state.filterList;
        let f = [];
        if (filters.indexOf(e) === -1) {
            filters.push(e)
            f = filters.filter((element, index) => {
                return element !== "지역 전체";
            }); 
            this.setState({location: false})
        } else {
            f = filters.filter((element, index) => {
                return element !== e;
            });
            let loc = true
            for(let i=0; i < location.length; i++){
                if(f.indexOf(location[i]) !== -1){
                    loc = false
                }
            }
            this.setState({location: loc})
        }
        this.setState({ filterList: f })
    }

    onclickFilterListcat = (e) => () => {
        const category = ["컷", "펌", "염색", "붙임머리", "클리닉"];
        let filters = this.state.filterList;
        let f = [];
        if (filters.indexOf(e) === -1) {
            filters.push(e)
            f = filters.filter((element, index) => {
                return element !== "시술 전체";
            });
            this.setState({category: false})
        } else {
            f = filters.filter((element, index) => {
                return element !== e;
            });
            let cat = true
            for(let i=0; i < category.length; i++){
                if(f.indexOf(category[i]) !== -1){
                    cat = false
                }
            }
            this.setState({category: cat})
        }
        this.setState({ filterList: f })
    }

    onChangeSearch = (key) => (e) => {
        this.setState({ search: e.target.value })
    }

    onclickReset = () => {
        let data = this.state.data
        this.setState({
            showdata: data,
            filterList: [],
            search: "",
            category: true,
            location: true
        })
    }

    onclickFilterdelete = (e) => () => {
        let filters = this.state.filterList;
        let f = [];
        f = filters.filter((element, index) => {
            return element !== e;
        });
        this.setState({ filterList: f })
        setTimeout(() => {
            this.onclickFilter()
        }, 20);
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
        let arr2 = [];
        let board = [];
        let loc = "";
        let l = true;
        let c = true;
        if (this.state.filterList.length) {
            for (let i = 0; i < data.length; i++) {
                for (let k = 0; k < this.state.filterList.length; k++) {
                    if (this.state.filterList[k] === "홍대입구" || this.state.filterList[k] === "강남" || this.state.filterList[k] === "신촌" || this.state.filterList[k] === "합정" || this.state.filterList[k] === "L7홍대") {
                        loc = this.state.filterList[k];
                        l = false;
                    } else if (this.state.filterList[k] === "컷" || this.state.filterList[k] === "펌" || this.state.filterList[k] === "염색" || this.state.filterList[k] === "붙임머리" || this.state.filterList[k] === "클리닉") {
                        c = false;
                    }
                    if (data[i].store.indexOf(loc) !== -1 || l === true || this.state.filterList[k] === "지역 전체") {
                        for (let j = 0; j < data[i].Hashtags.length; j++) {
                            if (data[i].Hashtags[j].content.indexOf(this.state.filterList[k]) !== -1 || this.state.filterList[k] === "시술 전체" || c === true) {
                                arr.push(data[i])
                                break;
                            }
                        }
                    }
                }
            }
            arr2 = new Set(arr);
            board = [...arr2]
            this.setState({ showdata: board, modal: false, filter: true })
        } else {
            this.setState({ showdata: data, modal: false, filter: true })
        }
    }

    render() {
        let style = ["디자인컷", "발레아쥬", "중단발", "맨즈헤어", "고데기펌", "히피펌", "탈색", "톤다운", "데일리펌", "숏펌"]
        return (
            <>
                <DHeader onChangeSearch={this.onChangeSearch} handleInputSearch={this.handleInputSearch} />
                <section className="Designer_section">
                    <div className="Designer-filter">
                        <p style={{ lineHeight: "40px" }} className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>디자이너</p>
                        <p style={{ lineHeight: "40px" }} className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>스타일</p>
                    </div>
                    {
                        this.state.list === 1 ?
                            this.state.showdata ?
                                <>
                                    <div className="Designer_filter_div">
                                        <div className="Designer_filter">
                                            <span onClick={this.onClickOpen}>
                                                <img src={process.env.PUBLIC_URL + "/image/nav/DesignerList_filter.svg"} alt="필터 보기" />
                                            </span>

                                            <ScrollContainer className="Designer_filter_slide">
                                                {this.state.filterList.map((e,i) => (
                                                    <>
                                                        {e === "지역 전체" || e === "시술 전체" ? null :
                                                            <div onClick={this.onclickFilterdelete(e)} className="Designer_filter_slide_span"><span>{e}</span><span style={{ marginLeft: "8px" }}><img src={process.env.PUBLIC_URL + "/image/nav/DesignerList_filter_delete.svg"} alt="필터 보기" /></span></div>
                                                        }
                                                    </>
                                                ))
                                                }
                                            </ScrollContainer>
                                        </div>
                                        <div onClick={this.onclickReset} style={{ cursor: "pointer" }}>
                                            <span style={{ font: "500 14px 'Noto Sans'" }}>초기화</span>
                                            <span><img src={process.env.PUBLIC_URL + "/image/nav/reset.svg"} alt="리셋버튼" /></span>
                                        </div>
                                    </div>
                                    {this.state.showdata.map((e, i) => (
                                        <div>
                                            <div className={String(i + 1).length < 3 ? "Designer_ranking_number" : "Designer_ranking_number_three"}>{i + 1}</div>
                                            <DesignerList data={e} rank={e.id} />
                                        </div>
                                    ))
                                    }
                                </>
                                :
                                <div style={{ height: "100px", textAlign: "center", lineHeight: "100px", width: "100%", marginTop: "20px" }}>
                                    곧 새로운 스타일을 보여드릴게요 :)
                                </div>
                            :
                            <>
                                {
                                    style.map((e, i) => (
                                        <Style data={e} key={i} />
                                    ))
                                }
                            </>
                    }
                </section>
                <Footer />
                {this.state.modal ?
                    <ModalFilter onclickFilterListcat={this.onclickFilterListcat} onclickFilterListloc={this.onclickFilterListloc} filterList={this.state.filterList} close={this.onClickClose} onclicklocation={this.onclicklocation} location={this.state.location} onclickcategory={this.onclickcategory} category={this.state.category} onclickFilter={this.onclickFilter} onclickReset={this.onclickReset} />
                    : null
                }
            </>
        );
    }
}

export default Designer;