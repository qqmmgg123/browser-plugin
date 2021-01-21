export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

export const calcCountDownTime = (distance) => {
  var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((distance % (60 * 60)) / 60);

  var arr = [hours, minutes];
  return arr.map(item => {
    return ('0' + item).slice(-2)
  }).join('   ：  ')
}

export const formatBytes = (bytes, decimals) => {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}