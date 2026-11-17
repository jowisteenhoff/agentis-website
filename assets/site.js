(function(){
  var header=document.querySelector('.site-header');
  function onScroll(){header&&header.classList.toggle('scrolled',window.scrollY>30)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var burger=document.querySelector('.burger'),nav=document.querySelector('nav.main');
  if(burger&&nav){burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)})}

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(function(e){e.classList.add('in')})}

  /* isometric hero background */
  var c=document.getElementById('iso');
  if(!c||!c.getContext)return;
  var ctx=c.getContext('2d'),w,h,dpr=Math.min(window.devicePixelRatio||1,2);
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  window.addEventListener('resize',size);size();
  var S=46; // cube half-width
  function draw(t){
    ctx.clearRect(0,0,w,h);
    var cols=Math.ceil(w/(S*2))+4,rows=Math.ceil(h/S)+6;
    for(var r=-3;r<rows;r++){
      for(var q=-2;q<cols;q++){
        var x=q*S*2+(r%2?S:0),y=r*S*0.58*1.0;
        var lift=Math.sin(q*.55+r*.35+t*.0006)*14+Math.sin(r*.21-t*.0004)*10;
        var yy=y-lift,d=S*0.58,hgt=60;
        var shade=0.5+0.5*Math.sin(q*.3+r*.2+t*.0003);
        // top
        ctx.beginPath();ctx.moveTo(x,yy-d);ctx.lineTo(x+S,yy);ctx.lineTo(x,yy+d);ctx.lineTo(x-S,yy);ctx.closePath();
        ctx.fillStyle='rgba('+(236+shade*12|0)+','+(200+shade*20|0)+',250,0.95)';ctx.fill();
        // left
        ctx.beginPath();ctx.moveTo(x-S,yy);ctx.lineTo(x,yy+d);ctx.lineTo(x,yy+d+hgt);ctx.lineTo(x-S,yy+hgt);ctx.closePath();
        ctx.fillStyle='rgba(176,128,200,0.95)';ctx.fill();
        // right
        ctx.beginPath();ctx.moveTo(x+S,yy);ctx.lineTo(x,yy+d);ctx.lineTo(x,yy+d+hgt);ctx.lineTo(x+S,yy+hgt);ctx.closePath();
        ctx.fillStyle='rgba(124,82,150,0.95)';ctx.fill();
      }
    }
    var g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(40,15,55,.55)');g.addColorStop(.18,'rgba(60,25,80,.2)');g.addColorStop(.6,'rgba(60,25,80,.15)');g.addColorStop(1,'rgba(0,0,0,.55)');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  }
  if(still){draw(0)}else{(function loop(t){draw(t);requestAnimationFrame(loop)})(0)}
})();
