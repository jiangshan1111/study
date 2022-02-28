要记算10的平方根，并且精确到0.01

    // 二分法求平方根
    const mySqrt = (n) => {
      if (isNaN(n)) return NaN;
      if (n === 0 || n === 1) return n;
      var low = 0,
          high = n,
          pivot = (low + high) / 2,
          lastPivot;
      do {
        if (Math.pow(pivot, 2) > n) {
          high = pivot;
        } else if (Math.pow(pivot, 2) < n) {
          low = pivot;
        } else {
          return pivot;
        }
        lastPivot = pivot;
        pivot = (low + high) / 2;
      }
      // 使用Number.EPSILON表示能够接受的最小误差范围
      while (Math.abs(pivot - lastPivot) >= Number.EPSILON)
      return pivot;
    }
    console.log(mySqrt(3));


//切线逼近
mySqrt=(n)=>{
if (n < 0) return NaN;
    if (n === 0 || n === 1) return n
    var val = n,
        last;
    do {
        console.log(val, last)
        last = val;
        val = (val + n / val) / 2;
    }
    // 使用Number.EPSILON表示能够接受的最小误差范围
    while (Math.abs(val - last) >= Number.EPSILON)
    return val
}