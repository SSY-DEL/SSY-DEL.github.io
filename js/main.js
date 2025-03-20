// 滚动渐变效果
const sections = document.querySelectorAll('section');

const checkVisibility = () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    
    if (sectionTop < window.innerHeight * 0.8 && sectionBottom > 0) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 添加滚动事件监听
  window.addEventListener('scroll', checkVisibility);
  
  // 页面加载时检查可见性
  checkVisibility();
  
  // 平滑滚动
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 加载并显示Markdown文章
  const loadArticle = async () => {
    try {
      const response = await fetch('articles/example.md');
      const markdown = await response.text();
      const html = marked.parse(markdown);
      document.getElementById('article-content').innerHTML = html;
    } catch (error) {
      console.error('加载文章失败:', error);
      document.getElementById('article-content').innerHTML = '<p>无法加载文章</p>';
    }
  };

  loadArticle();
});
