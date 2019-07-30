import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Main from '@/components/Main'
import ProcessIndex from '@/pages/ProcessIndex'
import Profile from '@/components/profile/Profile'
import TravelDetail from '@/pages/travelDetail'
import CommonDetail from '@/pages/commonDetail'
import EntertainmentDetail from '@/pages/entertainmentDetail'
import InvoiceInDetail from '@/pages/invoiceInDetail'
import BenefitDetail from '@/pages/benefitDetail'
import ComputerDetail from '@/pages/computerDetail'
import CostPsnDetail from '@/pages/costPsnDetail'
import ServeNeedApplyDetail from '@/pages/serveNeedApplyDetail'
import CostClassDetail from '@/pages/costClassDetail'
import SalesPropDetail from '@/pages/salesPropDetail'
import PublicBusDetail from '@/pages/publicBusDetail'
import RepaymentDetail from '@/pages/repaymentDetail'
import BorrowPsnDetail from '@/pages/borrowPsnDetail'
import BorrowPubDetail from '@/pages/borrowPubDetail'
import ServePutDetail from '@/pages/servePutDetail'
import OilCardDetail from '@/pages/oilCardDetail'
import DealDetail from '@/pages/dealDetail'
import ImageDetail from '@/pages/imageDetail'
import ApprovalDetails from '@/pages/approvalDetails'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: ProcessIndex,
        },
        {path: '/Profile', component: Profile}
      ]
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/TravelDetail',//'/travelDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'TravelDetail',
      component: TravelDetail
    },
    {
      path: '/CommonDetail',//'/commonDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'CommonDetail',
      component: CommonDetail
    },
    {
      path: '/EntertainmentDetail',
      name: 'EntertainmentDetail',
      component: EntertainmentDetail
    },
    /*{
      path:'/entertainmentDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name:'EntertainmentDetail',
      component:EntertainmentDetail
    },*/
    {
      path: '/InvoiceInDetail',//'/invoiceInDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'InvoiceInDetail',
      component: InvoiceInDetail
    },
    {
      path: '/BenefitDetail',//'/benefitDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'BenefitDetail',
      component: BenefitDetail
    },
    {
      path: '/ComputerDetail',//'/computerDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'ComputerDetail',
      component: ComputerDetail
    },
    {
      path: '/CostPsnDetail',//'/costPsnDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'CostPsnDetail',
      component: CostPsnDetail
    },
    {
      path: '/ServeNeedApplyDetail',//'/serveNeedApplyDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'ServeNeedApplyDetail',
      component: ServeNeedApplyDetail
    },
    {
      path: '/CostClassDetail',//'/costClassDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'CostClassDetail',
      component: CostClassDetail
    },
    {
      path: '/SalesPropDetail',//'/salesPropDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'SalesPropDetail',
      component: SalesPropDetail
    },
    {
      path: '/PublicBusDetail',//'/publicBusDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'PublicBusDetail',
      component: PublicBusDetail
    },
    {
      path: '/RepaymentDetail',//'/repaymentDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'RepaymentDetail',
      component: RepaymentDetail
    },
    {
      path: '/BorrowPsnDetail',//'/borrowPsnDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'BorrowPsnDetail',
      component: BorrowPsnDetail
    },
    {
      path: '/BorrowPubDetail',//'/borrowPubDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'BorrowPubDetail',
      component: BorrowPubDetail
    },
    {
      path: '/ServePutDetail',//'/servePutDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'ServePutDetail',
      component: ServePutDetail
    },
    {
      path: '/OilCardDetail',//'/oilCardDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',
      name: 'OilCardDetail',
      component: OilCardDetail
    },{
      path:'/DealDetail',
      name:'DealDetail',
      component:DealDetail
    },{
      path:'/ImageDetail',
      name:'ImageDetail',
      component:ImageDetail
    },{
      path:'/ApprovalDetails',
      name:'ApprovalDetails',
      component:ApprovalDetails
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0, y: to.meta.savedPosition || 0
      }
    }
  }
})
