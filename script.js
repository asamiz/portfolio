class CleanPortfolio {
  constructor() {
    this.currentFile = "overview";
    this.initializeEventListeners();
    this.showWelcomeMessage();
  }

  initializeEventListeners() {
    document.querySelectorAll(".file-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const fileType = e.currentTarget.dataset.file;
        this.switchFile(fileType);
      });
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
    document.querySelectorAll(".file-item").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(`[data-file="${fileType}"]`).classList.add("active");

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

    document.querySelectorAll(".file-content").forEach((content) => {
      content.classList.remove("active");
    });

    const targetContent = document.getElementById(`${fileType}-content`);
    if (targetContent) {
      targetContent.classList.add("active");
    }

    this.currentFile = fileType;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new CleanPortfolio();

  window.portfolio = portfolio;

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
