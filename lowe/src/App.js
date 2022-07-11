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
import Promotion2 from "./Promotion/Promotion2";
import Portfolio from "./Portfolio/Portfolio";
import Portfoliolist from "./Portfolio/Portfoliolist";
import Portf from "./Portfolio/Portf";
import Promotion3 from "./Promotion/Promotion3";
import Reservation from "./Reservation/Reservation";

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
          <Route path='/promotion/moment_event'component={Promotion} />
          <Route path='/payment/:id' component={Payment} />
          <Route path='/mycoupons' component={Mycoupon} />
          <Route path='/myreviews' component={Myreview} />
          <Route path='/receipt/:id' component={Receipt} />
          <Route path='/mypayments' component={PaymentList} />
          <Route path='/mypayment/:id' component={Receipt} />
          <Route path='/paymentfail' component={Paymentfail} />
          <Route path='/promotion/spring2204'component={Promotion2} />
          <Route path='/surgery/:id' component={Payment} />
          <Route path='/portfolios/:id' component={Portfolio} />
          <Route path='/portfoliolist/:id' component={Portfoliolist} />
          <Route path='/portfolio/:id' component={Portf} />
          <Route path='/event_review01' component={Promotion3} />
          <Route path='/reservation_board/:id' component={Reservation} />
          <Route path='/reservation_surgery/:id' component={Reservation} />
          <Route path='/reservation_change/:id' component={Reservation} />
        </Switch>
      </>
    )
  }
}

export default withRouter(App);





