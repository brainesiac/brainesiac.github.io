function nav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


function auth (username,password) {  
  const loginForm = document.getElementById("login");
  const loginButton = document.getElementById("log");
  const loginErrorMsg = document.getElementById("message");
  // When the login button is clicked, the following code is executed
  //loginButton.addEventListener("click", (e) => {
      // Prevent the default submission of the form
     // e.preventDefault();
      // Get the values input by the user in the form fields
      //const username = loginForm.Uname.value;
      //const password = loginForm.Pass.value;
  
      if (username === "brainesiac" && password === "brainesiac1234") {
          location.assign("./loggedin.html");
      } else {
          // Otherwise, make the login error message show (change its oppacity)
          loginErrorMsg.textContent  = "Login Failed" ;
      }
  })
)