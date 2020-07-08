//index.js
//获取应用实例
const app = getApp();
import WxValidate from "../../utils/WxValidate";

Page({
  data: {
    showTopTips: false,
        radioItems: [
            {name: 'cell standard', value: '0', checked: true},
            {name: 'cell standard', value: '1'}
        ],
        checkboxItems: [
            {name: 'standard is dealt for u.', value: '0', checked: true},
            {name: 'standard is dealicient for u.', value: '1'}
        ],
        items: [
            {name: 'USA', value: '美国'},
            {name: 'CHN', value: '中国', checked: 'true'},
            {name: 'BRA', value: '巴西'},
            {name: 'JPN', value: '日本'},
            {name: 'ENG', value: '英国'},
            {name: 'TUR', value: '法国'},
        ],

        town: "莲花镇",
        village: "荷叶村",
        group: "3组",

        countryCodes: ["+86", "+80", "+84", "+87"],
        countryCodeIndex: 0,

        countries: ["房地产", "工业用地", "非工业用地"],
        countryIndex: 0,

        accounts: ["请选择","房地产", "工业用地", "非工业用地"],
        accountIndex: [0],

        obligees:["个人","单位"],
        obligeeIndex: [0],

        cards: ["身份证","港澳台身份证", "护照", "军官证(士兵证)","营业执照","其它"],
        cardIndex: [0],
        isAgree: false,
        formData: {
          
        },
        formData1:{

        },
        rules: [{
            name: 'radio',
            rules: {required: true, message: '单选列表是必选项'},
        }, {
            name: 'checkbox',
            rules: {required: true, message: '多选列表是必选项'},
        }, {
            name: 'qq',
            rules: {required: true, message: 'qq必填'},
        }, {
            name: 'mobile',
            rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
        }, {
            name: 'vcode',
            rules: {required: true, message: '验证码必填'},
        }, {
            name: 'idcard',
            rules: {required: true, message: 'idcard必填'},
        }],
        files: '',
        multiArray: [[
          {
            "citys":[],
            "code":'00000',
            "name":'请滑动选择'
          },
          {
           
            "citys":[
                      {
                         "areas":[
                                   {
                                     "code":"1",
                                     "name":"1组"
                                   },
                                   {
                                     "code":"2",
                                     "name":"2组"
                                   }
                                 ],
                          "code":"3",
                          "name":"荷叶村1"
                       }
                    ],
            "code":"4",
            "name":"莲花镇1",
          },
          {
            "citys":[
                       {
                        "areas":[
                                  {
                                    "code":"6",
                                    "name":"1组"
                                  },
                                  {
                                    "code":"7",
                                    "name":"2组"
                                  },
                                  {
                                    "code":"8",
                                    "name":"3组"
                                  },
                                  {
                                    "code":"9",
                                    "name":"4组"
                                  },
                                  {
                                    "code":"10",
                                    "name":"5组"
                                  },
                                  {
                                    "code":"11",
                                    "name":"6组"
                                  },
                                ],
                         "code":"12",
                         "name":"荷叶村3"
                      },
                      {
                        "areas":[
                                  {
                                    "code":"13",
                                    "name":"1组"
                                  },
                                  {
                                    "code":"14",
                                    "name":"2组"
                                  }
                                ],
                         "code":"15",
                         "name":"荷叶村4"
                      }
                    ],
            "code":"16",
            "name":"莲花镇2"
          }
        ],[],[]],
        // multiArray:[],
        multiIndex: [],
        selectAddr:null,
        date: "0000-00-00",
        showModalStatus: false,
        hiddenmodalput: true,
        showFamStatus: false,
        showConStatus:false,
        altIndex:'',
        obj: [],
        altName:'',
        mchecked:'',
        wchecked:'',
         //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: true,
        userText:'',
        changeName:'',
        changeSex:{},
        currentData:[{"1":1}],
        currentIndex:[],
        inputFlag:'',
        checkFlag:'',
        altCount:0,
        showAddPower:false,
        member:[],
        person:{},
        person1:{},
        personIndex:0,
        personCount:0,
        copyPerson:{},
        personAlt:{},
        test:[],
        fpregister:'',
        register:'',
        chooseFile:'',
        selectImg:{},
        arrImg:[],
        idImg:'',
        base64:'',
        idCardId:'',
        familyMember:[],
        personImgIndex:'',
        pics:[],
        test:'',
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['未取得合法手续','集体建设用地使用证', '农房建房用地批准书', '其他证明'], //下拉列表的数据
        indexs: 0, //选择的下拉列 表下标,
        cameraShow: false,
        selectAddCert:'',
        certMat:[],
        // landTitle:'',
  },
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.data.selectAddCert = Indexs;
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
    });
  },
  showUploadImg: function(e){
    console.log("this.data.selectAddCert",this.data.selectAddCert);
    if(this.data.selectAddCert === 0 || this.data.selectAddCert === ''){
      this.setData({
        cameraShow: false
      });
    } else {
      let temp = {};
      switch(this.data.selectAddCert){
        case "1":
          temp.id = 1;
          temp.landTitle = '集体建设用地使用证';
          break;
        case "2":
          temp.id = 2;
          temp.landTitle = '农房建房用地批准书';
          break;
        case "3":
          temp.id = 3;
          temp.landTitle = '其他证明';
          break;
      }
      this.data.certMat.push(temp);
      this.setData({
        cameraShow: true,
        certMat: this.data.certMat
      });
    }
  },
  onAddMat: function(e) {
    // console.log("llll");
    // let temp = [];
    // temp.push(this.data.selectAddCert);
    // console.log("temp",temp);
    
    // this.setData({
    //   certMat: temp
    // })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
        radioItems: radioItems,
        [`formData.isHouseHold`]: e.detail.value,
        [`person.isHouseHold`]: e.detail.value,
        [`person1.isHouseHold`]: e.detail.value
    });
},
checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.data.changeSex = {
      id: this.data.altIndex,
      sex: e.detail.value
    };
    this.data.checkFlag = e.currentTarget.dataset.check;
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].value == values[j]){
                checkboxItems[i].checked = true;
                break;
            }
        }
    }
    this.setData({
        checkboxItems: checkboxItems,
        [`formData.checkbox`]: e.detail.value,
        [`person1.sex`]: e.detail.value,
        [`person.sex`]: e.detail.value
    });
    
},
bindDateChange: function (e) {
  this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
  })
},
bindMultiPickerChange: function (e) {
    this.setData({
        multiIndex: e.detail.value,
        selectAddr: '0'
        // [`formData.date`]: e.detail.value
    })
},
bindMultiPickerColumnChange: function (e) {
  // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  var data = {
    multiArray: this.data.multiArray,
    multiIndex: this.data.multiIndex
  };
  //更新滑动的第几列e.detail.column的数组下标值e.detail.value
  data.multiIndex[e.detail.column] = e.detail.value;
  //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
  if (e.detail.column == 0){
    data.multiIndex = [e.detail.value,0,0];
  } else if (e.detail.column == 1){
    //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
    data.multiIndex = [data.multiIndex[0], e.detail.value, 0];
  } else if (e.detail.column == 2) {
    //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
    data.multiIndex = [data.multiIndex[0], data.multiIndex[1], e.detail.value];
  }
  
  var temp = data.multiArray[0];
  // multiArray = [temp, temp[0].citys, temp[0].citys[0].areas];
  if ((temp[data.multiIndex[0]].citys).length > 0){
    //如果第二列“市”的个数大于0,通过multiIndex变更multiArray[1]的值
    data.multiArray[1] = temp[data.multiIndex[0]].citys;
    var areaArr = (temp[data.multiIndex[0]].citys[data.multiIndex[1]]).areas;
    //如果第三列“区”的个数大于0,通过multiIndex变更multiArray[2]的值；否则赋值为空数组
    data.multiArray[2] = areaArr.length > 0 ? areaArr : [];
  }else{
    //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
    data.multiArray[1] = [];
    data.multiArray[2] = [];
  }
  //data.multiArray = [temp, temp[data.multiIndex[0]].citys, temp[data.multiIndex[0]].citys[data.multiIndex[1]].areas];
  //setData更新数据
  console.log("家庭住址",data);
  this.setData(data);
},
formInputChange(e) {
    const {field} = e.currentTarget.dataset;
    // if()
    this.setData({
        // nickname: e.detail.value
        [`formData.${field}`]: e.detail.value,
        [`person1.${field}`]: e.detail.value
    })
    let inputdata =  [`formData.${field}`];
    this.data.changeName = e.detail.value;
    this.data.inputFlag = e.detail.cursor;
    console.log("formData",this.data.formData);
},
formInputChange1(e) {
  const {field} = e.currentTarget.dataset;
  let property = `${field}`;
  if(property === "name" || property === "mobile" || property === "idcard"){
    this.setData({
      [`formData1.${field}`]: e.detail.value,
      [`person.${field}`]: e.detail.value
    })
  }
  console.log("formData1",this.data.formData1);
  console.log("e.detail.value",e.detail.value);
},
bindTimeChange: function (e) {
  this.setData({
    time: e.detail.value
  })
},
bindCountryCodeChange: function(e){
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
        countryCodeIndex: e.detail.value
    })
},
bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
        countryIndex: e.detail.value
    })
},
bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
        accountIndex: e.detail.value
    })
},
bindAgreeChange: function (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
},
submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })

            }
        } else {
            wx.showToast({
                title: '校验通过'
            })
        }
    })
},
onLoad() {
  var that = this;
  that.initValidate();
  that.setData({
      selectFile: that.selectFile.bind(that),
      uplaodFile: that.uplaodFile.bind(that)
  }),
  // 查看是否授权
  wx.getSetting({
      success: function(res) {
          if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                  success: function(res) {
                      // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                      // 根据自己的需求有其他操作再补充
                      // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                      wx.login({
                          success: res => {
                              // 获取到用户的 code 之后：res.code
                              console.log("用户的code:" + res.code);
                              // 可以传给后台，再经过解析获取用户的 openid
                              // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                              wx.request({
                                  // 自行补上自己的 APPID 和 SECRET
                                  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3fb17315e775a5a1&secret=721dc217d6e2c34b6b1997ad36d13872&js_code=' + res.code + '&grant_type=authorization_code',
                                  success: res => {
                                      // 获取到用户的 openid
                                      console.log("用户的openid:" + res.data.openid);
                                  }
                              });
                          }
                      });
                  }
              });
          } else {
              // 用户没有授权
              // 改变 isHide 的值，显示授权页面
              that.setData({
                  isHide: true
              });
          }
      }
      });
},
chooseImage: function (e) {
  var that = this;
  wx.chooseImage({
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    // sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
    // sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        console.log("res",res);
        that.setData({
            files: that.data.files.concat(res.tempFilePaths)
        });
        // this.data.chooseFile = files;
        // that.uplaodFile(files,e);
    }
  })
},
previewImage: function(e){
  console.log("e",e);
  wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
  })
},
selectFile(files) {
  console.log('files', files)
  let addArray = {};
  if(files){
    // this.data.base64 = wx.getFileSystemManager().readFileSync(files.tempFilePaths[0], 'base64');
    if(this.data.personImgIndex !== undefined){
      console.log("this.data.personImgIndex",this.data.personImgIndex);
      addArray.id = this.data.personImgIndex;
    }
    addArray.name = this.data.idImg;
    // addArray.code = this.data.base64;
    addArray.code = files.tempFilePaths[0];
    // newArray = this.data.selectImg;
    this.data.arrImg.push(addArray);
    console.log("addArray",addArray);
    console.log("arr",this.data.arrImg);
  }
  // 返回false可以阻止某次文件上传
},
uplaodFile(files,e) {
  console.log('upload files', files)
  // 文件上传的函数，返回一个promise
  // wx.uploadFile({  
  //   url: '',  
  //   header: {
  //     'content-type': 'multipart/form-data'
  //    },
  //   filePath: files,  
  //   name: 'filename',  //上传后台的图片字段名称
  //   // formData: adds,   
  //   success: function (res) {  
  //     console.log("res",res)  
  //     if (res) {  
  //       wx.showToast({  
  //         title: '已提交发布！',  
  //         duration: 3000  
  //       });  
  //     }  
  //   }  
  // })  
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('some error')
      }, 1000)
  })
},
uploadError(e) {
  console.log('upload error', e.detail);
  if(e.target.id === "register"){
    console.log("非首页");
    this.register = this.data.files;
  } else if(e.target.id === "fpregister"){
    console.log("首页");
  }
},
uploadSuccess(e) {
  console.log('upload success', e.detail)
  if(e.target.id === "register"){
    console.log("非首页");
  } else if(e.target.id === "fpregister"){
    console.log("首页");
  }
},
showRegister(e) {
  console.log("showe",e);
  console.log("lvlvlvlvl",e.currentTarget.dataset.imgtext);
  if(e.currentTarget.dataset.imgtext !== undefined){
    // this.data.personImgIndex = e.currentTarget.dataset.imgtext;
    this.data.personImgIndex = this.data.personIndex;
    console.log("this.data.personImgIndex",this.data.personImgIndex);
  }
  if(e.currentTarget.id === "register"){
    this.data.idImg = "register";
    console.log("this.data.idImg",this.data.idImg);
  }
},
showFpregister(e) {
  if(e.currentTarget.id === "fpregister"){
    this.data.idImg = "fpregister";
  }
},
modalinput: function () {
  this.setData({
    hiddenmodalput: !this.data.hiddenmodalput
  })
},
//取消按钮
cancel: function () {
  this.setData({
    hiddenmodalput: true
  });
},
//确认
confirm: function () {
  this.setData({
    hiddenmodalput: true
  })
},
onChangeShowState: function () {
  var that = this;
  that.setData({
    showView: (!that.data.showView)
  })

},
// 弹框
powerDrawer: function(e) {
  // wx.removeStorage({
  //   key: 'key',
  //   success (res) {
  //     console.log(res)
  //   }
  // })
  if(this.data.showConStatus && !e.target.dataset.text){
    this.data.showAddPower = true;
    console.log("点击到按钮")
    console.log("this.data.altIndex点击",this.data.altIndex);
    // wx.removeStorageSync('userText'+this.data.altIndex);
    this.setData({
      altName:'',
      wchecked:false,
      mchecked:false
    })
    
  }
  this.data.showConStatus = false;
  var currentStatu = e.currentTarget.dataset.statu;
  this.util(currentStatu)
},
util: function(currentStatu) {
  /* 动画部分 */
  // 第1步：创建动画实例   
  var animation = wx.createAnimation({
    duration: 200, //动画时长  
    timingFunction: "linear", //线性  
    delay: 0 //0则不延迟  
  });

  // 第2步：这个动画实例赋给当前的动画实例  
  this.animation = animation;

  // 第3步：执行第一组动画  
  animation.opacity(0).rotateX(-100).step();

  // 第4步：导出动画对象赋给数据对象储存  
  this.setData({
    animationData: animation.export()
  })

  // 第5步：设置定时器到指定时候后，执行第二组动画  
  setTimeout(function() {
    // 执行第二组动画  
    animation.opacity(1).rotateX(0).step();
    // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
    this.setData({
      animationData: animation
    })
    //关闭  
    if (currentStatu == "close") {
      this.setData({
        showModalStatus: false
      });
      // wx.showToast({
      //   title: '添加成功',
      //   icon: 'succes',
      //   duration: 1000,
      //   mask: true
      // })
    }
  }.bind(this), 200)
  // 显示  
  if (currentStatu == "open") {
    this.setData({
      showModalStatus: true
    });
  }
},
/**
 * 弹出框蒙层截断touchmove事件
 */
