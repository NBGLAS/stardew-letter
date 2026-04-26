document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('custom-cursor');
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (isTouchDevice) {
        // iPad / 移动端：隐藏自定义鼠标，使用点击粒子特效
        if (customCursor) {
            customCursor.style.display = 'none';
        }
        
        document.body.style.cursor = 'auto'; // 恢复系统默认行为或隐藏
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.setProperty('cursor', 'auto', 'important');
        });

        // 监听点击事件生成粒子
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            createParticle(touch.clientX, touch.clientY);
        });

    } else {
        // 桌面端：自定义鼠标跟随
        if (customCursor) {
            document.addEventListener('mousemove', (e) => {
                customCursor.style.left = e.clientX + 'px';
                customCursor.style.top = e.clientY + 'px';
            });
        }
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x - 10}px`; // 居中
        particle.style.top = `${y - 10}px`;
        document.body.appendChild(particle);

        // 动画结束后移除
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});