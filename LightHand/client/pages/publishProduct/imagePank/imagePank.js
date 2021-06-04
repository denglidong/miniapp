const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    pagenumber: 1,
    imageList: [],
    imageTotal: 0,
    imagePankGroup: [],
    imageNoGroup: [],
  },
  onLoad() {
    this.getImagePank();
    this.getImagePankGroup();
  },
  //获取图片银行信息(未完全开发)
  async getImagePank(e) {
    try {
      if (e == undefined) {
        //查询所有图片
        var requestNoGroupImg = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/imageBank",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "limit": 100
            }
          },
          'exts': { "timeout": 10000 }
        };
        const result = await cloud.application.httpRequest(requestNoGroupImg)
        var imageList = [];
        for (var i = 0; i < result.data.list.length; i++) {
          var obj = {
            group_id: result.data.list[i].group_id,
            img_path: result.data.list[i].url,
            img_modified_time: result.data.list[i].gmt_modified,
          };
          imageList.push(obj)
        }
        var imageNoGroup = [];
        for (var i = 0; i < imageList.length; i++) {
          if (imageList[i].group_id == undefined) {
            imageNoGroup.push(imageList[i])
          }
        }
        var plt = 'imageList';
        this.setData({
          [plt]: imageList,
          imageNoGroup: imageNoGroup
        })
        console.log(imageNoGroup)
        console.log("首次加载应该提供父级分组groupId")
        //循环出没有SUB_GROUP的分组(未实现)
        var imgGroup = this.data.imagePankGroup
        var noSubGroup = []
        var groupId = []
        for (let i = 0; i < imgGroup.length; i++) {
          if (imgGroup[i].subGroupList.length == 0) {
            console.log("筛选出没有子分类的分组，子集长度" + imgGroup[i].subGroupList.length)
            noSubGroup.push(imgGroup[i])
          }
        }
        console.log(noSubGroup)
        for (let i = 0; i < noSubGroup.length; i++) {
          groupId[i] = noSubGroup[i].group_id;
          var requestSubGroupImg = {
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/imageBank",
              "method": "GET",
              "token": app.globalData.token,
              "data": {
                "groupId": groupId,
              }
            },
            'exts': { "timeout": 10000 }
          };
          const resultSubGroupImg = await cloud.application.httpRequest(requestSubGroupImg)
          var imageSubList = [];
          for (var i = 0; i < resultSubGroupImg.data.list.length; i++) {
            var obj = {
              group_id: resultSubGroupImg.data.list[i].group_id,
              img_path: resultSubGroupImg.data.list[i].url,
              img_modified_time: resultSubGroupImg.data.list[i].gmt_modified,
            };
            imageSubList.push(obj)
          }
          this.setData({
            imageSubList: imageSubList
          })
          console.log(imageSubList)
        }
      } else {
        //查询被点击子分组图片
        //groupId
        console.log(e)
        var groupId = e.currentTarget.dataset.key;
        var subTitle = e.currentTarget.dataset.title;
        var requestSubGroupImg = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/imageBank",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "locationType": "SUB_GROUP",
              "groupId": groupId,
            }
          },
          'exts': { "timeout": 10000 }
        };
        const resultSubGroupImg = await cloud.application.httpRequest(requestSubGroupImg)
        var imageSubList = [];
        for (var i = 0; i < resultSubGroupImg.data.list.length; i++) {
          var obj = {
            group_id: resultSubGroupImg.data.list[i].group_id,
            group_title: subTitle,
            img_path: resultSubGroupImg.data.list[i].url,
            img_modified_time: resultSubGroupImg.data.list[i].gmt_modified,
          };
          imageSubList.push(obj)
        }
          my.navigateTo({
            url: 'imageInfo/imageInfo',
            success: () => {
              app.globalData.imageSubList = imageSubList
            },
            fail: () => {

            },
          });
      }
    } catch (e) {
      console.log("异常")
      console.log(e)
    }
  },
  //获取图片分组
  async getImagePankGroup() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/imageBank.group",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      console.log(result)
      var imagePankGroup = [];
      for (var i = 0; i < result.data.length; i++) {
        var obj = {
          id: i,
          group_id: result.data[i].key,
          group_title: result.data[i].title,
          subGroupList: [],
          activeSub: false
        };
        imagePankGroup.push(obj)
      }
      for (var i = 0; i < imagePankGroup.length; i++) {
        if (result.data[i].key == imagePankGroup[i].group_id) {
          imagePankGroup[i].subGroupList = result.data[i].children
        }
      }
      var plt = 'imagePankGroup';
      this.setData({
        [plt]: imagePankGroup
      })
      console.log(this.data.imagePankGroup)
    } catch (e) {
      console.log(e)
    }
  },
  activeShowSub: function (e) {
    console.log(e.target.dataset.index);
    var that = this;
    var imagePankGroup = that.data.imagePankGroup;
    for (var i = 0; i < imagePankGroup.length; i++) {
      if (e.target.dataset.index == i) {
        imagePankGroup[i].activeSub = !imagePankGroup[i].activeSub
      }
    }
    that.setData({
      imagePankGroup: imagePankGroup
    })
  },
});
