
    function signin(){
    const signupform = document.querySelector(".form-content")
    const fromtitle = document.querySelector(".form-title")
    
        signupform.innerHTML=`
        <input type="hidden" name="action" value="signin">

                            <!-- EMAIL -->
                    <div class="form-group">
                        <label class="form-label">Email address</label>
                        <input name="email" type="email" class="form-input" id="email" placeholder="you@example.com">
                    </div>

                    <!-- PASSWORD -->
                    <div class="form-group">
                        <div class="password-label-row">
                            <label class="form-label">Password</label>
                            <a href="#" class="forgot-link">Forgot password?</a>
                        </div>
                        <div class="password-input-wrap">
                            <input name="password" type="password" class="form-input" id="password-input" placeholder="Password Should be 8 character">
                            <button type="button" class="eye-btn" onclick="togglePassword1()" id="eye-toggle">
                                <i class="bx bx-show" id="eye-icon"></i>
                            </button>
                        </div>
                    </div>

                    <!-- SIGN IN BUTTON -->
                    <button type="submit" class="signin-btn">
                        Sign in
                    </button>

                    <!-- SIGN UP LINK -->
                    <p class="signup-text">
                        Don't have an account?
                        <span class="signup-link">Sign up</span>
                    </p>`

         const signupLink = document.querySelector(".signup-link");

        signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        signup();
    });
        
         function togglePassword1() {
            var input = document.querySelector("#password-input");
            var icon  = document.getElementById('eye-icon');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bx-hide');
                icon.classList.add('bx-show');
            } else {
                input.type = 'password';
                icon.classList.remove('bx-show');
                icon.classList.add('bx-hide');
            }
        }

        const loginform = document.querySelector(".login-form")
        loginform.addEventListener("submit",(e)=>{
            if(!validation1()){
                e.preventDefault()
            }
        })

        function validation1(){
            console.log("hello")
        const email1 = document.querySelector("#email")
        console.log(email1)
        const email1val = email1.value.trim()
        const password1 = document.querySelector("#password-input")
        console.log(password1)
        const password1val = password1.value.trim()
        let success = true

            if(email1val == ''){
                success = false
                seterror(email1,'Please Enter your Email')
            }
            else if(!emailvalidation(email1val)){
                success = false
                seterror(email1,'Please Enter the Correct Email')
            }
            else{
        
                setsucess(email1)
            }

            if(password1val == ''){
                success = false
                seterror(password1,'Please Enter the Password')
            }
            else if (password1val.length < 8){
                success = false
                seterror(password1,"Password must be at least 8 characters")
            }
            else{
    
                setsucess(password1);
            }

            return success;
        }

        function emailvalidation(val) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    }
        

    function seterror(element,message ){
        element.placeholder = message;
        element.classList.add('error');
    }

    function setsucess(value){
        
        value.classList.remove('error')
    }

    fromtitle.textContent="Signin with your Account"
    

    }
signin()
    

    function signup(){
    
    const signupform = document.querySelector(".form-content")
    const fromtitle = document.querySelector(".form-title")
    
        signupform.innerHTML=`
        <input type="hidden" name="action" value="signup">
                    <!-- Name -->
                    <div class="form-group">
                        <label class="form-label">User name</label>
                        <input name="username" type="name"class="form-input" id="username" placeholder="username">
                    </div>

                    <!-- EMAIL -->
                    <div class="form-group">
                        <label class="form-label">Email address</label>
                        <input name="email" type="email"class="form-input" id="email" placeholder="you@example.com">
                    </div>

                    <!-- PASSWORD -->
                    <div class="form-group">
                        <div class="password-label-row">
                            <label class="form-label">Create Password</label>
                            
                        </div>
                        <div class="password-input-wrap">
                            <input name="password" type="password" class="form-input" id="password-input" placeholder="Password Should be 8 character">
                            <button type="button" class="eye-btn" onclick="togglePassword('password-input')" id="eye-toggle">
                                <i class="bx bx-hide" id="eye-icon"></i>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="password-label-row">
                            <label class="form-label">Conform Password</label>
                            
                        </div>
                        <div class="password-input-wrap">
                            <input name="cpassword" type="password" class="form-input" id="password-input-conform" placeholder="Conform Your Password">
                            <button type="button" class="eye-btn" onclick="togglePassword('password-input-conform')" id="eye-toggle">
                                <i class="bx bx-hide" id="eye-icon"></i>
                            </button>
                        </div>
                    </div>

                    <!-- SIGN IN BUTTON -->
                    <button type="submit" class="signin-btn" >
                        Sign Up
                    </button>

                    <!-- SIGN UP LINK -->
                    <p class="signup-text">
                        Signin With Your account 
                        <span class="signin-link">SignIn</span>
                    </p>

        `

        fromtitle.textContent="Create a New Account"


        function togglePassword(inputid) {
        var input = document.getElementById(inputid);
        var icon  = document.getElementById('eye-icon');
        if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bx-hide');
                icon.classList.add('bx-show');
        } else {
                input.type = 'password';
                icon.classList.remove('bx-show');
                icon.classList.add('bx-hide');
        }
        }



         const form = document.querySelector(".login-form")
            form.addEventListener("submit",(e)=>{
                console.log("submit")
                if(!validinput()){
                    e.preventDefault()
                }
            })
        

        function validinput(){
        const email= document.querySelector("#email")
        const password= document.querySelector("#password-input")
        const cpassword = document.querySelector("#password-input-conform")
        const username = document.querySelector("#username")
        const form = document.querySelector(".login-form")
        const emailval = email.value.trim()
        const passwordval = password.value.trim()
        const cpasswordval = cpassword.value.trim()
        const usernameval = username.value.trim()
        let sucess = true

        if (usernameval === ''){
            sucess=false
            setError(username,'Username is required')
        }
        else{
            setsucess(username)
        }

        if (emailval === ''){
            sucess=false
            setError(email,'Email is required')
        }

        else if(!validateEmail(emailval)){
            sucess=false
            setError(email,'Please enter a valid email')
        }

        else{
            setsucess(email)
        }

        if (passwordval === ''){
            sucess=false
            setError(password,'Password is required')
        }

        else if (passwordval.length < 8){
            sucess=false
            setError(password,'Password must be atleast 8 characters long')
        }

        else{
            setsucess(password)
        }

        if (cpasswordval === ''){
            sucess=false
            setError(cpassword,'Confirm password is required')
        }

        else if(cpasswordval !== passwordval){
            sucess=false
            setError(cpassword,'Password does not match')
        }

        else{
            setsucess(cpassword)
        }

        return sucess


    }

    function validateEmail(val) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    }

    function setsucess(value){
        // const label = value.parentElement
        // label.classList.add("sucess")
        value.classList.remove("error")
    }


    function setError(element, message) {
        console.log(element)
    element.placeholder = message;
    element.classList.add("error");
    // element.classList.remove("sucess")
}

const signinlink = document.querySelector(".signin-link")
    signinlink.addEventListener("click",()=>{
        signin()
    })

    }
