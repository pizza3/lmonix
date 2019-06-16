import React, {Component} from 'react';
const electron =  window.require('electron');

export default class VrPreview extends Component{
    componentDidMount(){
        const self = this
        // electron.ipcRenderer.on('updateVRView', function (e, val) {
        //     self.forceUpdate()
        //     console.log('update happened');
        // })
    }

    componentDidUpdate(prevProps){
        // if(prevProps.updateCount!==this.props.updateCount){
        //     setTimeout(()=>{
        //         this.forceUpdate()
        //     },100)
        // }
    }

    render(){
        return(
            <>
                <webview src={'file://'+this.props.title+'/index.html'} disablewebsecurity='true'
                    style={{
                        height:'calc(100vh - 37px)',
                        width:'50%',
                        marginTop:'37px',
                        float:'left',
                        border:'none',
                    }}>
                </webview>

            </>
        )
    }
}