preventTouchMove: function () {
},
/**
 * 隐藏模态对话框
 */
hideModal: function () {
  this.setData({
    showModalStatus: false
  });
},
/**
 * 对话框取消按钮点击事件
 */
onCancel: function () {
  this.hideModal();
},
/**
 * 对话框确认按钮点击事件
 */
onConfirm: function (e) {
  this.setData({
    showFamStatus: true
  })
  if (this.data.showConStatus === true) {
      let newArray = [];
      if(!this.data.checkFlag && !this.data.inputFlag){
      } else {
        for (let i in this.data.obj) {
          if(this.data.altIndex === this.data.obj[i].id) {
            if(this.data.inputFlag){
              this.data.obj[i].name = this.data.changeName;
            }
            if(this.data.checkFlag && this.data.changeSex.id === this.data.altIndex){
              if(this.data.changeSex.sex === "woman") {
                this.data.obj[i].sex = "女";
              } else if(this.data.changeSex.sex === "man"){
                this.data.obj[i].sex = "男";
              }
            }
          }
          newArray.push(this.data.obj[i]);
          // let key = 'userText'+this.data.altIndex;
          // wx.removeStorage({key});
          // wx.setStorageSync('userText'+this.data.altIndex, newArray);
        }
      }
      console.log("newArray",newArray);
  }
  this.hideModal();
  if(!this.data.checkFlag && !this.data.inputFlag){
  }else{
    this.onTapAdd();
  }
  this.data.formData = {};
  this.data.person1 = {};
  // this.data.person1 = {};
  // this.data.currentData = newArray;
  // this.data.currentIndex.push(this.data.altIndex);
},
onTapAdd:function(e){
  console.log("我加载进来啦");
  if(this.data.person1){
    this.data.member.push(this.data.person1);
    this.data.person1.id = this.data.personIndex;
    this.data.personIndex++;
  }
  console.log("this.data.personIndex",this.data.personIndex);
  var temp=this.data.obj;
  var data = this.data.formData;
  var length = this.data.obj.length;
  if(data.checkbox === "woman") {
    var sex = "女";
  }else if(data.checkbox === "man"){
    var sex = "男";
  }
  var resultObj = {
    id: length,
    name: data.name,
    sex: sex
  }
  // this.data.altCount !== 1
  if(this.data.showConStatus === true && this.data.showFamStatus === true){
    console.log("点击确定又回来了");
    let key = 'userText' + this.data.altIndex;
    let newArray = {};
    for (let i in this.data.obj) {
      if(this.data.altIndex === this.data.obj[i].id){
        let select = this.data.obj[i];
        newArray.name = select.name;
        if (select.sex === "女") {
          newArray.checkbox = "woman";
        } else if(select.sex === "男") {
          newArray.checkbox = "man";
        }
        wx.removeStorage({key});
        wx.setStorageSync(key, newArray);
        this.data.personAlt = newArray;
        console.log("dina",newArray);
        // this.data.personIndex = index;
        let altPerson = []; 
        if(this.data.member){
          for(let i in this.data.member){
            if(this.data.altIndex != this.data.member[i].id){
              altPerson.push(this.data.member[i]);
            }
          }
          // altPerson.push(newArray);
          this.data.member = altPerson;
        }
        // console.log("indexdel",index);
        console.log("altPerson",altPerson);
      }
    }
    // let select = this.data.obj[this.data.altIndex];
    // console.log("this.data.obj",this.data.obj);
    // console.log("this.data.altIndex",this.data.altIndex);
  }else{
    if(resultObj.name && resultObj.sex){
      console.log("没点确定");
      temp.push(resultObj);
      let id = resultObj.id;
      let key = 'userText'+id;
      wx.removeStorage({key});
      wx.setStorageSync('userText'+id, this.data.formData);
      console.log("this.data.formData",this.data.formData);
    }
  }
  console.log("temp",temp);
  this.setData({
    obj:temp
  })
},
onTapDel: function(e) {
  let that = this;
  let index = e.target.dataset.text; //数组下标
  let arrayLength = that.data.obj.length;//数组长度
  let newArray = [];
  let delArray = [];
  if(this.data.person1) {
    for(let i in this.data.member){
      if(index != this.data.member[i].id){
        delArray.push(this.data.member[i]);
      }
    }
    this.data.member = delArray;
  }
  // if (arrayLength > 0) {
    console.log("that.data.obj",that.data.obj);
    for (let i in that.data.obj) {
      if(index !== that.data.obj[i].id) {
        newArray.push(that.data.obj[i])
      }
    }
    that.setData({
      obj: newArray
    })
    console.log("newArray",newArray)
  // } 
},
onTapAlt: function(e){
  console.log("进修改啦");
  this.data.altCount++;
  this.data.altIndex = e.target.dataset.text;
  console.log("this.data.showAddPower",this.data.showAddPower);
  console.log("memberalt",this.data.member);
  console.log("this.data.Index",this.data.altIndex);
  console.log("altperson",this.data.person1);
  this.data.test.push(this.data.person1);
  console.log("test",this.data.test[0].name);
  console.log("test",this.data.test);
  if(this.data.person1){
    for(let i in this.data.member){
      if(this.data.altIndex == this.data.member[i].id){
        // for(let key in this.data.personAlt){
        //   console.log("key",key)
        // }
      }
    }
  }
  
  if(this.data.altCount === 1 || (!this.data.showConStatus && (this.data.inputFlag  || this.data.checkFlag))){
    console.log("this.data.inputFlag",this.data.inputFlag);
    console.log("this.data.checkFlag",this.data.checkFlag);
    console.log("没点击确定但是有输入");
    let newArray={};
    console.log("this.data.altIndex",this.data.altIndex);
    console.log("this.data.obj",this.data.obj);
    for (let i in this.data.obj) {
      if(this.data.altIndex === this.data.obj[i].id) {
        newArray.name = this.data.obj[i].name;
        console.log("name",newArray.name);
        console.log("changeSex",this.data.obj);
        if(this.data.altIndex === this.data.obj[i].id){
          console.log("进入选择性别");
          console.log("object",this.data.obj[i]);
          if (this.data.obj[i].sex === "女") {
            newArray.checkbox = "woman";
          } else if(this.data.obj[i].sex === "男"){
            newArray.checkbox = "man";
          }
        }
      }
    }
    let key = 'userText'+this.data.altIndex;
    wx.removeStorage({key});
    wx.setStorageSync('userText'+this.data.altIndex, newArray);
    console.log("altarray",newArray);
  }
  this.data.inputFlag = '';
  this.data.checkFlag = '';
  let index = e.target.dataset.text; //数组下标
  this.data.userText = wx.getStorageSync('userText'+index);
  this.powerDrawer(e);
  const self = this;
  self.setData({
    showConStatus: true
  })
  console.log("index",self.data.altIndex);
  console.log("userText",self.data.userText);
  if (self.data.userText) {
      // self.data.formData = userText
      console.log("第一次进来了修改");
      self.data.altName = self.data.userText.name;
      if(self.data.userText.checkbox === "man") {
        self.data.wchecked = false;
        self.data.mchecked = true;
      }else if(self.data.userText.checkbox === "woman"){
        self.data.mchecked = false;
        self.data.wchecked = true;
      }
      // console.log("self.data",self.data);
      self.setData(self.data);
  }
},
bindGetUserInfo: function(e) {
  if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
          isHide: false
      });
  } else {
      //用户按了拒绝按钮
      wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                  console.log('用户点击了“返回授权”');
              }
          }
      });
  }
},
formSubmit: function(e){
//  console.log("checkperson",this.data.person);
//  let params = e.detail.value;
//  if (!this.WxValidate.checkForm(params)) {
//   //表单元素验证不通过，此处给出相应提示
//     let error = this.WxValidate.errorList[0];
//     switch (error.param) {
//         case "Name":
//           //TODO
//           break;
//         case "sex":
//          //TODO
//           break;
//         case "birthDate":
//          //TODO
//           break;
//         case "Card":
//          //TODO
//           break;
//       }
//     return false;
//   }
  this.data.copyPerson = this.data.person;
  let altMember  = [];
  //更新填写人的信息
  if(this.data.copyPerson){
    for(let i in this.data.member){
      if(this.data.copyPerson !== this.data.member[i]){
        altMember.push(this.data.member[i]);
      }
    }
    this.data.member = altMember;
  }
  // for(let i in this.data.member) {
  //   delete this.data.member[i].id;
  // }
  // delete this.data.member.id;
  this.data.member.push(this.data.person);
  // let testArray = [];
  // let testArray1 = [];
  let len = this.data.member.length;
  for(let i in this.data.member){
    this.data.member[i].image = [];
  }
  for(let i in this.data.arrImg){
    if(this.data.arrImg[i].id === ""){
      this.data.member[len-1].image.push(this.data.arrImg[i]);
    }else if(this.data.arrImg[i].id !== "") {
      for(let j in this.data.member){
        if(this.data.member[j].id === this.data.arrImg[i].id){
          this.data.member[j].image.push(this.data.arrImg[i]);
        }
      }
    }
  }
  this.uploadImg();
  console.log("person",this.data.person);
  console.log("person1",this.data.person1);
  console.log("resultmember", this.data.member);
  // let that = this;
  // let info = {
  //   name: "lalalallaala"
  // };
  // wx.request({
  //   url: 'https://192.168.100.145/api/values',
  //   data: JSON.stringify(info),
  //   header: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   method: "GET",
  //   dataType: "json",
  //   success: function (res) {
  //     console.log("RES",res);
  //   }
  // })
},
uploadImg:function(){//这里触发图片上传的方法
  // var pics=this.data.pics;
  app.uploadImg({
   url:'https://........',//图片上传的接口
   path:this.data.arrImg//这里是选取的图片的地址数组
  });
 },
