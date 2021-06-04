import { Cloud } from '@tbmp/mp-cloud-sdk';
const cloud = new Cloud();
cloud.init({
  env: 'test'
});
App({
  cloud,
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    activeT: 0,
    hasLogin: false,
    token: '',
    oneProduct: [],
    imageSubList: [],
    images: [],
    activeIndex: 1,//标识发品进行到哪一步
    productEnName: '',//输入的商品英文名
    productPrice: 0,//输入的商品价格
    productGJC: ['', '', ''],//输入的产品关键词
    imageNum: 0,//选择图片后的images长度
    group: [],//发布产品时选择分组
    ref: '',//发品后刷新页面
    tempHaveSku: [],//
    tempNoSku: [],
    noSkuRevampHello: [],
    haveSkuRevampHello: [],
    shippingTpl: [],//运费模板
    imageId: [],//选中图片的id
    productInfo: {},//产品编辑根据id获取到的产品信息
    chooseImageType: '',//用户选择图片的方式
    imgTempLength: 0,
    aliSellerName: '未登录',
    systemName: '',//系统类型
    errorInfo: '',
  },
});
