class DeviceService{


  static BACKEND_CONTEXT:string = "http://localhost:8000"; 

  public invokeBackEnd(method:string,url:string,callback : (result:any) => any ,data?:any ) {

    url = DeviceService.BACKEND_CONTEXT + url;

    var xmlReq = new XMLHttpRequest();        
    xmlReq.onreadystatechange = () => {
        if (xmlReq.readyState == 4) {
          if (xmlReq.status == 200) {
            console.log("llego "+xmlReq.responseText)
              callback(xmlReq.responseText);
            } else {
                alert("Error al buscar los datos!");
            }
        }
    }
    xmlReq.open(method, url, true);
    if (data != undefined) {
      xmlReq.setRequestHeader("Content-Type", "application/json");
      xmlReq.send(JSON.stringify(data));
      
    } else {
      xmlReq.send();
    }
    
  }


}