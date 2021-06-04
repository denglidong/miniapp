const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    topMargin: 0,
    isHideImgChoose: false,//禁用选择图片
    imageNum: 0,//用于禁用点击事件
    imageSubList: [],
    images: [],//传回拍照发品页面
    checked: true,//选中图片后解锁发送
    subTitle: 'subTitle',//子分组标题
    activeIndex: 1,//标识发品当前步骤
  },
  onLoad() {
    for (var i = 0; i < app.globalData.imageSubList.length; i++) {
      app.globalData.imageSubList[i].checked = false
    }
    this.setData({
      imageSubList: app.globalData.imageSubList
    })
  },
  onShow() {
    this.nowImages = []
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
            this.setData({
              topMargin: 70,
            })
          }
        }
      }
    })
  },
  //选择图片
  sendImage: function (e) {
    //var img = this.data.images;
    var imageSubList = this.data.imageSubList
    console.log(e.target.dataset.index)
    for (var i = 0; i < imageSubList.length; i++) {
      if (i == e.target.dataset.index) {
        console.log(imageSubList[i].checked)
        imageSubList[i].checked = !imageSubList[i].checked
      }
    }
    this.setData({
      checked: false,
      imageSubList: imageSubList
    });
    console.log(e)
    if (this.nowImages[e.target.dataset.index] == undefined) {
      this.nowImages[e.target.dataset.index] = e.target.dataset.imgPath
    } else {
      this.nowImages[e.target.dataset.index] = undefined
    }
    console.log(this.nowImages)
    var newImages = []
    for (var i = 0; i < this.nowImages.length; i++) {
      if (this.nowImages[i] != undefined) {
        newImages.push({ image_url: this.nowImages[i] })
      }
    }
    console.log(app.globalData.images)
    console.log(newImages)
    let newAppImages = []
    if (app.globalData.activeIndex == 1) {
      newAppImages = newImages
    } else {
      newAppImages = app.globalData.images.concat(newImages);
    }
    console.log(newAppImages)
    let appImages = newAppImages
    // for (var i = 0; i < appImages.length; i++) {
    //   for (var j = i + 1; j < appImages.length; j++) {
    //     if (appImages[i].image_url == appImages[j].image_url) {         //第一个等同于第二个，splice方法删除第二个
    //       appImages.splice(j, 1);
    //       j--;
    //     }
    //   }
    // }
    if (this.data.images.length <= appImages.length - app.globalData.imageNum) {
      this.setData({
        isHideImgChoose: true
      })
    } else {
      this.setData({
        isHideImgChoose: false
      })
    }
    console.log(this.data.images)
    this.setData({
      images: appImages
    })
    console.log(this.data.images)
  },
  //返回拍照发品页面
  backpublishProduct: function () {
    console.log("取消图片选择");
    my.navigateBack({
      delta: 2,
      success: () => {
        this.nowImages = [];
        app.globalData.images = app.globalData.images
        app.globalData.activeIndex = app.globalData.activeIndex
        app.globalData.chooseImageType = 'noImage'
      },
    });
  },
  //未选择提示
  noImage: function () {
    my.alert({
      title: '发送失败',
      content: '未选择图片',
      buttonText: '确定',
      success: () => {
      }
    });
  },
  //将选中的图片发送到套用模板images
  saveImageToimagePank: function (e) {
    this.data.activeIndex = app.globalData.activeIndex
    console.log(this.data.activeIndex)
    console.log(app.globalData.activeIndex)
    if (this.data.activeIndex == 2) {
      console.log(this.data.activeIndex)
      console.log(app.globalData.imageNum, '全局');
      console.log(this.data.images.length, 'imageInfo');
      if (this.data.images.length <= 6) {
        my.navigateBack({
          //url: '../../publishProduct',
          delta: 2,
          success: () => {
            if (this.data.images == []) {
              app.globalData.images = app.globalData.images
            } else {
              app.globalData.images = this.data.images
            }
            app.globalData.activeIndex = this.data.activeIndex
            app.globalData.chooseImageType = 'imageBank'
          },
          fail: () => {
          },
        });
      } else {
        my.alert({
          title: '发送失败',
          content: '最多选择' + (6 - app.globalData.imageNum) + '张图片',
          buttonText: '关闭',
          success: () => {
            //发送失败清空this.nowImages
            this.nowImages = []
            //初始化选中状态
            for (let i = 0; i < this.data.imageSubList.length; i++) {
              this.data.imageSubList[i].checked = false
            }
            this.setData({
              imageSubList: this.data.imageSubList
            })
          },
        });
      }
    } else if (this.data.activeIndex == 1) {
      if (this.data.images.length <= 1) {
        my.navigateBack({
          //url: '../../publishProduct',
          delta: 2,
          success: () => {
            //成功，将选中的图片放入images
            if (this.data.images == []) {
              app.globalData.images = app.globalData.images
            } else {
              app.globalData.images = this.data.images
            }
            app.globalData.activeIndex = this.data.activeIndex
            app.globalData.chooseImageType = 'imageBank'
          },
          fail: () => {
          },
        });
      } else {
        my.alert({
          title: '发送失败',
          content: '最多选择1张图片',
          buttonText: '关闭',
          success: () => {
            //发送失败清空this.nowImages
            this.nowImages = []
            //初始化选中状态
            for (let i = 0; i < this.data.imageSubList.length; i++) {
              this.data.imageSubList[i].checked = false
            }
            this.setData({
              imageSubList: this.data.imageSubList
            })
          },
        });
      }
    }
  },
});
