const currentTime = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let month = today.getMonth() + 1;
  let dd = today.getDate();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds();
  
  if (month < 10) {
    month = '0' + month;
  }
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (hh < 10) {
    hh = '0' + hh;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (ss < 10) {
    ss = '0' + ss;
  }
  return yyyy + month + dd + mm + ss;
};

module.exports = { currentTime };