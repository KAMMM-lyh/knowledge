document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pagination = document.querySelector('.carousel-pagination');
    const slideCount = slides.length;
    const slidesPerView = Math.min(4, slideCount); // 默认显示4张
    let currentIndex = 0;
    
    // 创建分页指示器
    function createPagination() {
        for (let i = 0; i < Math.ceil(slideCount / slidesPerView); i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            pagination.appendChild(dot);
        }
    }
    
    // 更新轮播位置
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 15; // 包含gap
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // 更新分页状态
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / slidesPerView));
        });
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = index * slidesPerView;
        updateCarousel();
    }
    
    // 下一组
    function nextSlide() {
        if (currentIndex < slideCount - slidesPerView) {
            currentIndex += slidesPerView;
        } else {
            currentIndex = 0; // 循环回到开头
        }
        updateCarousel();
    }
    
    // 上一组
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex -= slidesPerView;
        } else {
            currentIndex = slideCount - slidesPerView; // 循环到最后
        }
        updateCarousel();
    }
    
    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 初始化
    createPagination();
    updateCarousel();
    
    // 响应式调整
    window.addEventListener('resize', function() {
        const newSlidesPerView = window.innerWidth >= 992 ? 4 : 
                               window.innerWidth >= 768 ? 3 : 
                               window.innerWidth >= 576 ? 2 : 1;
        
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            currentIndex = Math.min(currentIndex, slideCount - slidesPerView);
            updateCarousel();
        }
    });
    
    // 自动轮播（可选）
    // let autoPlay = setInterval(nextSlide, 5000);
    
    // 悬停暂停
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
});