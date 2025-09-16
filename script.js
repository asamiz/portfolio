class CleanPortfolio {
  constructor() {
    this.currentFile = "overview";
    this.openTabs = new Set(["overview"]); // Track open tabs (desktop only)
    this.isDesktop = window.innerWidth > 768;
    this.initializeEventListeners();
  }

  // Toast notification system
  showToast(message, type = 'success', duration = 3000) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on type
    const icons = {
      success: 'fas fa-check-circle',
      info: 'fas fa-info-circle',
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-times-circle'
    };
    
    toast.innerHTML = `
      <i class="${icons[type] || icons.success}"></i>
      <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Hide toast after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 400);
    }, duration);
  }

  // Copy phone number in clean format
  copyPhoneNumber() {
    const cleanNumber = '+966501481461';
    navigator.clipboard.writeText(cleanNumber).then(() => {
      this.showToast('Phone number copied!', 'success');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      this.showToast('Failed to copy phone number', 'error');
    });
  }

  initializeEventListeners() {
    document.querySelectorAll(".file-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const fileType = e.currentTarget.dataset.file;
        
        if (this.isDesktop) {
          this.openTab(fileType);
        } else {
          this.switchFile(fileType);
        }
      });
    });

    // Handle suggestion tag clicks
    document.querySelectorAll(".suggestion-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const fileType = e.currentTarget.dataset.file;
        this.openTab(fileType);
      });
    });

    // Tab close buttons are handled in createTab method

    // Handle window resize
    window.addEventListener("resize", () => {
      const wasDesktop = this.isDesktop;
      this.isDesktop = window.innerWidth > 768;
      
      if (wasDesktop !== this.isDesktop) {
        if (!this.isDesktop) {
          // Switched to mobile - reset to single tab
          this.resetToMobile();
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "6") {
        e.preventDefault();
        const fileMap = [
          "overview",
          "experience",
          "skills",
          "projects",
          "education",
          "contact",
        ];
        const fileIndex = parseInt(e.key) - 1;
        if (fileMap[fileIndex]) {
          this.switchFile(fileMap[fileIndex]);
        }
      }
    });
  }

  switchFile(fileType) {
    // Only update sidebar highlights if we have tabs open or we're on mobile
    if (!this.isDesktop || this.openTabs.size > 0) {
      document.querySelectorAll(".file-item").forEach((item) => {
        item.classList.remove("active");
      });
      document.querySelector(`[data-file="${fileType}"]`).classList.add("active");
    }

    // Only update tab content on mobile or when there's only one tab
    if (!this.isDesktop || this.openTabs.size <= 1) {
      const tab = document.querySelector(".tab");
      const tabIcon = tab.querySelector("i");
      const tabText = tab.querySelector("span");

      const fileConfigs = {
        overview: {
          icon: "fas fa-user",
          text: "overview.md",
        },
        experience: {
          icon: "fas fa-briefcase",
          text: "experience.md",
        },
        skills: {
          icon: "fas fa-code",
          text: "skills.md",
        },
        projects: {
          icon: "fas fa-rocket",
          text: "projects.md",
        },
        education: {
          icon: "fas fa-graduation-cap",
          text: "education.md",
        },
        contact: {
          icon: "fas fa-envelope",
          text: "contact.md",
        },
      };

      if (fileConfigs[fileType]) {
        tabIcon.className = fileConfigs[fileType].icon;
        tabText.textContent = fileConfigs[fileType].text;
      }
    }

    document.querySelectorAll(".file-content").forEach((content) => {
      content.classList.remove("active");
    });

    const targetContent = document.getElementById(`${fileType}-content`);
    if (targetContent) {
      targetContent.classList.add("active");
    }

    this.currentFile = fileType;
  }

  // Desktop tab management methods
  openTab(fileType) {
    if (!this.isDesktop) {
      this.switchFile(fileType);
      return;
    }

    // Check if tab is already open
    if (this.openTabs.has(fileType)) {
      // Tab already open, just switch to it
      this.switchFile(fileType);
      this.updateTabBar();
      return;
    }

    // Add to open tabs
    this.openTabs.add(fileType);
    
    // Hide empty state
    document.getElementById("empty-state").style.display = "none";
    
    // Create or show tab (this handles the close button listener)
    this.createTab(fileType);
    
    // Switch to the content and restore sidebar highlight
    this.switchFile(fileType);
    
    // Update tab bar
    this.updateTabBar();
  }

  createTab(fileType) {
    const tabBar = document.querySelector(".tab-bar");
    const existingTab = document.querySelector(`[data-tab="${fileType}"]`);
    
    if (existingTab) {
      // Tab already exists, just activate it
      return;
    }

    const fileConfigs = {
      overview: { icon: "fas fa-user", text: "overview.md" },
      experience: { icon: "fas fa-briefcase", text: "experience.md" },
      skills: { icon: "fas fa-code", text: "skills.md" },
      projects: { icon: "fas fa-rocket", text: "projects.md" },
      education: { icon: "fas fa-graduation-cap", text: "education.md" },
      contact: { icon: "fas fa-envelope", text: "contact.md" },
    };

    const config = fileConfigs[fileType];
    if (!config) return;

    const tab = document.createElement("div");
    tab.className = "tab slide-in";
    tab.dataset.tab = fileType;
    tab.innerHTML = `
      <i class="${config.icon}"></i>
      <span>${config.text}</span>
      <span class="close-btn">×</span>
    `;

    // Add click handler for tab switching
    tab.addEventListener("click", (e) => {
      if (!e.target.classList.contains("close-btn")) {
        this.switchFile(fileType);
        this.updateTabBar();
      }
    });

    // Add close button handler
    const closeBtn = tab.querySelector(".close-btn");
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeTab(fileType);
    });

    tabBar.appendChild(tab);

    // Remove slide-in class after animation
    setTimeout(() => {
      tab.classList.remove("slide-in");
    }, 500);
  }

  closeTab(fileType) {
    if (!this.isDesktop) return;

    // Remove from open tabs
    this.openTabs.delete(fileType);
    
    // Remove the tab element
    const tab = document.querySelector(`[data-tab="${fileType}"]`);
    if (tab) {
      tab.remove();
    }

    // Hide the content
    const content = document.getElementById(`${fileType}-content`);
    if (content) {
      content.classList.remove("active");
    }

    // If no tabs left, show empty state and remove sidebar highlight
    if (this.openTabs.size === 0) {
      document.getElementById("empty-state").style.display = "flex";
      this.currentFile = null;
      
      // Remove active class from all sidebar items
      document.querySelectorAll(".file-item").forEach((item) => {
        item.classList.remove("active");
      });
    } else {
      // Switch to the last remaining tab
      const remainingTab = Array.from(this.openTabs)[this.openTabs.size - 1];
      this.switchFile(remainingTab);
    }

    this.updateTabBar();
  }

  updateTabBar() {
    if (!this.isDesktop) return;

    // Update active states
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("active");
    });

    const activeTab = document.querySelector(`[data-tab="${this.currentFile}"]`);
    if (activeTab) {
      activeTab.classList.add("active");
    }
  }


  resetToMobile() {
    // Reset to original mobile behavior
    this.openTabs = new Set(["overview"]);
    this.currentFile = "overview";
    
    // Hide empty state
    document.getElementById("empty-state").style.display = "none";
    
    // Remove extra tabs, keep only one
    const tabBar = document.querySelector(".tab-bar");
    const tabs = tabBar.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
      if (index > 0) {
        tab.remove();
      }
    });

    // Show overview content
    this.switchFile("overview");
  }


}

document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new CleanPortfolio();

  window.portfolio = portfolio;
  
  // Setup close button for initial overview tab
  if (portfolio.isDesktop) {
    const initialTab = document.querySelector('[data-tab="overview"]');
    if (initialTab) {
      const closeBtn = initialTab.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          portfolio.closeTab('overview');
        });
      }
    }
  }

  document.querySelectorAll(".content-area").forEach((area) => {
    area.style.scrollBehavior = "smooth";
  });

  setTimeout(() => {
    document.querySelectorAll(".skill-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const skill = e.target.textContent;

        e.target.style.transform = "scale(1.1)";
        setTimeout(() => {
          e.target.style.transform = "translateY(-2px)";
        }, 150);
      });
    });
  }, 500);

  setTimeout(() => {
    document.querySelectorAll(".contact-item").forEach((item) => {
      item.addEventListener("click", () => {
        const contactType = item.querySelector("strong").textContent;
        const contactValue = item.querySelector("p").textContent;

        if (contactType === "Email") {
          window.open(`mailto:${contactValue}`, "_blank");
        } else if (contactType === "LinkedIn") {
          window.open(`https://${contactValue}`, "_blank");
        } else if (contactType === "GitHub") {
          window.open(`https://${contactValue}`, "_blank");
        }
      });
    });
  }, 500);
});
