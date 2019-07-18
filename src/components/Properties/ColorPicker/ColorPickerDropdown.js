import React,{Component} from 'react'
import styled from 'styled-components';

export default class ColorPickerDropdown extends Component{
    state = {
        drag:false,
        dragColor:false,
        startColorPos:{
            x:0,y:0
        },
        colorPos:{
            x:0,y:0
        },
        startHuePos:{
            y:0
        },
        huePos:{
            y:0
        }
    }

    componentDidMount(){
        this.fixedPos={x:0,y:0}
        this.canvasHue = document.getElementById("hue");
		this.canvasColor = document.getElementById("color");
		this.ctxHue = this.canvasHue.getContext("2d");
        this.ctxColor = this.canvasColor.getContext("2d");
        this.widthColor = this.canvasColor.width = 215;
        this.heightColor = this.canvasColor.height = 235;
        this.widthHue = this.canvasHue.width = 18;
		this.heightHue = this.canvasHue.height = 235;
        this.init()
        window.onmousemove = function(e){
            e.preventDefault();
			if (this.state.drag) {
                let y = this.fixedPosHue.y + e.clientY - this.state.startHuePos.y;
                if (y <= 0) {
                    y = 0;
                } else if (y >= 235) {
                    y = 234;
                }
                this.setState({
                    huePos:{
                        y
                    }
                })
				this.changeHue(y);
			} else if (this.state.dragColor) {
				let x = this.fixedPos.x + e.clientX - this.state.startColorPos.x;
                let y = this.fixedPos.y + e.clientY - this.state.startColorPos.y;
                if (x >= 215) {
                    x = 214;
                } else if (x <= 0) {
                    x = 0;
                }
                if (y <= 0) {
                    y = 0;
                } else if (y >= 235) {
                    y = 235;
                }
                this.setState({
                    colorPos:{
                        x,
                        y
                    }
                })
                this.changeColor(x, y);
			}
        }.bind(this);
        
        window.onmouseup = function(e) {
            this.setState({
                drag:false,
                dragColor:false
            })
        }.bind(this);
        this.updateState(this.props.currentColor)
    }

    init(){
        this.fillHueStrip();
    }

    //setting up the gradient
	fillGradient(color) {
		this.ctxColor.fillStyle = color;
		this.ctxColor.fillRect(0, 0, this.widthColor, this.heightColor);
		let grdWhite = this.ctxColor.createLinearGradient(0, 0, this.widthColor, 0);
		grdWhite.addColorStop(0, "rgba(255,255,255,1)");
		grdWhite.addColorStop(1, "rgba(255,255,255,0)");
		this.ctxColor.fillStyle = grdWhite;
		this.ctxColor.fillRect(0, 0, this.widthColor, this.heightColor);

		let grdBlack = this.ctxColor.createLinearGradient(
			0,
			0,
			0,
			this.heightColor
		);
		grdBlack.addColorStop(0, "rgba(0,0,0,0)");
		grdBlack.addColorStop(1, "rgba(0,0,0,1)");
		this.ctxColor.fillStyle = grdBlack;
		this.ctxColor.fillRect(0, 0, this.widthColor, this.heightColor);
	}

	//setting up the hue strip
	fillHueStrip() {
		this.ctxHue.rect(0, 0, this.widthHue, this.heightHue);
		let grd1 = this.ctxHue.createLinearGradient(0, 0, 0, this.heightHue);
		grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
		grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
		grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
		grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
		grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
		grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
		grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
		this.ctxHue.fillStyle = grd1;
		this.ctxHue.fill();
    }

    handleColorDown=(e)=>{
        const {colorPos}=this.state
        const client = document.getElementById('colorCursor').getBoundingClientRect()        
       
        this.setState({
            dragColor:true,
            colorPos:{
                x:colorPos.x+e.clientX-client.x-7,
                y:colorPos.y+e.clientY-client.y-7
            },
            startColorPos:{
                x:e.clientX,
                y:e.clientY
            }
        })
        this.fixedPos = {
            x:colorPos.x+e.clientX-client.x-7,
            y:colorPos.y+e.clientY-client.y-7,
        }
        this.changeColor(colorPos.x+e.clientX-client.x-7, colorPos.y+e.clientY-client.y-7);
    }
    
    handleColorCursorDown = (e) => {
        this.fixedPos = {
            x:this.state.colorPos.x,
            y:this.state.colorPos.y,
        }
        this.setState({
            dragColor:true,
            startColorPos:{
                x:e.clientX,
                y:e.clientY
            }
        })
    }

    handleHueDown = (e)=>{
        const {huePos}=this.state
        const client = document.getElementById('hueCursor').getBoundingClientRect()        
       
        this.setState({
            drag:true,
            huePos:{
                y:huePos.y+e.clientY-client.y-4.5
            },
            starthuePos:{
                y:e.clientY
            }
        })
        this.fixedPos = {
            y:huePos.y+e.clientY-client.y-4.5,
        }
        this.changeHue(huePos.y+e.clientY-client.y-4.5)
    }

