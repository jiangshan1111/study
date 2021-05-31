1.Promise.all 并行执行promise


  getA和getB并行执行，然后输出结果。如果有一个错误，就抛出错误
  /**
 * 每一个promise都必须返回resolve结果才正确
 * 每一个promise都不处理错误
 */
  const getA = new Promise((resolve, reject) => {
    //模拟异步任务
    setTimeout(function(){
      resolve(2);
    }, 1000) 
  })
  .then(result => result)


  const getB = new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve(3);
      <!-- reject('Error in getB'); -->
    }, 1000) 
  })
  .then(result => result)


  Promise.all([getA, getB]).then(data=>{
      console.log(data)
  })
  .catch(e => console.log(e));  //[2, 3]


  /**
  * 每一个promise自己处理错误
  */

  const getA = new Promise((resolve, reject) => {
    //模拟异步任务
    setTimeout(function(){
      resolve(2);
    }, 1000) 
  })
  .then(result => result)
  .catch(e=>{

  })


  const getB = new Promise((resolve, reject) => {
    setTimeout(function(){
      // resolve(3);
      reject('Error in getB');
    }, 1000) 
  })
  .then(result => result)
  .catch(e=>e)


  Promise.all([getA, getB]).then(data=>{
      console.log(data)
  })
  .catch(e => console.log(e));[2, "Error in getB"]


2.顺序执行promise
  2.1先getA然后getB执行，最后addAB
    function getA(){
      return  new Promise(function(resolve, reject){ 
        setTimeout(function(){     
              resolve(2);
          }, 1000);
      });
    }
    
    function getB(){
        return  new Promise(function(resolve, reject){       
            setTimeout(function(){
                resolve(3);
            }, 1000);
        });
    }
    
    function addAB(a,b){
        return a+b
    }

    function getResult(){
        var  obj={};
        Promise.resolve().then(function(){
            return  getA() 
        })
        .then(function(a){
            obj.a=a;
        })
        .then(function(){
            return getB() 
        })
        .then(function(b){
            obj.b=b;
            return obj;
        })
        .then(function(obj){
          return  addAB(obj['a'],obj['b'])
        })
        .then(data=>{
            console.log(data)
        })
        .catch(e => console.log(e));

    }
    getResult();//5

    2.2方法二——使用promise构建队列
      function getResult(){
        var res=[];
        // 构建队列
        function queue(arr) {
          var sequence = Promise.resolve();
          arr.forEach(function (item) {
            sequence = sequence.then(item).then(data=>{
                res.push(data);
                return res
            })
          })
          return sequence
        }

        // 执行队列
        queue([getA,getB]).then(data=>{
            return addAB(data[0],data[1])
        })
        .then(data => {
            console.log(data)
        })
        .catch(e => console.log(e));
      }
      getResult();//5

    2.3方法三——使用async、await实现类似同步编程
      function getResult(){
        async function queue(arr) {
          let res = []
          for (let fn of arr) {
            var data= await fn();
            res.push(data);
          }
          return await res
        }

        queue([getA3,getB3])
          .then(data => {
            return addAB(data[0],data[1])
          }).then(data=>console.log(data))
      }
      getResult()

  