async function handleLogin(event) {
    event.preventDefault(); 

    let inputId = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
    const loginBtn = document.getElementById("login-btn");

    errorMsg.style.display = "none";

    if (!inputId.includes('@')) {
        inputId = inputId.toLowerCase() + '@obsidian.com';
    }

    loginBtn.textContent = "AUTHENTICATING...";
    loginBtn.disabled = true;
    loginBtn.style.opacity = "0.7";
    
    // The Safety Net: try...catch prevents the page from freezing on fatal errors
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: inputId,
            password: password
        });

        if (error) {
            errorMsg.textContent = "ACCESS DENIED: " + error.message.toUpperCase();
            errorMsg.style.display = "block";
            loginBtn.textContent = "INITIATE LOGIN";
            loginBtn.disabled = false;
            loginBtn.style.opacity = "1";
        } else {
            window.location.replace("dashboard.html");
        }
    } catch (err) {
        // If it fails to connect entirely, it will print the exact reason here
        errorMsg.textContent = "CONNECTION FAILED: " + err.message.toUpperCase();
        errorMsg.style.display = "block";
        loginBtn.textContent = "INITIATE LOGIN";
        loginBtn.disabled = false;
        loginBtn.style.opacity = "1";
    }
                }
