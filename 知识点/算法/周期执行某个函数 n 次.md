执行指定次数
function runSthTimes(fn, n, context) {
	return function() {
		if (n--) {
			return fn.apply(context || this, arguments);
		}
	}
}
//栗子如下：
var myFunction = runSthTimes(function() {
	console.log('success!')
},3);
myFunction();//success!
myFunction();//success!
myFunction();//success!
myFunction();//nothing