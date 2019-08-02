import ThreeContext from './ThreeContext'
import React, {Component} from 'react'
class ThreeProvider extends Component {
    render() {
      const {value} = this.props
        return (
            <ThreeContext.Provider value={value}>
              {this.props.children}
            </ThreeContext.Provider>
        );
    }
}

export default ThreeProvider