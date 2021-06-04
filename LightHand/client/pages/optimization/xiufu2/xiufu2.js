Page({
  data: {
      message1: 0,
      message2: 0,
      message3: 0,
     isShow:true,
     isHidden:false,
     com_list:[
       {product_id:"123456",message:100,name:"张三"},
       {product_id:"123456",message:100,name:"张三"},
       {product_id:"123456",message:100,name:"张三"},
       {product_id:"123456",message:100,name:"张三"},
     ]
  },
  onLoad(e) {
    //console.log(e)
    //console.log(e.arrList);
   const arrList = JSON.parse(e.arrList);
   setTimeout(() => {
   let now = this.data.isShow;
   let hid=this.data.isHidden;
   let message=this.data.message1;
    this.setData({
      isShow:!now,
      isHidden:!hid,
      message2:message
    })
   }, 3000);
  },
});
