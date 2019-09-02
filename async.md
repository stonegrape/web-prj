1.什么是异步？
异步，阻塞，线程threads,workers
计算机是多核cpu并行，可以在同一时间处理多个程序
程序是顺序执行，同一时间只会发生一件事。如果函数a依赖于函数b的结果，函数a只能等到函数b结束之后，才能执行。
浪费了计算机的处理能力。
阻塞：当浏览器中的一个web应用进行密集运算，还没有把控制权交给浏览器时，整个浏览器就像冻僵了一样。
线程：一个线程是一个基本处理过程。Task A --> Task B --> Task C

JavaScript is single thread
在最基本的形式中，JavaScript是一种同步的、阻塞的、单线程的语言
同步，异步
？？很多网页API特性使用异步代码，特别是从外部的设备上获取资源，譬如，从网络获取文件，访问数据库，从网络摄像头获得视频流，或者向VR头罩广播图像。

2.callback promise 解决异步问题
callback 回调函数 旧时浏览器异步编程解决方案。
promise 现代浏览器异步编程解决方案
3.promise是一个对象，代表了一个异步操作的最终完成或失败。
本质上，Promise 是一个被某些函数传出的对象，我们附加回调函数（callback）使用它，而不是将回调函数传入那些函数内部。
回调地狱

git: git log --graph --pretty=oneline --abbrev-commit

<!DOCTYPE html>
<html lang="en-US">
<body>
<script>
    //callback
    chooseToppings(function(toppings) {
        placeOrder(toppings, function(order) {
            collectOrder(order, function(pizza) {
                eatPizza(pizza);
                }, failureCallback);
                }, failureCallback);
                }, failureCallback);
    //promise
    chooseToppings()
    .then(function(toppings) {
    return placeOrder(toppings);
    })
    .then(function(order) {
    return collectOrder(order);
    })
    .then(function(pizza) {
    eatPizza(pizza);
    })
    .catch(failureCallback);
    //()=>x 相当于 () => {return x;}
    chooseToppings()
    .then(toppings => placeOrder(toppings))
    .then(order => collectOrder(order))
    .then(pizza => eatPizza(pizza))
    .catch(failureCallback);
    /*不太理解
    最基本的，promise与事件监听器类似，但有一些差异：
    一个promise只能成功或失败一次。它不能成功或失败两次，并且一旦操作完成，它就无法从成功切换到失败，反之亦然。
    如果promise成功或失败并且您稍后添加成功/失败回调，则将调用正确的回调，即使事件发生在较早的时间。
    */
    /*事件监听器*/
<script>
<body>
<html>