    handleHueCursorDown = (e) => {
        this.fixedPosHue = {
            y:this.state.huePos.y,
        }
        this.setState({
            drag:true,
            startHuePos:{
                y:e.clientY
            }
        })
    }

    changeColor = (x, y) =>{
        const {drag,dragColor} = this.state
		let imageData = this.ctxColor.getImageData(
			x,
			y,
			this.widthColor,
			this.heightColor
		).data;
        this.currentColorHex = this.RgbToHex(
            imageData[0],
            imageData[1],
            imageData[2]
        );
        if(drag || dragColor){
            this.props.onChange(this.currentColorHex)
        }
    }
    
    changeHue = (y1) => {
		let imageData = this.ctxHue.getImageData(
			1,
			y1,
			this.widthHue,
			this.heightHue
		).data;
		this.fillGradient(
			"rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)"
		);
		this.changeColor(this.state.colorPos.x, this.state.colorPos.y);
	}

	RgbToHsl(r, g, b) {
		// (r /= 255), (g /= 255), (b /= 255)
		let max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h,
			s,
			l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			}
			h /= 6;
		}

		return [h, s, l];
	}

	HexToRgb(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16)
			]
			: null;
	}

    RgbToHsv(r, g, b) {
        // r /= 255; g /= 255; b /= 255;
        console.log(r,g,b);
        
        let newR = r/255
        let newG = g/255 
        let newB = b/255 
        let max = Math.max(newR, newG, newB),
            min = Math.min(newR, newG, newB);
        let h,
            s,
            v = max;

        let d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0;
        } else {
            switch (max) {
            case newR:
                h = (newG - newB) / d + (newG < newB ? 6 : 0);
                break;
            case newG:
                h = (newB - newR) / d + 2;
                break;
            case newB:
                h = (newR - newG) / d + 4;
                break;
            }
            h /= 6;
        }
        return [h, s, v];
    }

	RgbToHex(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	MapRange(value, low1, high1, low2, high2) {
		return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
    }
    
    updateState(val) {        
        let col;
        col = this.HexToRgb(val);
        let a = this.RgbToHsl(col[0], col[1], col[2]);
        let val2 = this.MapRange(a[0], 0, 1, 0, 235);
        this.changeHue(val2);
        let hsv = this.RgbToHsv(col[0], col[1], col[2]);

        // this.changeColor(
        //     (this.heightColor * (hsv[1] * 100)) / 100,
        //     (this.widthColor * (-(hsv[2] * 100) + 100)) / 100
        // );
        this.setState({
            huePos:{
                y:val2
            },
            colorPos:{
                x: (this.heightColor * (hsv[1] * 100)) / 100,
                y:  (this.widthColor * (-(hsv[2] * 100) + 100)) / 100
            }
        })
        this.currentColorHex = val;
    }

    render(){
        return(
            <Container>
                <CanvasColorContainer id='color-container'>
                    <CanvasColor id='color' onMouseDown={this.handleColorDown}/>
                    <ColorCursor style={{
                        background:this.currentColorHex,
                        transform:`translate(${this.state.colorPos.x-7}px,${this.state.colorPos.y-7}px)`
                    }} id='colorCursor' onMouseDown={this.handleColorCursorDown} />
                </CanvasColorContainer>
                <CanvasHueContainer id='hue-container'>
                    <CanvasHue id='hue' onMouseDown={this.handleHueDown}/>
                    <HueCursor
                    id='hueCursor'
                    style={{
                        transform:`translate(0px,${this.state.huePos.y-4.5}px)`
                    }} onMouseDown={this.handleHueCursorDown} />
                </CanvasHueContainer>
            </Container>
        )
    }
} 

const Container = styled.div`
    position: fixed;
    background: #F7F7F7;
    border: 2px solid #DBDBDB;
    width: 255px;
    height: 255px;
    z-index: 1;
    border-radius: 4px;
    box-shadow: 0px 0px 24px -3px rgba(0, 0, 0, 0.1);
`
const CanvasColorContainer = styled.div`
    position: relative;
    width: 215px;   
    height: 235px; 
    float: left;
    margin-top: 7px;
    margin-left: 6px;
    overflow: visible;
`

const CanvasColor = styled.canvas`
    position: absolute;
    width: 215px;
    height: 235px;
    border-radius: 4px;
`
const ColorCursor = styled.div`
    position: absolute;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #b5b5b5;
`

const CanvasHueContainer = styled.div`
    position: relative;
    width: 18px;
    height: 235px;
    float: left;
    margin-top: 7px;
    margin-left: 6px;
    overflow: visible;
`

const CanvasHue = styled.canvas`
    position: absolute;
    width: 18px;   
    height: 235px; 
    border-radius: 4px;
`
const HueCursor = styled.div`
    position: absolute;
    width: 22px;
    height: 9px;
    background: #e8e8e8;
    border-radius: 6px;
    border: 1px solid #afafaf;
    margin-left: -2px;
`
