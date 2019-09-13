const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */
var imgSrc = ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg"];
for (let i = 0; i< imgSrc.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imgSrc[i]);
    thumbBar.appendChild(newImage);
    
    //给图片添加按钮;未写出来；对事件理解不到位
    //刚点击过的元素
    newImage.onclick = e =>{
      const imgSrc = e.target.getAttribute('src');
      displayedImage.setAttribute('src', imgSrc);
    }
  }
/* 编写 变亮/变暗 按钮 */
btn.onclick = function (){  
  let btnClass= btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = '变亮';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = '变暗';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';  
  }
}

