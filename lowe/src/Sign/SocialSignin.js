import React from "react";
import axios from "axios";
import SignHeader from "./SignHeader";
import ModalPhone from "./ModalPhone";
import SocialFirst from "./SocialFirst";
import SocialSecond from "./SocialSecond";
import moment from 'moment';

class SocialSignin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            phonemodal: false,
            agree1: false,
            agree2: false,
            agree3: false,
            agree4: false,
            agree5: false,
            randomcheck: "",
            phone: "",
            list: 1
        };
    }
    componentDidMount = () => {
        let exist = window.location.pathname.split('/')[3]
        let id = Number(window.location.pathname.split('/')[2])
        this.setState({ id: id })

        if (exist === "false") {
            window.localStorage.setItem("id", id);
            window.history.go(-2)
        }
    }


    onClickNext = (e) => () => {
        this.setState({ list: 2, data: e })
    }

    onClickSubmit = (e) => () => {
        this.setState({ data: e })
        let rou = window.location.pathname + "#signupsuccess";
        window.location.replace(rou)
        axios.patch(`http://54.180.117.244:5000/user/${this.state.id}`, {
            name: e.name,
            phone: e.phone,
            birthday: e.birth.slice(0, 4) + '-' + e.birth.slice(4, 6) + '-' + e.birth.slice(6, 8),
            gender: Number(e.gender),
            agree: this.state.agree5,
        }).then((res) => {
            let date = new Date();
            let expired = moment(date).add(3, "months")
            axios.post("http://54.180.117.244:5000/createCoupon", {
                UserId: this.state.id,
                price: 10000,
                content: "[WELCOME] 회원가입 축하 쿠폰",
                used: "1",
                expired: expired,
                minimum: 30000
            })
            axios.post("http://54.180.117.244:5000/createCoupon", {
                UserId: this.state.id,
                price: 10000,
                content: "[WELCOME] 첫 예약 축하 쿠폰",
                used: "1",
                expired: expired,
                minimum: 100000
            })
            setTimeout(() => {
                this.openmodalPhone(`네이버 소셜가입 완료`)
            })
        })
    }

    onClickAgree = (key) => () => {
        if (key === "agree1") {
            this.setState({ agree1: !this.state.agree1 });
        } else if (key === "agree2") {
            this.setState({ agree2: !this.state.agree2 });
        } else if (key === "agree3") {
            this.setState({ agree3: !this.state.agree3 });
        } else if (key === "agree4") {
            this.setState({ agree4: !this.state.agree4 });
        } else if (key === "agree5") {
            this.setState({ agree5: !this.state.agree5 });
        } else if (key === "agree") {
            if (this.state.agree1 && this.state.agree2 && this.state.agree3 && this.state.agree4 && this.state.agree5) {
                this.setState({ agree1: false, agree2: false, agree3: false, agree4: false, agree5: false });
            } else {
                this.setState({ agree1: true, agree2: true, agree3: true, agree4: true, agree5: true });
            }
        }
    }
    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    gotoSubmit = () =>{
            this.setState({
                birth_error: "",
            })
            let data = this.state.data;
            data.gender = "";
            data.birth = "";
            this.onClickSubmit(data)()
    }

    render() {
        return (
            <>
            {this.state.list === 1 ?
                <SignHeader header="회원가입" />:
                <SignHeader header="회원가입" jump={true} gotoSubmit={this.gotoSubmit} />
            }
                {this.state.list === 1 ?
                    <SocialFirst onClickAgree={this.onClickAgree} state={this.state} onClickNext={this.onClickNext} /> :
                    this.state.list === 2 ?
                        <SocialSecond state={this.state} onClickNext={this.onClickNext} onClickSubmit={this.onClickSubmit} /> :
                        null}
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default SocialSignin;