// import {FNetwork} from './FNetwork.js';
class FXMLHttpRequest{
    constructor(){
        this.readyState = 0;
        this.status = 0;
        this.responseText = '';
        this.onreadystatechange = null;
    }
    open(method, url, async = true){
        this.method = method;
        this.url = url;
        this.async = async;
        this.readyState = 1;
        if(this.onreadystatechange){
            this.onreadystatechange();
        }
    }
    send(body){
        this.readyState = 2;
        this.body = body;
        if(this.onreadystatechange){
            this.onreadystatechange();
        }
        FNetwork.send(this);
    }
}
