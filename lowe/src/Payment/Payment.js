import { Component } from "react";
import Header from "../Sign/SignHeader";
import axios from "axios";
import Firstsec from "./Firstsec";
import Secondsec from "./Secondsec";
import Thirdsec from "./Thirdsec";
import Fourthsec from "./Fourthsec";
import Fifthsec from "./Fifthsec";
// import Sixthsec from "./Sixthsec";
import Seventhsec from "./Seventhsec";
import PFooter from "./PFooter";


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            user: "",
            content: "",
            imgs: [],
            coupon: [],
            method: 0,
            agree1: false,
            agree2: false,
            modalopen: false,
            surgeyid: ""
        };
    }

    componentDidMount = () => {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        let id = window.location.pathname.split("/")[2];
        let path = window.location.pathname.split("/")[1];
        if (path === "payment") {
            axios.post("https://server.lowehair.kr/getBoardDetail", {
                id: id,
            }).then((res) => {
                this.setState({ data: res.data });
            }).catch((err) => {
                console.log(err)
            });
        } else if (path === "surgery") {
            let surgey_payment = JSON.parse(window.localStorage.getItem("surgey_payment"));
            let data = {
                board: {
                    id: 122,
                    ManagerId: surgey_payment.ManagerId,
                    price: surgey_payment.price,
                    thumbnail: "https://lowe-image.s3.ap-northeast-2.amazonaws.com…8237171_525430271510486_1571957910076915712_n.png",
                    name: surgey_payment.content,
                    eventPrice: 0,
                },
            }
            this.setState({ data: data,surgeyid: surgey_payment.id });
        }


        let user = window.localStorage.getItem("id");
        if (user) {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: user
            })
                .then((res) => {
                    this.setState({ user: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            window.location.href = `/signin${funnel}`
        }



    }

    onChangetotal = (e) => () => {
        this.setState({ totalprice: e })
    }

    handleInputValue = (key) => async (e) => {
        if (key === "img") {
            let reader = new FileReader();
            let file = e.target.files[0];
            if (e.target.files.length) {
                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        previewURL: reader.result,
                    });
                };
                reader.readAsDataURL(file);
                let img = e.target.files[0];

                const formData = new FormData();
                formData.append("file", img);
                await axios
                    .post("https://server.lowehair.kr/addImg", formData, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }).then(res => {
                        let img = this.state.imgs;
                        let data = { url: res.data.url }
                        img.push(data);
                        this.setState({ imgs: img });
                    })
            }
        } else {
            this.setState({ [key]: e.target.value });
        }
    };

    onClickMethod = (key) => () => {
        this.setState({ method: key });
    }

    onClickDelimg = (i) => () => {
        let img = this.state.imgs;
        img.splice(i, 1);
        this.setState({ imgs: img });
    }


    onClickAgree = (key) => () => {
        if (key === "agree1") {
            this.setState({ agree1: !this.state.agree1 });
        } else if (key === "agree2") {
            this.setState({ agree2: !this.state.agree2 });
        } else if (key === "agree") {
            if (this.state.agree1 && this.state.agree2) {
                this.setState({ agree1: false, agree2: false });
            } else {
                this.setState({ agree1: true, agree2: true });
            }
        }
    }

    onClickCoupon = (e) => () => {
        let coupons = this.state.coupon;
        let data = JSON.parse(e);
        let exist = false;
        let coupon = {
            id: data.id,
            data: data
        }
        for (let i = 0; i < coupons.length; i++) {
            if (coupons[i].id === data.id) {
                coupons.splice(i, 1);
                exist = true
            }
        }
        if (!exist) {
            coupons[0]=(coupon)
        }
        this.setState({ coupon: coupons })

    }

    onclickSubmit = (e) => {
        let total = document.getElementById("pricetotal").innerHTML;
        localStorage.setItem("reload", "false");
        let price = total.slice(0, total.length - 1).replaceAll(",", "");
        let payment = {}
        let define1 = {}
        let define2 = {}
        if (this.state.agree1 && this.state.agree2) {
            payment.boardId = this.state.data.board.id
            payment.board = this.state.data
            payment.userId = this.state.user.id
            payment.user = this.state.user
            payment.coupons = this.state.coupon
            payment.request = {
                text: this.state.content,
                img: this.state.imgs
            }
            payment.price = price
            payment.managerId = this.state.data.board.ManagerId

            define1.boardId = this.state.data.board.id
            define1.userId = this.state.user.id
            define1.coupons = this.state.coupon
            define1.price = price
            define1.managerId = this.state.data.board.ManagerId
            define1.surgeyId = this.state.surgeyid 
            define2.request = {
                text: this.state.content,
                img: this.state.imgs
            }

            localStorage.setItem("recent_payment", JSON.stringify(payment));
            // const data1 = { user_id: window.localStorage.getItem('id') };
            const dataString1 = JSON.stringify(define1);
            const replaceData1 = dataString1.replaceAll('"', '&quot;');
            // const data2 = { user_request: 'input text' };
            const dataString2 = JSON.stringify(define2);
            const replaceData2 = dataString2.replaceAll('"', '&quot;');
            axios.post('https://server.lowehair.kr/payAuth')
                .then((response) => {
                    if (response.status === 200) {
                        e.preventDefault();
                        const obj = {};
                        //카드-즉시결제-일반앱결제 고정 값 설정
                        obj.PCD_PAY_TYPE = 'card'; //카드결제 값 고정	             // (필수) 결제 방법 (transfer | card)
                        obj.PCD_PAY_WORK = 'pay'; //페이플 내부 결제방식 값 고정		             // (필수) 결제요청 업무구분 (AUTH : 본인인증+계좌등록, CERT: 본인인증+계좌등록+결제요청등록(최종 결제승인요청 필요), PAY: 본인인증+계좌등록+결제완료)
                        obj.PCD_CARD_VER = '02'; //앱카드 결제로 값 고정			     // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수

                        // 토큰값 세팅
                        obj.PCD_CST_ID = response.data.cst_id; // 가맹점 인증 후 리턴 받은 cst_id Token
                        obj.PCD_CUST_KEY = response.data.custKey; // 가맹점 인증 후 리턴 받은 custKey Token
                        obj.PCD_AUTH_KEY = response.data.AuthKey; // 가맹점 인증 후 리턴 받은 AuthKey Token
                        obj.PCD_PAY_URL = response.data.return_url; // 가맹점 인증 후 리턴 받은 결제요청 URL

                        //
                        obj.PCD_PAY_GOODS = this.state.data.board.name;
                        obj.PCD_PAY_TOTAL = price; //board.price;
                        obj.PCD_RST_URL = `https://server.lowehair.kr/payment_result`;
                        obj.PCD_PAYER_NO = this.state.user.id;
                        obj.PCD_PAYER_NAME = this.state.user.name; //user.name
                        obj.PCD_PAYER_EMAIL = this.state.user.email; //user.email
                        obj.PCD_USER_DEFINE1 = replaceData1;
                        obj.PCD_USER_DEFINE2 = replaceData2;

                        window.PaypleCpayPopup(obj);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            this.setState({ modalopen: true })
            setTimeout(() => {
                this.setState({ modalopen: false })
            }, 3000);
        }
    }


    render() {
        let price = 0
        if (this.state.data) {
            price = this.state.data.board.price;
            if (this.state.coupon.length) {
                this.state.coupon.forEach(e => {
                    price = price - e.data.price
                });
            } else {
                price = this.state.data.board.price;
            }
            if(price <= 0){
                price = 0;
            }
        }
        return (
            <>
                <Header header="결제" />
                <Firstsec data={this.state.data} />
                <Secondsec user={this.state.user} />
                <Thirdsec onClickDelimg={this.onClickDelimg} handleInputValue={this.handleInputValue} state={this.state} />
                <Fourthsec onClickCoupon={this.onClickCoupon} user={this.state.user} data={this.state.data} coupon={this.state.coupon} />
                <Fifthsec data={this.state.data} coupon={this.state.coupon} handleInputValue={this.handleInputValue} price={price} />
                <Seventhsec onClickAgree={this.onClickAgree} agree1={this.state.agree1} agree2={this.state.agree2} />
                <PFooter onclickSubmit={this.onclickSubmit} price={price} modalopen={this.state.modalopen} />
            </>
        );
    }
}

export default Payment;