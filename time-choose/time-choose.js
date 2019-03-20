// components/time-shoose/time-choose.js
// const app = getApp();

const date = new Date();

const hours = []; 

const minutes = [];

const seconds = [];

for (let i = 0; i <= 23; i++) {

  hours.push(i)

}

for (let i = 0; i <= 59; i++) {

  minutes.push(i)

}

for (let i = 0; i <= 59; i++) {

  seconds.push(i)

}

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
	/**
	 * 组件的属性列表
	 */
  properties: {

  },

	/**
	 * 组件的初始数据
	 */
  data: {
    isScreening: ['', 'screening-animation-open', 'screening-animation-closed'],//筛选动画状态

    screeningNo: 0, //筛选动画的选择项

    pleaseChoseTime: "请选择",

    choseIndexYear: '', //选中的下标

    isShow: false, //下面是否显示

    isShowBJ: false, //背景是否显示

    isShowData: false, //年月日

    isShowTime: false, //时分

    years: [], //年集合

    // year: '',
    year: new Date().getFullYear(),
    months: [], //月集合

    // month: '',
    month: new Date().getMonth(),
    days: [], //日集合

    // day: '',
    day: new Date().getDate(),
    hours: hours,

    // hour: '', //本时
    hour: new Date().getHours(), //本时
    minutes: minutes,

    // minute: '', //本分
    minute: new Date().getMinutes(), //本分
    seconds: seconds,

    // second:'',  //本秒
    second: new Date().getSeconds(),  //本秒
    valueYear: [], //初始选择年

    valueMonth: [], //初始选择月

    valueDay: [], //初始选择日

    // valueTime: [], //时分选择
    valueTime: [new Date().getHours(), '', new Date().getMinutes(), '', new Date().getSeconds()], //时分选择
  },

	/**
	 * 组件的方法列表
	 */
  methods: {
    //点击请选择 弹出

    pleaseChose: function () {
      console.log('date')
      var that = this;

      that.setData({

        screeningNo: 1, //动画开始

        isShow: true,

        isShowBJ: true,

        isShowData: true,

        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      })

    },
    //点击确认 弹回

    sureTime: function () {

      var that = this;

      var curYear = that.data.years[that.data.valueYear];
      console.log(curYear);

      var curMonth = that.data.months[that.data.valueMonth];

      if (curMonth < 10) {

        curMonth = '0' + curMonth

      }

      var curDay = that.data.days[that.data.valueDay];

      if (curDay < 10) {

        curDay = '0' + curDay

      }

      var curhour = that.data.hour;

      if (curhour < 10) {

        curhour = '0' + curhour

      }

      var curminute = that.data.minute;

      if (curminute < 10) {

        curminute = '0' + curminute

      }
      // 确认返回秒
      var cursecond = that.data.second;

      if (cursecond < 10) {
        cursecond = '0' + cursecond
      }

      that.setData({

        pleaseChoseTime: curYear + '-' + curMonth + '-' + curDay + ' ' + curhour + ':' + curminute + ':' + cursecond,

        screeningNo: 2, //动画结束

      })
      let backTime = curYear + '-' + curMonth + '-' + curDay + ' ' + curhour + ':' + curminute + ':' + cursecond
      console.log(backTime);
      this.triggerEvent('sureclick', {
        value: backTime,
      });

      setTimeout(function () {

        that.setData({

          isShow: false,

          isShowBJ: false,

          isShowData: false,

          isShowTime: false,

        })

      }, 310)

    },
    //点击取消 弹回

    cancelTime: function () {
      console.log(new Date().getFullYear())

      var that = this;

      that.setData({

        screeningNo: 2, //动画结束

      })

      setTimeout(function () {

        that.setData({

          isShow: false,

          isShowBJ: false,

          isShowData: false,

          isShowTime: false,

        })

      }, 310)

    },
    attached: function () {

      var that = this;

      var years = [];

      var months = [];

      var days = [];

      for (let i = 2000; i <= date.getFullYear() + 10; i++) {

        years.push(i);

        if (i == date.getFullYear()) {

          that.setData({

            valueYear: [i - 2000],

            year: i

          })

          // console.log(that.data.valueYear)

        }

      }

      for (let i = 1; i <= 12; i++) {

        months.push(i);

        if (i == date.getMonth() + 1) {

          that.setData({

            valueMonth: [i - 1],

            month: i,

          })

        }

      }

      days = that.getDays(date.getFullYear(), date.getMonth() + 1);

      that.setData({

        years: years,

        months: months,

        days: days

      });

    },
    //日

    getDays(year, month) {

      var that = this

      var days = [];

      month = parseInt(month, 10);

      var mydate = new Date(year, month, 0);

      var maxDay = mydate.getDate();

      for (let i = 1; i <= maxDay; i++) {

        days.push(i);

        if (i == date.getDate()) {

          that.setData({

            valueDay: [i - 1],

            day: i

          })

        }

      }

      return days;

    },
    //改变年

    bindChangeYear: function (e) {

      var that = this;

      //年改变，月日要滑到一月，天要重新计算该年该月多少天

      var days = [];

      var curYear = that.data.years[e.detail.value];

      days = that.getDays(curYear, 1);

      that.setData({

        days: days,

        valueYear: e.detail.value,

        valueMonth: [0],

        valueDay: [0],

        year: that.data.years[e.detail.value]

      });

    },
    //改变月

    bindChangeMonth: function (e) {

      var that = this;

      var days = [];

      var curYear = that.data.years[that.data.valueYear];

      var curMonth = that.data.months[e.detail.value];

      days = that.getDays(curYear, curMonth);

      that.setData({

        days: days,

        valueMonth: e.detail.value,

        valueDay: [0],

        month: that.data.months[e.detail.value]

      });

    },
    //改变日

    bindChangeDay: function (e) {

      var that = this;

      that.setData({

        valueDay: e.detail.value,

        day: that.data.days[e.detail.value]

      });

    },
    //时分-秒

    bindChangeTime: function (e) {

      var that = this;

      that.setData({

        hour: e.detail.value[0],

        minute: e.detail.value[2],

        second: e.detail.value[4],

        valueTime: [e.detail.value[0], '', e.detail.value[2], '', e.detail.value[4]]

      });

    },

    //选择 年月日

    choseData: function () {

      var that = this;

      that.setData({

        isShowData: true,

        isShowTime: false,

      })

    },

    //选择 时分

    choseTime: function () {

      var that = this;

      that.setData({

        isShowData: false,

        isShowTime: true,

      })

    },
  }
})
