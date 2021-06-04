const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    // 产品类型开始
    showTopProductStyle: false,
    productStyleChineseName: '直接下单品',
    productStyleEnglishName: 'wholesale',
    // 产品类型结束
    new_en_name: [],//产品属性多选变色值存储
    subIndex: 0,
    // 平台分类转换为number
    commonId: 0,
    // 基本信息开始
    modelName: '',
    // 基本信息结束
    // 运费模板开始
    templateFreight: [],
    showTop_freight: false,
    templateName: '',
    templateId: '',
    // 运费模板结束
    // 产品分组开始
    groupName: '',
    groupId: 0,
    group: [],
    showTopProductGroup: false,
    // 产品分组结束
    // 非直接下单物流信息开始   
    showTop_f_measuring: false, // 非直接物流FOB计量单位显示
    calculate_f_ename: '',// 非直接物流FOB计量单位显示值
    Availability_cycle_ename: '', // 非直接物流供货能力周期显示数据
    showTop_Availability_cycle: false, // 非直接物流供货能力周期显示
    Availability_cycle_unit: [
      { en_name: 'Day', zh_name: '日' },
      { en_name: 'Week', zh_name: '周' },
      { en_name: 'Month', zh_name: '月' },
      { en_name: 'Quarter', zh_name: '季度' },
      { en_name: 'Year', zh_name: '年' },
    ],
    typeArray: [
      { en_name: 'sourcing', zh_name: '非直接下单品' },
      { en_name: 'wholesale', zh_name: '直接下单品' },
    ],
    showTop_measure_of_availability: false,    // 非直接物流供货能力计量单位数据    
    measure_of_availability_ename: '',  // 非直接物流供货能力计量单位显示
    supply_quantity: '',//非直接下单供货能力
    packaging_desc: '',//非直接下单包装信息
    delivery_time: '',//非直接下单发货期限
    min_order_quantity: '',//非直接下单最小起订量
    delivery_port: '',//非直接下单发货港口
    deliver_i_periods: [],   // 非直接物流发货周期数据   
    deleteIndex_i_period: '',    // 非直接物流发货周期删除下标
    // 非直接下单物流信息结束
    // 非直接下单交易信息开始
    // 货币符号显示
    showTop_currency: false,
    //  货币符号数组
    currency_unit: [],
    // 货币符号选中的数据
    currency_ename: '',
    // 非直接下单计付款方式显示
    showTop_payment: false,
    // 非直接下单付款方式显示值
    payment_ename: [],
    payment_unit: [
      { en_name: 'L/C', zh_name: 'L/C' },
      { en_name: 'D/A', zh_name: 'D/A' },
      { en_name: 'D/P', zh_name: 'D/P' },
      { en_name: 'T/T', zh_name: 'T/T' },
      { en_name: 'Western Union', zh_name: 'Western Union' },
      { en_name: 'MoneyGram', zh_name: 'MoneyGram' },
    ],
    // 非直接下单计量单位显示
    showTop_indirect_calulate: false,
    // 非直接下单计量单位显示值
    indirect_calulate_ename: '',
    // 非直接下单交易信息结束
    // 定制信息开始
    deleteIndex: "",
    custom: [],
    // 定制信息结束
    // 滑动弹起穿透控制
    forbidScroll: false,
    // 产品属性开始
    showTop1: false,
    attributeIndex: 0,
    attributeCollection: {},
    // 产品属性结束
    // 产品规格开始
    standardIndex: '',
    showTopStandard: false,
    standardCollection: {},
    // 产品规格结束
    // 产品类型开始
    productStyle: [
      { name: '直接下单品', english: 'wholesale' },
      { name: '非直接下单品', english: 'sourcing' }
    ],
    //产品类型结束
    // 直接下单物流信息开始
    transform: '',//将尺寸转换为字符串
    // 重量
    // weight: '',
    package_size: ['10', '12', '13'],
    deliver_periods: [],
    deleteIndex_period: '',
    // 直接下单物流信息结束
    // 直接下单交易信息开始
    batch_number: '',//每批数量
    // 价格折扣,
    discount: [],
    // 交易价格折扣删除
    deleteIndex_sale: '',
    // 销售方式
    showTop_sale: false,
    sale_ename: '',
    sales_method: [
      { en_name: "normal", zh_name: "按件卖" },
      { en_name: "batch", zh_name: "按批卖" },
    ],
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
    // 直接下单交易信息结束
    subTitleZ: ['尺寸(厘米)', '价格(美元)', '销售方式', '每批数量', '运费模板', '计量单位', '备货期(天)', '最小起订量', '发货周期', '折扣设置'],
    subTitley: ['FOB货币符号', '计量单位', '供货能力', '供货能力周期', '包装信息', 'FOB最小价格', 'erp_publish_alibaba_product_sourcing', '最小起订量计量单位',
      , '供货能力计量单位', '发货期限', 'FOB最大价格', 'FOB计量单位', '最小起订量', '付款方式', '发货港口', '折扣设置', '发货周期'],
    // 面包屑导航开始
    // 平台分类跳转携带过来发起请求获取no_sku和hava_sku
    common_id: '',
    no_sku: [],
    have_sku: [],
    id_path: '',
    value: '',
    // 面包屑导航结束
    // 产品规格数据
    productStandard: [
      { en_name: 'color', zh_name: '颜色' },
      { en_name: 'size', zh_name: '尺寸' },
      { en_name: 'style', zh_name: '款式' },
      { en_name: 'shape', zh_name: '器型' },
      { en_name: 'material', zh_name: '材质' },
      { en_name: 'taste', zh_name: '口味' },
      { en_name: 'people', zh_name: '使用人群' },
      { en_name: 'taste', zh_name: '口味' },
      { en_name: 'capacity', zh_name: '容量' },
      { en_name: 'pattern', zh_name: '花型' },
      { en_name: 'place', zh_name: '地点' },
      { en_name: 'scent', zh_name: '香型' },
      { en_name: 'srticle', zh_name: '货号' },
      { en_name: 'combination', zh_name: '组合' },
      { en_name: 'ingredients', zh_name: '成份' },
      { en_name: 'version', zh_name: '版本' },
      { en_name: 'degree', zh_name: '度数' },
      { en_name: 'operator', zh_name: '运营商' },
      { en_name: 'attribute', zh_name: '属性' },
      { en_name: 'weight', zh_name: '重量' },
      { en_name: 'region', zh_name: '地区' },
      { en_name: 'package', zh_name: '套餐' },
      { en_name: 'category', zh_name: '类别' },
      { en_name: 'age', zh_name: '使用年龄' },
      { en_name: 'efficacy', zh_name: '功效' },
      { en_name: 'time', zh_name: '时间' }
    ],
    // 发源地数据
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
  },
  // 切换跳转到面包屑
  toSelectType(e) {
    my.navigateTo({
      url: '../hello/hello?id_path=' + this.data.id_path + "&value=" + this.data.value + "&modelName=" + this.data.modelName,
      success: (res) => {
        console.log('跳转成功');
      }
    });
  },
  onLoad(options) {
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
    this.GetAliGroup();
    // 运费模板全局变量值获取
    this.setData({
      templateFreight: app.globalData.shippingTpl
    })
    if (options.id != undefined) {
      // // 获取平台分类跳转携带过来发起请求获取no_sku和hava_sku的id
      const common_id = options.id
      const value = JSON.parse(options.value)
      const valueStr = value.join('/')
      const id_path = options.id_path
      this.setData({
        common_id: common_id,
        id_path: id_path,
        value: valueStr,
        modelName: options.modelName
      })
      this.GetAttr()
    }
  },
  async GetAttr() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/common/aliattribute/' + this.data.common_id,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      // 发源地赋值开始
      let datas = result.data.no_sku;
      const headstream = this.data.headstream;
      for (const iterator of datas) {
        if (iterator.en_name == 'Place of Origin') {
          iterator.subset = headstream
        }
      }
      // 发源地赋值结束

      // 产品规格赋值开始
      let have_sku = result.data.have_sku;
      const productStandard = this.data.productStandard;
      for (const iterator of have_sku) {
        if (iterator.input_type != 'input') {
          iterator.subset = productStandard
        }
      }
      let standard = { ...this.data.standardCollection }
      for (let index = 0; index < have_sku.length; index++) {
        if (have_sku[index].input_type == 'input') {
          let key = have_sku[index].en_name
          let value = {
            attribute_id: have_sku[index].attribute_id,
            attribute_name: have_sku[index].en_name,
            local_option: '',
            value_name: ''
          }
          standard[key] = value
        } else {
          let key = have_sku[index].en_name
          let value = {
            attribute_id: have_sku[index].attribute_id,
            attribute_name: have_sku[index].en_name,
            local_option: '',
            value_name: ''
          }
          standard[key] = value
        }

      }
      // 产品规格赋值赋值结束
      // 产品属性赋值开始
      let attr = { ...this.data.attributeCollection };
      for (let index = 0; index < datas.length; index++) {
        if (datas[index].input_type == 'multi_select') {
          let key = datas[index].en_name
          attr[key] = []
        } else {
          let key = datas[index].en_name
          let value = {
            attribute_id: datas[index].attribute_id,
            attribute_name: datas[index].en_name,
            value_id: '',
            value_name: ''
          }
          attr[key] = value
        }
      }
      //产品属性赋值结束
      // 获取默认的产品属性和产品规格
      this.setData({
        no_sku: datas,
        have_sku: have_sku,
        attributeCollection: attr,
        standardCollection: standard

      })
      console.log(this.data.attributeCollection);
    } catch (e) {
      console.log(e);
    }
  },
  // 产品属性传值
  attributeSelect(e) {






    const key = this.data.no_sku[this.data.attributeIndex].en_name;
    const value_name = e.target.dataset.enName;
    const value_id = e.target.dataset.value_id
    let attr = { ...this.data.attributeCollection };


    // 产品属性多选变色开始
    let new_en_name = []
    new_en_name = this.data.new_en_name
    new_en_name = new_en_name.filter(item => item !== value_name)
    // 产品属性多选变色结束
    if (this.data.no_sku[this.data.attributeIndex].input_type === "single_select") {
      attr[key].value_id = value_id
      attr[key].value_name = value_name
    } else {
      if (attr[key].length != 0) {
        if (attr[key].map(item => item.value_id).includes(value_id)) {
          attr[key] = attr[key].filter(item => item.value_id != value_id)
        } else {
          attr[key].push({
            attribute_id: this.data.no_sku[this.data.attributeIndex].attribute_id,
            attribute_name: this.data.no_sku[this.data.attributeIndex].en_name,
            value_id: value_id,
            value_name: value_name,
          });
          new_en_name.push(value_name)
        }
      }
      else {
        attr[key] = [{
          attribute_id: this.data.no_sku[this.data.attributeIndex].attribute_id,
          attribute_name: this.data.no_sku[this.data.attributeIndex].en_name,
          value_id: value_id,
          value_name: value_name,
        }]
        new_en_name.push(value_name)
      }

    }
    this.setData({
      subIndex: e.target.dataset.index,
      attributeCollection: attr,
      new_en_name: new_en_name
    })
  },

  // 第二部分产品属性
  // 产品属性底部弹起事件
  onTopBtnTapDanXuan(e) {
    this.setData({
      attributeIndex: e.currentTarget.dataset.index,
      showTop1: true,
    });
  },


  onTopBtnTapDuoXuan(e) {
    this.setData({
      attributeIndex: e.currentTarget.dataset.index,
      showTop1: true,
    });
  },

  // 底部弹起确定取消
  define() {
    this.setData({
      showTop1: false,
      showTopStandard: false,
      showTop_sale: false,
      showTop_measuring: false,
      showTop_freight: false,
      showTop_currency: false,
      showTop_indirect_calulate: false,
      showTop_payment: false,
      showTop_f_measuring: false,
      showTop_Availability_cycle: false,
      showTop_measure_of_availability: false,
      showTopProductGroup: false,
      showTopProductStyle: false,
      // 页面滚动禁止取消
      forbidScroll: false
    })
  },
  // 产品属性input框值改变
  productAttribute(event) {
    const key = event.target.dataset.en_name
    const value = event.detail.value
    let attr = { ...this.data.attributeCollection }
    attr[key].value_name = value
    this.setData({
      attributeCollection: attr
    })
  },



  // 第二部分产品规格
  // 产品规格底部弹起事件
  onTopBtnTapStandard(e) {
    this.setData({
      standardIndex: e.currentTarget.dataset.index,
      showTopStandard: true,
    });
  },

  // 产品规格传值
  standardSelect(e) {
    // const middle = e.target.dataset.enName;
    const key = this.data.have_sku[this.data.standardIndex].en_name;
    const value_name = e.target.dataset.value_name
    const local_option = e.target.dataset.enName
    let attr = { ...this.data.standardCollection };

    if (this.data.have_sku[this.data.standardIndex].input_type != "input") {
      attr[key].value_name = value_name
      attr[key].local_option = local_option
    }
    this.setData({
      standardCollection: attr
    })
  },

  // 产品规格input框值改变
  productStandard(event) {
    const index = event.target.dataset.index
    const local_option = event.detail.value
    const key = this.data.have_sku[index].en_name
    let attr = { ...this.data.standardCollection }
    attr[key].local_option = local_option
    this.setData({
      standardCollection: attr
    })
  },



  // 直接下单交易信息开始



  // 计量单位详情数据获取
  calculate() {
    this.setData({
      forbidScroll: true,
      showTop_measuring: true
    })
  },
  calculateTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      calculate_ename: calculate_ename
    })
  },


  //销售方式详情数据获取
  sale() {
    this.setData({
      forbidScroll: true,
      showTop_sale: true
    })
  },
  saleTop(option) {
    const calculate_ename = option.target.dataset.calculate_ename
    this.setData({
      sale_ename: calculate_ename
    })
  },
  // 删除直接下单交易信息价格折扣提示信息
  delete_sale: function (e) {
    const index = e.target.dataset.index;
    this.setData({
      deleteIndex_sale: index
    });
    my.confirm({
      title: '温馨提示',
      content: '您是否确定删除该定制信息',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm == true) {
          this.deleteIcon_sale();
        } else {
          console.log("取消");
        }
      },
    });
  },
  // 删除直接下单交易信息价格折扣
  deleteIcon_sale() {
    const arrayList = [];
    const deleteIndex = this.data.deleteIndex_sale;
    for (const index in this.data.discount) {
      if (index != deleteIndex) {
        arrayList.push(this.data.discount[index]);
      }
    };
    this.setData({
      discount: arrayList
    });
  },
  // 添加直接下单交易信息价格折扣
  arrAddAttribute_sale() {
    const arr = this.data.discount;
    const target = '{"start_quantity":"","price":""}';
    arr.push(JSON.parse(target));
    this.setData({
      discount: arr
    });
  },


  // 直接下单交易信息价格折扣失去焦点
  customized_information(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_customized_information
    const custom = this.data.discount
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].start_quantity = lose_focus_value
      }
    }
    this.setData({
      discount: custom
    })
  },
  customized_information_second(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_customized_information_second
    const custom = this.data.discount
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].price = lose_focus_value
      }
    }
    this.setData({
      discount: custom
    })
  },


  //  直接下单交易信息每批数量失去焦点
  batch(event) {
    const batch = event.detail.value
    this.setData({
      batch_number: batch
    })
  },

  // 直接下单交易信息结束

  // 直接下单物流信息开始

  // 直接运费详情数据获取
  freight() {
    this.setData({
      forbidScroll: true,
      showTop_freight: true
    })
  },
  freightTop(e) {
    const template_name = e.target.dataset.template_name
    const template_id = e.target.dataset.template_id
    this.setData({
      templateName: template_name,
      templateId: template_id
    })
    console.log(this.data.templateId);

  },
  // 直接下单物流信息重量失去焦点
  // weight(event) {
  //   const weight = event.detail.value
  //   this.setData({
  //     weight: weight
  //   })
  // },
  // 直接下单物流信息尺寸长
  size_long(event) {
    const size_long = event.detail.value
    const index = event.target.dataset.index
    const package_size = this.data.package_size
    for (let i = 0; i < package_size.length; i++) {
      if (i == index) {
        package_size[i] = size_long
      }
    }
    this.setData({
      package_size: package_size
    })
  },
  // 直接下单物流信息尺寸宽
  size_width(event) {
    const size_width = event.detail.value
    const index = event.target.dataset.index
    const package_size = this.data.package_size
    for (let i = 0; i < package_size.length; i++) {
      if (i == index) {
        package_size[i] = size_width
      }
    }
    this.setData({
      package_size: package_size
    })
  },
  // 直接下单物流信息尺寸高
  size_height(event) {
    const size_height = event.detail.value
    const index = event.target.dataset.index
    const package_size = this.data.package_size
    for (let i = 0; i < package_size.length; i++) {
      if (i == index) {
        package_size[i] = size_height
      }
    }
    this.setData({
      package_size: package_size
    })
    console.log(this.data.package_size);
  },

  // 直接下单物流信息发货周期

  delete_period: function (e) {
    const index = e.target.dataset.index;
    this.setData({
      deleteIndex_period: index
    });
    my.confirm({
      title: '温馨提示',
      content: '您是否确定删除该定制信息',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm == true) {
          this.deleteIcon_period();
        } else {
          console.log("取消");
        }
      },
    });
  },
  deleteIcon_period() {
    const arrayList = [];
    const deleteIndex = this.data.deleteIndex_period;
    for (const index in this.data.deliver_periods) {
      if (index != deleteIndex) {
        arrayList.push(this.data.deliver_periods[index]);
      }
    };
    this.setData({
      deliver_periods: arrayList
    });
  },

  arrAddAttribute_period() {
    const arr = this.data.deliver_periods;
    const target = '{"process_period":"","quantity":""}';
    arr.push(JSON.parse(target));
    this.setData({
      deliver_periods: arr
    });
  },


  // 直接下单发货周期删除失去焦点

  process_period(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_process_period
    const custom = this.data.deliver_periods
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].process_period = lose_focus_value
      }
    }
    this.setData({
      deliver_periods: custom
    })
  },

  process_period_second(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_process_period_second
    const custom = this.data.deliver_periods
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].quantity = lose_focus_value
      }
    }
    this.setData({
      deliver_periods: custom
    })
  },

  // 直接下单物流信息结束

  // 定制信息开始
  delete: function (e) {
    const index = e.target.dataset.index;
    this.setData({
      deleteIndex: index
    });
    my.confirm({
      title: '温馨提示',
      content: '您是否确定删除该定制信息',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm == true) {
          this.deleteIcon();
        } else {
          console.log("取消");
        }
      },
    });
  },
  deleteIcon() {
    const arrayList = [];
    const deleteIndex = this.data.deleteIndex;
    for (const index in this.data.custom) {
      if (index != deleteIndex) {
        arrayList.push(this.data.custom[index]);
      }
    };
    this.setData({
      custom: arrayList
    });
  },
  // 添加定制
  arrAddAttribute() {
    const arr = this.data.custom;
    const target = '{"min_order_quantity":"","custom_type":""}';
    arr.push(JSON.parse(target));
    this.setData({
      custom: arr
    });
  },
  lose_focus(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_lose_focus
    const custom = this.data.custom
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].custom_type = lose_focus_value
      }
    }
    this.setData({
      custom: custom
    })
  },

  lose_focus_second(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_lose_focus_second
    const custom = this.data.custom
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].min_order_quantity = lose_focus_value
      }
    }
    this.setData({
      custom: custom
    })
  },

  // 定制信息结束

  // 非直接下单交易信息开始
  currency() {
    this.getApprovalProductcurrency()
    this.setData({
      forbidScroll: true,
      showTop_currency: true
    })
  },
  currencyTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      currency_ename: calculate_ename
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
        'exts': { "timeout": 10000 }
      });
      console.log(result);
      this.setData({
        currency_unit: result.data
      })
    } catch (e) {
      console.log(e);
    }
  },

  // 非直接付款方式详情数据获取
  payment() {
    this.setData({
      forbidScroll: true,
      showTop_payment: true
    })
  },
  paymentTop(optiton) {
    // const calculate_ename = optiton.target.dataset.calculate_ename
    // this.setData({
    //   payment_ename: calculate_ename
    // })


    let calculate_ename = optiton.target.dataset.calculate_ename
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
      payment_ename: payment
    })
    console.log(this.data.payment_ename);

  },


  // 非直接计量单位详情数据获取
  indirect_calulate() {
    this.setData({
      forbidScroll: true,
      showTop_indirect_calulate: true
    })
  },
  indirect_calulateTop(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      indirect_calulate_ename: calculate_ename
    })
  },

  // 非直接下单交易信息结束


  // 非直接下单物流信息开始
  // 非直接物流FOB计量单位详情数据获取
  calculate_f() {
    this.setData({
      forbidScroll: true,
      showTop_f_measuring: true
    })
  },
  calculate_f_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      calculate_f_ename: calculate_ename
    })
  },


  // 非直接物流供货能力周期数据
  Availability_cycle() {

    this.setData({
      forbidScroll: true,
      showTop_Availability_cycle: true
    })
  },
  Availability_cycle_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      Availability_cycle_ename: calculate_ename
    })
  },



  // // 非直接物流供货能力计量单位数据
  measure_of_availability() {
    this.setData({
      forbidScroll: true,
      showTop_measure_of_availability: true
    })
  },
  measure_of_availability_Top(optiton) {
    const calculate_ename = optiton.target.dataset.calculate_ename
    this.setData({
      measure_of_availability_ename: calculate_ename
    })
  },



  //非直接下单供货能力失去焦点
  supply_quantity(event) {
    const supply_quantity = event.detail.value
    this.setData({
      supply_quantity: supply_quantity
    })
  },
  // 非直接下单包装信息失去焦点
  packaging_desc(event) {
    const packaging_desc = event.detail.value
    this.setData({
      packaging_desc: packaging_desc
    })
  },
  //  非直接下单发货期限失去焦点
  delivery_time(event) {
    const delivery_time = event.detail.value
    this.setData({
      delivery_time: delivery_time
    })
  },
  // 非直接下单最小起订量失去焦点
  min_order_quantity(event) {
    const min_order_quantity = event.detail.value
    this.setData({
      min_order_quantity: min_order_quantity
    })
  },
  // 非直接下单发货港口失去焦点
  delivery_port(event) {
    const delivery_port = event.detail.value
    this.setData({
      delivery_port: delivery_port
    })
  },



  //非直接下单物流信息发货周期
  delete_i_period: function (e) {
    const index = e.target.dataset.index;
    this.setData({
      deleteIndex_i_period: index
    });
    my.confirm({
      title: '温馨提示',
      content: '您是否确定删除该定制信息',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm == true) {
          this.deleteIcon_i_period();
        } else {
          console.log("取消");
        }
      },
    });
  },
  deleteIcon_i_period() {
    const arrayList = [];
    const deleteIndex = this.data.deleteIndex_i_period;
    for (let index = 0; index < this.data.deliver_i_periods.length; index++) {
      if (index != deleteIndex) {
        arrayList.push(this.data.deliver_i_periods[index]);
      }

    }
    this.setData({
      deliver_i_periods: arrayList
    });
  },

  arrAddAttribute_i_period() {
    const arr = this.data.deliver_i_periods;
    const target = '{"process_period":"","quantity":""}';
    arr.push(JSON.parse(target));
    this.setData({
      deliver_i_periods: arr
    });
  },
  // 非直接下单物流发货周期失去焦点
  deliver_i_periods(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_deliver_i_periods
    const custom = this.data.deliver_i_periods
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].process_period = lose_focus_value
      }
    }
    this.setData({
      deliver_i_periods: custom
    })
  },

  deliver_i_periods_second(event) {
    const lose_focus_value = event.detail.value
    const index_lose_focus = event.target.dataset.index_deliver_i_periods_second
    const custom = this.data.deliver_i_periods
    for (let index = 0; index < custom.length; index++) {
      if (index_lose_focus == index) {
        custom[index_lose_focus].quantity = lose_focus_value
      }
    }
    this.setData({
      deliver_i_periods: custom
    })
  },
  // 非直接下单物流信息结束


  // 产品分组开始
  productGroup() {
    this.setData({
      showTopProductGroup: true
    })
  },


  // 获取模板产品属性邓详情数据数据
  async GetAliGroup() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/ali.product.group/",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      this.setData({
        group: result.data
      })
    } catch (e) {
      console.log(e);
    }
  },

  productGroupTap(e) {
    const group_name = e.target.dataset.group_name
    const group_id = e.target.dataset.group_id
    this.setData({
      groupName: group_name,
      groupId: group_id
    })
  },
  // 产品分组结束

  // 产品分组开始

  // 产品类型开始
  productStyle() {
    this.setData({
      showTopProductStyle: true
    })
  },

  productStyleTap(e) {
    const en_name = e.target.dataset.en_name
    const zh_name = e.target.dataset.zh_name
    this.setData({
      productStyleChineseName: zh_name,
      productStyleEnglishName: en_name
    })
    console.log(this.data.productStyleChineseName);

  },
  // 产品类型结束
  // 模板名称input失去焦点开始
  template(e) {
    this.setData({
      modelName: e.detail.value
    })
  },
  // 模板名称input失去焦点结束

  // 提交按钮开始
  // 提交按钮
  submit() {
    // this.panduan()
    this.transform()
    this.zhuanHuan()
    // this.ziFuChuang()

    this.getApprovalProductSubmit()
  },
  zhuanHuan() {
    const commonId = parseInt(this.data.common_id)
    this.setData({
      commonId: commonId
    })
  },
  // 直接下单物流信息长宽高转换为字符串提交
  transform() {
    const transform = this.data.package_size.join('X')
    this.setData({
      transform: transform
    })
  },
  async getApprovalProductSubmit() {
    // 产品属性分解开始
    console.log(this.data.attributeCollection, '222');

    let attrbute = { ...this.data.attributeCollection }
    console.log(attrbute, 'attr');
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
    // 产品属性分解结束
    // 产品规格分解开始
    let standard = { ...this.data.standardCollection }
    let c = Object.values(standard)
    // 产品规格分解结束

    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/publish.tpl/',
          "method": "POST",
          "token": app.globalData.token,
          "data": {
            'attributes': {
              'have_sku': c,
              'no_sku': b
            },
            'categoryId': this.data.commonId,
            'custom': this.data.custom,
            'discount': this.data.discount,
            'groupId': this.data.groupId,
            'image': {},
            'isSmartEdit': '',
            'market': 'main',
            'name': this.data.modelName,
            'productCurrency': 'USD',
            'productType': this.data.productStyleEnglishName,
            'sourcing': {
              'deliver_periods': this.data.deliver_i_periods,
              'delivery_port': this.data.delivery_port,
              'delivery_time': this.data.delivery_time,
              'fob_currency': this.data.currency_ename,
              'fob_unit_type': this.data.calculate_f_ename,
              'min_order_quantity': this.data.min_order_quantity,
              'min_order_unit_type': this.data.indirect_calulate_ename,
              'packaging_desc': this.data.packaging_desc,
              'payment_methods': this.data.payment_ename,
              'supply_period_type': this.data.Availability_cycle_ename,
              'supply_quantity': this.data.supply_quantity,
              'supply_unit_type': this.data.measure_of_availability_ename
            },
            'wholesale': {
              'batch_number': this.data.batch_number,
              'deliver_periods': this.data.deliver_periods,
              'handling_time': '',
              'min_order_quantity': '',
              'package_size': this.data.transform,
              'price': '',
              'sale_type': this.data.sale_ename,
              'shipping_line_template_id': this.data.templateId,
              'unit_type': this.data.calculate_ename,
              'weight': ''
            }
          }
        },


        'exts': { "timeout": 10000 }

      });
      console.log(result);
      if (result.msg == '发布模板添加成功') {
        my.switchTab({
          url: '/pages/publish/publish'
        })
      } else {
        my.showToast({
          title: '提示',
          content: result.msg,
          icon: 'false',
          duration: 2000
        })
      }

    } catch (e) {
      console.log(e);
    }
  },
  // 提交按钮结束
  // 返回到publish的Tabbar页面
  backToPage() {
    my.switchTab({
      url: '/pages/publish/publish'
    })
  }

});
