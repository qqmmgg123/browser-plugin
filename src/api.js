export const getDownloads = (searchText = '') => new Promise((res) => {
  let cb = 'getDownloads_' + new Date().getTime();
  window[cb] = (val) => {
    res(val);
    window[cb] = null;
  }
  // setTimeout(() => {
  //   window[cb]([{ "by_ext_id": "", "by_ext_name": "", "danger_type": "", "date_string": "January 15, 2021", "file_externally_removed": false, "file_name": "Photoshop软件安装包.zip", "file_path": "C:\\Users\\max\\Downloads\\Photoshop软件安装包.zip", "file_url": "file:///C:/Users/max/Downloads/Photoshop%E8%BD%AF%E4%BB%B6%E5%AE%89%E8%A3%85%E5%8C%85.zip", "id": 6, "last_reason_text": "", "otr": false, "percent": -2, "progress_status_text": "", "resume": false, "retry": false, "since_string": "", "started": 1610699109, "state": "COMPLETE", "total": 4367838, "url": "http://b2-1251629669.file.myqcloud.com/zaix/Photoshop%E8%BD%AF%E4%BB%B6%E5%AE%89%E8%A3%85%E5%8C%85.zip" }, { "by_ext_id": "", "by_ext_name": "", "danger_type": "", "date_string": "January 14, 2021", "file_externally_removed": false, "file_name": "格式工厂下载@2051_51244.exe", "file_path": "C:\\Users\\max\\Downloads\\格式工厂下载@2051_51244.exe", "file_url": "file:///C:/Users/max/Downloads/%E6%A0%BC%E5%BC%8F%E5%B7%A5%E5%8E%82%E4%B8%8B%E8%BD%BD@2051_51244.exe", "id": 2, "last_reason_text": "", "otr": false, "percent": -2, "progress_status_text": "", "resume": false, "retry": false, "since_string": "", "started": 1610612458, "state": "COMPLETE", "total": 642064, "url": "https://44176.xc.zhongguohao123.com/xiaz/%E6%A0%BC%E5%BC%8F%E5%B7%A5%E5%8E%82%E4%B8%8B%E8%BD%BD@2051_51244.exe" }])
  // }, 1000)
  chrome.send('getDownloads', [cb, searchText])
})