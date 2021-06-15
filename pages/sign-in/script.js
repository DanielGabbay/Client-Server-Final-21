
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("loginBtn");
const loginErrorMsg = document.getElementById("login-error-msg");
const rmCheck = document.getElementById("rememberMe");
const userName = document.getElementById("userName");

$("#myAlert").hide()
$("#myAlert1").hide()

if (localStorage.checkbox && localStorage.checkbox !== "") {
    setTimeout(() => {
        window.open("../../pages/dashboard/index.html", "_self");
    }, 1);
} else {
    rmCheck.removeAttribute("checked");
    userName.value = "";
}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;


    if (username === "Class" && password === "1234") {
        $("#myAlert").hide()
        $("#myAlert1").show('fast')

        if (rmCheck.checked && userName.value !== "") {
            localStorage.username = userName.value;
            localStorage.checkbox = rmCheck.value;
        } else {
            localStorage.username = "";
            localStorage.checkbox = "";
        }


        setTimeout(() => {
            window.open("../../pages/dashboard/index.html", "_self");
        }, 2000);

    } else {
        // loginErrorMsg.style.opacity = 1;
        $("#myAlert1").hide()
        $("#myAlert").show('fast')
    }
})