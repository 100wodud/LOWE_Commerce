import { Component } from "react";
import { Route, Switch, withRouter} from "react-router-dom";
import Home from "./Home/Home";
import Signup from "./Sign/Signup";
import Signin from "./Sign/Signin";
import Mypage from "./Mypage/Mypage";
import Search from "./Search/Mainpage"
import Board from "./Board/Board";
import Like from "./Like/Like";
import Recent from "./Recent/Recent";
import Review from "./Review/Review";
import Find from "./Find/Find";
import Withdrawal from "./Sign/Withdrawal";
import EditmyInfo from "./Sign/EditmyInfo";
import Designers from "./Designer/Designer";
import Ddetail from "./Designerdetail/Ddetail";
import Promotion from "./Promotion/Promotion";
import Payment from "./Payment/Payment";
import Mycoupon from "./Mypage/Coupon";
import Myreview from "./Mypage/ReviewList";
import Receipt from "./Receipt/Receipt";
import PaymentList from "./Mypage/PaymentList";
import Paymentfail from "./Payment/Paymentfail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  render() {
    return (
      <>
        <span id="header_trigger"></span>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/search' component={Search} />
          <Route path='/board/:id' component={Board} />
          <Route path='/like' component={Like} />
          <Route path='/withdrawal' component={Withdrawal} />
          <Route path='/findmyid' component={Find} />
          <Route path='/recently' component={Recent} />
          <Route path='/editmyinfo' component={EditmyInfo} />
          <Route path='/myreview/edit/:id' component={Review} />
          <Route path='/review/write/:id' component={Review} />
          <Route path='/designers' component={Designers} />
          <Route path='/designer/:id' component={Ddetail} />
          <Route path='/promotion/spring2203'component={Promotion} />
          <Route path='/payment/:id' component={Payment} />
          <Route path='/mycoupons' component={Mycoupon} />
          <Route path='/myreviews' component={Myreview} />
          <Route path='/receipt/:id' component={Receipt} />
          <Route path='/mypayments' component={PaymentList} />
          <Route path='/mypayment/:id' component={Receipt} />
          <Route path='/paymentfail' component={Paymentfail} />
        </Switch>
      </>
    )
  }
}

export default withRouter(App);




