import Vue from 'vue'
import Router from 'vue-router'


// import Home from '@/pages/Home'
// import Login from '@/pages/Login' // 主页    &   登录页

// // 用户管理
// import HomePage from '@/pages/management_information/HomePage'
// import UserAdmin from '@/pages/management_information/UserAdmin' // 欢迎页    &   员工列表页


// // 采购
// import Supplier from '@/pages/purchasing_department/Supplier'  // 供应商管理页
// import Purchase from '@/pages/purchasing_department/Purchase'  // 采购单管理页
// import AddPurchase from '@/pages/purchasing_department/AddPurchase'  // 新增采购单页
// import PurchaseSearch from '@/pages/purchasing_department/PurchaseSearch'  // 采购单查询页
// import PurchaseEnd from '@/pages/purchasing_department/PurchaseEnd'  // 采购单了结页


// // 仓库
// import Warehousing from '@/pages/warehouse_department/Warehousing'  // 入库页




// // 销售
// import Product from '@/pages/sales_department/ProductHome'   // 产品管理页
// import ProductTypeList from '@/pages/sales_department/ProductTypeList'   // 产品分类列表页

// // 财务
// import PaymentRegistration from '@/pages/finance_department/PaymentRegistration'   // 付款登记页
// import RegistrationOfReceipts from '@/pages/finance_department/RegistrationOfReceipts'   // 收款登记页

Vue.use(Router)

export default new Router({
  mode:"history", 
  routes: [
    {path: '/',redirect: '/login'}, // 默认欢迎页
    // 重定向
    {path: '/home',component: ()=>import('@/pages/Home'), 

      children:[{
        path:'/HomePage',component:()=>import('@/pages/management_information/HomePage'),name:'HomePage' 
        },
        {
          path:'/UserAdmin',component:()=>import('@/pages/management_information/UserAdmin'),name:'UserAdmin' // 员工列表页
        },
        
        {
          path:'/supplier',component:()=>import('@/pages/purchasing_department/Supplier'),name:'Supplier' // 供应商管理页
        },
        {
          path:'/purchase',component:()=>import('@/pages/purchasing_department/Purchase'),name:'Purchase' // 采购单管理页
        },
        {
          path:'/addPurchase',component:()=>import('@/pages/purchasing_department/AddPurchase'),name:'AddPurchase' // 新添加采购单页
        },
        {
          path:'/purchaseSearch',component:()=>import('@/pages/purchasing_department/PurchaseSearch'),name:'PurchaseSearch' // 采购单查询页
        },
        {
          path:'/purchaseEnd',component:()=>import('@/pages/purchasing_department/PurchaseEnd'),name:'PurchaseEnd' // 产品管理页
        },
        {
          path:'/product',component:()=>import('@/pages/sales_department/ProductHome'),name:'Product' // 产品管理页
        },
        {
          path:'/productTypeList',component:()=>import('@/pages/sales_department/ProductTypeList'),name:'ProductTypeList' // 产品分类页
        },
        {
          path:'/peopleManage',component:()=>import('@/pages/sales_department/PeopleManage'),name:'PeopleManage' // 客户管理页
        },
        {
          path:'/warehousing',component:()=>import('@/pages/warehouse_department/Warehousing'),name:'Warehousing' // 入库页
        },
        {
          path:'/outgoingRegistration',component:()=>import('@/pages/warehouse_department/OutgoingRegistration'),name:'OutgoingRegistration' // 出库页
        },
        {
          path:'/stockInquiry',component:()=>import('@/pages/warehouse_department/StockInquiry'),name:'StockInquiry' // 库存查询页
        },
        {
          path:'/stockmanage',component:()=>import('@/pages/warehouse_department/Stockmanage'),name:'Stockmanage' // 库存查询页
        },
        {
          path:'/paymentRegistration',component:()=>import('@/pages/finance_department/PaymentRegistration'),name:'PaymentRegistration' // 付款登记页
        },
        {
          path:'/registrationOfReceipts',component:()=>import('@/pages/finance_department/RegistrationOfReceipts'),name:'RegistrationOfReceipts' // 收款登记页
        },
        {
          path:'/budgetQuery',component:()=>import('@/pages/finance_department/BudgetQuery'),name:'BudgetQuery' // 收支查询
        },
        {
          path:'/purchasingReport',component:()=>import('@/pages/monthly_statement/PurchasingReport'),name:'PurchasingReport' // 采购报表页
        },
        {
          path:'/salesReport',component:()=>import('@/pages/monthly_statement/SalesReport'),name:'SalesReport' // 销售报表
        },
        {
          path:'/outOfStockReport',component:()=>import('@/pages/monthly_statement/OutOfStockReport'),name:'OutOfStockReport' // 出库报表
        },
        {
          path:'/warehousingReport',component:()=>import('@/pages/monthly_statement/WarehousingReport'),name:'WarehousingReport' // 入库报表
        },
        {
          path:'/stockReport',component:()=>import('@/pages/monthly_statement/StockReport'),name:'StockReport' // 库存报表
        },
        {
          path:'/budgetReport',component:()=>import('@/pages/monthly_statement/BudgetReport'),name:'BudgetReport' // 收支报表
        },
      
      ]  
    },
    
    {
      path: '/login',  // 登录页
      name:'Login',
      component:()=>import('@/pages/Login')
    },

  ]
})
