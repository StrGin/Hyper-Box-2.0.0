import { createSmoothTimer } from "../smoothTimer"
import { pageInit, gotoPage} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    hmUI.setLayerScrolling(false)
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let brightness = globalData.brightness
    let fps = 1
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
      x: 131,
      y: 119,
      w: 62,
      h: 40,
      color: 0xFFFFFF,
      text_size: 20.67,
      text: '亮度'
    })
    var brightness_view = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 134,
      y: 146,
      w: 62,
      h: 40,
      color: 0x959595,
      text_size: 20.67,
      text: brightness
    })
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 134,
      y: 185,
      w: 44,
      h: 170,
      radius: 12,
      color: 0x222222
    }).addEventListener(hmUI.event.MOVE, function (info) {
        slide_ball_brightness.setProperty(hmUI.prop.Y, info.y)
        slide_ball_brightness.setProperty(hmUI.prop.H,370 - info.y)
        hmSetting.setBrightness(Math.round((370 - info.y) / 1.85))
        globalData.brightness = Math.round((370 - info.y) / 1.85)
        brightness_view.setProperty(hmUI.prop.TEXT,brightness)
    })
    var slide_ball_brightness = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 134,
      y: 370 - brightness * 1.85,
      w: 44,
      h: brightness * 1.85,
      radius: 12,
      color: 0xFFFFFF
    })
    slide_ball_brightness.addEventListener(hmUI.event.MOVE, function (info) {
        slide_ball_brightness.setProperty(hmUI.prop.Y, info.y)
        slide_ball_brightness.setProperty(hmUI.prop.H,370 - info.y)
        hmSetting.setBrightness(Math.round((370 - info.y) / 1.85))
        globalData.brightness = Math.round((370 - info.y) / 1.85)
        brightness_view.setProperty(hmUI.prop.TEXT,brightness)
    })

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 16,
      y: 119,
      w: 62,
      h: 40,
      color: 0xFFFFFF,
      text_size: 20.67,
      text: '帧率'
  });

  var fps_view = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 32,
      y: 146,
      w: 62,
      h: 40,
      color: 0x959595,
      text_size: 20.67,
      text: globalData.fps
  });

  hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 16,
      y: 185,
      w: 44,
      h: 170,
      radius: 12,
      color: 0x222222
  }).addEventListener(hmUI.event.MOVE, function(info) {
    slider_ball_fps.setProperty(hmUI.prop.Y, info.y)
    slider_ball_fps.setProperty(hmUI.prop.H,370 - info.y)
    fps = Math.round((370 - info.y) / 1.85)
    globalData.fps = fps
    fps_view.setProperty(hmUI.prop.TEXT,fps)
  });

  var slider_ball_fps = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 16,
      y: 370 - globalData.fps * 1.85,
      w: 44,
      h: globalData.fps * 1.85,
      radius: 12,
      color: 0xFFFFFF
  });

  slider_ball_fps.addEventListener(hmUI.event.MOVE, function(info) {
    slider_ball_fps.setProperty(hmUI.prop.Y, info.y)
    slider_ball_fps.setProperty(hmUI.prop.H,370 - info.y)
    fps = Math.round((370 - info.y) / 1.85)
    globalData.fps = fps
    fps_view.setProperty(hmUI.prop.TEXT,fps)
  });
  hmUI.createWidget(hmUI.widget.BUTTON, {
    x: 33,
    y: 372,
    w: 126,
    h: 65,
    text: '确定',
    normal_color: 0x4E87FF,
    press_color: 0x0050F7,
    color: 0xFFFFFF,
    radius: 35,
    text_size: 24.67,
    click_func: () => {
      hmApp.goBack()
    }
  })
    //---------------------------------函数部分-------------------------------------
    new createSmoothTimer(
      1000,
      1000,
      () => {
        console.log(fps);
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
      })
     }
    })
  }
})