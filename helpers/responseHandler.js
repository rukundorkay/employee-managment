class Responder{
    constructor(){
        this.statusCode=null;
        this.message=null;
        this.data=null;

    }

error(message,statusCode){
    this.statusCode=statusCode;
    this.message=message;
}

successfully(statusCode,data,message){
    this.statusCode=statusCode;
    this.data=data;
    this.message=message;

}
send(res){
    const result={
    status: this.statusCode,
    message: this.message,
    data: this.data,
    };

    if (this.data == null) {
       delete result.data;
    }
     if(this.message == null){
         delete result.message;
     }

     return res.status(this.statusCode).json(result)
}



}

export default Responder;