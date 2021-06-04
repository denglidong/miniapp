const { cloud } = getApp();
var app = getApp();
Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
    this.getAuthCode().then((result) => {
      this.getAuthTokenForApp(result);
      this.jumpPage();
    }).catch((e) => {
      this.jumpPage();
    });
    //this.getAuthTokenForApp('@maimiao_auth_@500');
  },
  getAuthCode() {
    return new Promise((resolve, reject) => {
      my.authorize({
        scopes: 'scope.icbuBase',
        success: (res) => {
          resolve(res.auth_code);
          console.log(res.auth_code);
        },
        fail: (res) => {
          reject('请求授权失败,错误信息：' + res.errorMessage);
        }
      })
    });
  },
  async getAuthTokenForApp(auth_code) {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/authorize",
          "method": "POST",
          "data": {
            "code": auth_code,
            "type": "miniapp"
          }
        },
        'exts': { "timeout": 10000 }
      });
      app.globalData.token = result.data.token;
      app.globalData.hasLogin = true;
      app.globalData.aliSellerName = result.data.name;
    } catch (e) {
      my.alert({
        content: 'error ' + e.message
      });
    }
  },
  jumpPage() {
    setTimeout(() => {
      my.reLaunch({
        url: '/pages/product/product'
      });
    }, 1000);
  },
  clear() {
    my.qn.cleanToken({
      success: (res) => {
        console.log("授权清除成功");
      },
      fail: (res) => {
      }
    });
  }
  /*onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },*/
});
