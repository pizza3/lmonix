import React ,{Component} from 'react';
import styled from 'styled-components';
import SceneTreeContainer from './SceneTreeContainer';

export default class SceneLayer extends Component{

    render(){
        const objTree = this.props.objPresent.map((obj,i)=>{
            let con;
            this.props.objPresent.children>1? con=true : con=false;
            return  <SceneTreeContainer key={i} num={i} name={obj.objName} obj={obj} active={(i===this.props.activeObj?true:false)} {...this.props} objPresent={this.props.objPresent} check={con} />
        })
        return(
            <SceneGraphContainer>
                <SceneGraphTitle>
                    Scene
                </SceneGraphTitle>
                {objTree}
            </SceneGraphContainer>
        )
    }
} 


const SceneGraphContainer = styled.div`
    position:relative;
    float:left;
    width: 191px;
    height: 100%;
    z-index: 90;
    background: #F7F7F7;
    border-right: 2px solid #DBDBDB;
`

const SceneGraphTitle = styled.div`
    position: relative;
    float: left;
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #DBDBDB;
    padding-left: 5px;
    margin-bottom: 5px;
    color: #707070;
    font-weight: bold;
    font-size: 27px;
`