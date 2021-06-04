var app = getApp();
Page({

  data: {
    arrList: [],
    message1: 0,
    message2: 0,
    message3: 0,
    isShow: true,
    alibaba_product_id:0,
    category_id:0,
  },
  onLoad(e) {
    var oneProduct=app.globalData.oneProduct
    
    var alibaba_product_id=e.alibaba_product_id;
    var category_id=e.category_id;
    setTimeout(() => {
          this.add()
        }, 3000);
    //this.add2(),
    setTimeout(() => {
          this.add2()
        }, 3000);
    setTimeout(() => {
      let now = this.data.isShow;
      this.setData({
        isShow: !now,
        alibaba_product_id:alibaba_product_id,
        category_id:category_id,
        //arrList: arrNow
        
      })
    }, 5000);
    console.log(oneProduct)
     console.log("修复页面")
    console.log(category_id)

  },
  add: function () {
    var mes = this.data.message1;
    var mes2 =this.data.message2;
    var mes3=this.data.message3
    if (mes < 100) {
      for (var i = 0; i < 100; i++) {
       
        setTimeout(() => {
          this.add()
        }, 1000);
        mes++
        mes3=((mes+mes2)/2)
      }
  
    }
    this.setData({
      message1: mes,
      message2:mes2,
      message3: mes3
    })
  
  },
  add2:function(){
    var mes = this.data.message1;
    var mes2 =this.data.message2;
    var mes3=this.data.message3;
   // console.log(mes2)
    if (mes ==100 && mes2<100) {
      //console.log(111)
      for (var n = 0; n < 100; n++) {
        setTimeout(() => {
          this.add2()
        }, 100);
      mes2++;
      mes3=((mes+mes2)/2);
     // console.log(mes3)
      }
     
    }
    this.setData({
      message1:mes,
      message2: mes2,
      message3: mes3
    })
    //console.log(mes2)
  
  }
});
