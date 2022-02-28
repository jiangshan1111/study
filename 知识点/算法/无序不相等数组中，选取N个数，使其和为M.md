// 递归分解，最后转换成求2数之和
//  一个方法从 2Sum 秒杀到 100Sum
//  https://leetcode-cn.com/problems/3sum/solution/yi-ge-fang-fa-tuan-mie-by-labuladong/

var nSumTarget = function (nums, n, start, target) {
    let res = []
    if (n < 2 || n > nums.length) {
        return res
    }
    if (n == 2) {
        let low = start;
        let high = nums.length - 1;
        while (low < high) {
            let sum = nums[low] + nums[high];
            let left = nums[low]
            let right = nums[high]
            if (sum < target) {
                while (low < high && nums[low] === left) {
                    low++
                }
            } else if (sum > target) {
                while (low < high && nums[high] === right) {
                    high--
                }
            } else {
                res.push([left, right])
                while (low < high && nums[low] === left) {
                    low++
                }
                while (low < high && nums[high] === right) {
                    high--
                }
            }
        }
    } else {
        for (let i = start; i < nums.length; i++) {
            let sub = nSumTarget(nums, n - 1, i + 1, target - nums[i])
            for (let arr of sub) {
                arr.push(nums[i])
                res.push(arr)
            }
            while (i < nums.length && nums[i] === nums[i + 1]) {
                i++
            }
        }
    }
    return res
}
var findGroup = function (nums, n, sum) {
    nums = nums.sort((a, b) => a - b)
    return nSumTarget(nums, n, 0, sum)
};