//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    modelShow : "none",
    modalZindex : -1,
    danmu : ""
  },
  onLoad: function () {
    var $this = this;
    wx.getSystemInfo({
      success: function(res) {
        $this.setData({
          bgW : res.windowWidth,
          bgH : res.windowHeight
        });
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      $this.setData({
        userInfo:userInfo
      })
    })
  },
  // 显示发送窗口
  openModal: function(){
    this.setData({
      modelShow : "block",
      modalZindex : 998
    });
  },
  // 关闭发送窗口
  closeModal: function(){
    this.setData({
      modelShow: "none",
      modalZindex: -2
    });
  },
  // 发送弹幕
  sendDanmu: function (event){
    var _page = this;
    console.log(_page.data.danmu);
    wx.request({
      url: "https://21077212.qcloud.la/pop",
      method: "post",
      data: event.detail.value,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // 清除术
        _page.setData({
          danmu : ""
        });
        //关闭窗口
        _page.closeModal();
        //提示消息
        wx.showToast({
          title: '发送成功',
          icon: "success"
        })
      },
      fail: function(){
        console.log("发送失败了")
      }
    })
  }
})
