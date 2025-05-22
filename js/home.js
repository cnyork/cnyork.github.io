// js/home.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    
    // 添加点击涟漪效果
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        
        setTimeout(() => ripple.remove(), 500);
      });
    });
  
    // 添加键盘导航
    document.addEventListener('keydown', (e) => {
      const current = document.activeElement;
      if (e.key === 'ArrowDown') {
        const next = current.nextElementSibling || links[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        const prev = current.previousElementSibling || links[links.length - 1];
        prev.focus();
      }
    });
  });
  