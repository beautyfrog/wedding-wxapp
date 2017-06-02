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
    var $this = this;
    var data = event.detail.value;
    if(data.danmu==""
      || data.danmu.length > 30){
      return;
    }else{
      // 客人信息
      data["firend"] = $this.data.userInfo.nickName;
      data["avatar"] = $this.data.userInfo.avatarUrl;
    }
    // 显示发送状态
    wx.showToast({
      title: '弹幕正在发射',
      icon: "loading"
    })
    // 发送
    wx.request({
      url: "https://21077212.qcloud.la/pop",
      method: "post",
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        $this.setData({
          danmu : ""
        });
        //提示消息
        wx.showToast({
          title: '发送成功',
          icon: "success"
        })
      },
      complete: function(){
        $this.closeModal();
      }
    })
  }
})
