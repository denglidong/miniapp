const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    //错误信息展示
    errorInfo: '',
    //页面所有数据及结构数组
    mobanList: [
      {
        title: '发布模板',
        publishTplList: [],
      },
      {
        title: '基本信息',
        message: [
          {
            title: '类别',
            lei: '请选择发布模板',
          },
          {
            title: '产品名称',
            name: '',
          },
          {
            title: '产品关键词',
            gjc: ['', '', ''],
          },
          {
            title: '分组',
            group: [],
            nowGroup: '',//选择的分组
          },
          {
            title: '产品价格',
            productPrice: 0,//新建时商品价格
          }
        ]
      },
      {
        title: '产品图片',//images: []在数组之外
      },
      {
        title: '装修模板',
        publishTemplateList: [],
      },
      {
        title: '产品类型',
        lx: '类型',
        leiXing: [],
      },
      {
        title: '产品属性',
        noSku: [],//产品属性
      },
      {
        title: '产品规格',
        haveSku: [],//产品规格
        haveSkuTitle: ['选项值', '自定义图片', '加价', '数量', '操作'],//产品规格内容
      },
      {
        title: '交易信息',
        subTitle: [],//使用物流信息中的subTitle相同内容
        discount: [],//交易信息规则
        discountTitle: ['最小起订量', '产品价格(US $)']
      },
      {
        title: '物流信息',
        subTitle: [],//根据产品类型赋入对应的数据
        productType: [],//根据产品类型赋入对应的数据
        processPeriodsTitle: ['数量', '预计时间(天)'],//发货周期标题
      },
      {
        title: '定制信息',
        customTitle: ['最小起订量', '定制信息'],//根据产品类型赋入对应的数据
        custom: [],//定制信息展示
      }
    ],
    images: [],//图片
    productInfo: {},
    productType: '',//产品类型
    productTypeActive: false,//默认显示的产品类型
    //给交易信息和物流信息加入中文名称
    subTitleZ: ['重量(kg)', '尺寸(厘米)', '发货周期', '备货期(天)', '价格(美元)', '最小起订量', '计量单位', '每批数量', '销售方式', '运费模板'],
    subTitleZF: ['付款方式', '发货周期', 'FOB货币', '最小起订量', 'FOB最小价格', '发货港口', 'FOB最大价格', '供货能力', '供货能力周期', '最小起订量计量单位', '供货能力计量单位', '包装信息', '发货期限', 'FOB计量单位'],
  },
  onLoad() {
    this.setData({
      productInfo: app.globalData.productInfo,
      errorInfo: app.globalData.errorInfo
    })
    console.log(this.data.productInfo);
    console.log(app.globalData.errorInfo);
  },
  onShow() {
    my.setNavigationBar({
      title: '闪电手',
      backgroundColor: '#108ee9',
      success() {
      },
      fail() {
        my.alert({
          content: '设置是失败',
        });
      },
    });
    this.getSystemInfo();
  },
  getSystemInfo() {
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res,
        })
        console.log(this.data.systemInfo)
        if (this.data.systemInfo.brand == undefined) {
          my.alert({
            title: '提示',
            content: '未获取到设备信息',
            buttonText: '关闭',
          });
        } else {
          if (this.data.systemInfo.platform == 'Android') {
            let subT = ['每批数量', '发货周期', '最小起订量', '备货期(天)', '尺寸(厘米)', '价格(美元)', '销售方式', '运费模板', '计量单位', '重量(kg)'];
            let subTZF = ['发货周期', '发货港口', '发货期限', 'FOB货币符号', 'FOB最小价格', 'FOB最大价格', 'FOB计量单位', '最小起订量', '最小起订量计量单位', '包装信息', '付款方式', '供货能力周期', '供货能力', '供货能力计量单位'];
            this.setData({
              topMargin: 0,
              subTitleZ: subT,
              subTitleZF: subTZF,
              cm: 10,
              cm1: 12,
              cmTOP: -2,
              cmTOP1: 0,
              mTop: -2
            })
          }
        }
      }
    })
  },
  onReady() {
    let productInfo = this.data.productInfo;
    //产品交易信息
    let jiaoYiInfo = 'mobanList[' + 8 + '].subTitle'
    let nowProductType = []
    let tempJiaoYiInfo = []
    let subTitleEZ = [];//准备加入中文名称//根据产品类型展示相应的字段
    let subTitleZ = []
    switch (productInfo.base.product_type) {
      case 'wholesale': tempJiaoYiInfo = productInfo.wholesale;
        subTitleZ = this.data.subTitleZ
        break;
      case 'sourcing': tempJiaoYiInfo = productInfo.sourcing
        subTitleZ = this.data.subTitleZF
        break;
      default: console.log('无类型');
        break;
    }
    //给数组加入中文名称
    for (const key in tempJiaoYiInfo) {
      nowProductType.push({
        en_name: key,
        name_value: tempJiaoYiInfo[key]
      })
    }
    for (let i = 0; i < subTitleZ.length; i++) {
      for (let j = 0; j < nowProductType.length; j++) {
        if (i == j) {
          subTitleEZ.push({
            en_name: nowProductType[j].en_name,
            zh_name: subTitleZ[i],
            name_value: nowProductType[j].name_value
          })
        }
      }
    }
    for (let i = 0; i < subTitleEZ.length; i++) {
      for (let j = 0; j < nowProductType.length; j++) {
        if (subTitleEZ[i].en_name == nowProductType[j].en_name) {
          nowProductType[j].zh_name = subTitleEZ[i].zh_name
        }
      }
    }
    console.log(nowProductType);
    console.log(subTitleEZ);
    //定制信息
    let dingZhiInfo = 'mobanList[' + 9 + '].custom';
    //基本信息
    let category = 'mobanList[' + 1 + '].message[' + 0 + '].lei';
    let proName = 'mobanList[' + 1 + '].message[' + 1 + '].name';
    let progjc = 'mobanList[' + 1 + '].message[' + 2 + '].gjc';
    let gic = productInfo.desc.keywords.split(',');
    let proGroup = 'mobanList[' + 1 + '].message[' + 3 + '].nowGroup';
    let group = 'mobanList[' + 1 + '].message[' + 3 + '].group';
    let price = 'mobanList[' + 1 + '].message[' + 4 + '].productPrice'
    let groupApp = app.globalData.group;
    console.log(groupApp);
    let nowGroup = ''
    for (let i = 0; i < groupApp.length; i++) {
      if (productInfo.base.group_id = groupApp[i].group_id_path) {
        nowGroup = groupApp[i].group_name
      }
    }
    this.setData({
      images: productInfo.image.image_list,
      productType: productInfo.base.product_type,
      [jiaoYiInfo]: nowProductType,
      [dingZhiInfo]: productInfo.custom,
      [category]: productInfo.base.alibaba_category_zh_name_path,
      [proName]: productInfo.base.subject,
      [progjc]: gic,
      [proGroup]: nowGroup,
      [group]: groupApp,
      [price]: productInfo.base.product_price
    })
    console.log(this.data.mobanList[8].subTitle);
  },
  hiddenproductTypeActive() {
    this.setData({
      productTypeActive: true
    })
  }
});
