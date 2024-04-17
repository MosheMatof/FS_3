// import {EndPoint} from './EndPoint.js'
// import {FXMLHttpRequest} from './FXMLHttpRequest.js'
class FNetwork {
    static endPoints = []
    static addEndPoint(endPoint){
        if(endPoint instanceof EndPoint){
            this.endPoints.push(endPoint)
        }
    }
    static removeEndPoint(endPoint){
        this.endPoints = this.endPoints.filter(ep => ep !== endPoint)
    }

    static send(data){
        if(data instanceof FXMLHttpRequest){
            try {
                for (let ep of this.endPoints) {
                    let epName = data.url.split('/')[0];
                    if(ep.name === epName){
                        // waitTime = Math.random() * 2000;
                        // start = new Date().getTime();
                        // while (new Date().getTime() < start + waitTime);
                        ep.onReceive(data);
                        if(data.async && data.onreadystatechange){
                            data.onreadystatechange();
                        }
                    }
                }
            } catch (error) {
                data.status = 500;
                data.responseText = error.message;
            }
        }
    }
}
