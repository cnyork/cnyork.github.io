document.addEventListener('DOMContentLoaded', () => {
    // 滾動動畫觸發
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('div[id]').forEach(div => observer.observe(div));
  
    // 錨點平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // 添加流光特效
        const highlight = document.createElement('div');
        highlight.style.cssText = `
          position: fixed;
          top: ${target.offsetTop}px;
          left: 0;
          width: 100%;
          height: ${target.offsetHeight}px;
          background: linear-gradient(90deg, 
            rgba(0,255,136,0.1) 0%, 
            rgba(0,255,136,0) 50%, 
            rgba(0,255,136,0.1) 100%);
          pointer-events: none;
          z-index: 999;
          animation: highlight 1.5s;
        `;
        
        document.body.appendChild(highlight);
        setTimeout(() => highlight.remove(), 1500);
      });
    });
  
    // 鍵盤導航
    document.addEventListener('keydown', (e) => {
      const sections = Array.from(document.querySelectorAll('div[id]'));
      const currentScroll = window.scrollY;
      
      if (e.key === 'ArrowDown') {
        const nextSection = sections.find(s => s.offsetTop > currentScroll + 100);
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        const prevSection = [...sections].reverse().find(s => s.offsetTop < currentScroll - 100);
        prevSection?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  
// 在 ../js/song.js 添加以下代码
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.body.classList.toggle('scrolled', scrollY > 300);
  });
  
  // 修改原有錨點滾動程式碼，增加首頁按鈕支持
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if(this.hash === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      // 原有滚动代码...
    });
  });
    

  // 滾動行為偵測
let lastScrollPos = 0;
const navElement = document.getElementById('dynamic-nav');
const scrollThreshold = 100; // 滾動敏感度閥值

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    
    // 頂部強制顯示
    if (currentScrollPos <= 50) {
        navElement.classList.remove('nav-hidden');
        navElement.classList.add('nav-visible');
        return;
    }

    // 滾動方向判斷
    if (Math.abs(currentScrollPos - lastScrollPos) > scrollThreshold) {
        if (currentScrollPos > lastScrollPos) {
            // 向下滾動隱藏
            navElement.classList.add('nav-hidden');
            navElement.classList.remove('nav-visible');
        } else {
            // 向上滾動顯示
            navElement.classList.remove('nav-hidden');
            navElement.classList.add('nav-visible');
        }
        lastScrollPos = currentScrollPos;
    }
});

const audio = document.getElementById('main-audio');
const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});
