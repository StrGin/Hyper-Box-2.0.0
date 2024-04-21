import { Fx } from "../fx"
Page({
  build() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'backbround.png'
    })
    const group = hmUI.createWidget(hmUI.widget.GROUP,{
      x: 0,
      y: 0,
      w: 192,
      h: 480
    })
    group.createWidget(hmUI.widget.TEXT, {
      x: 31,
      y: 180,
      w: 180,
      h: 27,
      color: 0xffffff,
      text_size: 20,
      text: '新设计·新体验'
    })
    const hyper = group.createWidget(hmUI.widget.TEXT, {
      x: 16,
      y: 213,
      w: 188,
      h: 84,
      color: 0xffffff,
      text_size: 35,
      text: 'Hyper Box'
    })
    group.createWidget(hmUI.widget.TEXT, {
      x: 78,
      y: 277,
      w: 188,
      h: 84,
      color: 0xffffff,
      text_size: 12,
      text: 'v2.0.0'
    })
let fx = new Fx({
    begin: 0,
    end: 480,
    fps: 120,
    time: 2,
     style: Fx.Styles.EASE_IN_OUT_QUAD,
     onStop() {
       console.log("anim stop");
     },
      func: (result) => group.setProperty(hmUI.prop.Y, 480 - result),
});
fx.restart();
hyper.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
  hmApp.gotoPage({url:'page/GTR3Pro/index'})
})
  }
})