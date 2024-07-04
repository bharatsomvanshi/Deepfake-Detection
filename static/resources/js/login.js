const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const validate = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email.value);
    const isPasswordValid = password.value.length > 8;

    if (!isEmailValid) {
        alert("Incorrect Email format!");
    }

    if (!isPasswordValid) {
        alert("Password length > 8 !");
    }

    return isEmailValid && isPasswordValid;
}

login.addEventListener("click", () => {
    if (validate()) {
        const storedPassword = localStorage.getItem(email.value);
        if (storedPassword) {
            if (storedPassword === password.value) {
                console.log("Login successful!");
                const currentUrl = window.location.href;
                const lastSlashIndex = currentUrl.lastIndexOf('/');
                const urlBeforeLastSlash = lastSlashIndex !== -1
                    ? currentUrl.slice(0, lastSlashIndex)
                    : currentUrl; // If no slash is found, return the entire URL
                sessionStorage.setItem("email", email.value);
                sessionStorage.setItem("password", password.value);
                sessionStorage.setItem("login", "true");

                window.location.href = urlBeforeLastSlash;
            } else {
                console.log("Invalid password.");
                alert("Invalid password.");
            }
        } else {
            console.log("Email not found.");
            alert("Email not found.");
        }
    }
});

signup.addEventListener("click", () => {
    if (validate()) {
        if (!(localStorage.getItem(email.value))) {
            localStorage.setItem(email.value, password.value);
            const currentUrl = window.location.href;
            const lastSlashIndex = currentUrl.lastIndexOf('/');
            const urlBeforeLastSlash = lastSlashIndex !== -1
                ? currentUrl.slice(0, lastSlashIndex)
                : currentUrl; // If no slash is found, return the entire URL
            sessionStorage.setItem("email", email.value);
            sessionStorage.setItem("password", password.value);
            sessionStorage.setItem("login", true);
            window.location.href = urlBeforeLastSlash;
        } else {
            alert("Account already Exists!");
        }
    }
});