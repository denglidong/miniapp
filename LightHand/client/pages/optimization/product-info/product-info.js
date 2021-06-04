  Page({
    data: {           
      array: [
        
        { 
          id: 0,
          name: 'maijia',
          label: '工艺',
          options: ['直接下单品', '非直接下单商品','直接下单1']
        },{
          id: 0,
          name: 'changhe',
          label: '适用场合',
          options: ['铜制品', '铁制品']
        },
        {
          id: 0,
          name: 'mubiao',
          label: '主要目标买家',
          options: ['铜制品', '铁制品']
        },
        {
          id: 0,
          name: 'jiari',
          label: '假日',
          options: ['铜制品', '铁制品']
        },
        {
          id: 0,
          name: 'remai',
          label: '热卖季节',
          options: ['铜制品', '铁制品']
        },
        {
          id: 0,
          name: 'yuanchandi',
          label: '原产地',
          options: ['铜制品', '铁制品']
        },
        
      ],
      arrayGG:[
        {
          id:1,
          name:"color",
          labal:"颜色",
          options:["红色","绿色"]
        }
      ],
    
    },


    bindPickerChange(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index: e.detail.value,
      });
    },
    bindPickerChangeGongYi(e) {
      const index = e.target.dataset.index
      const liu =  e.detail.value
      var that = this;
      var up = "array["+index+"].id";

      
      that.setData({
        [up]: liu
      })

      
      
      // const index = e.target.
      // var list = [],
      // for (const key in ) {
      //   if (object.hasOwnProperty(key)) {
      //     const element = object[key];
          
      //   }
    
    },
    
    
    bindPickerChangeMuBiaoMaiJia(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index_z: e.detail.value,
      });
    },
    bindPickerChangeShiYongChangHe(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index_s: e.detail.value,
      });
    },
    bindPickerChangeJiaRi(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index_j: e.detail.value,
      });
    },
    bindPickerChangeReMaiJiJie(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index_r: e.detail.value,
      });
    },
    bindPickerChangeYuanChanDi(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index_y: e.detail.value,
      });
    },
    bindPickerChangeYanSe(e) {
      console.log(e);

      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index_ys: e.detail.value,
      });
    },

    toSelectType(e) {
      my.navigateTo({
        url: '../hello/hello',
        success: (res) => {
          console.log('跳转成功');
        }
      });
    },


  

  }
  );
