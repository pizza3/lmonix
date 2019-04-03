import React ,{Component} from 'react'

import styled from 'styled-components'


export default class CloudExport extends Component{
    state={

    }


    render(){
        return(
            <PopContainer>
            </PopContainer>
        )
    }
}


const PopContainer = styled.div`
    width: 230px;
    position: fixed;
    height: 260px;
    background: #faa;
    border-radius: 4px;
    z-index: 100;
`