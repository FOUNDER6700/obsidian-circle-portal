async function handleLogin(event) {
    // 1. THIS STOPS THE PAGE FROM REFRESHING Wiping the screen
    event.preventDefault(); 

    let inputId = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
    const loginBtn = document.getElementById("login-btn");

    // Clear previous errors
    errorMsg.style.display = "none";

    // 2. Format the Codename for Supabase (The Hyphen Bypass)
    if (!inputId.includes('@')) {
        inputId = inputId.toLowerCase() + '@obsidian.com';
    }

    // 3. Trigger Loading State & Disable Button to prevent double-clicks
    loginBtn.textContent = "AUTHENTICATING...";
    loginBtn.disabled = true;
    loginBtn.style.opacity = "0.7";
    
    // 4. Process Existing Supabase Authentication
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: inputId,
        password: password
    });

    if (error) {
        // 5. Handle Failure: Show error, reset button, do NOT wipe inputs
        errorMsg.textContent = "ACCESS DENIED: " + error.message.toUpperCase();
        errorMsg.style.display = "block";
        loginBtn.textContent = "INITIATE LOGIN";
        loginBtn.disabled = false;
        loginBtn.style.opacity = "1";
    } else {
        // 6. Handle Success: Redirect to the secure dashboard
        window.location.replace("dashboard.html");
    }
}
