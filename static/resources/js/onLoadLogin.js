const goLogin = () => {
    sessionStorage.setItem("email", false);
    sessionStorage.setItem("password", false);
    sessionStorage.setItem("login", false);

    window.location.href += "login.html";
    console.log("Not login!!");
};

window.onload = () => {
    const isLoggedIn = sessionStorage.getItem("login");
    if (isLoggedIn === "true") {
        const givenEmail = sessionStorage.getItem("email");
        if (givenEmail) {
            const storedPassword = localStorage.getItem(givenEmail);
            if (storedPassword === sessionStorage.getItem("password")) {
                console.log("Login successful!");
            } else {
                goLogin();
                console.log("Not login 1 !!");
            }
        } else {
            goLogin();
            console.log("Not login 2 !!");
        }
    } else {
        goLogin();
        console.log("Not login 3 !!");
    }
};
