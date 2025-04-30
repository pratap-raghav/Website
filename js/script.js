document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll('.icon');
  const desktop = document.getElementById('desktop');

  const closeButton = document.querySelector('.quickStart .formControls .close');
  const miniButton = document.querySelector('.quickStart .formControls .minimize');
  const quickStartDiv = document.querySelector('.quickStart');
  const titleBar = document.querySelector('.quickStart .titleBar');
  const quickStartItem = document.getElementById('quickStartItem');
  const taskbar = document.querySelector('.taskbar');

  // About Me Selectors
  const aboutMeDiv = document.querySelector('.aboutMe');
  const miniAboutMe = document.querySelector('.aboutMe .formControls .minimize');
  const closeAboutMe = document.querySelector('.aboutMe .formControls .close');
  const aboutMeItem = document.getElementById('aboutMeItem');
  const aboutMeTitle = document.querySelector('.aboutMe .titleBar');
  const openAboutFromQuickStart = document.getElementById('openAboutFromQuickStart');


  const projectsDiv = document.querySelector('.projects');
  const miniprojects = document.querySelector('.projects .formControls .minimize');
  const closeprojects = document.querySelector('.projects .formControls .close');
  const projectItem = document.getElementById('projectItem');
  const projectsTitle = document.querySelector('.projects .titleBar');
  const openprojectsFromQuickStart = document.getElementById('openProjectsFromQuickStart');

  const openProjectsFromStart = document.getElementById('openProjectsFromStart');
  
  const projectsDesktopIcon = document.querySelector('#icons1 .icon:nth-child(4)'); // Assuming "Projects" is the 4th icon in icons1


  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('startMenu');

  let isDragging = false, offsetX, offsetY;
  let isDraggingAbout = false, offsetXAbout, offsetYAbout;
  let isDraggingProjects = false, offsetXProjects, offsetYProjects;
  let zIndexCounter = 10;


  quickStartDiv.addEventListener('mousedown', () => {
    zIndexCounter++;
    quickStartDiv.style.zIndex = zIndexCounter;
  });

  aboutMeDiv.addEventListener('mousedown', () => {
    zIndexCounter++;
    aboutMeDiv.style.zIndex = zIndexCounter;
  });

  projectsDiv.addEventListener('mousedown', () => {
    zIndexCounter++;
    projectsDiv.style.zIndex = zIndexCounter;
  });



  if (startButton && startMenu) {
    startButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents closing when clicking the button

      if (startMenu.style.display === 'none' || startMenu.style.display === '') {
        zIndexCounter++;
        startMenu.style.zIndex = zIndexCounter;
        startMenu.style.display = 'flex';
      } else {
        startMenu.style.display = 'none';
      }
    });

    // Auto-close Start Menu when clicking anywhere else
    document.addEventListener('click', () => {
      startMenu.style.display = 'none';
    });

    // Prevent closing when clicking inside the Start Menu
    startMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }


  if (!quickStartDiv || !titleBar || !quickStartItem || !aboutMeDiv || !aboutMeTitle || !projectsDiv || !projectsTitle || !projectItem) return;

  // Icon selection logic
  icons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      icons.forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');
    });
    icon.addEventListener('dblclick', (e) => {
      const url = icon.getAttribute('data-url');
      if (url) window.open(url, '_blank');
      if (icon === projectsDesktopIcon && projectsDiv.style.display !== 'block') {
        projectsDiv.style.display = 'block';
        projectItem.style.display = 'block';
        zIndexCounter++;
        projectsDiv.style.zIndex = zIndexCounter;
        projectItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
        projectItem.style.filter = 'brightness(100%)';
      }
    });
  });

  // QuickStart minimize
  miniButton.addEventListener('click', () => {
    quickStartDiv.style.display = 'none';
    quickStartItem.style.filter = 'brightness(110%)';
    quickStartItem.style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, .2)';
    quickStartItem.classList.add('minimized');
  });

  // Deselect icons on desktop click
  desktop.addEventListener('click', () => {
    icons.forEach(icon => icon.classList.remove('selected'));
  });

  // ✅ Toggle QuickStart window
  quickStartItem.addEventListener('click', () => {
    if (quickStartDiv.style.display === 'none' || quickStartDiv.style.display === '') {
      quickStartDiv.style.display = 'block';
      quickStartItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
      quickStartItem.style.filter = 'brightness(100%)';
    } else {
      quickStartDiv.style.display = 'none';
      quickStartItem.style.filter = 'brightness(110%)';
      quickStartItem.style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, .2)';
    }
  });

  closeButton.addEventListener('click', () => {
    quickStartDiv.style.display = 'none';
    quickStartItem.style.display = 'none';
  });

  // QuickStart dragging
  titleBar.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - quickStartDiv.offsetLeft;
    offsetY = e.clientY - quickStartDiv.offsetTop;
  });

  // Document dragging logic (all windows)
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 40;
      const divWidth = quickStartDiv.offsetWidth;
      const divHeight = quickStartDiv.offsetHeight;
      x = Math.max(0, Math.min(x, viewportWidth - divWidth));
      y = Math.max(0, Math.min(y, viewportHeight - divHeight));
      quickStartDiv.style.left = `${x}px`;
      quickStartDiv.style.top = `${y}px`;
    }

    if (isDraggingAbout) {
      let x = e.clientX - offsetXAbout;
      let y = e.clientY - offsetYAbout;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 40;
      const divWidth = aboutMeDiv.offsetWidth;
      const divHeight = aboutMeDiv.offsetHeight;
      x = Math.max(0, Math.min(x, viewportWidth - divWidth));
      y = Math.max(0, Math.min(y, viewportHeight - divHeight));
      aboutMeDiv.style.left = `${x}px`;
      aboutMeDiv.style.top = `${y}px`;
    }

    if (isDraggingProjects) {
      let x = e.clientX - offsetXProjects;
      let y = e.clientY - offsetYProjects;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 40;
      const divWidth = projectsDiv.offsetWidth;
      const divHeight = projectsDiv.offsetHeight;
      x = Math.max(0, Math.min(x, viewportWidth - divWidth));
      y = Math.max(0, Math.min(y, viewportHeight - divHeight));
      projectsDiv.style.left = `${x}px`;
      projectsDiv.style.top = `${y}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    isDraggingAbout = false;
    isDraggingProjects = false;
  });

  // ✅ About Me Minimize
  miniAboutMe.addEventListener('click', () => {
    aboutMeDiv.style.display = 'none';
    if (aboutMeItem) {
      aboutMeItem.style.filter = 'brightness(110%)';
      aboutMeItem.style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, .2)';
      aboutMeItem.classList.add('minimized');
    }
  });

  // ✅ About Me Close
  closeAboutMe.addEventListener('click', () => {
    aboutMeDiv.style.display = 'none';
    if (aboutMeItem) aboutMeItem.style.display = 'none';
  });

  // ✅ Toggle About Me window
  if (aboutMeItem) {
    aboutMeItem.addEventListener('click', () => {
      if (aboutMeDiv.style.display === 'none' || aboutMeDiv.style.display === '') {
        aboutMeDiv.style.display = 'block';
        aboutMeItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
        aboutMeItem.style.filter = 'brightness(100%)';
      } else {
        aboutMeDiv.style.display = 'none';
        aboutMeItem.style.filter = 'brightness(110%)';
        aboutMeItem.style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, .2)';
      }
    });
  }

  // About Me dragging
  aboutMeTitle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDraggingAbout = true;
    offsetXAbout = e.clientX - aboutMeDiv.offsetLeft;
    offsetYAbout = e.clientY - aboutMeDiv.offsetTop;
  });
  if (openAboutFromQuickStart) {
    openAboutFromQuickStart.addEventListener('click', () => {
      aboutMeDiv.style.display = 'block';
      aboutMeItem.style.display = 'block';
      zIndexCounter++;
      aboutMeDiv.style.zIndex = zIndexCounter;
      aboutMeItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
      aboutMeItem.style.filter = 'brightness(100%)';
    });
  }


  // Projects Minimize
  miniprojects.addEventListener('click', () => {
    projectsDiv.style.display = 'none';
    if (projectItem) {
      projectItem.style.filter = 'brightness(110%)';
      projectItem.style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, .2)';
      projectItem.classList.add('minimized');
    }
  });

  // Projects Close
  closeprojects.addEventListener('click', () => {
    projectsDiv.style.display = 'none';
    if (projectItem) projectItem.style.display = 'none';
  });

  // Toggle Projects window from taskbar
  if (projectItem) {
    projectItem.addEventListener('click', () => {
      if (projectsDiv.style.display === 'none' || projectsDiv.style.display === '') {
        projectsDiv.style.display = 'block';
        projectItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
        projectItem.style.filter = 'brightness(100%)';
      } else {
        projectsDiv.style.display = 'none';
        projectItem.style.filter = 'brightness(110%)';
        projectItem.style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, .2)';
      }
    });
  }

  // Projects dragging
  projectsTitle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDraggingProjects = true;
    offsetXProjects = e.clientX - projectsDiv.offsetLeft;
    offsetYProjects = e.clientY - projectsDiv.offsetTop;
  });

  // Open Projects from Quick Start
  if (openprojectsFromQuickStart) {
    openprojectsFromQuickStart.addEventListener('click', () => {
      projectsDiv.style.display = 'block';
      projectItem.style.display = 'block';
      zIndexCounter++;
      projectsDiv.style.zIndex = zIndexCounter;
      projectItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
      projectItem.style.filter = 'brightness(100%)';
    });
  }

  if (openProjectsFromStart) {
    openProjectsFromStart.addEventListener('click', () => {
      projectsDiv.style.display = 'block';
      projectItem.style.display = 'block';
      zIndexCounter++;
      projectsDiv.style.zIndex = zIndexCounter;
      projectItem.style.boxShadow = 'inset 0 0 1px 1px rgba(0, 0, 0, .2), inset 1px 0 1px rgba(0, 0, 0, .7)';
      projectItem.style.filter = 'brightness(100%)';
    });
  }


  // ⏰ Clock update
  function updateTime() {
    const timeDiv = document.getElementById("currentTime");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeDiv.textContent = `${hours}:${minutes}`;
  }

  setInterval(updateTime, 1000);
  updateTime();
});