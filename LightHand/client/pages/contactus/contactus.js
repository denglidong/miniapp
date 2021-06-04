Page({
  data: {
    titleHeight: 0,
  },
  onLoad() {
    my.getSystemInfo({
      success: (result) => {
        let height = result.titleBarHeight + result.statusBarHeight;
        this.setData({
          titleHeight: height,
        });
      },
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
  },
  onCallPhone() {
    my.makePhoneCall({
      number: '18149216331'
    });
  },
  onCallAliSeller() {
    my.alert({
      title: '提示',
      content: '敬请期待'
    });
  },
  onCopyDing() {
    my.setClipboard({
      text: '32917988',
      success: () => {
        my.showToast({
          content: '复制成功',
        });
      },
    });
  },
  onSaveDingCode() {
    my.saveImage({
      url: '/image/contact_ding.png',
      showActionSheet: true,
      success: () => {
        my.alert({
          title: '提示',
          content: '二维码已保存到相册',
        });
      },
    });
  }
});
