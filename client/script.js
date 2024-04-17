// import { FXMLHttpRequest } from "../common";
function signIn() {
    var uname = document.getElementsByName('signInUname')[0].value;
    var psw = document.getElementsByName('signInPsw')[0].value;
    
    var fxhr = new FXMLHttpRequest();
    fxhr.open('POST', 'server/signin', false);
    fxhr.send(JSON.stringify({name: uname, password: psw}));
    if(fxhr.status === 200){
        showHome();
    } else if(fxhr.status === 404){
        alert('Invalid username or password');
    } else {
        alert(`Error: ${fxhr.responseText}`);
    }
}

function signUp() {
    var uname = document.getElementsByName('signUpUname')[0].value;
    var psw = document.getElementsByName('signUpPsw')[0].value;
    
    var fxhr = new FXMLHttpRequest();
    fxhr.open('POST', 'server/signup', false);
    fxhr.send(JSON.stringify({name: uname, password: psw}));
    if(fxhr.status === 201){
        showHome();
    } else {
        alert(`Error: ${fxhr.responseText}`);
    }
}

function showSignInForm() {
    var template = document.getElementById('signInTemplate');
    var container = document.getElementById('formContainer');
    container.innerHTML = '';
    container.appendChild(document.importNode(template.content, true));
}

function showSignUpForm() {
    var template = document.getElementById('signUpTemplate');
    var container = document.getElementById('formContainer');
    container.innerHTML = '';
    container.appendChild(document.importNode(template.content, true));
}

function showHome() {
    var template = document.getElementById('homeTemplate');
    var container = document.getElementById('formContainer');
    container.innerHTML = '';
    container.appendChild(document.importNode(template.content, true));
}

showSignInForm();
