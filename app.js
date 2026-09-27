// 1. Initialize Supabase directly inside the logic file
const supabaseUrl = 'b7a8eb95-f61c-4738-9f7f-fcbb019eff62'; // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmlka21sZ2pzbWxxa3FhdHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNjYwODUsImV4cCI6MjEwNTY0MjA4NX0.r_vPhWLs-hKg7xk6lyge8ITkPP30y53442jrGqNwhWQq'; // Replace with your Key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 2. The core login logic
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
        errorMsg.textContent = "CONNECTION FAILED: " + err.message.toUpperCase();
        errorMsg.style.display = "block";
        loginBtn.textContent = "INITIATE LOGIN";
        loginBtn.disabled = false;
        loginBtn.style.opacity = "1";
    }
    }
