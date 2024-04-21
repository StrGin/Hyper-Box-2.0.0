App({
  globalData: {
    time_func () {     
      const time = hmSensor.createSensor(hmSensor.id.TIME);
      let formattedMinute = (time.minute < 10) ? '0' + time.minute.toString() : time.minute.toString();
      return (time.hour < 10) ? '0' + time.hour.toString() : time.hour.toString() + ':' + formattedMinute;
  }
  },
  onCreate() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 192,
      y: 0,
      w: 1,
      h: 480,
      color: 0xfc6950
    })
  }
})