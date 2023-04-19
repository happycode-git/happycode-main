import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './COMPONENTS/Home';
import Projects from './COMPONENTS/MEMBERS/Projects';
import Webline from './COMPONENTS/Webline';
import Referrals from './COMPONENTS/Referrals'
import Contact from './COMPONENTS/Contact'
import Loading from './COMPONENTS/UTILITIES/Loading'
// 
import { useSelector } from 'react-redux'
import Project from './COMPONENTS/MEMBERS/Project';
import TicketForm from './COMPONENTS/MEMBERS/TicketForm';
import Confirmation from './COMPONENTS/UTILITIES/Confirmation';
import Failure from './COMPONENTS/UTILITIES/Failure';
import AdminLogin from './COMPONENTS/ADMIN/AdminLogin';
import AdminDash from './COMPONENTS/ADMIN/AdminDash';
import PartnerDetail from './COMPONENTS/ADMIN/PartnerDetail';
import PartnerProject from './COMPONENTS/ADMIN/PartnerProject'
import NewPartner from './COMPONENTS/ADMIN/NewPartner';
import AllTickets from './COMPONENTS/MEMBERS/AllTickets';
import PartnerAllTickets from './COMPONENTS/ADMIN/PartnerAllTickets';
import NewProject from './COMPONENTS/ADMIN/NewProject'
import ProspectList from './COMPONENTS/ADMIN/ProspectList'
import Shopper from './COMPONENTS/ADMIN/Shopper';
import PartnerTicketForm from './COMPONENTS/ADMIN/PartnerTicketForm';
import AdminOutline from './COMPONENTS/ADMIN/AdminOutline';
import ProjectOutline from './COMPONENTS/MEMBERS/ProjectOutline'
import Products from './COMPONENTS/Products';
import Template from './COMPONENTS/Template'
import ReferralEmail from './COMPONENTS/UTILITIES/ReferralEmail'
import HealthCalculator from './COMPONENTS/UTILITIES/HealthCalculator'

function App() {
  const loadingState = useSelector((state) => state.loading.value)
  const confirmationState = useSelector((state) => state.confirmation.value)
  const failureState = useSelector((state) => state.failure.value)
  return (
    <BrowserRouter>
      {
        loadingState ?
          <Loading /> : <div></div>
      }
      {
        confirmationState ?
          <Confirmation /> : <div></div>
      }
      {
        failureState ?
          <Failure /> : <div></div>
      }
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/webline" element={<Webline />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/referrals" element={<Referrals />} />
        <Route exact path="/template" element={<Template />} />
        <Route exact path="/contact" element={<Contact />} />
        {/*  */}
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/project" element={<Project />} />
        <Route exact path="/projectoutline" element={<ProjectOutline />} />
        <Route exact path="/ticketform" element={<TicketForm />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/admindash" element={<AdminDash />} />
        <Route exact path='/partnerdetail' element={<PartnerDetail />} />
        <Route exact path="/partnerproject" element={<PartnerProject />} />
        <Route exact path="/newpartner" element={<NewPartner />} />
        <Route exact path="/shopper" element={<Shopper />} />
        <Route exact path="/tickets" element={<AllTickets />} />
        <Route exact path="/partnertickets" element={<PartnerAllTickets />} />
        <Route exact path="/newproject" element={<NewProject />} />
        <Route exact path="/prospectlist" element={<ProspectList />} />
        <Route exact path="/partnerticketform" element={<PartnerTicketForm />} />
        <Route exact path="/partneroutline" element={<AdminOutline />} />
        <Route exact path="/referralemail" element={<ReferralEmail />} />
        <Route exact path="/calculator" element={<HealthCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
