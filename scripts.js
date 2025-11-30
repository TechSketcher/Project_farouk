 // ====== FOOTER YEAR ======
        document.getElementById("year").textContent = new Date().getFullYear();

        // ====== PROJECT MODAL LOGIC ======
        const modal = document.getElementById("projModal");
        const modalImg = document.getElementById("modalImg");
        const modalTitle = document.getElementById("modalTitle");
        const modalDesc = document.getElementById("modalDesc");
        const modalType = document.getElementById("modalType");
        const modalTools = document.getElementById("modalTools");
        const modalReport = document.getElementById("modalReport");

        document.querySelectorAll(".project-open").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const card = e.target.closest("article");

                modalImg.src = card.dataset.img || "resume/assets/Wheelbarrow.jpg";
                modalTitle.textContent = card.dataset.title || "Project Title";
                modalDesc.textContent = card.dataset.desc || "";
                modalType.textContent = card.dataset.type || "";
                modalTools.textContent = "Tools: " + (card.dataset.tools || "");

                const reportPath = card.dataset.report;

                if (reportPath && reportPath !== "#") {
                    modalReport.href = reportPath;
                    const filename = reportPath.split('/').pop();
                    modalReport.setAttribute('download', filename);
                    modalReport.setAttribute('target', '_blank');
                    modalReport.style.display = "inline-block";
                } else {
                    modalReport.style.display = "none";
                }

                modal.classList.remove("hidden");
                modal.classList.add("flex");
            });
        });

        function closeModal() {
            modal.classList.remove("flex");
            modal.classList.add("hidden");
        }

        document.getElementById("modalClose").addEventListener("click", closeModal);
        document.getElementById("modalCloseBtn").addEventListener("click", closeModal);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });

        // ====== CONTACT FORM HANDLER ======
        const contactForm = document.getElementById("contact-form");
        const formStatus = document.getElementById("form-status");

        if (contactForm) {
            contactForm.addEventListener("submit", async function (e) {
                e.preventDefault();

                const formData = new FormData(contactForm);
                formStatus.textContent = "Sending...";
                formStatus.style.color = "#94a3b8";

                try {
                    const response = await fetch(contactForm.action, {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept: "application/json",
                        },
                    });

                    if (response.ok) {
                        formStatus.textContent = "✓ Message sent successfully!";
                        formStatus.style.color = "#10b981";
                        contactForm.reset();
                    } else {
                        formStatus.textContent = "✗ Something went wrong. Please try again.";
                        formStatus.style.color = "#ef4444";
                    }
                } catch (error) {
                    formStatus.textContent = "✗ Network error. Please check your connection.";
                    formStatus.style.color = "#ef4444";
                }
            });
        }

        // ====== SMOOTH SCROLL ======
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();

                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        });

        // Highlight active section on scroll
        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }
            });
        });

        // ====== BACK TO TOP BUTTON ======
        const backToTopBtn = document.getElementById('back-to-top');

        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.display = 'block';
                    backToTopBtn.style.opacity = '1';
                } else {
                    backToTopBtn.style.display = 'none';
                    backToTopBtn.style.opacity = '0';
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }