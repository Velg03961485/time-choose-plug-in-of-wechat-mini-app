# time-choose-plug-in-of-wechat-mini-app
这里面包涵了，小程序的时间选择组件，包括年月日时分秒，年月日，年月，年四种类型，同时还有额外副篇，如何使用filter.wxs过滤器，进行时间类型格式相互转换


使用方式：
这里是components 组件

~1.first  在使用的文件的json 中，注入组件信息

	
  "usingComponents": {
    "date-picker": "../../components/date-picker/date-picker",
    "month-picker": "../../components/month-picker/month-picker",
    "day-picker": "../../components/day-picker/day-picker"
  }
引入组件的地址


~2.second 在wxml 文件中，写入组件


<!-- 年月日份选择 -->
<date-picker
    id="date-picker"
    value="{{datePickerValue}}" 
    isShow="{{datePickerIsShow}}"
    bindsureclick="datePickerOnSureClick"
    bindcancelclick="datePickerOnCancelClick" />


<!-- 月份选择 -->
<month-picker
    id="month-picker"
    value="{{monthPickerValue}}" 
    isShow="{{monthPickerIsShow}}"
    bindsureclick="monthPickerOnSureClick"
    bindcancelclick="monthPickerOnCancelClick" />


<!-- 年选择 -->
<day-picker
    id="day-picker"
    value="{{dayPickerValue}}" 
    isShow="{{dayPickerIsShow}}"
    bindsureclick="dayPickerOnSureClick"
    bindcancelclick="dayPickerOnCancelClick" />

~3.third 在js中data中默认参数，同时写入调用函数

data中
// 时间选择
    choseDate: '请选择时间',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    // 月份选择
    monthPickerValue: ['', ''],
    monthPickerIsShow: false,
    // 年选择
    dayPickerValue: [''],
    dayPickerIsShow: false,


函数，只写一个案例，方法一样，只是函数名称和返回的timeText改变了

 choseDatePicker: function (e) {
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    this.setData({
      timeText: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function (event) {
    this.setData({
      datePickerIsShow: false,
    });
  },

![image](https://github.com/Velg03961485/time-choose-plug-in-of-wechat-mini-app/blob/master/img/b830938b65fddd409fbda6dcb157ee6.png)







