import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    const diskInfo = hmSetting.getDiskInfo()
    const deviceInfo = hmSetting.getDeviceInfo()
    //---------------------------------控件部分-------------------------------------
    const time_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 66,
      y: 26,
      w: 62,
      h: 40,
      color: 0xFFFFFF,
      text_size: 22.67,
      text: time_view
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 66,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: '系统信息'
    })
    hmUI.createWidget(hmUI.widget.TEXT,{
      x: 19,
      y: 134,
      w: 20000,
      h: 9000,
      color: 0xffffff,
      text_style: hmUI.text_style.WRAP,
      text_size: 17,
      text:
`自动亮度：${hmSetting.getScreenAutoBright() ? '开启' : '关闭'}
屏幕亮度：${hmSetting.getBrightness()}


年龄：${hmSetting.getUserData().age} 
身高：${returnFloat(hmSetting.getUserData().height)} m
体重：${hmSetting.getUserData().weight} kg
性别：${bg(hmSetting.getUserData().gender)}
姓名：${hmSetting.getUserData().nickName}
账号地址：${region(hmSetting.getUserData().region)}


距离单位：${hmSetting.getMileageUnit() ? '英制' : '公制'}
体重单位：${getWeightUnit(hmSetting.getWeightUnit())}


账号语言：${language(hmSetting.getLanguage())}
时间顺序：${getDateFormat(hmSetting.getDateFormat())}
时间制：${hmSetting.getTimeFormat() ? '24 小时制' : '12 小时制'}


总空间：${(diskInfo.total / 1024 / 1024).toFixed(2)} MB
剩余空间：${(diskInfo.free / 1024 / 1024).toFixed(2)} MB
APP占用：${(diskInfo.app / 1024 / 1024).toFixed(2)} MB
表盘占用：${(diskInfo.watchface / 1024 / 1024).toFixed(2)} MB
音乐占用：${returnFloat(diskInfo.music / 1024 / 1024)} MB
系统占用：${(diskInfo.system / 1024 / 1024).toFixed(2)} MB


屏幕宽度：${deviceInfo.width}
屏幕高度：${deviceInfo.height}
屏幕形状：${deviceInfo.screenShape ? '圆屏' : '方屏'}
设备名称：${deviceInfo.deviceName}
按键数目：${deviceInfo.keyNumber}
设备代号：${deviceInfo.deviceSource}


体重目标：${returnFloat(hmSetting.getWeightTarget())} kg
睡眠目标：${hmSetting.getSleepTarget()} 分


连接状态：${hmBle.connectStatus() ? '是': '否'}
`
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 118,
      w: 175,
      h: 86,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 221,
      w: 175,
      h: 179,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 423,
      w: 175,
      h: 71,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 523,
      w: 175,
      h: 98,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 650,
      w: 175,
      h: 170,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 849,
      w: 175,
      h: 179,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 1045,
      w: 175,
      h: 79,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: 9,
      y: 1141,
      w: 175,
      h: 64,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    //---------------------------------函数部分-------------------------------------
      function bg (number) {
      if (!number) return '男'
      else if (number == 1) return '女'
      return '未知'
    }
      function region(languageCode) {  
        const languageMap = {'zh-CN':'中国','zh-TW':'中国台湾','en-US':'美国','es-ES':'西班牙','ru-RU':'俄罗斯','ko-KR':'韩国','fr-FR':'法国','de-DE':'德国','id-ID':'印度尼西亚','pl-PL':'波兰','it-IT':'意大利','ja-JP':'日本','th-TH':'泰国','ar-EG':'埃及','vi-VN':'越南','pt-PT':'葡萄牙','nl-NL':'荷兰','tr-TR':'土耳其','uk-UA':'乌克兰','iw-IL':'以色列','pt-BR':'巴西','ro-RO':'罗马尼亚','cs-CZ':'捷克','el-GR':'希腊','sr-RS':'塞尔维亚','ca-ES':'加泰罗尼亚','fi-FI':'芬兰','nb-NO':'挪威','da-DK':'丹麦','sv-SE':'瑞典','hu-HU':'匈牙利','ms-MY':'马来西亚','sk-SK':'斯洛伐克','hi-IN':'印度'}
        return languageMap[languageCode]
      }  
      function language(index) {  
        const languages = ['简体中文','繁体中文（中国台湾）','英语（美国）','西班牙语（西班牙）','俄语（俄罗斯）','韩语（韩国）','法语（法国）','德语（德国）','印度尼西亚语','波兰语（波兰）','意大利语（意大利）','日语（日本）','泰语','阿拉伯语（埃及）','越南语','葡萄牙语（葡萄牙）','荷兰语','土耳其语（土耳其）','乌克兰语','希伯来语（以色列）','葡萄牙语（巴西）','罗马尼亚语','捷克语','希腊语','塞尔维亚语（拉丁文）','加泰罗尼亚语','芬兰语','挪威语','丹麦语','瑞典语','匈牙利语','马来语','斯洛伐克语','印地语'];
        return languages[index];     
      }  
      function getDateFormat(index) {
        if (!index) return '年-月-日'
        if (index == 1) return '日-月-年'
        return '月-日-年'
      }
      function getWeightUnit(index) {
        if (!index) return '千克'
        switch (index) {
          case 1: return '斤'
          case 2: return '磅'
          case 3: return '石'
        }
      }
    function returnFloat(value) {
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
          value = value.toString() + ".00";
          return value;
      }
      if (xsd.length > 1) {
          if (xsd[1].length < 2) {
              value = value.toString() + "0";
          } else {
              value = value.toString().substr(0, value.toString().indexOf(".") + 3);
          }
          return value;
      }
  }
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
      })
    }
  })
  }
})
