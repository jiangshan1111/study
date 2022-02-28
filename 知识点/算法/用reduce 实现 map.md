Array.prototype._map = function (func, callbackThis) {
  let res = [];
  let CBThis = callbackThis || null;
  this.reduce(function (pre, after, index, arr) {
    res.push(func.call(CBThis, after, index, arr));
  }, null);
  return res;
};