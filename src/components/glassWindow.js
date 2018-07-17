import React from 'react';
import { connect } from 'react-redux';

class GlassWindows extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.showWindowsProps();
    }

    render() {
        return (
            <div className="glass-windows form-group">
                <div>
                    <small>
                        <strong> VENTANAS INSTALADAS: {this.props.vidrios.length}</strong>
                    </small>
                </div>
                <div>
                    <button type="button" className="btn btn-light" onClick={this.handleClick}>
                        <img height="24" width="24" src="./img/ventana_sin_sombra.svg"></img>
                        <span> Agregar o eliminar ventanas</span>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    vidrios: state.vidrios
});

const mapDispatchToProps = dispatch => ({
    showWindowsProps: () => dispatch({
        type: 'SHOW_WINDOWS_PROPS'
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GlassWindows);
