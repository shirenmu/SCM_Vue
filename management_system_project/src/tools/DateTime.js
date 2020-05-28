function formatTimeDate() {
  let dt = new Date();
  let y = dt.getFullYear();
  let m = (dt.getMonth() + 1).toString().padStart(2, "0");
  let d = dt
    .getDate()
    .toString()
    .padStart(2, "0");
  let hh = dt.getHours();
  let mm = dt
    .getMinutes()
    .toString()
    .padStart(2, "0");
  let ss = dt
    .getSeconds()
    .toString()
    .padStart(2, "0");
  return `${y}${m}${d}${hh}${mm}${ss}`
};

function timeDate() {
  let dt = new Date();
  let y = dt.getFullYear();
  let m = (dt.getMonth() + 1).toString().padStart(2, "0");
  let d = dt
    .getDate()
    .toString()
    .padStart(2, "0");
  let hh = dt.getHours();
  let mm = dt
    .getMinutes()
    .toString()
    .padStart(2, "0");
  let ss = dt
    .getSeconds()
    .toString()
    .padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;

}

function MDate() {
  let dt = new Date();
  let y = dt.getFullYear();
  let m = (dt.getMonth() + 1).toString().padStart(2, "0");
  return `${y}-${m}`;
}


export {
  formatTimeDate,
  timeDate,
  MDate
};
