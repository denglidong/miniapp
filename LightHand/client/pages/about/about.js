var app = getApp();
Page({
  data: {
    marginTop: 0,
    sellerName: '',
    avatar: '/image/user.png'
  },
  onLoad() {
    //获取用户昵称和头像
    my.getAuthUserInfo({
      success: (userInfo) => {
        this.setData({
          sellerName: userInfo.nickName,
          avatar: userInfo.avatar,
        });
      }
    });
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
    this.getSystemInfo()
  },
  commonInfoSetting() {
    my.alert({
      title: '提示',
      content: '敬请期待'
    });
  },
  contactUs() {
    my.navigateTo({
      url: '/pages/contactus/contactus'
    });
  },
  useCourse() {
    my.alert({
      title: '提示',
      content: '敬请期待'
    });
  },
  jumpPC() {
    my.navigateTo({
      url: '/pages/outpc/outpc'
    });
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
              marginTop: -130
            })
          }
        }
      }
    })
  },
});
