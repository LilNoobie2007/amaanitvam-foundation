import { loadSharedComponents } from "./component-loader.js";
import { initNavbar } from "./navbar.js";

async function initApp() {
    try {
        // Navbar aur footer sabse pehle load honge
        await loadSharedComponents();

        // HTML insert hone ke baad navbar JS chalega
        initNavbar();

        // Optional scripts ki error navbar/footer ko block nahi karegi
        import("./forms.js").catch((error) => {
            console.error("Forms module error:", error);
        });

        import("./gallery.js").catch((error) => {
            console.error("Gallery module error:", error);
        });
    } catch (error) {
        console.error("App initialization failed:", error);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, {
        once: true,
    });
} else {
    initApp();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = form.querySelector("button[type='submit']");
    const statusDiv = document.getElementById("contact-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        // Validation
        if (!name) {
            showStatus("Please enter your full name.", "red");
            return;
        }

        if (name.length < 3) {
            showStatus("Name must contain at least 3 characters.", "red");
            return;
        }

        if (!emailRegex.test(email)) {
            showStatus("Please enter a valid email address.", "red");
            return;
        }

        if (subject.length < 5) {
            showStatus("Subject should be at least 5 characters.", "red");
            return;
        }

        if (message.length < 10) {
            showStatus("Message should contain at least 10 characters.", "red");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        showStatus("Sending your message...", "#1d4ed8");

        const API_URL =
            location.hostname === "localhost" ||
            location.hostname === "127.0.0.1"
                ? "http://localhost:5000/api/contact"
                : "https://amaanitvam-foundation.onrender.com/api/contact";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to send message.");
            }

            showStatus(
                "✅ Message sent successfully! We will contact you soon.",
                "green"
            );

            form.reset();
        } catch (err) {
            console.error(err);

            showStatus(
                err.message || "Something went wrong. Please try again.",
                "red"
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });

    function showStatus(message, color) {
        if (!statusDiv) return;

        statusDiv.textContent = message;
        statusDiv.style.color = color;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            const expanded = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", !expanded);

            if (answer) {
                answer.classList.toggle("active");
            }
        });
    });
});