success: function(e){
  console.log("photoe",e);
  console.log("this.data.personIndex",this.data.personIndex);
  let addArray = {};
  console.log("e.currentTarget.dataset.imgtext",e.currentTarget.dataset.idcardtext);
  if(e.currentTarget.dataset.idcardtext !== undefined){
    addArray.id = this.data.personIndex;
    console.log("chengyuan");
  } else {
    addArray.id = "";
    console.log("feicheng");
  }
  // console.log("e.detail.id.text",e.detail.id.text)
  // this.data.base64 = wx.getFileSystemManager().readFileSync(e.detail.image_path, 'base64');
  if(e.detail.id){
    this.data.idCardId = e.detail.id.text;
    addArray.idCardId = this.data.idCardId;
    addArray.name = "idCardFront";
  }else{
    addArray.idCardId = this.data.idCardId;
    addArray.name = "idCardBack";
  }
  // addArray.code = this.data.base64;
  addArray.code = e.detail.image_path;
  this.data.test = e.detail.image_path;
  this.data.arrImg.push(addArray);
  console.log("idcard",addArray);
  // console.log("arr1",this.data.arrImg);
},
initValidate() {
  let rules = {
    Name: {
      required: true,
      maxlength: 10
    },
    sex: {
      required: true,
      number: true
    }
    ,
    birthDate: {
      required: true,
      dateISO: true,
    }, 
    Card: {
      required: false,
      idcard: true
    }
  }
  let message = {
    Name: {
      required: '请输入姓名',
      maxlength: '名字不能超过10个字'
    },
    Card: {
      idcard: "请输入正确的身份证号码"
    },
    sex: {
      required: "请选择您的性别",
      number: '请您选择您的性别'
    }
    ,
    birthDate: {
      required: "请选择出生年月",
      dateISO: "请选择出生年月",
    },
  }
  //实例化当前的验证规则和提示消息
  this.WxValidate = new WxValidate(rules, message);
}
// previewCardImage: function (e) {
//   var current = e.target.dataset.src;
//   if(this.data.test){
//     wx.previewImage({
//       current: current, // 当前显示图片的http链接  
//       urls: this.data.test // 需要预览的图片http链接列表  
//     })
//   }

// }
})

