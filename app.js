//app.js
App({
  onLaunch: function () {
    // 隐藏导航
    wx.hideTabBar();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  uploadImg: function(data){
    console.log("data",data);
    var that=this,
    i=data.i?data.i:0,
    success=data.success?data.success:0,
    fail=data.fail?data.fail:0;
    wx.uploadFile({
      url: data.url, 
      filePath: data.path[i].code,
      name: 'file',
      formData:{
        name:data.path[i].name,

      },
      success: (resp) => {
      success++;
      console.log(resp)
      console.log(i);
      //这里可能有BUG，失败也会执行这里
      },
      fail: (res) => {
      fail++;
      console.log('fail:'+i+"fail:"+fail);
      },
      complete: () => {
      console.log(i);
      i++;
      if(i==data.path.length){ //当图片传完时，停止调用   
      console.log('执行完毕');
      console.log('成功：'+success+" 失败："+fail);
      }else{//若图片还没有传完，则继续调用函数
      console.log(i);
      data.i=i;
      data.success=success;
      data.fail=fail;
      that.uploadImg(data);
      }
      }
    });
  }
})