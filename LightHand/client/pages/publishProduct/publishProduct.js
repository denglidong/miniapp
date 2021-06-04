const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    heightAr: 0,
    productInfo: {},//失败列表或着草稿箱传来的
    // 单张图片校验开始
    showPx: false,
    showSize: false,
    checkoutArray: [],
    // 单张图片校验结束
    // 产品图片校验数组
    apFilePaths: [],
    // 产品图片提交成功
    submitApFilePaths: [],
    scrolltopNum: 0,//页面顶部
    showMaskTap: false,//蒙层是否显示
    mobanId: 0,
    mobanName: '',
    selectedTmp: 0,//模板Id原始假值
    imageIndex: 0,
    chooseImageType: '',
    // 多选变色
    new_en_name: [],
    //产品属性开始
    useTplNoSkuDefault: [],
    // 产品属性结束
    //所有属性
    tplNoSku: [],
    //套用模板后的属性0
    useTplNoSku: [],
    currency_ename: '',
    normals: 1,//每批数量
    showBatchNumber: false,//展示每批数量
    cmTOP: 0,
    cmTOP1: 0,
    mTop: 0,
    cm: 10,
    cm1: 10,
    topMargin: 17,
    tplDiscount: [],//模板中的阶梯折扣
    haveSkuSubSet: [],
    //选项值下标
    tempSkuSubsetIndex: 0,
    //点击选择图片的规格下标
    tempIndex: 0,
    //图片在临时数组中的下标
    definedIdx: 0,
    //规格选项值选中的元素
    selectSkuSubsetEnname: '',
    selectSkuSubsetId: 0,
    //规格点击的下标
    skuIdx: 0,
    //规格subset展示
    showSkuSubset: false,
    //产品规格内部值
    skuVal: '',
    skuPrice: '',
    skuQuantity: '',
    skuImage: '',
    skuImageHide: false,
    //给数组加入中文名称
    subTitleZ: ['重量(kg)', '尺寸(厘米)', '发货周期', '备货期(天)', '价格(美元)', '最小起订量', '计量单位', '每批数量', '销售方式', '运费模板'],
    subTitleZF: ['付款方式', '发货周期', 'FOB货币', '最小起订量', 'FOB最小价格', '发货港口', 'FOB最大价格', '供货能力', '供货能力周期', '最小起订量计量单位', '供货能力计量单位', '包装信息', '发货期限', 'FOB计量单位'],
    proType: [],
    imageAllInfo: {},
    imageId: '',
    //编辑待发布商品中转数组
    newProduct: [],
    // 非直接物流最小起订量计量单位数据
    showTop_i_measure_of_availability: false,
    // 非直接物流最小起订量计量单位显示
    i_measure_of_availability_ename: '',
    // 非直接物流供货能力计量单位数据
    showTop_measure_of_availability: false,
    i_showTop_measure_of_availability: false,
    // 非直接物流供货能力计量单位显示
    measure_of_availability_ename: '',
    // 非直接物流供货能力周期显示数据
    Availability_cycle_ename: '',
    // 非直接物流供货能力周期显示
    showTop_Availability_cycle: false,
    // 非直接物流供货能力周期数据
    Availability_cycle_unit: [
      { en_name: 'Day', zh_name: '日' },
      { en_name: 'Week', zh_name: '周' },
      { en_name: 'Month', zh_name: '月' },
      { en_name: 'Quarter', zh_name: '季度' },
      { en_name: 'Year', zh_name: '年' },
    ],
    // 非直接下单计付款方式显示
    showTop_payment: false,
    // 非直接下单付款方式显示值
    payment_ename: [],
    // 非直接下单付款方式显示值
    payment_unit: [
      { en_name: 'L/C', zh_name: '1' },
      { en_name: 'D/A', zh_name: '2' },
      { en_name: 'D/P', zh_name: '3' },
      { en_name: 'T/T', zh_name: '4' },
      { en_name: 'Western Union', zh_name: '5' },
      { en_name: 'MoneyGram', zh_name: '6' },
    ],
    // 非直接下单计量单位显示
    showTop_indirect_calulate: false,
    // 非直接下单计量单位显示值
    indirect_calulate_ename: '',
    // 非直接物流FOB方式显示
    showTop_f_measuring: false,
    // 非直接物流FOB方式显示值
    calculate_f_ename: '',
    // 非直接物流FOB值
    currency_unit: [],
    // 销售方式底部谈起显示值
    showTop_sale: false,
    sale_ename: '',
    // 销售方式值
    sales_method: [
      { en_name: "normal", zh_name: "按件卖" },
      { en_name: "batch", zh_name: "按批卖" },
    ],
    selected: 0,//组件选择标识，0为未选择
    selectedGroup: 0,//组件选择标识，0为未选择
    showSku: true,//展示自定义规格
    required: '',//非空提示
    long: '', width: '', height: '',//尺寸长、宽、高
    scrollTop: 0,//监听页面滚动(未实现每次展示顶部)
    activeIndex: 1,
    price: 0,//单价
    showBottom: false,
    liu: false,
    productTypeActive: false,//为显示默认产品类型添加的Boolean控制元素hidden
    shippingTplActive: false,//为显示默认运费模板添加的Boolean控制元素hidden
    showBottom1: false,
    size: 0,
    arrIndex: '',
    //步骤名
    items: [{
      title: '图片上传',
    }, {
      title: '套用模板',
    }, {
      title: '信息预览',
    }],
    images: [],//title: '产品图片'
    checked: false,
    disabled: true,
    disabled1: true,
    tempFiles: '',//首张图片
    isShowImg: false,
    num: 0,//当前images图片张数
    productAttrTitle: '',//选择发布模板后商品类别
    nowTplInfo: {},//当前选择的发布模板时根据id将请求结果传递过来
    productType: '',//用以显示的当前发布模板中预设的产品类型
    idx: 0,// 产品属性点击下标值
    showTop1: false,//预览页组件底部弹出
    list: [],//要选择的属性值
    projectAttr: {},
    standards: [],// 产品规格详情数据
    standardsArry: {},// 产品规格筛选值
    // 计量单位底部弹起显示
    showTop_measuring: false,
    // 计量单位选中数据
    calculate_ename: '',
    // 计量单位数据
    measuring_unit: [
      { en_name: "Acre", zh_name: "英亩" },
      { en_name: "Ampere", zh_name: "安培" },
      { en_name: "Bag", zh_name: "袋" },
      { en_name: "Barrel", zh_name: "桶" },
      { en_name: "Blade", zh_name: "片" },
      { en_name: "Box", zh_name: "盒" },
      { en_name: "Bushel", zh_name: "英斗" },
      { en_name: "Carat", zh_name: "克拉" },
      { en_name: "Carton", zh_name: "箱" },
      { en_name: "Case", zh_name: "例" },
      { en_name: "Centimeter", zh_name: "厘米" },
      { en_name: "Chain", zh_name: "串" },
      { en_name: "Combo", zh_name: "种" },
      { en_name: "Cubic Centimeter", zh_name: "立方厘米" },
      { en_name: "Cubic Foot", zh_name: "立方英尺" },
      { en_name: "Cubic Inch", zh_name: "立方英寸" },
      { en_name: "Cubic Meter", zh_name: "立方米" },
      { en_name: "Cubic Yard", zh_name: "立方码" },
      { en_name: "Degrees Celsius", zh_name: "摄氏度" },
      { en_name: "Degrees Fahrenheit", zh_name: "华氏度" },
      { en_name: "Dozen", zh_name: "打" },
      { en_name: "Dram", zh_name: "少量" },
      { en_name: "Fluid Ounce", zh_name: "盎斯" },
      { en_name: "Foot", zh_name: "英尺" },
      { en_name: "Forty-Foot Container", zh_name: "40英尺集装箱" },
      { en_name: "Furlong", zh_name: "弗隆" },
      { en_name: "Gallon", zh_name: "加仑" },
      { en_name: "Gill", zh_name: "及耳" },
      { en_name: "Grain", zh_name: "格令" },
      { en_name: "Gram", zh_name: "克" },
      { en_name: "Gross", zh_name: "罗" },
      { en_name: "Hectare", zh_name: "公顷" },
      { en_name: "Hertz", zh_name: "赫兹" },
      { en_name: "Inch", zh_name: "英寸" },
      { en_name: "Kiloampere", zh_name: "千安培" },
      { en_name: "Kilogram", zh_name: "千克" },
      { en_name: "Kilohertz", zh_name: "千赫兹" },
      { en_name: "Kilometer", zh_name: "公里" },
      { en_name: "kiloohm", zh_name: "千欧" },
      { en_name: "kilovolt", zh_name: "千伏" },
      { en_name: "kilowatt", zh_name: "千瓦" },
      { en_name: "Liter", zh_name: "升" },
      { en_name: "Long Ton", zh_name: "长吨" },
      { en_name: "Megahertz", zh_name: "兆赫" },
      { en_name: "Meter", zh_name: "米" },
      { en_name: "Metric Ton", zh_name: "公吨" },
      { en_name: "Mile", zh_name: "英里" },
      { en_name: "Millampere", zh_name: "千安培" },
      { en_name: "Milligram", zh_name: "毫克" },
      { en_name: "Millihertz", zh_name: "毫赫兹" },
      { en_name: "Milliliter", zh_name: "毫升" },
      { en_name: "Millimeter", zh_name: "毫米" },
      { en_name: "Milliohm", zh_name: "毫欧" },
      { en_name: "Millivolt", zh_name: "毫伏" },
      { en_name: "Milliwatt", zh_name: "毫瓦" },
      { en_name: "NauTical Mile", zh_name: "海里" },
      { en_name: "Ohm", zh_name: "欧姆" },
      { en_name: "Ounce", zh_name: "盎司" },
      { en_name: "Pack", zh_name: "捆" },
      { en_name: "Pair", zh_name: "对" },
      { en_name: "Pallet", zh_name: "托盘" },
      { en_name: "Parcel", zh_name: "包" },
      { en_name: "Perch", zh_name: "杆" },
      { en_name: "Piece", zh_name: "件" },
      { en_name: "Pint", zh_name: "品脱" },
      { en_name: "Plant", zh_name: "植" },
      { en_name: "Pole", zh_name: "杆" },
      { en_name: "Pound", zh_name: "磅" },
      { en_name: "Quart", zh_name: "夸脱" },
      { en_name: "Quarter", zh_name: "夸特" },
      { en_name: "Rod", zh_name: "杆" },
      { en_name: "Roll", zh_name: "管" },
      { en_name: "Set", zh_name: "副/套/组" },
      { en_name: "Sheet", zh_name: "张" },
      { en_name: "Short Ton", zh_name: "短吨" },
      { en_name: "Square Centimeter", zh_name: "平方厘米" },
      { en_name: "Square Foot", zh_name: "平方英尺" },
      { en_name: "Square Inch", zh_name: "平方英寸" },
      { en_name: "Square Meter", zh_name: "平方米" },
      { en_name: "Square Mile", zh_name: "平方英里" },
      { en_name: "Square Yard", zh_name: "平方码" },
      { en_name: "Stone", zh_name: "英石" },
      { en_name: "Strand", zh_name: "股/缕" },
      { en_name: "Ton", zh_name: "吨" },
      { en_name: "Tonne", zh_name: "公吨" },
      { en_name: "Tray", zh_name: "盘" },
      { en_name: "Twenty-Foot Container", zh_name: "20英尺集装箱" },
      { en_name: "Unit", zh_name: "单元" },
      { en_name: "Volt", zh_name: "伏特" },
      { en_name: "Watt", zh_name: "瓦特" },
      { en_name: "Wp", zh_name: "峰值功率" },
      { en_name: "Yard", zh_name: "码" }
    ],
    //发源地地区
    headstream: [{
      value_id: "100000415",
      en_name: "Afghanistan",
      zh_name: "阿富汗",
      car_name: "AF"
    }, {
      value_id: "200019000",
      en_name: "Aland Islands",
      zh_name: "阿兰群岛",
      car_name: "AX"
    }, {
      value_id: "100000416",
      en_name: "Albania",
      zh_name: "阿尔巴尼亚",
      car_name: "AL"
    }, {
      value_id: "200019001",
      en_name: "Alderney",
      zh_name: "奥尔德尼",
      car_name: "ACI "
    }, {
      value_id: "100000417",
      en_name: "Algeria",
      zh_name: "阿尔及利亚",
      car_name: "DZ"
    }, {
      value_id: "100000418",
      en_name: "American Samoa",
      zh_name: "美属萨摩亚",
      car_name: "AmericanSamoa"
    }, {
      value_id: "100000419",
      en_name: "Andorra",
      zh_name: "安道尔",
      car_name: "Andorra"
    }, {
      value_id: "100000420",
      en_name: "Angola",
      zh_name: "安哥拉",
      car_name: "AO"
    }, {
      value_id: "100000421",
      en_name: "Anguilla",
      zh_name: "安圭拉",
      car_name: "AI"
    }, {
      value_id: "100000422",
      en_name: "Antarctica",
      zh_name: "南极洲",
      car_name: "Antarctica"
    }, {
      value_id: "100000423",
      en_name: "Antigua and Barbuda",
      zh_name: "安提瓜和巴布达",
      car_name: "AG"
    }, {
      value_id: "100000424",
      en_name: "Argentina",
      zh_name: "阿根廷",
      car_name: "AR"
    }, {
      value_id: "100000425",
      en_name: "Armenia",
      zh_name: "亚美尼亚",
      car_name: "AM"
    }, {
      value_id: "100000426",
      en_name: "Aruba",
      zh_name: "阿鲁巴",
      car_name: "AO"
    }, {
      value_id: "200019002",
      en_name: "Ascension Island",
      zh_name: "阿森松岛",
      car_name: "AC"
    }, {
      value_id: "100000427",
      en_name: "Australia",
      zh_name: "澳大利亚",
      car_name: "AU"
    }, {
      value_id: "100000428",
      en_name: "Austria",
      zh_name: "奥地利",
      car_name: "AT"
    }, {
      value_id: "100000429",
      en_name: "Azerbaijan",
      zh_name: "阿塞拜疆",
      car_name: "AZ"
    }, {
      value_id: "100000430",
      en_name: "Bahamas",
      zh_name: "巴哈马",
      car_name: "BS"
    }, {
      value_id: "100000431",
      en_name: "Bahrain",
      zh_name: "巴林",
      car_name: "BH"
    }, {
      value_id: "100000432",
      en_name: "Bangladesh",
      zh_name: "孟加拉国",
      car_name: "BD"
    }, {
      value_id: "100000433",
      en_name: "Barbados",
      zh_name: "巴巴多斯",
      car_name: "BB"
    }, {
      value_id: "100000434",
      en_name: "Belarus",
      zh_name: "白俄罗斯",
      car_name: "BY"
    }, {
      value_id: "100000435",
      en_name: "Belgium",
      zh_name: "比利时",
      car_name: "BE"
    }, {
      value_id: "100000436",
      en_name: "Belize",
      zh_name: "伯利兹",
      car_name: "BZ"
    }, {
      value_id: "100000437",
      en_name: "Benin",
      zh_name: "贝宁",
      car_name: "BJ"
    }, {
      value_id: "100000438",
      en_name: "Bermuda",
      zh_name: "百慕大群岛",
      car_name: "BM"
    }, {
      value_id: "100000439",
      en_name: "Bhutan",
      zh_name: "不丹",
      car_name: "BT"
    }, {
      value_id: "100000440",
      en_name: "Bolivia",
      zh_name: "玻利维亚",
      car_name: "BO"
    }, {
      value_id: "100000441",
      en_name: "Bosnia and Herzegovina",
      zh_name: "波斯尼亚和黑塞哥维那",
      car_name: "BA"
    }, {
      value_id: "100000442",
      en_name: "Botswana",
      zh_name: "博茨瓦纳",
      car_name: "BW"
    }, {
      value_id: "100000443",
      en_name: "Bouvet Island",
      zh_name: "布韦岛",
      car_name: "BV"
    }, {
      value_id: "100000444",
      en_name: "Brazil",
      zh_name: "巴西",
      car_name: "BR"
    }, {
      value_id: "100000445",
      en_name: "British Indian Ocean Territory",
      zh_name: "英属印度洋领土",
      car_name: "IO"
    }, {
      value_id: "100000446",
      en_name: "Brunei Darussalam",
      zh_name: "文莱达鲁萨兰国",
      car_name: "BN"
    }, {
      value_id: "100000447",
      en_name: "Bulgaria",
      zh_name: "保加利亚",
      car_name: "BG"
    }, {
      value_id: "100000448",
      en_name: "Burkina Faso",
      zh_name: "布基纳法索",
      car_name: "BF"
    }, {
      value_id: "100000449",
      en_name: "Burundi",
      zh_name: "布隆迪",
      car_name: "BI"
    }, {
      value_id: "100000450",
      en_name: "Cambodia",
      zh_name: "柬埔寨",
      car_name: "KH"
    }, {
      value_id: "100000451",
      en_name: "Cameroon",
      zh_name: "喀麦隆",
      car_name: "CM"
    }, {
      value_id: "100000452",
      en_name: "Canada",
      zh_name: "加拿大",
      car_name: "CA"
    }, {
      value_id: "100000453",
      en_name: "Cape Verde",
      zh_name: "佛得角",
      car_name: "CV"
    }, {
      value_id: "100000454",
      en_name: "Cayman Islands",
      zh_name: "开曼群岛",
      car_name: "KY"
    }, {
      value_id: "100000455",
      en_name: "Central African Republic",
      zh_name: "中非共和国",
      car_name: "CF"
    }, {
      value_id: "100000456",
      en_name: "Chad",
      zh_name: "乍得",
      car_name: "TD"
    }, {
      value_id: "100000457",
      en_name: "Chile",
      zh_name: "智利",
      car_name: "CL"
    }, {
      value_id: "100000458",
      en_name: "China",
      zh_name: "中国",
      car_name: "CN"
    }, {
      value_id: "100000459",
      en_name: "Christmas Island",
      zh_name: "圣诞岛",
      car_name: "CX"
    }, {
      value_id: "100000460",
      en_name: "Cocos (Keeling) Islands",
      zh_name: "科科斯（基林）群岛",
      car_name: "CC"
    }, {
      value_id: "100000461",
      en_name: "Colombia",
      zh_name: "哥伦比亚",
      car_name: "CO"
    }, {
      value_id: "100000462",
      en_name: "Comoros",
      zh_name: "科摩罗",
      car_name: "KM"
    }, {
      value_id: "100000464",
      en_name: "Congo1",
      zh_name: "The Democratic Republic Of The",
      car_name: "CD"
    }, {
      value_id: "100000463",
      en_name: "Congo2",
      zh_name: "The Republic of Congo",
      car_name: "CG"
    }, {
      value_id: "100000465",
      en_name: "Cook Islands",
      zh_name: "库克群岛",
      car_name: "CK"
    }, {
      value_id: "100000466",
      en_name: "Costa Rica",
      zh_name: "哥斯达黎加",
      car_name: "CR"
    }, {
      value_id: "100000467",
      en_name: "Cote D'Ivoire",
      zh_name: "科特迪瓦",
      car_name: "CI"
    }, {
      value_id: "100000468",
      en_name: "Croatia (local name: Hrvatska)",
      zh_name: "克罗地亚（当地名：赫瓦茨卡）",
      car_name: "HR"
    }, {
      value_id: "100000469",
      en_name: "Cuba",
      zh_name: "古巴",
      car_name: "CU"
    }, {
      value_id: "100000470",
      en_name: "Cyprus",
      zh_name: "塞浦路斯",
      car_name: "CY"
    }, {
      value_id: "100000471",
      en_name: "Czech Republic",
      zh_name: "捷克共和国",
      car_name: "CZ"
    }, {
      value_id: "100000472",
      en_name: "Denmark",
      zh_name: "丹麦",
      car_name: "DK"
    }, {
      value_id: "100000473",
      en_name: "Djibouti",
      zh_name: "吉布提",
      car_name: "DJ"
    }, {
      value_id: "100000474",
      en_name: "Dominica",
      zh_name: "多米尼加",
      car_name: "DM"
    }, {
      value_id: "100000475",
      en_name: "Dominican Republic",
      zh_name: "多米尼加共和国",
      car_name: "DO"
    }, {
      value_id: "100000476",
      en_name: "East Timor",
      zh_name: "东帝汶",
      car_name: "TP"
    }, {
      value_id: "100000477",
      en_name: "Ecuador",
      zh_name: "厄瓜多尔",
      car_name: "EC"
    }, {
      value_id: "100000478",
      en_name: "Egypt",
      zh_name: "埃及",
      car_name: "EG"
    }, {
      value_id: "100000479",
      en_name: "El Salvador",
      zh_name: "萨尔瓦多",
      car_name: "SV"
    }, {
      value_id: "100000480",
      en_name: "Equatorial Guinea",
      zh_name: "赤道几内亚",
      car_name: "GQ"
    }, {
      value_id: "100000481",
      en_name: "Eritrea",
      zh_name: "厄立特里亚",
      car_name: "ER"
    }, {
      value_id: "100000482",
      en_name: "Estonia",
      zh_name: "爱沙尼亚",
      car_name: "EE"
    }, {
      value_id: "100000483",
      en_name: "Ethiopia",
      zh_name: "埃塞俄比亚",
      car_name: "ET"
    }, {
      value_id: "100000484",
      en_name: "Falkland Islands (Malvinas)",
      zh_name: "福克兰群岛（马尔维纳斯）",
      car_name: "FK"
    }, {
      value_id: "100000485",
      en_name: "Faroe Islands",
      zh_name: "法罗群岛",
      car_name: "FO"
    }, {
      value_id: "100000486",
      en_name: "Fiji",
      zh_name: "斐济",
      car_name: "FJ"
    }, {
      value_id: "100000487",
      en_name: "Finland",
      zh_name: "芬兰",
      car_name: "FI"
    }, {
      value_id: "100000488",
      en_name: "France",
      zh_name: "法国",
      car_name: "FR"
    }, {
      value_id: "100000489",
      en_name: "France Metropolitan",
      zh_name: "法国大都会",
      car_name: "FX"
    }, {
      value_id: "100000490",
      en_name: "French Guiana",
      zh_name: "法属圭亚那",
      car_name: "GF"
    }, {
      value_id: "100000491",
      en_name: "French Polynesia",
      zh_name: "法属波利尼西亚",
      car_name: "PF"
    }, {
      value_id: "100000492",
      en_name: "French Southern Territories",
      zh_name: "法属南部领地",
      car_name: "TF"
    }, {
      value_id: "100000493",
      en_name: "Gabon",
      zh_name: "加蓬",
      car_name: "GA"
    }, {
      value_id: "100000494",
      en_name: "Gambia",
      zh_name: "冈比亚",
      car_name: "GM"
    }, {
      value_id: "100000495",
      en_name: "Georgia",
      zh_name: "佐治亚州",
      car_name: "GE"
    }, {
      value_id: "100000496",
      en_name: "Germany",
      zh_name: "德国",
      car_name: "DE"
    }, {
      value_id: "100000497",
      en_name: "Ghana",
      zh_name: "加纳",
      car_name: "GH"
    }, {
      value_id: "100000498",
      en_name: "Gibraltar",
      zh_name: "直布罗陀",
      car_name: "GI"
    }, {
      value_id: "100000499",
      en_name: "Greece",
      zh_name: "希腊",
      car_name: "GR"
    }, {
      value_id: "100000500",
      en_name: "Greenland",
      zh_name: "格陵兰岛",
      car_name: "GL"
    }, {
      value_id: "100000501",
      en_name: "Grenada",
      zh_name: "格林纳达",
      car_name: "GD"
    }, {
      value_id: "100000502",
      en_name: "Guadeloupe",
      zh_name: "瓜德罗普岛",
      car_name: "GP"
    }, {
      value_id: "100000503",
      en_name: "Guam",
      zh_name: "关岛",
      car_name: "GU"
    }, {
      value_id: "100000504",
      en_name: "Guatemala",
      zh_name: "危地马拉",
      car_name: "GT"
    }, {
      value_id: "200019003",
      en_name: "Guernsey",
      zh_name: "根西岛",
      car_name: "GG"
    }, {
      value_id: "100000505",
      en_name: "Guinea",
      zh_name: "几内亚",
      car_name: "GN"
    }, {
      value_id: "100000506",
      en_name: "Guinea-Bissau",
      zh_name: "几内亚比绍",
      car_name: "GW"
    }, {
      value_id: "100000507",
      en_name: "Guyana",
      zh_name: "圭亚那",
      car_name: "GY"
    }, {
      value_id: "100000508",
      en_name: "Haiti",
      zh_name: "海地",
      car_name: "HT"
    }, {
      value_id: "100000509",
      en_name: "Heard and Mc Donald Islands",
      zh_name: "赫德和麦克唐纳群岛",
      car_name: "HM"
    }, {
      value_id: "100000510",
      en_name: "Honduras",
      zh_name: "洪都拉斯",
      car_name: "HN"
    }, {
      value_id: "100000511",
      en_name: "Hong Kong S.A.R.",
      zh_name: "香港S.A.R.",
      car_name: "HK"
    }, {
      value_id: "100000512",
      en_name: "Hungary",
      zh_name: "匈牙利",
      car_name: "HU"
    }, {
      value_id: "100000513",
      en_name: "Iceland",
      zh_name: "冰岛",
      car_name: "IS"
    }, {
      value_id: "100000514",
      en_name: "India",
      zh_name: "印度",
      car_name: "IN"
    }, {
      value_id: "100000515",
      en_name: "Indonesia",
      zh_name: "印度尼西亚",
      car_name: "ID"
    }, {
      value_id: "100000516",
      en_name: "Iran (Islamic Republic of)",
      zh_name: "伊朗伊斯兰共和国",
      car_name: "IR"
    }, {
      value_id: "100000517",
      en_name: "Iraq",
      zh_name: "伊拉克",
      car_name: "IQ"
    }, {
      value_id: "100000518",
      en_name: "Ireland",
      zh_name: "爱尔兰",
      car_name: "IE"
    }, {
      value_id: "100012000",
      en_name: "Isle of Man",
      zh_name: "马恩岛",
      car_name: "IM"
    }, {
      value_id: "100000519",
      en_name: "Israel",
      zh_name: "以色列",
      car_name: "TL"
    }, {
      value_id: "100000520",
      en_name: "Italy",
      zh_name: "意大利",
      car_name: "IT"
    }, {
      value_id: "100000521",
      en_name: "Jamaica",
      zh_name: "牙买加",
      car_name: "JM"
    }, {
      value_id: "100000522",
      en_name: "Japan",
      zh_name: "日本",
      car_name: "JP"
    }, {
      value_id: "200019004",
      en_name: "Jersey",
      zh_name: "泽西岛",
      car_name: "JE"
    }, {
      value_id: "100000523",
      en_name: "Jordan",
      zh_name: "约旦",
      car_name: "JO"
    }, {
      value_id: "100000524",
      en_name: "Kazakhstan",
      zh_name: "哈萨克斯坦",
      car_name: "KZ"
    }, {
      value_id: "100000525",
      en_name: "Kenya",
      zh_name: "肯尼亚",
      car_name: "KE"
    }, {
      value_id: "100000526",
      en_name: "Kiribati",
      zh_name: "基里巴斯",
      car_name: "KI"
    }, {
      value_id: "200015000",
      en_name: "Kosovo",
      zh_name: "科索沃"
    }, {
      value_id: "100000527",
      en_name: "Kuwait",
      zh_name: "科威特",
      car_name: "KW"
    }, {
      value_id: "100000528",
      en_name: "Kyrgyzstan",
      zh_name: "吉尔吉斯斯坦",
      car_name: "KG"
    }, {
      value_id: "100000529",
      en_name: "Lao People's Democratic Republic",
      zh_name: "老挝人民民主共和国",
      car_name: "LA"
    }, {
      value_id: "100000530",
      en_name: "Latvia",
      zh_name: "拉脱维亚",
      car_name: "LV"
    }, {
      value_id: "100000531",
      en_name: "Lebanon",
      zh_name: "黎巴嫩",
      car_name: "LB"
    }, {
      value_id: "100000532",
      en_name: "Lesotho",
      zh_name: "莱索托",
      car_name: "LS"
    }, {
      value_id: "100000533",
      en_name: "Liberia",
      zh_name: "利比里亚",
      car_name: "LR"
    }, {
      value_id: "100000534",
      en_name: "Libya",
      zh_name: "利比亚",
      car_name: "LY"
    }, {
      value_id: "100000535",
      en_name: "Liechtenstein",
      zh_name: "列支敦士登",
      car_name: "LI"
    }, {
      value_id: "100000536",
      en_name: "Lithuania",
      zh_name: "立陶宛",
      car_name: "LT"
    }, {
      value_id: "100000537",
      en_name: "Luxembourg",
      zh_name: "卢森堡",
      car_name: "LU"
    }, {
      value_id: "100000538",
      en_name: "Macao S.A.R.",
      zh_name: "澳门特别行政区",
      car_name: "MO"
    }, {
      value_id: "100000539",
      en_name: "Macedonia",
      zh_name: "马其顿",
      car_name: "MK"
    }, {
      value_id: "100000540",
      en_name: "Madagascar",
      zh_name: "马达加斯加",
      car_name: "MG"
    }, {
      value_id: "100000541",
      en_name: "Malawi",
      zh_name: "马拉维",
      car_name: "MW"
    }, {
      value_id: "100000542",
      en_name: "Malaysia",
      zh_name: "马来西亚",
      car_name: "MY"
    }, {
      value_id: "100000543",
      en_name: "Maldives",
      zh_name: "马尔代夫",
      car_name: "MV"
    }, {
      value_id: "100000544",
      en_name: "Mali",
      zh_name: "马里",
      car_name: "ML"
    }, {
      value_id: "100000545",
      en_name: "Malta",
      zh_name: "马耳他",
      car_name: "MT"
    }, {
      value_id: "100000546",
      en_name: "Marshall Islands",
      zh_name: "马绍尔群岛",
      car_name: "MH"
    }, {
      value_id: "100000547",
      en_name: "Martinique",
      zh_name: "马提尼克",
      car_name: "MQ"
    }, {
      value_id: "100000548",
      en_name: "Mauritania",
      zh_name: "毛里塔尼亚",
      car_name: "MR"
    }, {
      value_id: "100000549",
      en_name: "Mauritius",
      zh_name: "毛里求斯",
      car_name: "MU"
    }, {
      value_id: "100000550",
      en_name: "Mayotte",
      zh_name: "马约特",
      car_name: "YT"
    }, {
      value_id: "100000551",
      en_name: "Mexico",
      zh_name: "墨西哥",
      car_name: "MX"
    }, {
      value_id: "100000552",
      en_name: "Micronesia",
      zh_name: "密克罗尼西亚",
      car_name: "FM"
    }, {
      value_id: "100000553",
      en_name: "Moldova",
      zh_name: "摩尔多瓦",
      car_name: "MD"
    }, {
      value_id: "100000554",
      en_name: "Monaco",
      zh_name: "摩纳哥",
      car_name: "MC"
    }, {
      value_id: "100000555",
      en_name: "Mongolia",
      zh_name: "蒙古",
      car_name: "MN"
    }, {
      value_id: "100005001",
      en_name: "Montenegro",
      zh_name: "黑山",
      car_name: "ME"
    }, {
      value_id: "100000556",
      en_name: "Montserrat",
      zh_name: "蒙特塞拉特",
      car_name: "MS"
    }, {
      value_id: "100000557",
      en_name: "Morocco",
      zh_name: "摩洛哥",
      car_name: "MA"
    }, {
      value_id: "100000558",
      en_name: "Mozambique",
      zh_name: "莫桑比克",
      car_name: "MZ"
    }, {
      value_id: "100000559",
      en_name: "Myanmar",
      zh_name: "缅甸",
      car_name: "MM"
    }, {
      value_id: "100000560",
      en_name: "Namibia",
      zh_name: "纳米比亚",
      car_name: "NA"
    }, {
      value_id: "100000561",
      en_name: "Nauru",
      zh_name: "瑙鲁",
      car_name: "NR"
    }, {
      value_id: "100000562",
      en_name: "Nepal",
      zh_name: "尼泊尔",
      car_name: "NP"
    }, {
      value_id: "100000563",
      en_name: "Netherlands",
      zh_name: "荷兰",
      car_name: "NL"
    }, {
      value_id: "100000564",
      en_name: "Netherlands Antilles",
      zh_name: "荷属安的列斯群岛",
      car_name: "AN"
    }, {
      value_id: "100000565",
      en_name: "New Caledonia",
      zh_name: "新喀里多尼亚",
      car_name: "NC"
    }, {
      value_id: "100000566",
      en_name: "New Zealand",
      zh_name: "新西兰",
      car_name: "NZ"
    }, {
      value_id: "100000567",
      en_name: "Nicaragua",
      zh_name: "尼加拉瓜",
      car_name: "NI"
    }, {
      value_id: "100000568",
      en_name: "Niger",
      zh_name: "尼日尔",
      car_name: "NE"
    }, {
      value_id: "100000569",
      en_name: "Nigeria",
      zh_name: "尼日利亚",
      car_name: "NG"
    }, {
      value_id: "100000570",
      en_name: "Niue",
      zh_name: "纽埃",
      car_name: "NU"
    }, {
      value_id: "100000571",
      en_name: "Norfolk Island",
      zh_name: "诺福克岛",
      car_name: "NF"
    }, {
      value_id: "100000572",
      en_name: "North Korea",
      zh_name: "朝鲜",
      car_name: "KP"
    }, {
      value_id: "100000573",
      en_name: "Northern Mariana Islands",
      zh_name: "北马里亚纳群岛",
      car_name: "MP"
    }, {
      value_id: "100000574",
      en_name: "Norway",
      zh_name: "挪威",
      car_name: "NO"
    }, {
      value_id: "100000575",
      en_name: "Oman",
      zh_name: "阿曼",
      car_name: "OM"
    }, {
      value_id: "100000577",
      en_name: "Pakistan",
      zh_name: "巴基斯坦",
      car_name: "PK"
    }, {
      value_id: "100000578",
      en_name: "Palau",
      zh_name: "帕劳",
      car_name: "PW"
    }, {
      value_id: "100000579",
      en_name: "Palestine",
      zh_name: "巴勒斯坦",
      car_name: "PS"
    }, {
      value_id: "100000580",
      en_name: "Panama",
      zh_name: "巴拿马",
      car_name: "PA"
    }, {
      value_id: "100000581",
      en_name: "Papua New Guinea",
      zh_name: "巴布亚新几内亚",
      car_name: "PG"
    }, {
      value_id: "100000582",
      en_name: "Paraguay",
      zh_name: "巴拉圭",
      car_name: "PY"
    }, {
      value_id: "100000583",
      en_name: "Peru",
      zh_name: "秘鲁",
      car_name: "PE"
    }, {
      value_id: "100000584",
      en_name: "Philippines",
      zh_name: "菲律宾",
      car_name: "PH"
    }, {
      value_id: "100000585",
      en_name: "Pitcairn",
      zh_name: "皮特凯恩",
      car_name: "PN"
    }, {
      value_id: "100000586",
      en_name: "Poland",
      zh_name: "波兰",
      car_name: "PL"
    }, {
      value_id: "100000587",
      en_name: "Portugal",
      zh_name: "葡萄牙",
      car_name: "PT"
    }, {
      value_id: "100000589",
      en_name: "Qatar",
      zh_name: "卡塔尔",
      car_name: "QA"
    }, {
      value_id: "100000590",
      en_name: "Reunion",
      zh_name: "法属尼留旺岛",
      car_name: "RE"
    }, {
      value_id: "100000591",
      en_name: "Romania",
      zh_name: "罗马尼亚",
      car_name: "RO"
    }, {
      value_id: "100000592",
      en_name: "Russian Federation",
      zh_name: "俄罗斯联邦",
      car_name: "RU"
    }, {
      value_id: "100000593",
      en_name: "Rwanda",
      zh_name: "卢旺达",
      car_name: "RW"
    }, {
      value_id: "200019005",
      en_name: "Saint Barthelemy",
      zh_name: "加勒比海圣巴特岛",
      car_name: "BL"
    }, {
      value_id: "100000594",
      en_name: "Saint Kitts and Nevis",
      zh_name: "圣基茨和尼维斯",
      car_name: "KN"
    }, {
      value_id: "100000595",
      en_name: "Saint Lucia",
      zh_name: "圣卢西亚",
      car_name: "LC"
    }, {
      value_id: "200019006",
      en_name: "Saint Martin",
      zh_name: "圣马丁岛",
      car_name: "MF"
    }, {
      value_id: "100000596",
      en_name: "Saint Vincent and the Grenadines",
      zh_name: "圣文森特和格林纳丁斯",
      car_name: "VC"
    }, {
      value_id: "100000597",
      en_name: "Samoa",
      zh_name: "萨摩亚",
      car_name: "WS"
    }, {
      value_id: "100000598",
      en_name: "San Marino",
      zh_name: "圣马力诺",
      car_name: "SM"
    }, {
      value_id: "100000599",
      en_name: "Sao Tome and Principe",
      zh_name: "圣多美和普林西比",
      car_name: "ST"
    }, {
      value_id: "100000600",
      en_name: "Saudi Arabia",
      zh_name: "沙特阿拉伯",
      car_name: "SA"
    }, {
      value_id: "200030001",
      en_name: "Scotland",
      zh_name: "苏格兰",
      car_name: "SCO"
    }, {
      value_id: "100000601",
      en_name: "Senegal",
      zh_name: "塞内加尔",
      car_name: "SN"
    }, {
      value_id: "100005000",
      en_name: "Serbia",
      zh_name: "塞尔维亚",
      car_name: "RS"
    }, {
      value_id: "100000602",
      en_name: "Seychelles",
      zh_name: "塞舌尔",
      car_name: "SC"
    }, {
      value_id: "100000603",
      en_name: "Sierra Leone",
      zh_name: "塞拉利昂",
      car_name: "SL"
    }, {
      value_id: "100000604",
      en_name: "Singapore",
      zh_name: "新加坡",
      car_name: "SG"
    }, {
      value_id: "100000605",
      en_name: "Slovakia (Slovak Republic)",
      zh_name: "斯洛伐克（斯洛伐克共和国）",
      car_name: "SK"
    }, {
      value_id: "100000606",
      en_name: "Slovenia",
      zh_name: "斯洛文尼亚",
      car_name: "SI"
    }, {
      value_id: "100000607",
      en_name: "Solomon Islands",
      zh_name: "所罗门群岛",
      car_name: "SB"
    }, {
      value_id: "100000608",
      en_name: "Somalia",
      zh_name: "索马里",
      car_name: "SO"
    }, {
      value_id: "100000609",
      en_name: "South Africa",
      zh_name: "南非",
      car_name: "ZA"
    }, {
      value_id: "200019007",
      en_name: "South Georgia and the South Sandwich Islands",
      zh_name: "南乔治亚和南桑威奇群岛",
      car_name: "GS"
    }, {
      value_id: "100000610",
      en_name: "South Korea",
      zh_name: "韩国",
      car_name: "KR"
    }, {
      value_id: "200031000",
      en_name: "South Sudan",
      zh_name: "南苏丹",
      car_name: "SS"
    }, {
      value_id: "100000611",
      en_name: "Spain",
      zh_name: "西班牙",
      car_name: "ES"
    }, {
      value_id: "100000612",
      en_name: "Sri Lanka",
      zh_name: "斯里兰卡",
      car_name: "LK"
    }, {
      value_id: "100000613",
      en_name: "St. Helena",
      zh_name: "圣赫勒拿",
      car_name: "SH"
    }, {
      value_id: "100000614",
      en_name: "St. Pierre and Miquelon",
      zh_name: "圣皮埃尔和密克隆",
      car_name: "PM"
    }, {
      value_id: "100000615",
      en_name: "Sudan",
      zh_name: "苏丹",
      car_name: "SD"
    }, {
      value_id: "100000616",
      en_name: "Suriname",
      zh_name: "苏里南",
      car_name: "SR"
    }, {
      value_id: "100000617",
      en_name: "Svalbard and Jan Mayen Islands",
      zh_name: "斯瓦尔巴群岛和扬马延群岛",
      car_name: "SJ"
    }, {
      value_id: "100000618",
      en_name: "Swaziland",
      zh_name: "斯威士兰",
      car_name: "SZ"
    }, {
      value_id: "100000619",
      en_name: "Sweden",
      zh_name: "瑞典",
      car_name: "SE"
    }, {
      value_id: "100000620",
      en_name: "Switzerland",
      zh_name: "瑞士",
      car_name: "CH"
    }, {
      value_id: "100000621",
      en_name: "Syrian Arab Republic",
      zh_name: "阿拉伯叙利亚共和国",
      car_name: "SY"
    }, {
      value_id: "100000622",
      en_name: "Taiwan",
      zh_name: "中国台湾省",
      car_name: "TW"
    }, {
      value_id: "100000623",
      en_name: "Tajikistan",
      zh_name: "塔吉克斯坦",
      car_name: "TJ"
    }, {
      value_id: "100000624",
      en_name: "Tanzania",
      zh_name: "坦桑尼亚",
      car_name: "TZ"
    }, {
      value_id: "100000625",
      en_name: "Thailand",
      zh_name: "泰国",
      car_name: "TH"
    }, {
      value_id: "200019008",
      en_name: "Timor-Leste",
      zh_name: "东帝汶",
      car_name: "TL"
    }, {
      value_id: "100000626",
      en_name: "Togo",
      zh_name: "多哥",
      car_name: "TG"
    }, {
      value_id: "100000627",
      en_name: "Tokelau",
      zh_name: "托克劳",
      car_name: "TK"
    }, {
      value_id: "100000628",
      en_name: "Tonga",
      zh_name: "汤加",
      car_name: "TO"
    }, {
      value_id: "100000629",
      en_name: "Trinidad and Tobago",
      zh_name: "特立尼达和多巴哥",
      car_name: "TT"
    }, {
      value_id: "100000630",
      en_name: "Tunisia",
      zh_name: "突尼斯",
      car_name: "TN"
    }, {
      value_id: "100000631",
      en_name: "Turkey",
      zh_name: "土耳其",
      car_name: "TR"
    }, {
      value_id: "100000632",
      en_name: "Turkmenistan",
      zh_name: "土库曼斯坦",
      car_name: "TM"
    }, {
      value_id: "100000633",
      en_name: "Turks and Caicos Islands",
      zh_name: "特克斯和凯科斯群岛",
      car_name: "TC"
    }, {
      value_id: "100000634",
      en_name: "Tuvalu",
      zh_name: "图瓦卢",
      car_name: "TV"
    }, {
      value_id: "100000635",
      en_name: "Uganda",
      zh_name: "乌干达"
    }, {
      value_id: "100000636",
      en_name: "Ukraine",
      zh_name: "乌克兰",
      car_name: "UG"
    }, {
      value_id: "100000637",
      en_name: "United Arab Emirates",
      zh_name: "阿拉伯联合酋长国",
      car_name: "AE"
    }, {
      value_id: "100000638",
      en_name: "United Kingdom",
      zh_name: "大不列颠联合王国",
      car_name: "UK"
    }, {
      value_id: "100000639",
      en_name: "United States",
      zh_name: "美国",
      car_name: "US"
    }, {
      value_id: "100000640",
      en_name: "United States Minor Outlying Islands",
      zh_name: "美国小岛屿",
      car_name: "UM"
    }, {
      value_id: "100000641",
      en_name: "Uruguay",
      zh_name: "乌拉圭",
      car_name: "UY"
    }, {
      value_id: "100000642",
      en_name: "Uzbekistan",
      zh_name: "乌兹别克斯坦",
      car_name: "UZ"
    }, {
      value_id: "100000643",
      en_name: "Vanuatu",
      zh_name: "瓦努阿图",
      car_name: "VU"
    }, {
      value_id: "100000644",
      en_name: "Vatican City State (Holy See)",
      zh_name: "梵蒂冈城邦（教廷）",
      car_name: "VA"
    }, {
      value_id: "100000645",
      en_name: "Venezuela",
      zh_name: "委内瑞拉",
      car_name: "VE"
    }, {
      value_id: "100000646",
      en_name: "Vietnam",
      zh_name: "越南",
      car_name: "VN"
    }, {
      value_id: "100000647",
      en_name: "Virgin Islands (British)",
      zh_name: "维尔京群岛（英属）",
      car_name: "VG"
    }, {
      value_id: "100000648",
      en_name: "Virgin Islands (U.S.)",
      zh_name: "维尔京群岛（美国）",
      car_name: "VI"
    }, {
      value_id: "100000649",
      en_name: "Wallis And Futuna Islands",
      zh_name: "瓦利斯和富图纳群岛",
      car_name: "WF"
    }, {
      value_id: "100000650",
      en_name: "Western Sahara",
      zh_name: "西撒哈拉",
      car_name: "EH"
    }, {
      value_id: "100000651",
      en_name: "Yemen",
      zh_name: "也门",
      car_name: "YE"
    }, {
      value_id: "100000652",
      en_name: "Yugoslavia",
      zh_name: "南斯拉夫",
      car_name: "YU"
    }, {
      value_id: "100000653",
      en_name: "Zambia",
      zh_name: "赞比亚",
      car_name: "ZM"
    }, {
      value_id: "200019009",
      en_name: "Zanzibar",
      zh_name: "桑给巴尔",
      car_name: "ZNZ"
    }, {
      value_id: "100000654",
      en_name: "Zimbabwe",
      zh_name: "津巴布韦",
      car_name: "ZW"
    }, {
      value_id: "202042002",
      en_name: "Curacao",
      zh_name: "库拉索",
      car_name: "CW"
    }, {
      value_id: "202042003",
      en_name: "Sint Maarten",
      zh_name: "荷属圣马丁",
      car_name: "SX"
    }],
    nowGroup: '',//传递分组信息
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
        title: '详情模板',
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
        customNoSkuTitle: '自定义属性',
        customNoSku: []  //自定义属性
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
    shippingTpl: [],//运费模板列表
    shippingTplObj: {},//为显示运费模板默认值
  },
  //复选框  
  onChange(e) {
    console.log(e);
    if (this.data.imageId != "") {
      this.setData({
        checked: !this.data.checked,
        disabled: !e.detail.value
      });
    }
  },
  //回到顶部
  returnTop: function () {
    console.log('进入');
    my.pageScrollTo({
      scrollTop: parseInt(this.data.scrolltop),
      duration: 300,
    });
  },
  onPageScroll(e) {
    //console.log(e);
    this.setData({
      scrolltopNum: e.scrollTop
    })
  },
  onShow() {
    this.setData({
      activeIndex: app.globalData.activeIndex
    })
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
    var that = this
    that.urlFail = []
    that.tempIndex = []
    that.tempTime = ['', '']
    that.haveSkuEdit = ['', '', '', ''];//产品规格input传值中转数组
    that.temp = ['', ''];//定制信息input传值中转数组
    that.tempPr = ['', ''];//价格折扣input传值中转数组
    that.inputVal = ['', '', ''];
    that.package_size = [that.data.long, that.data.width, that.data.height];
    var gic = app.globalData.productGJC;//输入的产品关键词
    var gjc = 'mobanList[' + 1 + '].message[' + 2 + '].gjc';
    var nameV = app.globalData.productEnName;//输入的产品英文名称
    var name = 'mobanList[' + 1 + '].message[' + 1 + '].name';
    that.setData({
      activeIndex: app.globalData.activeIndex,
      [gjc]: gic,
      [name]: nameV,
      chooseImageType: app.globalData.chooseImageType
    });
    console.log(that.data.images.length);

    if (that.data.images.length == 6) {
      that.setData({
        isShowImg: true
      })
    }
    console.log(app.globalData.images, '传来的数据');
    let imagesTemp = []
    //目前最后问题所在
    for (let i = 0; i < app.globalData.images.length; i++) {
      if (app.globalData.images[i] != undefined) {
        console.log(app.globalData.images[i].image_url);
        if (app.globalData.images[i].image_url != undefined) {
          imagesTemp.push(app.globalData.images[i])
        } else {
          imagesTemp.push({ image_url: app.globalData.images[i] })
        }
      }
    }
    console.log(imagesTemp);
    // let imgTemp = that.data.images.concat(imagesTemp)
    // console.log(imgTemp);
    that.setData({
      images: imagesTemp
    })
    console.log(that.data.images);
    if (that.data.images.length > 0) {
      that.setData({
        tempFiles: that.data.images[0].image_url
      })
    }
    console.log(app.globalData.imgTempLength);
    console.log(that.data.chooseImageType);
    switch (that.data.chooseImageType) {
      case 'imageBank':
        if (that.data.images.length > 0 && app.globalData.imgTempLength > 0 && this.data.activeIndex != 3) {
          my.showToast({
            content: '从图片银行加载图片...',
            duration: 3000,
          });
        }
        switch (imagesTemp.length) {
          case 1: if (this.data.activeIndex == 2) {
            console.log('未选图进入拍照发品页面');
          }
            if (this.data.activeIndex == 1) {
              for (let i = 0; i < imagesTemp.length; i++) {
                (function (i) {
                  setTimeout(function () {
                    console.log(i);
                    that.getBase64ForUrl(imagesTemp[i].image_url)
                  }, i * 1000);
                })(i)
              }
            }
            break;
          case 0: console.log('首次进入拍照发品页面');
            break;
          default:
            this.setData({
              showMaskTap: true
            })
            console.log('图片银行选图');
            for (let i = app.globalData.imgTempLength; i < imagesTemp.length; i++) {
              (function (i) {
                setTimeout(function () {
                  console.log(i);
                  that.setData({
                    imageIndex: i
                  })
                  that.getBase64ForUrl(imagesTemp[i].image_url)
                }, i * 1000);
              })(i)
            }
            if (app.globalData.imgTempLength >= imagesTemp.length) {
              this.setData({
                showMaskTap: false
              })
            }
            break;
        }
        break;
      case 'error': this.setData({
        tempFiles: ''
      });
        break;
      default: console.log("本地选图此处不执行操作")
        break;
    }
    console.log(app.globalData.images);
    if (this.data.activeIndex == 3) {
      this.setData({
        images: app.globalData.images
      })
    }
  },
  //
  async GetDate(e) {
    console.log("接收的点击后传回的被点击元素")
    console.log(e)
    if (e.type == 'tpl') {
      var tplId = e.selected;
      this.setData({
        tplId: tplId
      })
      console.log(tplId)
      try {
        var requestTpl = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.tpl/" + tplId,
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "id": tplId,
            }
          },
          'exts': { "timeout": 100000 }
        };
        const resTpl = await cloud.application.httpRequest(requestTpl)
        console.log(resTpl)
        var lei = 'mobanList[' + 1 + '].message[' + 0 + '].lei'
        this.setData({
          [lei]: resTpl.data.alibaba_category_zh_name_path,
          productType: resTpl.data.data.product_type,
          selected: 1,//组件选择标识，0为未选择
          tplDiscount: resTpl.data.data.discount,
        })
        console.log(this.data.mobanList[1].message[0].lei)
        console.log("传递id请求过来的发布模板详情")
        //根据传来的id查找规格
        var alibaba_category_id = resTpl.data.alibaba_category_id;
        console.log(alibaba_category_id)
        var requestTplSku = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/common/aliattribute/" + alibaba_category_id,
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "id": alibaba_category_id,
            }
          },
          'exts': { "timeout": 100000 }
        };
        const resTplSku = await cloud.application.httpRequest(requestTplSku)
        console.log(resTplSku);
        console.log(this.data.productType)
        this.setData({
          resTplSku: resTplSku
        })
      } catch (error) {
      }
    } else if (e.type == 'template') {
      console.log(e.text)
      this.setData({
        selectedTmp: e.selected
      })
    } else if (e.type == 'productType') {
      this.data.productType = e.selected
      console.log(e.text)
      // var product_type = this.data.nowTplInfo.data.product_type;//当前模板预选的产品类型
      var subTitle = 'mobanList[' + 8 + '].subTitle';
      var selectProductType = [];//信息预览页面修改产品类型
      let subTitleZ = [];
      if (e.selected == 'wholesale') {
        selectProductType = this.data.nowTplInfo.data.wholesale;
        console.log(selectProductType);
        if (this.data.systemInfo.platform == 'Android') {//type
          subTitleZ = ['每批数量', '发货周期', '最小起订量', '备货期(天)', '尺寸(厘米)', '价格(美元)', '销售方式', '运费模板', '计量单位', '重量(kg)']
          this.setData({
            topMargin: 0,
            cm: 11,
            cm1: 11,
            cmTOP: 0,
            cmTOP1: -2,
            mTop: -2
          })
        } else {
          subTitleZ = ['重量(kg)', '尺寸(厘米)', '发货周期', '备货期(天)', '价格(美元)', '最小起订量', '计量单位', '每批数量', '销售方式', '运费模板']
        }
      } else if (e.selected == 'sourcing') {
        selectProductType = this.data.nowTplInfo.data.sourcing;
        console.log(selectProductType);
        if (this.data.systemInfo.platform == 'Android') {
          subTitleZ = ['发货周期', '发货港口', '发货期限', 'FOB货币符号', 'FOB最小价格', 'FOB最大价格', 'FOB计量单位', '最小起订量', '最小起订量计量单位', '包装信息', '付款方式', '供货能力周期', '供货能力', '供货能力计量单位'];
        } else {
          subTitleZ = ['付款方式', '发货周期', 'FOB货币', '最小起订量', 'FOB最小价格', '发货港口', 'FOB最大价格', '供货能力', '供货能力周期', '最小起订量计量单位', '供货能力计量单位', '包装信息', '发货期限', 'FOB计量单位']
        }
        for (const key in selectProductType) {
          if (selectProductType.hasOwnProperty(key)) {
            const element = selectProductType[key];
            const ele = key;
            //console.log(ele, '+++++++++++++++');
          }
        }
      }
      var productType = 'mobanList[' + 8 + '].productType'
      var nowProductType = []
      var subTitleEZ = [];//准备加入中文名称//根据产品类型展示相应的字段
      for (const key in selectProductType) {
        nowProductType.push({
          en_name: key,
          name_value: selectProductType[key]
        })
      }
      //给数组加入中文名称
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
      //同步改变
      let productT = 'nowTplInfo[data[base[product_type]]]'
      this.setData({
        [subTitle]: nowProductType,
        [productType]: nowProductType,
        productType: e.selected,
        [productT]: e.selected,//同步改变
      })
    } else if (e.type == 'shippingTpl') {
      console.log(e.selected)
      this.setData({
        ['nowTplInfo[data[wholesale[shipping_line_template_id]]]']: e.selected
      })
    } else if (e.type == 'group') {
      console.log(e.selected)
      var group = e.text;
      var groupId = e.selected;
      var nowGroup = 'mobanList[' + 1 + '].message[' + 3 + '].nowGroup';
      this.setData({
        [nowGroup]: group,
        nowGroup: groupId,
        selectedGroup: 1,//组件选择标识，0为未选择
        ['nowTplInfo[data[base].group_id]']: e.selected
      });
    }
  },
  //底部弹出view
  onBtnTap(e) {
    this.setData({
      showTop1: true,
      idx: e.target.dataset.indexDanxuan
    });

    // 产品属性多选变色开始
    const key = this.data.useTplNoSkuDefault[this.data.idx].en_name;
    let attr = { ...this.data.projectAttr };
    let new_en_name = []
    for (const keySecond in attr) {
      if (keySecond == key) {
        for (let index = 0; index < attr[keySecond].length; index++) {
          new_en_name.push(attr[keySecond][index].value_name)
        }
      }
    }
    this.setData({
      new_en_name: new_en_name
    })
    // 产品属性多选变色结束
  },
  //chanpinleixing
  hiddenproductTypeActive: function () {
    this.setData({
      productTypeActive: !this.data.productTypeActive,
    })
    //调用组件内部方法
    this.counter.selectToggle()
  },
  //运费模板
  hiddenshippingTplActive: function () {
    this.setData({
      shippingTplActive: !this.data.shippingTplActive,
    })
    //调用组件内部方法
    this.counter1.selectToggle()
  },
  //发布模板
  hiddenpublishTplActive: function () {
    this.setData({
      publishTplActive: !this.data.publishTplActive,
    })
    //调用组件内部方法
    this.counter2.selectToggle()
  },
  async nextSave() {
    //this.panduan()
    my.showLoading({
      content: '正在请求数据...',
      delay: 0,
      success: () => {
        this.setData({
          showMaskTap: true,
          tempFiles: ''
        })
      }
    })
    // 产品属性分解开始
    let attrbute = { ...this.data.projectAttr }
    let a = Object.values(attrbute)
    let b = []
    a.forEach(item => {
      if (Array.isArray(item)) {
        item.forEach(value => {
          a.push(value)
        })
      }
    })
    a.forEach(item => {
      if (!Array.isArray(item)) {
        b.push(item)
      }
    })
    let c = b.concat(this.data.mobanList[5].customNoSku)
    // 产品属性分解结束
    //baocun商品xinxi
    console.log(this.data.nowTplInfo.data);
    let gjc = this.data.nowTplInfo.data.desc.keywords.split(",");
    let haveSku = this.data.nowTplInfo.data.attr.have_sku;
    let haveSkub = [];
    for (let i = 0; i < haveSku.length; i++) {
      haveSkub.push({
        attribute_id: haveSku[i].attribute_id,
        attribute_name: haveSku[i].attribute_name,
        price: haveSku[i].price,
        quantity: haveSku[i].quantity,
        sku_custom_image_url: haveSku[i].sku_custom_image_url,
        sku_custom_value_name: '',
        value_id: haveSku[i].value_id,
        value_name: haveSku[i].value_name
      })
    }
    console.log(haveSkub);
    console.log(haveSku);
    try {
      var requestppro = {
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.yes.product/" + this.data.productSendTemp,
          "method": "PUT",
          "token": app.globalData.token,
          "data": {
            "attributes": {
              "have_sku": haveSkub,
              "no_sku": c,
            },
            "categoryId": this.data.nowTplInfo.data.base.category_id,
            "groupId": this.data.nowGroup,
            "isSmartEdit": 0,
            "keywords": gjc,//this.data.mobanList[1].message[2].gjc
            "market": this.data.nowTplInfo.data.base.market,
            "productCurrency": this.data.nowTplInfo.data.base.product_currency,
            "productPrice": this.data.nowTplInfo.data.base.product_price,
            "productType": this.data.nowTplInfo.data.base.product_type,
            "subject": this.data.nowTplInfo.data.base.subject,
            "custom": this.data.nowTplInfo.data.custom,
            "desc_html": {
              "html": this.data.nowTplInfo.data.desc_html.html,
              "id": this.data.nowTplInfo.data.desc_html.id,
              "pid": this.data.nowTplInfo.data.desc_html.pid,
            },
            "discount": this.data.mobanList[7].discount,
            "image": {
              "image_id": this.data.nowTplInfo.data.image.image_id,
              "image_list": this.data.nowTplInfo.data.image.image_list,
              "watermark": this.data.nowTplInfo.data.image.watermark,
              "watermark_frame": this.data.nowTplInfo.data.image.watermark_frame,
              "watermark_position": this.data.nowTplInfo.data.image.watermark_position,
            },
            "sourcing": {
              "deliver_periods": this.data.nowTplInfo.data.sourcing.deliver_periods,
              "delivery_port": this.data.nowTplInfo.data.sourcing.delivery_port,
              "delivery_time": this.data.nowTplInfo.data.sourcing.delivery_time,
              "fob_currency": this.data.nowTplInfo.data.sourcing.fob_currency,
              "fob_max_price": this.data.nowTplInfo.data.sourcing.fob_max_price,
              "fob_min_price": this.data.nowTplInfo.data.sourcing.fob_min_price,
              "fob_unit_type": this.data.nowTplInfo.data.sourcing.fob_unit_type,
              "min_order_quantity": this.data.nowTplInfo.data.sourcing.min_order_quantity,
              "min_order_unit_type": this.data.nowTplInfo.data.sourcing.min_order_unit_type,
              "packaging_desc": this.data.nowTplInfo.data.sourcing.packaging_desc,
              "payment_methods": this.data.nowTplInfo.data.sourcing.payment_methods,
              "supply_period_type": this.data.nowTplInfo.data.sourcing.supply_period_type,
              "supply_quantity": this.data.nowTplInfo.data.sourcing.supply_quantity,
              "supply_unit_type": this.data.nowTplInfo.data.sourcing.supply_unit_type,
            },
            "wholesale": {
              "batch_number": this.data.normals,
              "deliver_periods": this.data.nowTplInfo.data.wholesale.deliver_periods,
              "handling_time": this.data.nowTplInfo.data.wholesale.handling_time,
              "min_order_quantity": this.data.nowTplInfo.data.wholesale.min_order_quantity,
              "package_size": this.data.nowTplInfo.data.wholesale.package_size,
              "price": this.data.nowTplInfo.data.wholesale.price,
              "sale_type": this.data.sale_ename,
              "shipping_line_template_id": this.data.nowTplInfo.data.wholesale.shipping_line_template_id,
              "unit_type": this.data.calculate_ename,
              "weight": this.data.nowTplInfo.data.wholesale.weight
            }
          }
        },
        'exts': { "timeout": 100000 }
      };
      const resppro = await cloud.application.httpRequest(requestppro)
      console.log("最后一步");
      console.log(resppro);
      console.log(this.data.mobanList[8].subTitle);
      this.data.saveSts = resppro.msg
      if (resppro.msg == "发布商品编辑成功") {
        my.switchTab({
          //跳转tabBar的url
          url: '/pages/product/product',
          success: () => {
            app.globalData.activeT = 2
            app.globalData.ref = "ref"
            app.globalData.images = []
            app.globalData.imageId = []
            app.globalData.activeIndex = 1
            my.showToast({
              content: '保存成功',
              type: 'success',
              duration: 2000
            });
            my.hideLoading();
            this.setData({
              showMaskTap: false,
              activeIndex: 1
            })
          }
        });
      }
    } catch (e) {
      console.log(e);

    }
  },
  //blur传入输入的关键词
  inputSetVal: function (e) {
    if (e.detail.value == '') {
      my.showToast({
        title: '提示',
        content: '产品关键词不能为空',
        icon: 'false',
        duration: 2000
      })
    } else {
      console.log(e)
      console.log(e.detail.value)
      this.inputVal[e.target.dataset.index] = this.validateEnglish(e.detail.value);
      console.log(this.inputVal)
      var gic = this.inputVal;
      app.globalData.productGJC = this.inputVal
      var gjc = 'mobanList[' + 1 + '].message[' + 2 + '].gjc';
      this.setData({
        [gjc]: gic
      })
    }
  },
  //blur传入输入的产品名称
  inputSetName: function (e) {
    if (e.detail.value == '') {
      my.showToast({
        title: '提示',
        content: '产品名称不能为空',
        icon: 'false',
        duration: 2000
      })
    } else {
      console.log(e.detail.value)
      var nameV = this.validateEnglish(e.detail.value);
      console.log(nameV)
      app.globalData.productEnName = e.detail.value
      var name = 'mobanList[' + 1 + '].message[' + 1 + '].name';
      this.setData({
        [name]: nameV
      });
    }
  },
  //输入产品价格
  inputSetPrice: function (e) {
    if (e.detail.value == '') {
      my.showToast({
        title: '提示',
        content: '产品价格不能为空',
        icon: 'false',
        duration: 2000
      })
    } else {
      console.log(e.detail.value)
      var productPriceV = this.validateNumber(e.detail.value);
      console.log(productPriceV)
      app.globalData.productPrice = e.detail.value
      var productPrice = 'mobanList[' + 1 + '].message[' + 4 + '].productPrice';
      this.setData({
        [productPrice]: productPriceV
      });
    }
  },
  //每批价格同步到提交数组
  getBatchPriceCount: function (e) {
    let batchPrice = e.detail.value;
    this.setData({
      ['nowTplInfo[data[wholesale]].price']: batchPrice
    })
  },
  //下一步
  async nextStep(e) {
    if (this.data.activeIndex == 3) {
      this.setData({
        showMaskTap: true
      })
      // 产品属性分解开始
      let attrbute = { ...this.data.projectAttr }
      let a = Object.values(attrbute)
      let b = []
      a.forEach(item => {
        if (Array.isArray(item)) {
          item.forEach(value => {
            a.push(value)
          })
        }
      })
      a.forEach(item => {
        if (!Array.isArray(item)) {
          b.push(item)
        }
      })
      let c = b.concat(this.data.mobanList[5].customNoSku)
      // 产品属性分解结束
      //先保存再发布
      let gjc = this.data.nowTplInfo.data.desc.keywords.split(",");
      let haveSku = this.data.nowTplInfo.data.attr.have_sku;
      let haveSkub = [];
      for (let i = 0; i < haveSku.length; i++) {
        haveSkub.push({
          attribute_id: haveSku[i].attribute_id,
          attribute_name: haveSku[i].attribute_name,
          price: haveSku[i].price,
          quantity: haveSku[i].quantity,
          sku_custom_image_url: haveSku[i].sku_custom_image_url,
          sku_custom_value_name: '',
          value_id: haveSku[i].value_id,
          value_name: haveSku[i].value_name
        })
      }
      var requestppro = {
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.yes.product/" + this.data.productSendTemp,
          "method": "PUT",
          "token": app.globalData.token,
          "data": {
            "attributes": {
              "have_sku": haveSkub,
              "no_sku": c,
            },
            "categoryId": this.data.nowTplInfo.data.base.category_id,
            "groupId": this.data.nowGroup,
            "isSmartEdit": 0,
            "keywords": gjc,//this.data.mobanList[1].message[2].gjc
            "market": this.data.nowTplInfo.data.base.market,
            "productCurrency": this.data.nowTplInfo.data.base.product_currency,
            "productPrice": this.data.nowTplInfo.data.base.product_price,
            "productType": this.data.nowTplInfo.data.base.product_type,
            "subject": this.data.nowTplInfo.data.base.subject,
            "custom": this.data.nowTplInfo.data.custom,
            "desc_html": {
              "html": this.data.nowTplInfo.data.desc_html.html,
              "id": this.data.nowTplInfo.data.desc_html.id,
              "pid": this.data.nowTplInfo.data.desc_html.pid,
            },
            "discount": this.data.mobanList[7].discount,
            "image": {
              "image_id": this.data.nowTplInfo.data.image.image_id,
              "image_list": this.data.nowTplInfo.data.image.image_list,
              "watermark": this.data.nowTplInfo.data.image.watermark,
              "watermark_frame": this.data.nowTplInfo.data.image.watermark_frame,
              "watermark_position": this.data.nowTplInfo.data.image.watermark_position,
            },
            "sourcing": {
              "deliver_periods": this.data.nowTplInfo.data.sourcing.deliver_periods,
              "delivery_port": this.data.nowTplInfo.data.sourcing.delivery_port,
              "delivery_time": this.data.nowTplInfo.data.sourcing.delivery_time,
              "fob_currency": this.data.nowTplInfo.data.sourcing.fob_currency,
              "fob_max_price": this.data.nowTplInfo.data.sourcing.fob_max_price,
              "fob_min_price": this.data.nowTplInfo.data.sourcing.fob_min_price,
              "fob_unit_type": this.data.nowTplInfo.data.sourcing.fob_unit_type,
              "min_order_quantity": this.data.nowTplInfo.data.sourcing.min_order_quantity,
              "min_order_unit_type": this.data.nowTplInfo.data.sourcing.min_order_unit_type,
              "packaging_desc": this.data.nowTplInfo.data.sourcing.packaging_desc,
              "payment_methods": this.data.nowTplInfo.data.sourcing.payment_methods,
              "supply_period_type": this.data.nowTplInfo.data.sourcing.supply_period_type,
              "supply_quantity": this.data.nowTplInfo.data.sourcing.supply_quantity,
              "supply_unit_type": this.data.nowTplInfo.data.sourcing.supply_unit_type,
            },
            "wholesale": {
              "batch_number": this.data.normals,
              "deliver_periods": this.data.nowTplInfo.data.wholesale.deliver_periods,
              "handling_time": this.data.nowTplInfo.data.wholesale.handling_time,
              "min_order_quantity": this.data.nowTplInfo.data.wholesale.min_order_quantity,
              "package_size": this.data.nowTplInfo.data.wholesale.package_size,
              "price": this.data.nowTplInfo.data.wholesale.price,
              "sale_type": this.data.sale_ename,
              "shipping_line_template_id": this.data.nowTplInfo.data.wholesale.shipping_line_template_id,
              "unit_type": this.data.calculate_ename,
              "weight": this.data.nowTplInfo.data.wholesale.weight
            }
          }
        },
        'exts': { "timeout": 100000 }
      };
      const resppro = await cloud.application.httpRequest(requestppro)
      console.log("最后一步");
      console.log(resppro);
      console.log(this.data.mobanList[8].subTitle);
      this.data.saveSts = resppro.msg
      if (resppro.msg == "发布商品编辑成功") {
        my.showToast({
          content: '正在发布商品',
          icon: 'success',
          duration: 2000
        })
        const result = await cloud.application.httpRequest({
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.online",
            "method": "POST",
            "token": app.globalData.token,
            "data": {
              "ids": [this.data.productSendTemp]
            }
          },
          'exts': { "timeout": 100000 }
        });
        console.log(result);
        my.showToast({
          content: result.msg,
          icon: 'false',
          duration: 2000
        })
        if (result.msg == "发布成功") {
          my.switchTab({
            //跳转tabBar的url
            url: '/pages/product/product',
            success: () => {
              app.globalData.activeT = 1
              app.globalData.activeIndex = 1
              this.setData({
                showMaskTap: false
              })
              my.showToast({
                content: '发布成功',
                type: 'success',
                duration: 2000
              });
            }
          });
        }
      } else if (JSON.stringify(resppro) == '{}') {
        my.switchTab({
          //跳转tabBar的url
          url: '/pages/product/product',
          success: () => {
            app.globalData.activeT = 2
            app.globalData.images = []
            app.globalData.imageId = []
            app.globalData.activeIndex = 1
            my.showToast({
              content: '保存信息失败,请在草稿箱查看',
              type: 'fail',
              duration: 3000
            });
            this.setData({
              showMaskTap: false,
              activeIndex: 1
            })
          }
        });
      }
    } else if (this.data.activeIndex == 2) {
      //各处值
      let sel = this.data.selected;
      let selGroup = this.data.selectedGroup;
      let name = this.data.mobanList[1].message[1].name;
      let gjc = this.data.mobanList[1].message[2].gjc;
      let price = this.data.mobanList[1].message[4].productPrice;
      if (sel == 0 || selGroup == 0 || name == '' || gjc[1] == "" && gjc[0] == "" || price == '') {
        my.showToast({
          title: '提示',
          content: sel == 0 ? '请选择发布模板' : gjc[1] == "" || gjc[0] == "" ? '关键词不能为空(至少添加两个关键词)' : name == '' ? '产品名称不为空' : selGroup == 0 ? '请选择产品分组' : price == '' ? '请填写产品价格' : '正在生成商品信息',
          icon: 'false',
          duration: 1000
        })
      } else {
        my.showLoading({
          content: '加载中...',
          delay: 0,
          success: () => {
            this.setData({
              showMaskTap: true
            })
          }
        });
        // 新建商品
        var requestp = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/product",
            "method": "POST",
            "token": app.globalData.token,
            "data": {
              "product": {
                "attr": [],
                "base": {
                  "SpecialType": "",
                  "categoryId": "",
                  "currency": "USD",
                  "packageSize": "20X20X10",
                  "price": this.data.mobanList[1].message[4].productPrice,
                  "quantity": "10",
                  "status": 1,
                  "weight": "360",
                },
                "desc": {
                  "en": {
                    "keywords": this.data.mobanList[1].message[2].gjc,
                    "title": this.data.mobanList[1].message[1].name,
                  },
                },
                "image": this.imageId,
                "option": [],
                "remark": "",
                "supplier": [{
                  "currency": "RMB",
                  "supplier_price": "20.00",
                  "supplier_shipping_price": "0.00",
                  "supplier_url": ""
                }]
              }
            }
          },
          'exts': { "timeout": 100000 }
        };
        const resp = await cloud.application.httpRequest(requestp)
        console.log(resp);
        if (resp.data.productId != '') {
          //更改编辑状态并且进入待发布
          var requestpEdit = {
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/product/" + resp.data.productId,
              "method": "PUT",
              "token": app.globalData.token,
              "data": {
                "product": {
                  "attr": [],
                  "base": {
                    "SpecialType": "0",
                    "categoryId": "",
                    "currency": "USD",
                    "packageSize": "20X20X10",
                    "price": this.data.mobanList[1].message[4].productPrice,
                    "quantity": "1000",
                    "status": 0,
                    "weight": "360",
                  },
                  "desc": {
                    "en": {
                      "keywords": this.data.mobanList[1].message[2].gjc,
                      "title": this.data.mobanList[1].message[1].name,
                    },
                  },
                  "image": this.imageId,
                  "option": [],
                  "remark": "",
                  "supplier": [{
                    "currency": "RMB",
                    "supplier_price": "20.00",
                    "supplier_shipping_price": "0.00",
                    "supplier_url": ""
                  }]
                }
              }
            },
            'exts': { "timeout": 100000 }
          };
          const requestpEd = await cloud.application.httpRequest(requestpEdit)
          console.log(requestpEd);
          my.showToast({
            content: requestpEd.msg,
            icon: 'false',
            duration: 2000
          })
          //套用模板
          var requestpTpl = {
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/publish.product",
              "method": "POST",
              "token": app.globalData.token,
              "data": {
                'ids': [resp.data.productId],
                'tplId': this.data.tplId,
              }
            },
            'exts': { "timeout": 100000 }
          };
          const respTpl = await cloud.application.httpRequest(requestpTpl)
          console.log(respTpl);
          this.setData({
            productSendTemp: respTpl.data[0]
          })
          my.showToast({
            content: respTpl.msg,
            icon: 'false',
            duration: 2000
          })
          // const result = await cloud.application.httpRequest({
          //   'path': 'index.php',
          //   'method': 'POST',
          //   'body': {
          //     "api": "/api/apply.template",
          //     "method": "POST",
          //     "token": app.globalData.token,
          //     "data": {
          //       "ids": [this.data.productSendTemp],
          //       "tid": this.data.selectedTmp
          //     }
          //   },
          //   'exts': { "timeout": 100000 }
          // });
          // console.log(result);
          //获取套用模板后的商品信息respTpl.data[0]
          var requestpTplPro = {
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/publish.yes.product/" + this.data.productSendTemp,
              "method": "GET",
              "token": app.globalData.token,
              "data": {
                "pid": this.data.productSendTemp
              }
            },
            'exts': { "timeout": 300000 }
          };
          const resTplPro = await cloud.application.httpRequest(requestpTplPro)
          console.log(resTplPro);
          if (JSON.stringify(resTplPro) == '{}') {
            app.globalData.activeIndex = 1
            app.globalData.chooseImageType = 'error'
            app.globalData.images = []
            //删除已创建的商品
            this.delNoImageProduct(resp.data.productId, respTpl.data[0]);
            my.switchTab({
              url: '/pages/product/product',
              success: () => {
                my.hideLoading({
                  success: () => {
                    this.setData({
                      showMaskTap: true
                    })
                    my.alert({
                      title: '提示',
                      content: '发品失败：服务器繁忙请联系客服人员',
                      buttonText: '关闭'
                    });
                  }
                });
              }
            });
          } else {
            console.log(resTplPro);
            this.data.newProduct = resTplPro.data;
            this.data.oldCategory = resTplPro.data.base.category_id;
            this.data.productSendTemp = resTplPro.data.base.pid;
            this.setData({
              nowTplInfo: resTplPro,//预览信息
              sale_ename: resTplPro.data.wholesale.sale_type,
              calculate_ename: resTplPro.data.wholesale.unit_type,
              price: this.data.mobanList[1].message[4].productPrice,//xiugai
              currency_ename: resTplPro.data.sourcing.fob_currency
            })
            if (this.data.sale_ename == 'normal') {
              this.setData({
                showBatchNumber: true
              })
            }
            if (resTplPro.msg = "获取成功") {
              my.hideLoading();
              my.showToast({
                content: "进入编辑待发布商品",
                icon: 'false',
                success: () => {
                  this.setData({
                    showMaskTap: false,
                    activeIndex: 3,
                  })
                  this.returnTop()
                }
              })
            } else {
              my.alert({
                title: '提示',
                content: '加载失败',
                buttonText: '确认',
                success: () => {
                }
              });
            }
            var leiXing = 'mobanList[' + 4 + '].leiXing';
            var leiXingi = [
              { id: 0, text: "直接下单品", selectedId: "wholesale", type: 'productType' },
              { id: 1, text: "非直接下单品", selectedId: "sourcing", type: 'productType' }
            ];
            var haveSku = 'mobanList[' + 6 + '].haveSku';
            var haveSkui = this.data.nowTplInfo.data.attr.have_sku;
            var noSku = 'mobanList[' + 5 + '].noSku';
            var noSkui = this.data.nowTplInfo.data.attr.no_sku;
            var discount = 'mobanList[' + 7 + '].discount';
            var discounti = this.data.nowTplInfo.data.discount;
            var productType = 'mobanList[' + 8 + '].productType';
            var productTypei = '';
            var subTitle = 'mobanList[' + 8 + '].subTitle';
            var custom = 'mobanList[' + 9 + '].custom'
            var subTitleZ = [];
            if (this.data.nowTplInfo.data.base.product_type == 'sourcing') {
              productTypei = this.data.nowTplInfo.data.sourcing;
              subTitleZ = this.data.subTitleZF
            } else if (this.data.nowTplInfo.data.base.product_type == 'wholesale') {
              productTypei = this.data.nowTplInfo.data.wholesale;
              subTitleZ = this.data.subTitleZ
            }
            //规格
            var nowHaveSku = []
            for (var i = 0; i < haveSkui.length; i++) {
              nowHaveSku.push(haveSkui[i])
              nowHaveSku[i].showSkuSubsetInput = true
              nowHaveSku[i].skuVal = haveSkui[i].value_name
              nowHaveSku[i].skuValId = haveSkui[i].value_id
              nowHaveSku[i].selectSkuSubsetEnname = haveSkui[i].value_name
              nowHaveSku[i].skuPrice = haveSkui[i].price
              nowHaveSku[i].skuQuantity = haveSkui[i].quantity
              nowHaveSku[i].customize_image_url = haveSkui[i].sku_custom_image.original
              nowHaveSku[i].skuImageHide = false
              if (haveSkui[i].value_id == '-1') {
                nowHaveSku[i].showSkuSubsetInput = false
              }
              if (nowHaveSku[i].customize_image_url != '') {
                nowHaveSku[i].skuImageHide = true
              }
              console.log(this.data.resTplSku)
              if (i < 2) {
                this.data.resTplSku.data.have_sku[i].subset.push({
                  zh_name: "自定义",
                  is_sku: 1,
                  en_name: "user-defined",
                  attribute_value_id: -1
                })
              }
            }
            //属性并且加入中文名称和input_type     this.data.resTplSku.data.no_sku     input_type     zh_name  
            var nowNoSku = []
            for (var i = 0; i < noSkui.length; i++) {
              for (let j = 0; j < this.data.resTplSku.data.no_sku.length; j++) {
                if (noSkui[i].attribute_id == this.data.resTplSku.data.no_sku[j].attribute_id) {
                  noSkui[i].zh_name = this.data.resTplSku.data.no_sku[j].zh_name;
                  noSkui[i].input_type = this.data.resTplSku.data.no_sku[j].input_type;
                  nowNoSku.push(noSkui[i])
                }
              }
            }
            //交易信息
            var nowDiscount = []
            for (var i = 0; i < discounti.length; i++) {
              nowDiscount.push(discounti[i])
            }
            //物流信息
            var nowProductType = []
            var subTitleEZ = [];//准备加入中文名称//根据产品类型展示相应的字段
            for (const key in productTypei) {
              nowProductType.push({
                key: key,
                value: productTypei[key]
              })
            }
            //给数组加入中文名称
            for (let i = 0; i < subTitleZ.length; i++) {
              for (let j = 0; j < nowProductType.length; j++) {
                if (i == j) {
                  subTitleEZ.push({
                    en_name: nowProductType[j].key,
                    zh_name: subTitleZ[i],
                    name_value: nowProductType[j].value
                  })
                }
              }
            }

            console.log(nowProductType, '1234');
            //给数组排序
            for (let k = 0, tempobj = ''; k < subTitleEZ.length - 1; k++) {
              for (let s = 0; s < subTitleEZ.length - k - 1; s++) {
                console.log(subTitleEZ[s].en_name.substring(0, 1), '4');
                let temp = subTitleEZ[s].en_name.substring(0, 1);
                let temp1 = subTitleEZ[s + 1].en_name.substring(0, 1);
                if (temp[0] < temp1[0]) {
                  tempobj = subTitleEZ[s]
                  subTitleEZ[s] = subTitleEZ[s + 1]
                  subTitleEZ[s + 1] = tempobj
                }
              }
            }
            console.log(subTitleEZ);

            //点击显示相应的选项
            // console.log(this.data.resTplSku);
            var resTplSku = this.data.resTplSku;
            let datas = resTplSku.data.no_sku;
            let dataArry = resTplSku.data.have_sku;
            // const headstream = this.data.headstream;
            // for (const iterator of datas) {
            //   if (iterator.en_name == 'Place of Origin') {
            //     iterator.subset = headstream
            //   }
            // }
            // const noSku1 = noSkui;
            // let attr = { ...this.data.projectAttr };
            // for (let i = 0; i < datas.length; i++) {
            //   for (let j = 0; j < noSku1.length; j++) {
            //     if (noSku1[j].attribute_name == datas[i].en_name) {
            //       if (datas[i].input_type == 'multi_select') {
            //         let key = datas[i].en_name
            //         let value = noSku1[j].value_name
            //         if (attr[key] == undefined) {
            //           attr[key] = [value]
            //         } else {
            //           attr[key].push(value)
            //         }
            //       } else {
            //         let key = datas[i].en_name
            //         let value = noSku1[j].value_name
            //         attr[key] = value
            //       }
            //     }
            //   }
            // }
            // console.log(attr);
            //获取运费模板列表
            var requestTplShipping = {
              'path': 'index.php',
              'method': 'POST',
              'body': {
                "api": "/api/common/ali.ship",
                "method": "GET",
                "token": app.globalData.token,
                "data": {
                  "id": -1,
                }
              },
              'exts': { "timeout": 100000 }
            };
            const resTplShipping = await cloud.application.httpRequest(requestTplShipping)
            console.log(resTplShipping)
            var shippingTpl = []
            for (const key in resTplShipping.data) {
              shippingTpl.push({
                id: key,
                text: resTplShipping.data[key],
                selectedId: key,
                type: 'shippingTpl'
              })
            }
            //关键词
            //图片
            this.setData({
              images: []
            })
            let images = this.data.images;
            console.log(this.data.images);

            for (let i = 0; i < this.data.nowTplInfo.data.image.image_list.length; i++) {
              let str = this.data.nowTplInfo.data.image.image_list[i].original
              //获取“?”的下标
              let index = str.indexOf("?");
              //index是“?”的下标，index + 1就是“?”后一位数字（id的值就是10）
              let original = str.substring(0, index);
              images.push({
                url: original,
                image_id: this.data.nowTplInfo.data.image.image_id,
              })
            }
            //
            if (this.data.nowTplInfo.data.attr.have_sku.length == 0) {
              let i = []
              for (let u = 0; u < this.data.resTplSku.data.have_sku.length; u++) {
                i.push({
                  attribute_id: this.data.resTplSku.data.have_sku[u].attribute_id,
                  attribute_name: this.data.resTplSku.data.have_sku[u].en_name,
                  price: '',
                  quantity: '',
                  sku_custom_image_url: '',
                  customize_image_url: '',
                  customize_image: '',
                  showSkuSubsetInput: true,
                  subset: this.data.resTplSku.data.have_sku[u].subset,
                  skuImageHide: false,
                  value_id: '',
                  value_name: '',
                })
                this.data.nowTplInfo.data.attr.have_sku[u] = i[u]
              }
              for (let y = 0; y < this.data.nowTplInfo.data.attr.have_sku.length; y++) {
                this.data.nowTplInfo.data.attr.have_sku[y].subset.push({
                  zh_name: "自定义",
                  is_sku: 1,
                  en_name: "user-defined",
                  attribute_value_id: -1
                })
              }
              nowHaveSku = this.data.nowTplInfo.data.attr.have_sku
            } else {
              for (let i = 0; i < this.data.nowTplInfo.data.attr.have_sku.length; i++) {
                for (let j = 0; j < this.data.resTplSku.data.have_sku.length; j++) {
                  if (this.data.nowTplInfo.data.attr.have_sku[i].attribute_name == this.data.resTplSku.data.have_sku[j].en_name) {
                    this.data.nowTplInfo.data.attr.have_sku[i].subset = this.data.resTplSku.data.have_sku[j].subset
                    // this.data.nowTplInfo.data.attr.have_sku[i].attribute_id = this.data.resTplSku.data.have_sku[i].attribute_id
                    // this.data.nowTplInfo.data.attr.have_sku[i].attribute_name = this.data.resTplSku.data.have_sku[i].en_name
                  }
                }
              }
            }

            this.setData({
              [custom]: this.data.nowTplInfo.data.custom,
              shippingTplObj: resTplShipping.data,
              shippingTpl: shippingTpl,
              list: datas,
              standards: dataArry,
              projectAttr: attr,
              [leiXing]: leiXingi,
              [haveSku]: nowHaveSku,
              [noSku]: nowNoSku,
              [discount]: nowDiscount,
              [productType]: nowProductType,
              [subTitle]: subTitleEZ,
              proType: productTypei,
              images: images,
              haveSkuSubSet: this.data.nowTplInfo.data.attr.have_sku,
              //默认赋值
              tplNoSku: this.data.resTplSku.data.no_sku,
              useTplNoSku: this.data.nowTplInfo.data.attr.no_sku
            });
            // 产品属性开始
            const headstream = this.data.headstream;
            const tplNoSku = this.data.tplNoSku
            for (const iterator of tplNoSku) {
              if (iterator.en_name == 'Place of Origin') {
                iterator.subset = headstream
              }
            }
            this.setData({
              tplNoSku: tplNoSku
            })
            let useTplNoSkuDefault = []
            for (let i = 0; i < this.data.useTplNoSku.length; i++) {
              for (let j = 0; j < this.data.tplNoSku.length; j++) {
                if (this.data.useTplNoSku[i].attribute_name == this.data.tplNoSku[j].en_name) {
                  useTplNoSkuDefault.push(this.data.tplNoSku[j])
                }

              }
            }
            this.funUse(useTplNoSkuDefault)
            //   // 产品属性赋值开始   
            let attr = { ...this.data.projectAttr };
            for (let index = 0; index < this.data.useTplNoSkuDefault.length; index++) {
              if (this.data.useTplNoSkuDefault[index].input_type == 'multi_select') {
                let key = this.data.useTplNoSkuDefault[index].en_name
                attr[key] = []
              } else {
                let key = this.data.useTplNoSkuDefault[index].en_name
                let value = {
                  attribute_id: this.data.useTplNoSkuDefault[index].attribute_id,
                  attribute_name: this.data.useTplNoSkuDefault[index].en_name,
                  value_id: '-1',
                  value_name: '',
                  sku_custom_image_url: '',
                  sku_custom_value_name: ''
                }
                attr[key] = value
              }
            }
            this.setData({
              projectAttr: attr,
            })
            // 产品属性赋值结束D
            // 产品属性默认值赋值开始
            const noSkuDefault = this.data.useTplNoSku;
            let attrDefault = { ...this.data.projectAttr };
            for (const key in this.data.projectAttr) {
              for (let index = 0; index < noSkuDefault.length; index++) {
                if (noSkuDefault[index].attribute_name == key) {
                  if (Array.isArray(this.data.projectAttr[key])) {

                    if (noSkuDefault[index].value_id != "") {
                      let keyName = noSkuDefault[index].attribute_name
                      let value = {
                        attribute_name: noSkuDefault[index].attribute_name,
                        attribute_id: noSkuDefault[index].attribute_id,
                        value_name: noSkuDefault[index].value_name,
                        value_id: noSkuDefault[index].value_id,
                        sku_custom_image_url: '',
                        sku_custom_value_name: ''
                      }
                      attrDefault[keyName].push(value)
                    }
                  } else {
                    let keyName = noSkuDefault[index].attribute_name
                    let value = {
                      attribute_name: this.data.projectAttr[key].attribute_name,
                      attribute_id: this.data.projectAttr[key].attribute_id,
                      value_name: noSkuDefault[index].value_name,
                      value_id: noSkuDefault[index].value_id,
                      sku_custom_image_url: '',
                      sku_custom_value_name: ''
                    }
                    attrDefault[keyName] = value
                  }
                } else {
                }
              }
            }
            this.setData({
              projectAttr: attrDefault
            })
            // 产品属性默认值赋值结束
            // 产品属性结束

            console.log(this.data.useTplNoSkuDefault, '555555');
            console.log(productTypei);
            console.log(nowHaveSku)
            console.log(this.data.haveSkuSubSet);
            console.log(this.data.resTplSku.data.have_sku);


            //设置尺寸默认
            var pageS = this.data.mobanList[8].subTitle;
            var pageSize = ''
            var wei = ''
            for (let i = 0; i < pageS.length; i++) {
              if (pageS[i].en_name == "package_size") {
                pageSize = pageS[i].name_value
              }
              // if (pageS[i].en_name == "weight") {
              //   wei = pageS[i].name_value
              // }
            }
            var ss = pageSize.split("X")
            console.log(ss);
            this.setData({
              long: ss[0],
              width: ss[1],
              height: ss[2],
            })
            //付款方式默认值
            let payment = this.data.nowTplInfo.data.sourcing.payment_methods
            this.setData({
              payment_ename: payment,
            })
          }
        }
      }
    } else if (this.data.activeIndex == 1) {
      if (this.data.tempFiles == '') {
        my.alert({
          title: '提示',
          content: '请选择图片',
          buttonText: '确认',
          success: () => {
            this.onTopBtnTap();
          }
        });
      } else {
        let groupNow = app.globalData.group;
        let img = app.globalData.images;
        console.log(img)
        this.setData({
          chooseImageType: app.globalData.chooseImageType
        })
        console.log(this.data.chooseImageType)
        if (this.data.chooseImageType == 'imageBank') {
          let image = []
          for (let i = 0; i < img.length; i++) {
            if (img[i].image_url == undefined) {
              image.push({ image_url: img[i] })
            } else {
              image.push(img[i])
            }
          }
          img = image
        }
        console.log(img)
        var groupList = [];
        for (var i = 0; i < groupNow.length; i++) {
          var obj = {
            id: i,
            text: groupNow[i].group_name,
            selectedId: groupNow[i].group_id,
            type: 'group'
          };
          groupList.push(obj)
        }
        let group = 'mobanList[' + 1 + '].message[' + 3 + '].group';
        this.setData({
          activeIndex: this.data.activeIndex + 1,
          [group]: groupList,
          images: img,
          num: img.length,
          chooseImageType: 'noImaeg'
        });
        app.globalData.chooseImageType = 'noImage'
      }
    }
  },
  //
  funUse(useTplNoSkuDefault) {
    let newsArr = [];
    for (let i = 0; i < useTplNoSkuDefault.length; i++) {
      if (newsArr.indexOf(useTplNoSkuDefault[i]) === -1) {
        newsArr.push(useTplNoSkuDefault[i]);
      }
    }
    this.setData({
      useTplNoSkuDefault: newsArr
    })
  },
  // 产品属性传值
  selectDanxuan(e) {
    const key = this.data.useTplNoSkuDefault[this.data.idx].en_name;
    const value_name = e.target.dataset.enName;
    const value_id = e.target.dataset.value_id + ''
    let attr = { ...this.data.projectAttr };
    // 产品属性多选变色开始
    let new_en_name = []
    new_en_name = this.data.new_en_name
    new_en_name = new_en_name.filter(item => item !== value_name)
    // 产品属性多选变色结束
    if (this.data.useTplNoSkuDefault[this.data.idx].input_type === "single_select") {
      attr[key].value_id = value_id
      attr[key].value_name = value_name
    } else {
      if (attr[key].length != 0) {
        if (attr[key].map(item => item.value_id).includes(value_id)) {
          attr[key] = attr[key].filter(item => item.value_id != value_id)
        } else {
          attr[key].push({
            attribute_id: this.data.useTplNoSkuDefault[this.data.idx].attribute_id,
            attribute_name: this.data.useTplNoSkuDefault[this.data.idx].en_name,
            value_id: value_id,
            value_name: value_name,
            sku_custom_image_url: '',
            sku_custom_value_name: ''
          });
          new_en_name.push(value_name)
        }
      }
      else {
        attr[key] = [{
          attribute_id: this.data.useTplNoSkuDefault[this.data.idx].attribute_id,
          attribute_name: this.data.useTplNoSkuDefault[this.data.idx].en_name,
          value_id: value_id,
          value_name: value_name,
          sku_custom_image_url: '',
          sku_custom_value_name: ''
        }]
        new_en_name.push(value_name)
      }


    }
    this.setData({
      projectAttr: attr,
      new_en_name: new_en_name
    })
  },
  async onLoad(e) {
    app.globalData.images = []
    if (e.mobanId != undefined) {
      const mobanId = e.mobanId
      this.setData({
        mobanId: mobanId
      })
      this.imageId = []
      this.getPublishTplList()
      this.getPublishTemplateList()
    } else {
      this.imageId = []
      this.getPublishTplList();
      this.getPublishTemplateList();
      if (e.images != undefined) {
        this.data.images = JSON.parse(e.images);
        this.data.num = e.num
      } else if (app.globalData.activeIndex == 2) {
        let images = []
        for (let i = 0; i < app.globalData.images.length; i++) {
          if (app.globalData.images[i] != undefined) {
            images.push({ image_url: app.globalData.images[i] })
          }
        }
        console.log("进入拍照发品第二步图片上传")
        console.log(app.globalData.images)
        this.setData({
          activeIndex: app.globalData.activeIndex,
          images: images,
          num: images.length,
        })
        //app.globalData.images = this.data.images
        //根据当前images的长度显示和隐藏添加图片按钮
        if (this.data.images.length == 6) {
          this.setData({
            isShowImg: true
          })
        } else {
          this.setData({
            isShowImg: false
          })
        }
        this.setData({
          activeIndex: 1
        })
      } else if (app.globalData.activeIndex == 1) {
        var images = []
        for (var i = 0; i < app.globalData.images.length; i++) {
          if (app.globalData.images[i] != undefined) {
            images.push(app.globalData.images[i])
          }
        }
        console.log("进入拍照发品第一步图片上传")
        console.log(images)
        this.setData({
          tempFiles: images[0],
          activeIndex: app.globalData.activeIndex
        })
      } else if (app.globalData.activeIndex == 3) {
        //待编辑
        this.setData({
          activeIndex: app.globalData.activeIndex,
          productInfo: app.globalData.productInfo
        })
      }
    }
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
              cm: 6,
              cm1: 20,
              cmTOP: -2,
              cmTOP1: 0,
              mTop: 0,
              heightAr: 140
            })
          }
        }
      }
    })
  },
  //上一步
  preStep() {
    if (this.data.activeIndex == 1) {
      my.switchTab({
        url: '../product/product',
        success: () => {
          my.showToast({
            content: '成功',
            type: 'success',
            duration: 2000
          });
          this.setData({
            activeIndex: 1,
          });
        }
      });
    } else {
      this.setData({
        activeIndex: this.data.activeIndex - 1,
        disabled: true
      });
    }
  },
  // 调取照片
  chooseImage(e) {
    console.log('首页相机被调用');
    let checkoutArray = []
    this.setData({
      checkoutArray: checkoutArray,
      showBottom: false,
      showSize: false,
      showPx: false,
      chooseImageType: e.target.dataset.type
    })
    app.globalData.chooseImageType = e.target.dataset.type
    my.chooseImage({
      sourceType: [e.target.dataset.type],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: (res) => {
        my.getImageInfo({
          src: res.apFilePaths[0],
          success: (res1) => {
            const type = res1.type
            const imgWidth = res1.width
            const imgHeight = res1.height
            const widthHeight = imgWidth / imgHeight
            const heightWidth = imgHeight / imgWidth
            if (type == 'jpeg' || type == 'jpg' || type == 'png') {
              this.getImageBase64(res.apFilePaths[0]).then((result) => {
                console.log(result);
                let str = result.substring(22);
                var equalIndex = str.indexOf('=');
                if (str.indexOf('=') > 0) {
                  str = str.substring(0, equalIndex);
                }
                let strLength = str.length
                var fileLength = parseInt(strLength - (strLength / 8) * 2) / 1024 / 1024;
                console.log(fileLength);
                if (fileLength < 5) {
                  my.showLoading({
                    content: '正在上传图片...',
                  })
                  let img = 'images[' + 0 + ']'
                  this.setData({
                    tempFiles: res.apFilePaths[0],
                    [img]: res.apFilePaths[0],
                  })
                  app.globalData.images = []
                  app.globalData.images.push({ image_url: this.data.tempFiles })
                  app.globalData.imageNum = app.globalData.images.length
                  console.log(app.globalData.imageNum);
                  // 图片像素和尺寸校验开始
                  if ((widthHeight >= 0.75 && widthHeight <= 1.3) || (heightWidth >= 0.75 && heightWidth <= 1.3)) {
                    if (imgWidth > 350 && imgHeight > 350) {
                      this.getAppImageUpload(res.apFilePaths[0], result);
                    } else {
                      let checkoutArray = this.data.checkoutArray
                      checkoutArray.push({
                        url: res.apFilePaths[0],
                        code: 'pxError'
                      })
                      this.setData({
                        checkoutArray: checkoutArray,
                        showPx: true
                      })
                      this.getAppImageUpload(res.apFilePaths[0], result);
                    }
                  } else {
                    let checkoutArray = this.data.checkoutArray
                    checkoutArray.push({
                      url: res.apFilePaths[0],
                      code: 'sizeError'
                    })
                    this.setData({
                      checkoutArray: checkoutArray,
                      showSize: true
                    })
                    this.getAppImageUpload(res.apFilePaths[0], result);
                  }
                  // 图片像素和尺寸校验结束
                } else {
                  my.showToast({
                    content: '图片大小不能大于5M',
                    success: (res) => {
                      this.setData({
                        tempFiles: []
                      })
                    }
                  })
                }
              }).catch((e) => {
                console.log(e);
              })

            } else {
              my.showToast({
                content: '产品图片格式不符合要求',
                duration: 3000,
                success: () => {
                  this.setData({
                    showMaskTap: false,
                    tempFiles: ''
                  })
                }
              })
            }
          }
        })
      },
      fail: () => {
        my.showToast({
          content: '已取消操作',
        });
        this.setData({
          showBottom: true
        })
      },
    })
  },
  getImageBase64(path) {
    return new Promise((resolve, reject) => {
      let fs = my.getFileSystemManager();
      fs.readFile({
        filePath: path,
        encoding: "base64",
        success: (res) => {
          let suffix = path.substring(path.lastIndexOf(".") + 1, path.length);
          console.log(suffix);
          let headsuffix = "data:image/jpeg;base64,";
          if (suffix == 'png') {
            headsuffix = "data:image/png;base64,";
          }
          resolve(headsuffix + res.data);
        },
        fail: (res) => {
          reject('文件转化出错');
        }
      });
    });
  },
  //根据图片URL获取图片Base64
  async getBase64ForUrl(url) {
    console.log(url);
    if (this.data.activeIndex == 1) {
      let checkoutArray = []
      this.setData({
        checkoutArray: checkoutArray,
        showPx: false,
        showSize: false,
        showMaskTap: true,
      })
    }
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/imageBank.getImgBase64",
          "method": "POST",
          "token": app.globalData.token,
          "data": {
            "url": url
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result);
      if (JSON.stringify(result) != '{}') {

      } else {
        if (this.data.activeIndex == 1) {
          my.getImageInfo({
            src: url,
            success: (res1) => {
              const imgWidth = res1.width
              const imgHeight = res1.height
              const widthHeight = imgWidth / imgHeight
              const heightWidth = imgHeight / imgWidth
              // 图片尺寸和大小校验开始
              if (imgWidth > 350 && imgHeight > 350) {
                if ((widthHeight >= 0.76 && widthHeight <= 1) || (heightWidth >= 0.76 && heightWidth <= 1)) {
                  my.hideToast();
                  my.showLoading({
                    content: '正在上传图片',
                  })
                  this.uploadImageFromUrl(url)
                } else {
                  let checkoutArray = this.data.checkoutArray
                  checkoutArray.push({
                    url: url,
                    code: 'sizeError'
                  })
                  this.setData({
                    checkoutArray: checkoutArray,
                    showSize: true
                  })
                  my.hideToast();
                  my.showLoading({
                    content: '正在上传图片',
                  })
                  this.uploadImageFromUrl(url)
                }
              } else {
                let checkoutArray = this.data.checkoutArray
                checkoutArray.push({
                  url: url,
                  code: 'pxError'
                })
                this.setData({
                  checkoutArray: checkoutArray,
                  showSize: true
                })
                my.hideToast();
                my.showLoading({
                  content: '正在上传图片',
                })
                this.uploadImageFromUrl(url)
              }
              // 图片尺寸和大小校验结束
            }
          })
        } else {
          my.getImageInfo({
            src: url,
            success: (res1) => {
              const imgWidth = res1.width
              const imgHeight = res1.height
              const widthHeight = imgWidth / imgHeight
              const heightWidth = imgHeight / imgWidth
              // 图片尺寸和大小校验开始
              if (imgWidth > 350 && imgHeight > 350) {
                if ((widthHeight >= 0.76 && widthHeight <= 1) || (heightWidth >= 0.76 && heightWidth <= 1)) {
                  my.hideToast();
                  my.showLoading({
                    content: '正在上传图片',
                  })
                  this.uploadImageFromUrl(url)
                } else {
                  let checkoutArray = this.data.checkoutArray
                  checkoutArray.push({
                    url: url,
                    code: 'sizeError'
                  })
                  this.setData({
                    checkoutArray: checkoutArray,
                    showSize: true
                  })
                  my.hideToast();
                  my.showLoading({
                    content: '正在上传图片',
                  })
                  this.uploadImageFromUrl(url)
                }
              } else {
                let checkoutArray = this.data.checkoutArray
                checkoutArray.push({
                  url: url,
                  code: 'pxError'
                })
                this.setData({
                  checkoutArray: checkoutArray,
                  showSize: true
                })
                my.hideToast();
                my.showLoading({
                  content: '正在上传图片',
                })
                this.uploadImageFromUrl(url)
              }
              // 图片尺寸和大小校验结束
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
      my.showToast({
        content: '文件转化出错',
        duration: 2000,
        success: () => {
          let images = this.data.images
          console.log(images);
          let im = []
          for (let i = 0; i < images.length; i++) {
            if (images[i].image_url != url) {
              im.push(images[i])
            }
          }
          this.setData({
            images: im
          })
        }
      })
    }
  },
  //上传图片Url
  async uploadImageFromUrl(url) {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/common/uploadImageFromUrl",
          "method": "POST",
          "token": app.globalData.token,
          "data": {
            "url": url
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result)
      this.setData({
        imageAllInfo: result.data,
        imageId: result.data.image_id
      })
      console.log(parseInt(this.data.imageId))
      if (this.data.chooseImageType == 'imageBank' && this.data.imageId != undefined) {
        this.data.activeIndex = app.globalData.activeIndex
        switch (this.data.activeIndex) {
          case 1: app.globalData.imageId = [this.data.imageId]
            break;
          case 2: app.globalData.imageId = app.globalData.imageId.concat([this.data.imageId])
            break;
          default: console.log('未执行操作');
            break;
        }
        this.imageId = app.globalData.imageId
        app.globalData.imageId = this.imageId
      } else if (this.data.imageId != undefined) {
        this.data.activeIndex = app.globalData.activeIndex
        switch (this.data.activeIndex) {
          case 1: app.globalData.imageId = [this.data.imageId]
            break;
          case 2: app.globalData.imageId = app.globalData.imageId.concat([this.data.imageId])
            break;
          default: console.log('未执行操作');
            break;
        }
        this.imageId = app.globalData.imageId
      }
      let newImageIdDel = []
      for (let i = 0; i < this.imageId.length; i++) {
        if (this.imageId[i] != '' && this.imageId[i] != undefined) {
          newImageIdDel.push(this.imageId[i])
        }
      }
      console.log(newImageIdDel);
      if (newImageIdDel.length == 6) {
        this.setData({
          isShowImg: true
        })
      }
      if (this.data.imageId != '') {
        my.hideLoading()
        //上传图片成功
        my.showToast({
          content: '图片上传成功',
          icon: 'false',
          duration: 2000,
          success: () => {
            this.setData({
              showMaskTap: false
            })
          }
        })
        this.setData({
          disabled1: false
        })
      }
    } catch (e) {
      console.log(JSON.stringify(e));
      let newE = JSON.stringify(e).split(',')
      console.log(newE);
      if (e.image_id == undefined) {
        my.hideLoading()
        my.showToast({
          content: '图片上传失败',
          duration: 2000,
          success: () => {
            this.setData({
              showMaskTap: false
            })
          }
        })
        let imG = this.data.images
        let imGp = []
        if (this.data.activeIndex == 1) {
          this.setData({
            checkoutArray: [],
            tempFiles: ''
          })
        } else if (this.data.activeIndex == 2) {
          let checkoutArrayMiddle = []
          for (let index = 0; index < this.data.checkoutArray.length; index++) {
            if (this.data.checkoutArray[index].url != url) {
              checkoutArrayMiddle.push(this.data.checkoutArray[index])
            }
          }
          console.log(imG, '当前未删减数组');
          for (let i = 0; i < imG.length; i++) {
            console.log(i, '次数');
            if (imG[i].image_url != url) {
              imGp.push(imG[i]);
            }
          }
          this.setData({
            checkoutArray: checkoutArrayMiddle,
            images: imGp,
            num: imGp.length,
          });
          console.log(this.data.images, '删减后数组');
          app.globalData.images = imGp;
          console.log(app.globalData.images);
        }
      }
    }
  },
  //上传图片
  async getAppImageUpload(url, image) {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/common/upload64",
          "method": "POST",
          "token": app.globalData.token,
          "data": {
            "img": image
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result)
      this.setData({
        imageAllInfo: result.data,
        imageId: result.data.image_id
      })
      console.log(parseInt(this.data.imageId))
      if (this.data.chooseImageType == 'imageBank' && this.data.imageId != undefined) {
        this.imageId[this.imageId.length] = this.data.imageId
        app.globalData.imageId = this.imageId
      } else if (this.data.imageId != undefined) {
        this.data.activeIndex = app.globalData.activeIndex
        switch (this.data.activeIndex) {
          case 1: app.globalData.imageId = [this.data.imageId]
            break;
          case 2: app.globalData.imageId = app.globalData.imageId.concat([this.data.imageId])
            break;
          default: console.log('未执行操作');
            break;
        }
        this.imageId = app.globalData.imageId
      }
      let newImageIdDel = []
      for (let i = 0; i < this.imageId.length; i++) {
        if (this.imageId[i] != '' && this.imageId[i] != undefined) {
          newImageIdDel.push(this.imageId[i])
        }
      }
      console.log(newImageIdDel);
      if (newImageIdDel.length == 6) {
        this.setData({
          isShowImg: true
        })
      }
      if (this.data.imageId != '') {
        my.hideLoading()
        //上传图片成功
        my.showToast({
          content: '图片上传成功',
          icon: 'false',
          duration: 2000,
          success: () => {
            // if (this.data.images.length == this.imageId.length) {
            this.setData({
              showMaskTap: false
            })
            // }
          }
        })
        this.setData({
          disabled1: false
        })
      }
    } catch (e) {
      console.log(url, '失败的url');
      console.log(this.urlFail, '当前选择的url数组');
      console.log(JSON.stringify(e));
      let newE = JSON.stringify(e).split(',')
      console.log(newE);
      if (e.image_id == undefined) {
        my.hideLoading()
        my.showToast({
          content: '图片上传失败',
          duration: 2000,
          success: () => {
            this.setData({
              showMaskTap: false
            })
          }
        })
        let imG = this.data.images
        let imGp = []
        if (this.data.activeIndex == 1) {
          this.setData({
            checkoutArray: [],
            tempFiles: '',
            images: []
          })
          app.globalData.images = []
        } else if (this.data.activeIndex == 2) {
          let checkoutArrayMiddle = []
          console.log(imG, '当前未删减数组');
          for (let i = 0; i < imG.length; i++) {
            console.log(i, '次数');
            if (imG[i].image_url != url) {
              imGp.push(imG[i]);
            }
          }

          for (let index = 0; index < this.data.checkoutArray.length; index++) {

            if (this.data.checkoutArray[index].url != url) {
              checkoutArrayMiddle.push(this.data.checkoutArray[index])
            }

          }

          this.setData({
            checkoutArray: checkoutArrayMiddle,
            images: imGp,
            num: imGp.length,
          });
          console.log(this.data.images, '删减后数组');
          app.globalData.images = imGp;
          console.log(app.globalData.images);
        }
      }
    }
  },
  //多张本地和相机图片校验
  finallySubmit(image, submitImage) {
    console.log(image);
    var im2 = []
    let that = this
    for (const i in submitImage) {
      (function (i) {
        setTimeout(function () {
          im2.push({ image_url: submitImage[i] })
          that.getImageBase64(submitImage[i]).then((result) => {
            my.showLoading({
              content: '正在上传图片...',
            })
            console.log(result);
            that.setData({
              imageIndex: parseInt(i)
            })
            image = image.concat([{ image_url: submitImage[i] }])
            that.setData({
              images: image,
              num: image.length
            })
            app.globalData.images = that.data.images
            that.getAppImageUpload(submitImage[i], result)
          })
          if (submitImage.length == 6) {
            that.setData({
              isShowImg: true
            })
          }
          if (i == submitImage.length) {
            that.setData({
              showMaskTap: false
            })
          }
          console.log(app.globalData.images, '当前传成功的图数组');
          if (that.data.images.length >= 6) {
            that.setData({
              isShowImg: true
            })
          }
        }, i * 1000);
      })(i)
    }
    console.log(that.data.images)
    app.globalData.imageNum = that.data.images.length
  },
  //拿出每个对象中的image_url
  syncGetUrlUpload(base64) {
    let images = this.data.images;
    console.log(images, '当前需要上传的所有图片');
    this.getAppImageUpload(images[0], base64);
    images.splice(0, 1)
    if (images.length > 0) {
      this.syncGetUrlUpload();
    }
  },
  //选择上传
  chooseImage1(e) {
    let that = this
    let submitImage = []
    that.setData({
      showBottom1: false,
      chooseImageType: e.target.dataset.type
    })
    app.globalData.chooseImageType = e.target.dataset.type
    var image = that.data.images
    var count = 0
    switch (e.target.dataset.type) {
      case 'camera':
        count = 1
        break;
      case 'album':
        count = 6 - image.length
        break;
      default: console.log('不执行操作');
        break;
    }
    my.chooseImage({
      sourceType: [e.target.dataset.type],
      sizeType: ['original', 'compressed'],
      count: count,
      success: (res) => {
        this.setData({
          showMaskTap: true,
        })
        //start
        for (let index = 0; index < res.apFilePaths.length; index++) {
          (function (index) {
            setTimeout(function () {
              my.getImageInfo({
                src: res.apFilePaths[index],
                success: (res1) => {
                  const type = res1.type
                  const imgWidth = res1.width
                  const imgHeight = res1.height
                  const widthHeight = imgWidth / imgHeight
                  const heightWidth = imgHeight / imgWidth
                  // 图片格式和大小校验开始
                  console.log(type, '图片类型');
                  if (type == 'jpeg' || type == 'jpg' || type == 'png') {
                    that.getImageBase64(res1.path).then((result) => {
                      let str = result.substring(22);
                      var equalIndex = str.indexOf('=');
                      if (str.indexOf('=') > 0) {
                        str = str.substring(0, equalIndex);
                      }
                      let strLength = str.length
                      var fileLength = parseInt(strLength - (strLength / 8) * 2) / 1024 / 1024;
                      console.log(fileLength, '图片大小');
                      if (fileLength < 5) {
                        // 图片像素和尺寸校验开始
                        if ((widthHeight >= 0.75 && widthHeight <= 1.3) || (heightWidth >= 0.75 && heightWidth <= 1.3)) {
                          if (imgWidth > 350 && imgHeight > 350) {
                            submitImage.push(res1.path)
                            if (index + 1 == res.apFilePaths.length) {
                              that.finallySubmit(image, submitImage)
                            }
                          } else {
                            let checkoutArray = that.data.checkoutArray
                            checkoutArray.push({
                              url: res1.path,
                              code: 'pxError'
                            })
                            that.setData({
                              checkoutArray: checkoutArray,
                            })
                            submitImage.push(res1.path)
                            if (index + 1 == res.apFilePaths.length) {
                              that.finallySubmit(image, submitImage)
                            }
                          }
                        } else {
                          let checkoutArray = that.data.checkoutArray
                          checkoutArray.push({
                            url: res1.path,
                            code: 'sizeError'
                          })
                          that.setData({
                            checkoutArray: checkoutArray,
                          })
                          submitImage.push(res1.path)
                          if (index + 1 == res.apFilePaths.length) {
                            that.finallySubmit(image, submitImage)
                          }
                        }
                        // 图片像素和尺寸校验结束
                      } else {
                        my.showToast({
                          content: '图片大小不能大于5M',
                          duration: 3000,
                        })
                        if (index + 1 == res.apFilePaths.length) {
                          that.finallySubmit(image, submitImage)
                        }
                      }
                    }).catch((e) => {
                      console.log(e);
                    })
                  } else {
                    console.log(that.data.checkoutArray, '错误提示');
                    my.showToast({
                      content: '产品图片格式不符合要求',
                      duration: 3000,
                    })
                    if (index + 1 == res.apFilePaths.length) {
                      that.finallySubmit(image, submitImage)
                    }
                  }
                  // 图片格式和大小校验结束  
                }
              })
            }, index * 1000);
          })(index)
        }
        // end
      },
      fail: () => {
        my.showToast({
          content: '已取消操作', // 文字内容
        });
        that.setData({
          showBottom1: true
        })
      }
    })

  },
  //移除图片
  delImage: function (e) {
    let url = e.target.dataset.url
    let checkoutArrayMiddle = []
    console.log(e)
    console.log(this.imageId, '去除前的Id');
    let imageNewId = []
    for (let index = 0; index < this.imageId.length; index++) {
      if (this.imageId[index] != '' && this.imageId[index] != undefined) {
        imageNewId.push(this.imageId[index])
      }
    }
    var image = this.data.images
    for (let index = 0; index < this.data.checkoutArray.length; index++) {

      if (this.data.checkoutArray[index].url != url) {
        checkoutArrayMiddle.push(this.data.checkoutArray[index])
      }

    }
    let im = []
    let imId = []
    console.log(e.target.dataset.index, '点击的下标');
    for (var i in image) {
      if (e.target.dataset.index != i) {
        im.push(image[i])
      }
    }
    console.log(imageNewId);

    for (let i = 0; i < imageNewId.length; i++) {
      if (e.target.dataset.index != i) {
        imId.push(imageNewId[i])
      }
    }
    this.imageId = imId
    console.log(imId);
    this.setData({
      checkoutArray: checkoutArrayMiddle,
      images: im,
      num: im.length
    })
    app.globalData.images = this.data.images
    app.globalData.imageId = imId
    if (im.length < 6) {
      this.setData({
        isShowImg: false
      })
    }
  },
  //切换类别
  qieHuanLeiBie: function () {
    my.alert({
      title: '切换类别',
      content: '跳转发布模板中的切换类别页面',
      buttonText: '确认'
    });
  },
  //调取发布模板页(新建)
  async newTem() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.tpl/" + 759,
          "method": "PUT",
          "token": app.globalData.token,
          "data": {
            "name": "dress", "categoryId": 100005791, "productType": "wholesale", "groupId": 824664610, "market": "main", "isSmartEdit": "false", "productCurrency": "USD", "image": { "image_number": 0, "watermark": 0, "watermark_frame": "0", "watermark_position": "bottom" }, "attributes": { "have_sku": [{ "attribute_id": 191288010, "attribute_name": "Color", "local_option": "color" }, { "attribute_id": 191288664, "attribute_name": "Size", "local_option": "size" }], "no_sku": [{ "attribute_id": 200000329, "attribute_name": "Pattern Type", "value_id": 30897142, "value_name": "Plaid" }, { "attribute_id": 200000363, "attribute_name": "Waistline", "value_id": 11257562, "value_name": "empire" }, { "attribute_id": 200000364, "attribute_name": "Neckline", "value_id": 14559359, "value_name": "Stand" }, { "attribute_id": 200000446, "attribute_name": "Dresses Length", "value_id": 1875812415, "value_name": "Maxi Standard" }, { "attribute_id": 210192633, "attribute_name": "Style", "value_id": 4386883, "value_name": "Socialite" }, { "attribute_id": 210194333, "attribute_name": "Silhouette", "value_id": 114381362, "value_name": "Bodycon" }, { "attribute_id": 210194507, "attribute_name": "Season", "value_id": 3254739, "value_name": "Winter" }, { "attribute_id": 210202006, "attribute_name": "Sleeve Length(cm)", "value_id": 46919371, "value_name": "Three Quarter" }, { "attribute_id": 210202532, "attribute_name": "Decoration", "value_id": 190063412, "value_name": "3D Pocket" }, { "attribute_id": 230797472, "attribute_name": "7 days sample order lead time", "value_id": 6212099, "value_name": "Support" }, { "attribute_id": 100007008, "attribute_name": "Supply Type", "value_id": 141387377, "value_name": "Odm" }, { "attribute_id": 100007705, "attribute_name": "Available Quantity", "value_id": "", "value_name": "100" }, { "attribute_id": 191284014, "attribute_name": "Material", "value_id": 16056245, "value_name": "Assorted" }, { "attribute_id": 100002012, "attribute_name": "Fabric Type", "value_id": 29414888, "value_name": "Taffeta" }, { "attribute_id": 191284169, "attribute_name": "Technics", "value_id": 450834911, "value_name": "YARN DYED" }, { "attribute_id": 100002013, "attribute_name": "Feature", "value_id": 100200906, "value_name": "Anti-Static" }, { "attribute_id": 1, "attribute_name": "Place of Origin", "value_id": 100000415, "value_name": "AF" }, { "attribute_id": 2, "attribute_name": "Brand Name", "value_id": "", "value_name": "chuanda" }, { "attribute_id": 3, "attribute_name": "Model Number", "value_id": "", "value_name": "111" }, { "attribute_id": 191284183, "attribute_name": "Sleeve Style", "value_id": 12368415, "value_name": "Strapless" }, { "attribute_id": 200000876, "attribute_name": "Fashion Element", "value_id": 109932653, "value_name": "Floral Print" }] }, "discount": [{ "start_quantity": "100", "price": "95" }, { "start_quantity": "500", "price": "90" }], "sourcing": { "fob_currency": "", "fob_unit_type": "", "payment_methods": [], "min_order_quantity": "", "min_order_unit_type": "", "supply_quantity": "", "supply_unit_type": "", "supply_period_type": "", "delivery_port": "", "delivery_time": "", "packaging_desc": "", "deliver_periods": [] }, "wholesale": { "unit_type": "Piece", "sale_type": "normal", "batch_number": 0, "package_size": "20X20X10", "min_order_quantity": 1, "shipping_line_template_id": "2003888279", "handling_time": 3, "deliver_periods": [{ "process_period": "3", "quantity": "100" }] }, "custom": [{ "min_order_quantity": "1000", "custom_type": "Customized logo" }, { "min_order_quantity": "1000", "custom_type": "Customized packaging" }, { "min_order_quantity": "1000", "custom_type": "Graphic customization" }]
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result);
      my.alert({
        title: '提示',
        content: result.msg,
        buttonText: '确认',
      });
    } catch (e) {

    }
    my.alert({
      title: '新建发布模板',
      content: '跳转发布模板添加页',
      buttonText: '确认'
    });
  },
  //picker(可能会去掉)
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
    });
  },
  onTopBtnTap() {
    if (this.data.activeIndex == 2) {
      console.log("nice")
      app.globalData.activeIndex = this.data.activeIndex
      app.globalData.imageNum = this.data.images.length
      app.globalData.images = this.data.images
      this.setData({
        showBottom1: true,
      });
    } else if (this.data.activeIndex == 1) {
      console.log("good")
      app.globalData.activeIndex = this.data.activeIndex
      app.globalData.imageNum = this.data.images.length
      app.globalData.images = []
      this.setData({
        showBottom: true,
      });
    }
  },
  onPopupClose(e) {
    try {
      let img = this.data.images
      console.log(img);
      let idTemp = img[e.target.dataset.index].image_id.split(',')
      this.haveSkuEdit[this.data.definedIdx] = idTemp[e.target.dataset.index]
      if (this.haveSkuEdit[this.data.definedIdx] != "") {
        this.setData({
          skuImage: img[e.target.dataset.index].url
        })
      }
      this.data.nowTplInfo.data.attr.have_sku[this.data.tempIndex].customize_image = this.haveSkuEdit[1]
      this.data.nowTplInfo.data.attr.have_sku[this.data.tempIndex].customize_image_url = this.data.skuImage
      this.data.nowTplInfo.data.attr.have_sku[this.data.tempIndex].skuImageHide = true
      console.log(this.data.nowTplInfo.data.attr.have_sku);
      this.setData({
        liu: false,
        ['mobanList[' + 6 + '].haveSku']: this.data.nowTplInfo.data.attr.have_sku
      })
    } catch (error) {
      console.log(error);
      this.setData({
        liu: false,
        skuImageHide: false
      })
    }
    if (this.data.activeIndex == 2) {
      this.setData({
        showBottom1: false,
      });
    } else if (this.data.activeIndex == 3) {
      this.setData({
        showTop1: false,
      });
    } else {
      this.setData({
        showBottom: false,
      });
    }
  },
  getImagePank(e) {
    console.log(e);
    this.setData({
      chooseImageType: e.target.dataset.type
    })
    app.globalData.activeIndex = e.target.dataset.activeIndex
    app.globalData.chooseImageType = e.target.dataset.type
    my.navigateTo({
      url: 'imagePank/imagePank',
      success: () => {
        this.setData({
          showBottom: false,
          showBottom1: false
        })
      },
      fail: () => {
        this.setData({
          showBottom: true,
          showBottom1: true
        })
      },
    });
    app.globalData.imgTempLength = this.data.images.length
    this.imageId[this.imageId.length] = e.target.dataset.imageId
    console.log(this.imageId)
  },
  //获取发布模板列表
  async getPublishTplList() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.tpl",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": 0,
            "limit": 100,
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result)
      var publishList = [];
      for (var i = 0; i < result.data.list.length; i++) {
        var obj = {
          id: i,
          text: result.data.list[i].name,
          selectedId: result.data.list[i].id,
          type: 'tpl'
        };
        publishList.push(obj)
      }
      if (publishList.length > 0 && parseInt(this.data.mobanId) > 0) {
        for (let i = 0; i < publishList.length; i++) {
          if (parseInt(this.data.mobanId) == publishList[i].selectedId) {
            this.setData({
              mobanName: publishList[i].text
            })
            console.log(this.data.mobanName);
          }
        }
        var tplId = parseInt(this.data.mobanId);
        this.setData({
          tplId: tplId
        })
        console.log(tplId)
        try {
          var requestTpl = {
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/publish.tpl/" + tplId,
              "method": "GET",
              "token": app.globalData.token,
              "data": {
                "id": tplId,
              }
            },
            'exts': { "timeout": 100000 }
          };
          const resTpl = await cloud.application.httpRequest(requestTpl)
          console.log(resTpl)
          var lei = 'mobanList[' + 1 + '].message[' + 0 + '].lei'
          this.setData({
            [lei]: resTpl.data.alibaba_category_zh_name_path,
            productType: resTpl.data.data.product_type,
            selected: 1,//组件选择标识，0为未选择
            tplDiscount: resTpl.data.data.discount,
          })
          console.log(this.data.mobanList[1].message[0].lei)
          console.log("传递id请求过来的发布模板详情")
          //根据传来的id查找规格
          var alibaba_category_id = resTpl.data.alibaba_category_id;
          console.log(alibaba_category_id)
          var requestTplSku = {
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/common/aliattribute/" + alibaba_category_id,
              "method": "GET",
              "token": app.globalData.token,
              "data": {
                "id": alibaba_category_id,
              }
            },
            'exts': { "timeout": 100000 }
          };
          const resTplSku = await cloud.application.httpRequest(requestTplSku)
          console.log(resTplSku);
          console.log(this.data.productType)
          this.setData({
            resTplSku: resTplSku
          })
        } catch (error) {
        }
      }
      var plt = 'mobanList[' + 0 + '].publishTplList';
      this.setData({
        [plt]: publishList
      })
    } catch (e) {
    }
  },
  //获取装修模板列表
  async getPublishTemplateList() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.template",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": 0,
            "memberId": 1
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result)
      var publishList = [];
      for (var i = 0; i < result.data.list.length; i++) {
        var obj = {
          id: i,
          text: result.data.list[i].template_title,
          selectedId: result.data.list[i].template_id,
          type: 'template'
        };
        publishList.push(obj)
      }
      var plt = 'mobanList[' + 3 + '].publishTemplateList';
      this.setData({
        [plt]: publishList,
        selectedTmp: result.data.list[0].template_id
      })
    } catch (e) {
    }
  },
  //绑定ref
  saveRef(ref) {
    this.counter = ref;
  },
  saveRefTpl(ref) {
    this.counter1 = ref;
  },
  saveRefTplName(ref) {
    this.counter2 = ref;
  },
  // 单选底部弹起确定
  define() {
    this.setData({
      showTop1: false,
      showTop_sale: false,
      showTop_measuring: false,
      showTop_f_measuring: false,
      showTop_indirect_calulate: false,
      showTop_currency: false,
      showTop_payment: false,
      showTop_Availability_cycle: false,
      showTop_measure_of_availability: false,
      i_showTop_measure_of_availability: false,
      showSkuSubset: false,
      showTop_i_measure_of_availability: false
    })
  },
  //动态添加元素
  createView(e) {
    console.log(e);
    if (e.target.dataset.type == '物流信息') {
      var creatView = []
      var updataView = []
      if (this.data.productType == 'wholesale') {
        creatView = this.data.mobanList[8].subTitle[e.target.dataset.index].name_value;
        updataView = 'mobanList[' + 8 + '].subTitle[' + e.target.dataset.index + '].name_value';
      } else if (this.data.productType == 'sourcing') {
        creatView = this.data.mobanList[8].subTitle[e.target.dataset.index].name_value;
        updataView = 'mobanList[' + 8 + '].subTitle[' + e.target.dataset.index + '].name_value';
      }
      creatView.push({
        quantity: '',
        process_period: ''
      })
      this.setData({
        [updataView]: creatView,
        shippingIndex: e.target.dataset.index
      })
      console.log(creatView);
      this.setData({
        ['mobanList[' + 8 + '].productType[' + e.target.dataset.index + '].value']: creatView,
      })
    } else if (e.target.dataset.type == '交易信息') {
      var creatView = []
      var updataView = []
      if (this.data.productType == 'wholesale') {
        creatView = this.data.mobanList[7].discount;
        updataView = 'mobanList[' + 7 + '].discount';
      } else if (this.data.productType == 'sourcing') {
        creatView = this.data.mobanList[7].discount;
        updataView = 'mobanList[' + 7 + '].discount';
      }
      creatView.push({
        quantity: '',
        process_period: ''
      })
      this.setData({
        [updataView]: creatView
      })
    } else if (e.target.dataset.type == '定制信息') {
      var creatView = []
      var updataView = []
      if (this.data.productType == 'wholesale') {
        creatView = this.data.mobanList[9].custom;
        updataView = 'mobanList[' + 9 + '].custom';
      } else if (this.data.productType == 'sourcing') {
        creatView = this.data.mobanList[9].custom;
        updataView = 'mobanList[' + 9 + '].custom';
      }
      creatView.push({
        min_order_quantity: '',
        custom_type: ''
      })
      this.setData({
        [updataView]: creatView
      })
    } else if (e.target.dataset.type == '产品规格') {
      var creatView = []
      var updataView = 'mobanList[' + 6 + '].haveSku';
      creatView.push({
        attr: '',//属性
        attr_val: '',//属性值（选项值）
        image_path: '0',//自定义图片
        price: '',//加价
        count: ''//数量
      })
      this.setData({
        [updataView]: creatView
      })
    }
  },
  synDingZhi(e) {
    this.temp[e.target.dataset.idx] = e.detail.value;
    console.log(this.temp);
    if (this.temp[0] != "" && this.temp[1] != "") {
      let i = []
      i.push({
        min_order_quantity: this.temp[0],
        custom_type: this.temp[1]
      })
      this.setData({
        ['nowTplInfo[data[custom[' + e.target.dataset.index + ']]]']: i[0]
      });
    }
    console.log(this.data.nowTplInfo.data.custom);
  },
  // synDingZhi(e) {//iamge---可能还存在问题
  //   this.temp[e.target.dataset.idx] = e.detail.value;
  //   console.log(this.temp);
  //   this.tempIndex[e.target.dataset.idx] = e.target.dataset.index
  //   console.log(this.tempIndex);
  //   if (this.tempIndex.length > 1) {
  //     for (let i = 0; i < this.tempIndex.length; i++) {
  //       if (this.tempIndex[i] != this.tempIndex[i + 1]) {
  //         this.tempIndex = []
  //         this.temp = []
  //       }
  //     }
  //   }
  //   console.log(this.tempIndex);
  //   if (this.temp[0] != undefined) {
  //     let i = []
  //     i.push({
  //       min_order_quantity: this.temp[0],
  //       custom_type: this.temp[1]
  //     })
  //     this.setData({
  //       ['nowTplInfo[data[custom[' + e.target.dataset.index + ']]]']: i[0]
  //     });
  //   }
  //   console.log(this.data.nowTplInfo.data.custom);
  // },
  //数据同步到数组
  syncSubset: function (e) {
    console.log(e);
    //e.target.dataset.index == 1
    var newSub = e.detail.value;
    var nowSub = '';
    if (this.data.productType == 'wholesale') {
      if (e.target.dataset.type == 'quantity') {
        nowSub = 'mobanList[' + 8 + '].subTitle[' + this.data.shippingIndex + '].name_value[' + e.target.dataset.index + '].quantity';
      } else if (e.target.dataset.type == 'process_period') {
        nowSub = 'mobanList[' + 8 + '].subTitle[' + this.data.shippingIndex + '].name_value[' + e.target.dataset.index + '].process_period';
      }
    } else if (this.data.productType == 'sourcing') {
      if (e.target.dataset.type == 'quantity') {
        nowSub = 'mobanList[' + 8 + '].subTitle[' + this.data.shippingIndex + '].name_value[' + e.target.dataset.index + '].quantity';
      } else if (e.target.dataset.type == 'process_period') {
        nowSub = 'mobanList[' + 8 + '].subTitle[' + this.data.shippingIndex + '].name_value[' + e.target.dataset.index + '].process_period';
      }
    }
    this.setData({
      [nowSub]: newSub,
    })
    switch (this.data.productType) {
      case 'wholesale': this.setData({ ['nowTplInfo[data[wholesale[deliver_periods]]]']: this.data.mobanList[8].subTitle[this.data.shippingIndex].name_value });
        break;
      case 'sourcing': this.setData({ ['nowTplInfo[data[sourcing[deliver_periods]]]']: this.data.mobanList[8].subTitle[this.data.shippingIndex].name_value });
        break;
      default:
        break;
    }
    console.log(this.tempTime);
    console.log(this.data.nowTplInfo.data);
  },
  editSalePrice(e) {
    console.log(e.detail.value);
    switch (e.target.dataset.type) {
      case 'start_quantity': this.tempPr[e.target.dataset.idx] = e.detail.value

        break;
      case 'price': this.tempPr[e.target.dataset.idx] = e.detail.value

        break;
      default:
        break;
    }
    console.log(this.tempPr);
    let pR = []
    pR.push({
      start_quantity: this.tempPr[0],
      price: this.tempPr[1]
    })
    if (this.tempPr[0] != '' && this.tempPr[1] != '') {
      this.setData({
        ['mobanList[7].discount[' + e.target.dataset.index + ']']: pR[0]
      })
    }
  },
  //删除动态添加的元素
  deleteSubset: function (e) {
    console.log(e.target.dataset.index);
    if (e.target.dataset.type == '物流信息') {
      var nowView = []
      var updataView = []
      if (this.data.productType == 'wholesale') {
        nowView = this.data.mobanList[8].subTitle[this.data.shippingIndex].name_value;
        updataView = 'mobanList[' + 8 + '].subTitle[' + this.data.shippingIndex + '].name_value';
      } else if (this.data.productType == 'sourcing') {
        nowView = this.data.mobanList[8].subTitle[this.data.shippingIndex].name_value;
        updataView = 'mobanList[' + 8 + '].subTitle[' + this.data.shippingIndex + '].name_value';
      }
      var newView = [];
      for (let i = 0; i < nowView.length; i++) {
        if (e.target.dataset.index != i) {
          newView.push(nowView[i]);
        }
      }
      this.setData({
        [updataView]: newView
      })
      console.log(this.data.mobanList[8].productType)
      this.setData({
        ['mobanList[' + 8 + '].productType[' + 1 + '].value']: newView,
      })
      this.setData({
        ['mobanList[' + 8 + '].productType[' + 6 + '].value']: this.data.mobanList[8].productType[1].value
      })
      if (this.data.productType == 'wholesale') {
        this.setData({
          ['nowTplInfo[data[wholesale[deliver_periods]]]']: newView
        })
      } else if (this.data.productType == 'sourcing') {
        this.setData({
          ['nowTplInfo[data[sourcing[deliver_periods]]]']: newView
        })
      }
    } else if (e.target.dataset.type == '交易信息') {
      var nowView = []
      var updataView = []
      if (this.data.productType == 'wholesale') {
        nowView = this.data.mobanList[7].discount;
        updataView = 'mobanList[' + 7 + '].discount';
      } else if (this.data.productType == 'sourcing') {
        nowView = this.data.mobanList[7].discount;
        updataView = 'mobanList[' + 7 + '].discount';
      }
      var newView = [];
      for (let i = 0; i < nowView.length; i++) {
        if (e.target.dataset.index != i) {
          newView.push(nowView[i]);
        }
      }
      this.setData({
        [updataView]: newView
      })
    } else if (e.target.dataset.type == '定制信息') {
      var nowView = []
      var updataView = []
      if (this.data.productType == 'wholesale') {
        nowView = this.data.mobanList[9].custom;
        updataView = 'mobanList[' + 9 + '].custom';
      } else if (this.data.productType == 'sourcing') {
        nowView = this.data.mobanList[9].custom;
        updataView = 'mobanList[' + 9 + '].custom';
      }
      var newView = [];
      for (let i = 0; i < nowView.length; i++) {
        if (e.target.dataset.index != i) {
          newView.push(nowView[i]);
        }
      }
      this.setData({
        [updataView]: newView,
        ['nowTplInfo[data[custom]]']: newView
      })
      console.log(this.data.nowTplInfo.data.custom);
    } else if (e.target.dataset.type == '产品规格') {
      var nowView = this.data.mobanList[6].haveSku;
      var updataView = 'mobanList[' + 6 + '].haveSku'
      var newView = [];
      for (let i = 0; i < nowView.length; i++) {
        if (e.target.dataset.index != i) {
          newView.push(nowView[i]);
        }
      }
      this.setData({
        [updataView]: newView
      })
    }
  },
  //每批数量及价格
  getBatchPrice(e) {
    let bpr = e.detail.value * this.data.price;
    if (this.data.tplDiscount.length > 0) {
      for (let p = 0; p < this.data.tplDiscount.length; p++) {
        this.data.mobanList[7].discount[p].price = parseInt(this.data.tplDiscount[p].price) * bpr / 100;
        this.data.nowTplInfo.data.discount[p].price = parseInt(this.data.tplDiscount[p].price) * bpr / 100;
        this.data.mobanList[7].discount[p].start_quantity = parseInt(this.data.tplDiscount[p].start_quantity);
        this.data.nowTplInfo.data.discount[p].start_quantity = parseInt(this.data.tplDiscount[p].start_quantity);
      }
      let salePrice = 'nowTplInfo[data[discount]]'
      let sp = 'mobanList[' + 7 + '].discount'
      this.setData({
        [salePrice]: this.data.nowTplInfo.data.discount,
        [sp]: this.data.mobanList[7].discount,
        ['nowTplInfo[data[base].product_price]']: bpr,
        ['nowTplInfo[data[wholesale].price]']: bpr,
        price: this.data.price,
        normals: e.detail.value,
      })
    } else {
      my.alert({
        title: '提示',
        content: '发布模板中未设置阶梯折扣,点击确认添加默认值(起订量>100,折扣为0.95;起订量>500,折扣为0.9;)',
        buttonText: '确认添加',
        success: () => {
          this.data.tplDiscount.push({
            price: "95",
            start_quantity: "100"
          }, {
            price: "90",
            start_quantity: "500"
          })
          for (let o = 0; o < this.data.tplDiscount.length; o++) {
            this.data.mobanList[7].discount[o].price = parseInt(this.data.tplDiscount[o].price) * bpr / 100;
            this.data.nowTplInfo.data.discount[o].price = parseInt(this.data.tplDiscount[o].price) * bpr / 100;
            this.data.mobanList[7].discount[o].start_quantity = parseInt(this.data.tplDiscount[o].start_quantity);
            this.data.nowTplInfo.data.discount[o].start_quantity = parseInt(this.data.tplDiscount[o].start_quantity);
          }
          console.log(this.data.tplDiscount);
          let salePrice = 'nowTplInfo[data[discount]]'
          let sp = 'mobanList[' + 7 + '].discount'
          this.setData({
            [salePrice]: this.data.nowTplInfo.data.discount,
            [sp]: this.data.mobanList[7].discount,
            ['nowTplInfo[data[base].product_price]']: bpr,
            ['nowTplInfo[data[wholesale].price]']: bpr,
          })
        },
      });
    }
  },
  //动态显示折扣
  getPrice: function (e) {
    console.log(e)
    let pr = e.detail.value;
    if (this.data.tplDiscount.length > 0) {
      for (let p = 0; p < this.data.tplDiscount.length; p++) {
        this.data.mobanList[7].discount[p].price = parseInt(this.data.tplDiscount[p].price) * pr / 100;
        this.data.nowTplInfo.data.discount[p].price = parseInt(this.data.tplDiscount[p].price) * pr / 100;
        this.data.mobanList[7].discount[p].start_quantity = parseInt(this.data.tplDiscount[p].start_quantity);
        this.data.nowTplInfo.data.discount[p].start_quantity = parseInt(this.data.tplDiscount[p].start_quantity);
      }
      let salePrice = 'nowTplInfo[data[discount]]'
      let sp = 'mobanList[' + 7 + '].discount'
      this.setData({
        [salePrice]: this.data.nowTplInfo.data.discount,
        [sp]: this.data.mobanList[7].discount,
        ['nowTplInfo[data[base].product_price]']: pr,
        ['nowTplInfo[data[wholesale].price]']: pr,
      })
    } else {
      my.alert({
        title: '提示',
        content: '发布模板中未设置阶梯折扣,点击确认添加默认值(起订量>100,折扣为0.95;起订量>500,折扣为0.9;)',
        buttonText: '确认添加',
        success: () => {
          this.data.tplDiscount.push({
            price: "95",
            start_quantity: "100"
          }, {
            price: "90",
            start_quantity: "500"
          })
          for (let o = 0; o < this.data.tplDiscount.length; o++) {
            this.data.mobanList[7].discount[o].price = parseInt(this.data.tplDiscount[o].price) * pr / 100;
            this.data.nowTplInfo.data.discount[o].price = parseInt(this.data.tplDiscount[o].price) * pr / 100;
            this.data.mobanList[7].discount[o].start_quantity = parseInt(this.data.tplDiscount[o].start_quantity);
            this.data.nowTplInfo.data.discount[o].start_quantity = parseInt(this.data.tplDiscount[o].start_quantity);
          }
          let salePrice = 'nowTplInfo[data[discount]]'
          let sp = 'mobanList[' + 7 + '].discount'
          this.setData({
            [salePrice]: this.data.nowTplInfo.data.discount,
            [sp]: this.data.mobanList[7].discount,
            ['nowTplInfo[data[base].product_price]']: pr,
            ['nowTplInfo[data[wholesale].price]']: pr,
          })
        },
      });
    }
    // this.setData({
    //   price: pr,
    //   ['nowTplInfo[data[base[product_price]]]']: pr,//put product info
    //   ['nowTplInfo[data[wholesale[price]]]']: pr
    // });
    console.log(this.data.price)
    console.log(this.data.tplDiscount)
    console.log(this.data.nowTplInfo.data.discount)
    console.log(this.data.mobanList[7].discount)
  },
  //设置包装尺寸及重量
  packageSize: function (e) {
    if (e.target.dataset.type == 'weight') {
      var val = this.validateNumber(e.detail.value);
      if (val == '') {
        my.showToast({
          title: '提示',
          content: '请重新填写重量,格式为0或0.00',
          icon: 'false',
          duration: 2000
        })
      } else {
        var weight = 'proType[weight]'
        this.setData({
          [weight]: val,
          ['nowTplInfo[data[wholesale[weight]]]']: val,//put product info
        })
        console.log(val)
      }
      console.log(val)
    } else {
      //

      var val = this.validateNumber(e.detail.value);
      this.package_size[e.target.dataset.index] = val
      console.log(this.package_size)
      var portableList = this.package_size.join("X");
      console.log(portableList)//组合成的字符串为所需要的20X20X20形式的
      if (val == '') {
        my.showToast({
          title: '提示',
          content: '请重新填写尺寸信息,格式为0或0.00',
          icon: 'false',
          duration: 2000
        })
      } else {
        var pack = 'proType[package_size]'
        this.setData({
          [pack]: portableList,
          ['nowTplInfo[data[wholesale[package_size]]]']: portableList
        })
        console.log(this.data.proType);

      }
    }
  },
  //英文限制
  validateEnglish(val) {
    return val.replace(/[^\w \.\/]/ig, '')
  },
  //数字限制
  validateNumber(val) {
    return val.replace(/\D\./g, '');
  },
  //展示自定义规格
  showSku() {
    this.setData({
      showSku: !this.data.showSku
    });
  },
  //直接销售方式详情数据获取
  sale() {
    this.setData({
      showTop_sale: true
    })
  },
  saleTop(option) {
    const calculate_ename = option.target.dataset.calculate_ename
    this.setData({
      sale_ename: calculate_ename,
      showBatchNumber: !this.data.showBatchNumber
    })
  },

  // 直接计量单位详情数据获取
  calculate() {
    this.setData({
      showTop_measuring: true
    })
  },
  calculateTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      calculate_ename: calculate_ename
    })
  },
  // 非直接物流FOB详情数据获取
  calculate_f() {
    this.setData({
      showTop_f_measuring: true
    })
  },
  calculate_f_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      calculate_f_ename: calculate_ename
    })
  },
  // 非直接FOB计量单位详情数据获取
  indirect_calulate() {
    this.setData({
      showTop_indirect_calulate: true
    })
  },
  indirect_calulateTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      indirect_calulate_ename: calculate_ename,
      ['nowTplInfo[data[sourcing[fob_unit_type]]]']: calculate_ename,
    })
  },
  // 非直接付款方式详情数据获取
  payment() {
    this.setData({
      showTop_payment: true
    })
  },
  paymentTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    let payment = this.data.payment_ename
    if (payment.length == 0) {
      payment.push(calculate_ename)
    } else {
      if (payment.includes(calculate_ename)) {
        payment = payment.filter(item => item != calculate_ename)
      } else {
        payment.push(calculate_ename)
      }
    }

    this.setData({
      payment_ename: payment,
      ['nowTplInfo[data[sourcing[payment_methods]]]']: payment
    })
  },









  // 货币符号详情数据获取
  currency() {
    this.getApprovalProductcurrency()
    this.setData({
      showTop_currency: true
    })
  },
  currencyTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      currency_ename: calculate_ename,
      ['nowTplInfo[data[sourcing[fob_currency]]]']: calculate_ename
    })
  },
  async getApprovalProductcurrency() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/common/currency',
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': 1
          }
        },
        'exts': { "timeout": 100000 }
      });
      console.log(result);
      this.setData({
        currency_unit: result.data
      })
    } catch (e) {
      console.log(e);
    }
  },
  // 非直接物流供货能力周期数据
  Availability_cycle() {
    this.setData({
      showTop_Availability_cycle: true
    })
  },
  Availability_cycle_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      Availability_cycle_ename: calculate_ename,
      ['nowTplInfo[data[sourcing[supply_period_type]]]']: calculate_ename
    })
  },
  // 非直接物流供货能力计量单位数据
  measure_of_availability() {
    this.setData({
      showTop_measure_of_availability: true
    })
  },
  measure_of_availability_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      measure_of_availability_ename: calculate_ename,
      ['nowTplInfo[data[sourcing[supply_unit_type]]]']: calculate_ename
    })
  },
  // 非直接物流最小起订量计量单位数据
  i_measure_of_availability() {
    this.setData({
      showTop_i_measure_of_availability: true
    })
  },
  i_measure_of_availability_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      i_measure_of_availability_ename: calculate_ename,
      ['nowTplInfo[data[sourcing[min_order_unit_type]]]']: calculate_ename
    })
  },
  // 产品属性input框点击失去焦点传值
  product_attribute(event) {
    const key = event.target.dataset.en_name
    const value = event.detail.value
    let attr = { ...this.data.projectAttr }
    attr[key].value_name = value
    this.setData({
      projectAttr: attr
    })
  },
  // 自定义属性
  customAdd() {
    const customAdd = this.data.mobanList[5].customNoSku
    if (customAdd.length < 10) {
      customAdd.push({
        attribute_id: -1,
        attribute_name: '',
        sku_custom_image_url: '',
        sku_custom_value_name: '',
        value_id: -1,
        value_name: ''
      })
      this.setData({
        ['mobanList[' + 5 + '].customNoSku']: customAdd
      })
    } else {
      my.showToast({
        title: '提示',
        content: '自定义属性数量不能超过10个 ',
        icon: 'false',
        duration: 2000
      })
    }
  },
  customBlurKey(event) {
    const value = event.detail.value
    const index = event.target.dataset.index
    const customAdd = this.data.mobanList[5].customNoSku
    for (let i = 0; i < customAdd.length; i++) {
      if (index == i) {
        customAdd[i].attribute_name = value
      }
    }
    this.setData({
      ['mobanList[' + 5 + '].customNoSku']: customAdd
    })
  },
  customBlurValue(event) {
    const value = event.detail.value
    const index = event.target.dataset.index
    const customAdd = this.data.mobanList[5].customNoSku
    for (let i = 0; i < customAdd.length; i++) {
      if (index == i) {
        customAdd[i].value_name = value
      }
    }
    this.setData({
      ['mobanList[' + 5 + '].customNoSku']: customAdd
    })
    console.log(this.data.mobanList[5].customNoSku, '自定义属性值');
  },
  deleteCustomAttr(event) {
    const arrayList = [];
    const customAdd = this.data.mobanList[5].customNoSku
    const deleteIndex = event.target.dataset.index
    for (const index in customAdd) {
      if (index != deleteIndex) {
        arrayList.push(customAdd[index]);
      }
    };
    this.setData({
      ['mobanList[' + 5 + '].customNoSku']: arrayList
    });
  },
  panduan() {
    const laoWang = this.data.mobanList[5].noSku
    console.log('laowang' + laoWang);
    for (let index = 0; index < laoWang.length; index++) {
      for (const key in this.data.projectAttr) {
        if (laoWang[index].attribute_name == key) {
          laoWang[index].value_name = this.data.projectAttr[key]
        }
      }
    }
    let noSku = 'mobanList[' + 5 + '].noSku'
    this.setData({
      [noSku]: laoWang
    })
    console.log('最终树' + this.data.mobanList[5].noSku);
  },
  chooseSkuImage(e) {
    console.log(e);
    this.setData({
      definedIdx: e.target.dataset.idx,
      tempIndex: e.target.dataset.index,
      liu: true,
      skuImageHide: true,
    })
  },
  editHaveSku(e) {
    console.log(e);
    this.haveSkuEdit[e.target.dataset.idx] = e.detail.value
    console.log(this.haveSkuEdit);
    if (this.haveSkuEdit[0] != "" && this.haveSkuEdit[2] != "" && this.haveSkuEdit[3] != "") {
      let i = []
      i.push({
        attribute_id: e.target.dataset.id,
        attribute_name: e.target.dataset.sku,
        price: this.haveSkuEdit[2],
        quantity: this.haveSkuEdit[3],
        sku_custom_image_url: this.haveSkuEdit[1],
        customize_image_url: this.data.skuImage,
        customize_image: this.haveSkuEdit[1],
        showSkuSubsetInput: true,
        subset: this.data.haveSkuSubSet[e.target.dataset.index].subset,
        skuImageHide: true,
        value_id: this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].value_id,
        value_name: this.haveSkuEdit[0],
      })
      this.setData({
        ['nowTplInfo[data[attr[have_sku[' + e.target.dataset.index + ']]]]']: i[0],
      });
    }
    console.log(this.data.nowTplInfo.data.attr.have_sku);
  },
  selectSkuSubsetEnname(e) {
    console.log(e);
    this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].value_name = e.target.dataset.skuSubsetEnname;
    this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].value_id = e.target.dataset.skuSubsetId;
    //this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].skuValId = e.target.dataset.skuSubsetId;
    this.haveSkuEdit[0] = e.target.dataset.skuSubsetEnname
    this.setData({
      ['mobanList[' + 6 + '].haveSku']: this.data.nowTplInfo.data.attr.have_sku,
      haveSkuSubSet: this.data.nowTplInfo.data.attr.have_sku,
      ['nowTplInfo[data[attr[have_sku]]]']: this.data.nowTplInfo.data.attr.have_sku
    })

    if (this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].value_name == '自定义') {
      this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].showSkuSubsetInput = false
      this.setData({
        ['mobanList[' + 6 + '].haveSku']: this.data.nowTplInfo.data.attr.have_sku,
        haveSkuSubSet: this.data.nowTplInfo.data.attr.have_sku,
        ['nowTplInfo[data[attr[have_sku]]]']: this.data.nowTplInfo.data.attr.have_sku
      })
    } else {
      this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].showSkuSubsetInput = true
      this.setData({
        ['mobanList[' + 6 + '].haveSku']: this.data.nowTplInfo.data.attr.have_sku,
        haveSkuSubSet: this.data.nowTplInfo.data.attr.have_sku,
        ['nowTplInfo[data[attr[have_sku]]]']: this.data.nowTplInfo.data.attr.have_sku
      })
    }
    console.log(this.data.mobanList[6].haveSku);
  },
  chooseSkuSubset(e) {
    console.log(e)
    for (let i = 0; i < this.data.haveSkuSubSet.length; i++) {
      if (e.target.dataset.skuName == this.data.haveSkuSubSet[i].en_name) {
        this.data.nowTplInfo.data.attr.have_sku[e.target.dataset.index].subset = this.data.haveSkuSubSet[i].subset
        // this.data.nowTplInfo.data.attr.have_sku[this.data.tempSkuSubsetIndex].subset = e.target.dataset.skuSubsetId;
      }
    }
    console.log(this.data.haveSkuSubSet);
    this.setData({
      haveSkuSubSet: this.data.nowTplInfo.data.attr.have_sku,
      showSkuSubset: true,
      skuIdx: e.target.dataset.index,
      tempSkuSubsetIndex: e.target.dataset.index
    })
  },
  //添加已有规格
  haveSkuAdd(e) {
    console.log(e);
    let i = []
    i.push({
      attribute_id: e.target.dataset.attrId,
      attribute_name: e.target.dataset.attr,
      price: '',
      quantity: '',
      sku_custom_image_url: '',
      customize_image_url: '',
      customize_image: '',
      showSkuSubsetInput: true,
      subset: e.target.dataset.subset,
      skuImageHide: true,
      value_id: '',
      value_name: '',
    })
    this.data.nowTplInfo.data.attr.have_sku[this.data.haveSkuSubSet.length] = i[0]
    //数组排序
    let arr = this.data.nowTplInfo.data.attr.have_sku
    for (let k = 0, temp = ''; k < arr.length - 1; k++) {
      for (let j = 0; j < arr.length - k - 1; j++) {
        if (parseInt(arr[j].attribute_id) < parseInt(arr[j + 1].attribute_id)) {
          temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
    console.log(arr);
    this.setData({
      ['mobanList[' + 6 + '].haveSku']: arr,
      haveSkuSubSet: arr
    });
  },
  //设置非直接input输入的结果
  setSourcing(e) {
    console.log(e);
    let en_name = e.target.dataset.en_name
    switch (en_name) {
      case 'supply_quantity': this.setData({ ['nowTplInfo[data[sourcing[supply_quantity]]]']: e.detail.value })
        break;
      case 'packaging_desc': this.setData({ ['nowTplInfo[data[sourcing[packaging_desc]]]']: e.detail.value })
        break;
      case 'delivery_time': this.setData({ ['nowTplInfo[data[sourcing[delivery_time]]]']: e.detail.value })
        break;
      case 'min_order_quantity': this.setData({ ['nowTplInfo[data[sourcing[min_order_quantity]]]']: e.detail.value })
        break;
      case 'delivery_port': this.setData({ ['nowTplInfo[data[sourcing[delivery_port]]]']: e.detail.value })
        break;
      default: my.alert({ title: '提示', content: '严重错误', buttonText: '关闭', });
        break;
    }
  },
  //删除未进入预览页商品
  delNoImageProduct(productId, pid) {
    this.delSubCaiShop(productId)
    this.delSubShop(pid)
  },
  //删除采集复制
  async delSubCaiShop(pid) {
    console.log(pid);
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/product",
        "method": "DELETE",
        "token": app.globalData.token,
        "data": {
          "ids": [pid]
        }
      },
      'exts': { "timeout": 100000 }
    });
    console.log(result);
  },
  //删除待发布
  async delSubShop(pid) {
    console.log(pid);
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/publish.yes.product",
        "method": "DELETE",
        "token": app.globalData.token,
        "data": {
          "ids": [pid]
        }
      },
      'exts': { "timeout": 100000 }
    });
    console.log(result);
  },
  onHide() {
    console.log('页面隐藏');
    app.globalData.activeIndex = this.data.activeIndex
    app.globalData.images = this.data.images
    if (this.data.activeIndex == 1) {
      app.globalData.chooseImageType = 'noImage'
    }
  },
  async delNumTitPro() {
    let request = {
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/publish.yes.product",
        "method": "GET",
        "token": app.globalData.token,
        "data": {
          "page": this.data.pagenumber,
          "limit": 100,
          "status": [0],
        }
      },
      'exts': { "timeout": 100000 }
    }
    const result = await cloud.application.httpRequest(request);
    console.log(result);
    let regPos = / ^\d+$/; // 非负整数
    let regNeg = /^\-[1-9][0-9]*$/; // 负整数
    let that = this
    for (let i = 0; i < result.data.list.length; i++) {
      console.log(parseInt(result.data.list[i].subject));
      (function (i) {
        setTimeout(function () {
          if (regPos.test(parseInt(result.data.list[i].subject)) || regNeg.test(parseInt(result.data.list[i].subject))) {
            that.delNoImageProduct(result.data.list[i].product_id, result.data.list[i].pid)
          }
        }, (i + 1) * 1000);
      })(i)
    }
  }
});