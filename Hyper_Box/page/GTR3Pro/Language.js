import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    hmUI.setLayerScrolling(false)
    const LOCALE_OPTIONS = [
      ["简体中文", "zh-CN", 0],
      ["繁體中文", "zh-TW", 1],
      ["English", "en", 2],
    ]
    const LOCALE_OPTIONS2 = [
      ["简中", "zh-CN", 0],
      ["繁中", "zh-TW", 1],
      ["English", "en-US", 2],
    ]
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
      text: '手环语言'
    })

    for (let i = 0;i<LOCALE_OPTIONS.length;i++){
      hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 15,
          y: i * 66 + 124,
          w: 162,
          h: 59,
          color: 0xFFF4F4,
          normal_color: 0x222222,
          press_color: 0x101010,
          text_size: 20,
          radius: 15,
          text: LOCALE_OPTIONS2[i][0] + ' ' + LOCALE_OPTIONS2[i][1],
          click_func: () => {
              setSystemLocale(LOCALE_OPTIONS[i][1],LOCALE_OPTIONS[i][2])
              hmUI.showToast({text:`${'已成功将系统语言设置为'}${LOCALE_OPTIONS[i][0]}`})
          }
        })
    }
    //---------------------------------函数部分-------------------------------------
    function setSystemLocale(str_val, code_val) {
      hmFS.SysProSetInt("settings_language_follow_phone", 0)
      hmFS.SysProSetChars("locale.name", str_val);
      hmFS.SysProSetInt("settings_data_language", code_val);
      hmApp.startApp({url: "Settings_systemScreen", native: true});
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
