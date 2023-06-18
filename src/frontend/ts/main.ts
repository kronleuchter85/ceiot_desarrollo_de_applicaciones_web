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

    deleteDevice(deviceId){

        var deviceInfo = {
            "deviceId": deviceId 
        };

        this.deviceService.invokeBackEnd("DELETE", "/devices", (result: string) : void => {
            this.getDevices();
        } , deviceInfo);
    }

    updateDevice(deviceId , devName , devDescription , devType){
        
        var deviceInfo = {
            "deviceId": deviceId 
            , "deviceName": devName 
            , "deviceDescription":devDescription 
            , "deviceType":devType 
        };
        console.log("Updating device (" + deviceId + ") withstatus (" + JSON.stringify(deviceInfo) );

        this.deviceService.invokeBackEnd("PUT", "/devices", (result: string) : void => {
            this.getDevices();
        } , deviceInfo);
    }

    updateDeviceStatus(deviceId , deviceStatus){
        console.log("Updating device (" + deviceId + ") withstatus (" + deviceStatus + ")");

        var deviceInfo = {
            "deviceId": deviceId 
            , "deviceStatus":deviceStatus 
        };

        this.deviceService.invokeBackEnd("PUT", "/devices/status", (result: string) : void => {
            this.getDevices();
        } , deviceInfo);

    }

    handleEvent(event) {
        var element =<HTMLInputElement> event.target;

        if (element.id == "btnListar") {
            this.getDevices();
       
        } else if (element.id == "btnAgregar") {
            
            var devNameField = <HTMLInputElement>document.getElementById("deviceName");
            var devDescField = <HTMLInputElement>document.getElementById("deviceDescription");
            var devTypeField = <HTMLInputElement>document.getElementById("deviceType");

            this.createDevice(devNameField.value , devDescField.value , devTypeField.value );
            
        } else if(element.id.startsWith("btnDelete_")){
            var deviceIdIndex = element.id.indexOf("_");
            var deviceId = element.id.substring(deviceIdIndex+1);

            this.deleteDevice(deviceId);

        } else if(element.id.startsWith("btnUpdate_")){

            var deviceIdIndex = element.id.indexOf("_");
            var deviceId = element.id.substring(deviceIdIndex+1);
            console.log("Updating device " + deviceId);

            var devNameField = <HTMLInputElement>document.getElementById("txtDeviceName_" + deviceId);
            var devDescField = <HTMLInputElement>document.getElementById("txtDeviceDescription_" + deviceId);
            var devTypeField = <HTMLInputElement>document.getElementById("txtDeviceType_" + deviceId);

            this.updateDevice(deviceId , devNameField.value , devDescField.value , devTypeField.value);

        } else if(element.id.startsWith("checkStatus_")){
            var deviceIdIndex = element.id.indexOf("_");
            var deviceId = element.id.substring(deviceIdIndex+1);
            var status = element.checked;

            this.updateDeviceStatus(deviceId , status);
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

    main.getDevices();
});
