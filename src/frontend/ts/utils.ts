class FrontUtils {


    public static renderizeDevicesList(respueta : string , obj : EventListenerObject ){
        var lista: Array<Device> = JSON.parse(respueta);
        
        var ulDisp = document.getElementById("listaDisp");


        //
        // reseteamos la lista de dispositivos
        //
        ulDisp.innerHTML = "";

        for (var disp of lista) {
            var item: string = `<li class="collection-item avatar">`;
            if(disp.type==1){
                item+=  '<img src="static/images/lightbulb.png" alt = "" class="circle" >'
            } else {
                item+=  '<img src="static/images/window.png" alt = "" class="circle" >'
            }
                    
            item+=`<span class="titulo">${disp.name}</span>
                <p>
                ${disp.description}
                </p>
                <a href="#!" class="secondary-content">
                <div class="switch">
                <label>
                Off
                `;
                if (disp.state) {
                    item +=`<input type="checkbox" checked id="ck_${disp.id}">`;
                } else {
                    item +=`<input type="checkbox" id="ck_${disp.id}" >`;
                }
                item += `
                <span class="lever"></span>
                On
                </label>
                <input type="button" class="btn" id="btnDelete" value="Eliminar">
            </div>
                </a>
            </li>`;
    
            ulDisp.innerHTML += item;
        }
        
        for (var disp of lista) {
            var checkPrender = document.getElementById("ck_" + disp.id);
            checkPrender.addEventListener("click", obj);
        }
        
    }
}