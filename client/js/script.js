// import { FXMLHttpRequest } from "../common";

function signIn() {
    var uname = document.getElementsByName('signInUname')[0].value;
    var psw = document.getElementsByName('signInPsw')[0].value;

    var fxhr = new FXMLHttpRequest();
    fxhr.open('POST', 'server/signin');
    fxhr.onreadystatechange = function(){
        if(fxhr.readyState === 4){
            if(fxhr.status === 200){
                nevigateTo("home");
            } else if(fxhr.status === 404){
                alert('Invalid username or password');
            }
        }
    }
    fxhr.send(JSON.stringify({name: uname, password: psw}));
}

function signUp() {
    var uname = document.getElementsByName('signUpUname')[0].value;
    var psw = document.getElementsByName('signUpPsw')[0].value;

    var fxhr = new FXMLHttpRequest();
    fxhr.open('POST', 'server/signup');
    fxhr.onreadystatechange = function(){
        if(fxhr.readyState === 4){
            if(fxhr.status === 201){
                nevigateTo("home");
            } else {
                alert(`Error: ${fxhr.responseText}`);
            }
        }
    }
    fxhr.send(JSON.stringify({name: uname, password: psw}));
}

function signOut() {
    var fxhr = new FXMLHttpRequest();
    fxhr.open('GET', 'server/signout', false);
    fxhr.send();
    if(fxhr.status === 200){
        nevigateTo("signin");
    } else {
        alert(`Error: ${fxhr.responseText}`);
    }
}


function nevigateTo(page){
    var container = document.getElementById('templateContainer');

    if (page === "signin") {
        container.innerHTML = '';
        var template = document.getElementById('signInTemplate');
        container.appendChild(document.importNode(template.content, true));
    } else if (page === "signup") {
        container.innerHTML = '';
        var template = document.getElementById('signUpTemplate');
        container.appendChild(document.importNode(template.content, true));
    } else if (page === "home") {
        container.innerHTML = '';
        var template = document.getElementById('homeTemplate');
        container.appendChild(document.importNode(template.content, true));
        initHome();
    } else {
        console.error("Invalid page");
    }
}

function initPage() {
    loggedUser = sessionStorage.getItem('loggedUser');
    if(loggedUser){
        var fxhr = new FXMLHttpRequest();
        fxhr.open('POST', 'server/signin', false);
        fxhr.send(loggedUser);
        if(fxhr.status === 200){
            nevigateTo("home");
        } else if(fxhr.status === 404){
            alert('Invalid username or password');
            nevigateTo("signin");
        } else {
            alert(`Error: ${fxhr.responseText}`);
            nevigateTo("signin");
        }
    } else {
        nevigateTo("signin");
    }
}

initPage();
