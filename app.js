// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (!isMobile) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // Smooth delay for blur
        setTimeout(() => {
            cursorBlur.style.left = e.clientX + "px";
            cursorBlur.style.top = e.clientY + "px";
        }, 50);
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, .video-card, .close-modal, .btn");

    hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(2)";
            cursor.style.backgroundColor = "transparent";
            cursor.style.border = "1px solid #fff";
        });
        
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            cursor.style.backgroundColor = "var(--accent-color)";
            cursor.style.border = "none";
        });
    });
}

// Video Hover Play Preview
const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {
    const video = card.querySelector("video");
    
    // Play on hover
    card.addEventListener("mouseenter", () => {
        if (!isMobile) {
            video.play().catch(e => console.log("Video play failed:", e));
        }
    });
    
    // Pause on leave
    card.addEventListener("mouseleave", () => {
        if (!isMobile) {
            video.pause();
            // Optional: comment out the next line if you don't want video to restart on every hover
            // video.currentTime = 0; 
        }
    });
});

// Modal Logic
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const closeModal = document.querySelector(".close-modal");

videoCards.forEach(card => {
    card.addEventListener("click", () => {
        const videoSrc = card.querySelector("video").getAttribute("src");
        modal.classList.add("active");
        modalVideo.src = videoSrc;
        modalVideo.play().catch(e => console.log("Full-screen video play failed:", e));
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
});

// Close modal on outside click
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
        modalVideo.pause();
        modalVideo.src = "";
    }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        modalVideo.pause();
        modalVideo.src = "";
    }
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.video-card, .section-title, .contact-box').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});
