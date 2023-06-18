class FrontUtils {


    public static renderizeDevicesList(respueta : string , obj : EventListenerObject ){
        var lista: Array<Device> = JSON.parse(respueta);
        var ulDisp = document.getElementById("listaDisp");

        ulDisp.innerHTML = "";

        for (var disp of lista) {
            var item: string = `<li class="collection-item avatar">`;
            if(disp.type==1){
                item+= '<img src="static/images/lightbulb.png" alt = "" class="circle" >'
            } else {
                item+= '<img src="static/images/window.png" alt = "" class="circle" >'
            }
                    
            item+=`<span class="titulo">${disp.name}</span>
                <input type="text" id="txtDeviceName_${disp.id}" value="${disp.name}">
                <input type="text" id="txtDeviceDescription_${disp.id}" value="${disp.description}">
                <input type="text" id="txtDeviceType_${disp.id}" value="${disp.type}">
                <div class="switch">
                <label> Off`;
                if (disp.state) {
                    item +=`<input type="checkbox" checked id="checkStatus_${disp.id}">`;
                } else {
                    item +=`<input type="checkbox" id="checkStatus_${disp.id}" >`;
                }
                item += `<span class="lever"></span>On
                </label>
                <a href="#!" class="secondary-content">
                <input type="button" class="btn" id="btnUpdate_${disp.id}" value="Actualizar">
                <input type="button" class="btn" id="btnDelete_${disp.id}" value="Eliminar">
                </div></a></li>`;
    
            ulDisp.innerHTML += item;
        }
        
        for (var disp of lista) {
            var checkPrender = document.getElementById("checkStatus_" + disp.id);
            checkPrender.addEventListener("click", obj);
            var btnDelete = document.getElementById("btnDelete_" + disp.id);
            btnDelete.addEventListener("click", obj);
            var btnUpdate = document.getElementById("btnUpdate_" + disp.id);
            btnUpdate.addEventListener("click", obj);
        }
        
    }
}