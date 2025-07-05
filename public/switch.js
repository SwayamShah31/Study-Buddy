const switchBtn = document.getElementById('switch-btn');
if (switchBtn) {
  switchBtn.addEventListener('click', () => {
    if (window.location.pathname.includes('student')) {
      window.location.href = 'teacher.html';
    } else {
      window.location.href = 'student.html';
    }
  });
} 