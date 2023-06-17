var M;

class Main implements EventListenerObject {

    deviceService: DeviceService = new DeviceService();
   
    constructor() {
    }

    getDevices() {
        this.deviceService.invokeBackEnd("GET", "/devices", (result: string) : void => {
            FrontUtils.renderizeDevicesList(result , this);
        });
    }

    createDevice(deviceName , deviceDescription , deviceType) {

        var deviceInfo = {
            "deviceName": deviceName 
            , "deviceDescription":deviceDescription 
            , "deviceType":deviceType};

        this.deviceService.invokeBackEnd("POST", "/devices",(result: string) : void => {
            this.getDevices();
        } , deviceInfo);
    }

    handleEvent(event) {
        var elemento =<HTMLInputElement> event.target;
        console.log(elemento)

        if (event.target.id == "btnListar") {
            this.getDevices();
       
        } else if (event.target.id == "btnAgregar") {
            
            var devNameField = <HTMLInputElement>document.getElementById("deviceName");
            var devDescField = <HTMLInputElement>document.getElementById("deviceDescription");
            var devTypeField = <HTMLInputElement>document.getElementById("deviceType");
            var devName: string = devNameField.value;
            var devDescription: string = devDescField.value;
            var devType = devTypeField.value;

            this.createDevice(devName , devDescription , devType );
            
        }
    }
}


window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,{});
    var elemsC = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elemsC, {autoClose:true});

    var main: Main = new Main();
    var btnListar: HTMLElement = document.getElementById("btnListar");
    btnListar.addEventListener("click", main);

    var btnAgregar: HTMLElement = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);
});
