const electron =  window.require('electron');

const IpcProcess = () =>{
    electron.ipcRenderer.on('ipcRenderer', function (e, data, obj) {
        switch (data) {
            case 'extractThreeData':
                
                break;
        
            case 'updateProject':
            
                break;
            default:
                break;
        }
    })
}

export default IpcProcess;