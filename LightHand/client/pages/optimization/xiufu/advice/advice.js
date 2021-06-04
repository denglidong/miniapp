const { cloud } = getApp();
var app = getApp();
Page({
  data: {

    arrayGGIndex: 0,
    arrayIndex: 0,
    oneProduct: [],    //从全局变量中拿到产品信息
    //category_id:-1,    //类目ID
    //id:0,
    //alibaba_product_id:1600112820666,  //商品ID
    images: [],        //产品图片数组
    Flist: [
      { Aid: 1, name: "问题" },
      { Aid: 2, name: "问题" },
      { Aid: 3, name: "问题" },
      { Aid: 4, name: "问题" },
      { Aid: 0, name: "问题" },
    ],     //产品诊断返还结果集
    Adv: [],
    no_sku: [],
    advice: [
      { id: 1, name: "建议一", value: "图片有牛皮藓" },
      { id: 2, name: "建议二", value: "图片有边框，干扰产品展示" },
      { id: 3, name: "建议三", value: "背景混乱，无法突出重点，推荐单一白色背景" },
      { id: 4, name: "建议四", value: "图片存在拼接，干扰产品展示" },
      { id: 0, name: "建议五", value: "图片与类目关联性不强" },
    ],      //产品主图总结果集
    //pid:134923,
    //id:1420,
    //产品属性
    array: [

      {
        id: 0,
        name: 'maijia',
        label: '工艺', //中文名称
        select_Type: "single_select",   //选择类型，单选
        select: 0, //select表示用户之前未选择或者填写
        options: [{ name: '手工', id: 0, "is_sku": 0 }, { name: '天然', Oid: 1, "is_sku": 0 }, { name: '绿色无公害', Oid: 2, "is_sku": 0 }] //options表示对应的属性
      }, {
        id: 0,
        name: 'changhe',
        label: '适用场合',
        select_Type: "single_select",
        select: 0,
        options: [{ name: '结婚', Oid: 0, "is_sku": 0 }, { name: '搬家', Oid: 1, "is_sku": 0 }]
      },
      {
        id: 0,
        name: 'mubiao',
        label: '主要目标买家',
        select_Type: "single_select",
        select: 0,
        options: [{ name: '女人', id: 0, "is_sku": 0 }, { name: '小孩', id: 1, "is_sku": 0 }]
      },
      {
        id: 0,
        name: 'jiari',
        label: '假日',
        select_Type: "single_select",
        select: 1,
        options: [{ name: '春节', id: 0, "is_sku": 0 }, { name: '五一', id: 1, "is_sku": 0 }]
      },
      {
        id: 0,
        name: 'remai',
        label: '热卖季节',
        select_Type: "single_select",
        select: 0,
        options: [{ name: '春', id: 0, "is_sku": 0 }, { name: '夏', id: 1, "is_sku": 0 }]
      },
      {
        id: 0,
        name: 'yuanchandi',
        label: '原产地',
        select_Type: "single_select",
        select: 0,
        options: [{ name: '中国', id: 0, "is_sku": 0 }, { name: '火星', id: 1, "is_sku": 0 }]
      },
      {
        id: 0,
        name: 'leixing',
        label: '类型',
        select_Type: "single_select",
        select: 1,
        options: [{ name: '服装', id: 0, "is_sku": 0 }, { name: '食品', id: 1, "is_sku": 0 }]
      },



    ],

    //产品规格
    arrayGG: [
      {
        id: 0,
        name: "color",
        labal: "颜色",
        select: 0,
        options: [{ name: '红色', id: 0, "is_sku": false }, { name: '蓝色', id: 1, "is_sku": false }]
      },
      {
        id: 0,
        name: "size",
        labal: "大小",
        select: 1,
        options: [{ name: 'S', id: 0, "is_sku": 0 }, { name: 'M', id: 1, "is_sku": 0 }, { name: 'M', id: 2, "is_sku": 0 }]
      }
    ],
    //包装方式
    arrayBZ: [{
      id: 0,
      name: "baozhuang",
      labal: "包装方式",
      select: 1,
      text: "BOX"
    }],
    indexed: 0,
    list: [],
    listindx: 0,
    idx: 0,
  },

  onItemClick(ev) {
    let zhi = ev.target.dataset.liu
    console.log(111)
    //console.log(ev)
    let list1 = (this.data.product[zhi].Children[ev.index].Sun)
    let list = this.data.list
    console.log(list1)
    this.setData({
      //idx:ev.index,
      list: list1,
    })

    console.log(list)
  },

  //产品属性
  bindPickerChangeGongYi(e) {
    const index = e.target.dataset.index;
    const aid = e.detail.value;
    var id = "array[" + index + "].id";
    this.setData({
      arrayIndex: aid,
      [id]: id
    })

  },
  //产品规格
  bindPickerChangeYanSe(e) {
    console.log(e)
    const liu = e.detail.value
    this.setData({
      arrayGGIndex: liu,
    })
  },
  //退出
  showWindows1: function () {
    my.confirm({
      titke: "提示",
      content: "确定退出编辑吗？",
      success(res) {
        if (res.confirm == true) {
          my.switchTab({
            url: '../../optimization'
          });
        } else if (res.confirm == false) {
          console.log("取消")
        }
      }
    })
  },

  //应用按钮二次提示：提交
  showWindows2: function () {
    my.confirm({
      titke: "提示",
      content: "确定应用吗？",
      success(res) {
        if (res.confirm == true) {
          my.navigateTo({
            url: '../advice2/advice2'
          });
        } else if (res.confirm == false) {
          console.log("取消")
        }
      }
    })
  },


  onSubmit(e) {
    // console.log(e)
    // console.log(this.data.arrayGG[0].options[e.detail.value.liu]);
    var ins = this.data.arrayGG[0].options[e.detail.value.liu];
    // console.log(ins);

    my.alert({
      content: `数据：${JSON.stringify(e.detail.value)}`,
    });
  },
  onDianji() {

  },
  onLoad() {
    var arrayGG = this.data.array;
    const lis = [];
    for (var i = 0; i < arrayGG.length; i++) {
      if (arrayGG[i].value_id == '-1' && arrayGG[i].attribute_id != '-1') {
        lis.push(array[i])
      }
    }
    this.setData({
      array: lis,
    })
  },
  onShow() {
    var list1 = this.data.Flist;
    var adv = this.data.advice;
    var oneProduct = app.globalData.oneProduct;
    console.log("advice页面")
    // console.log(oneProduct)
    // console.log(this.data.Flist)
    // console.log(list1)
    //  console.log(adv)
    var A = this.data.Adv;
    //var oneProduct=app.oneProduct;
    for (var i = 0; i < list1.length; i++) {
      var n = list1[i].Aid;
      //console.log(n)
      if (n == 1) {
        A.push(adv[1])
      };
      if (n == 2) {
        A.push(adv[2])
      };
      if (n == 3) {
        A.push(adv[3])
      };
      if (n == 4) {
        A.push(adv[4])
      };
      if (n == 0) {
        A.push(adv[0])
      };
    }
    this.setData({
      Adv: A,
      oneProduct: oneProduct,
      // category_id:this.data.oneProduct.category_id,
    })
    console.log("获取类目ID")
    //console.log(this.data.oneProduct)
    //console.log(this.data.Adv)
    console.log(this.data.oneProduct.category_id)
  },

  //获取商品
  onReady() {
    //this.getAliGroupList();
    this.getApprovalProductList();
    // this.getProductInfoList();
    // this.getProductInfo();
    this.getInfoListByLeiMu();
  },
  //获取商品详情
  async getApprovalProductList() {
    console.log("商品详情");
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.yes.product/" + this.data.oneProduct.pid,
          //"api": '/api/common/option',
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "pid": this.data.oneProduct.pid,
          }
        },
        'exts': { "timeout": 10000 }
      });
      //console.log(result.data.image.image_list);
      console.log(result.data.attr.have_sku)
      //console.log(result.data.attr.no_sku)
      console.log(result);
      this.setData({
        images: result.data.image.image_list,
        //arrayGG:result.data.attr.have_sku,
        array: result.data.attr.no_sku,
      })

    } catch (e) {
      console.log(e);
    }
  },





  // //获取商品对应类目所具有的行业规格和行业属性
  async getInfoListByLeiMu() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/common/aliattribute/" + this.data.oneProduct.category_id,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            // "parentId":-1
            "category_id": this.data.oneProduct.category_id,
          }
        },
        'exts': { "timeout": 10000 }
      });
      var arrayGG = this.data.arrayGG
      for (let key in result.data.have_sku) {
        arrayGG.push({
          id: key,
          list: result.data.have_sku[key]
        })
      }
      //var arrayGG=this.data.arrayGG;
      this.setData({
        arrayGG: result.data.have_sku,
        array: result.data.no_sku,
      })

      console.log('类目行业属性详情')
      console.log(result.data.no_sku)
      console.log(this.data.arrayGG)
    } catch (e) {
      // console.log('异常')
      console.log(e);

    }

  },



});
