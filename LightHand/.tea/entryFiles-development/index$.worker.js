if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');


      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../client/app');
require('../../client/node_modules/mini-antui/es/search-bar/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/badge/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/tabs/index?hash=b998354db5b64281090d8969355b2b3db41cda49');
require('../../client/node_modules/mini-antui/es/tabs/tab-content/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/component/dropdownmenu/dropdownmenu?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/collapse/index?hash=a11fdcdff8ea970c65f185a8731cafe48f67047c');
require('../../client/node_modules/mini-ali-ui/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/collapse/collapse-item/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../client/node_modules/mini-antui/es/popover/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/popover/popover-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/mask/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/steps/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../client/node_modules/mini-ali-ui/es/am-checkbox/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/button/index?hash=e1617a0257fb9de746f60d50b03404ad924976c9');
require('../../client/component/select-option/select-option?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/popup/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/list/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/list/list-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/am-checkbox/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/modal/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/title/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../client/node_modules/mini-ali-ui/es/container/index?hash=0d7632df0f27097a47744e0a9dbf35728c63f710');
require('../../client/node_modules/mini-antui/es/popup/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/modal/index?hash=febd4c40992222524e0db12a74760a28f8f9b339');
require('../../client/node_modules/mini-ali-ui/es/list/index?hash=e1617a0257fb9de746f60d50b03404ad924976c9');
require('../../client/node_modules/mini-ali-ui/es/list/auto-size-img/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-ali-ui/es/list/list-item/index?hash=a5465b8c889360e3f854461d3ac41cf414aec633');
require('../../client/pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../client/pages/product/product?hash=b7eab2b46def3627910a17dcd28f8e5383981eda');
require('../../client/pages/publishProduct/publishProduct?hash=234ece26b8444485c23dcb432782817a17a7c8f4');
require('../../client/pages/publishProduct/alibabaRule/alibabaRule?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../client/pages/publishProduct/imagePank/imagePank?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../client/pages/publishProduct/imagePank/imageInfo/imageInfo?hash=ba7a8ae138899dab763a1960a6b9588e5c76b932');
require('../../client/pages/optimization/optimization?hash=338dbdc734f0d3eda733eba64dd9a6a4df8cbfaa');
require('../../client/pages/optimization/xiufu/xiufu?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../client/pages/optimization/zhenduan/zhenduan?hash=fd3aed2ab0eec504515d871ca94f73a574e328e0');
require('../../client/pages/optimization/xiufu/advice/advice?hash=3e2e5e2d473d03821badb5452a72c12422f436f6');
require('../../client/pages/publish/publish?hash=df9568594672c35496789b27ecded36c2f96ac60');
require('../../client/pages/hello/hello?hash=f54e36830aaf6d8c301e4e4a2640a2c649dbd1dc');
require('../../client/pages/publishAdd/publishAdd?hash=01525438685c87440e7641caaa629d71119f5949');
require('../../client/pages/publishRemove/publishRemove?hash=01525438685c87440e7641caaa629d71119f5949');
require('../../client/pages/revampHello/revampHello?hash=3e2e5e2d473d03821badb5452a72c12422f436f6');
require('../../client/pages/decoration/decoration?hash=b2578ae0322ad1444c93d74338b5b9485fe1b73e');
require('../../client/pages/editProduct/editProduct?hash=9046c65710455781d1d10b68556a984debf6c1b4');
require('../../client/pages/about/about?hash=47210a17c63210b43522855ebfc966f3191398eb');
require('../../client/pages/contactus/contactus?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../client/pages/outpc/outpc?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}