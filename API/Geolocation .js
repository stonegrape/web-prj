
//use Geolocation.getCurrentPosition() 方法返回设备当前的位置
//浏览器的 geolocation 对象通过调用  Navigator.geolocation 属性访问
//该方法只有一个必须的参数，参数是一个匿名函数
//当设备的当前位置被成功取得，匿名函数会运行
//匿名函数有一个参数 position,表示当前位置数据的position对象

navigator.geolocation.getCurrentPosition(function(position) {
    //使用google.maps.LatLng() 构造函数创建一个 LatLng 对象实例
    var latlang = new google.maps.LatLang(position.coords.latitude,position.coords.longitude);
    var myOptions = {
        zoom: 8,
        center: latlang,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true
    }
    var map = new google.maps.Map(document.querySelector('#map_canvas'),myOptions);
})

//异步操作：仅在操作完成时，调用函数的模式：确保操作已经完成，然后在另一个操作中尝试使用该操作返回的数据
// API中常见的两种模式：1. API对象通常包含构造函数，可以调用构造函数创建用于编写程序对象的实例
//2.API 对象通常有几个可用的options，可以调整以获得程序所需的确切的环境
//API构造函数通常接受options对象作为参数