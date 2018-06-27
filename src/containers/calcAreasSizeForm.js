import { connect } from 'react-redux';
import {
    setDepth, setHeight, setWidth, calcAreaPiso, calcAreaTecho
} from '../actions';
import { SizeDataForm } from '../components/sizeForm.js';


const actionSizeFrom = target => {
    const value = Number(target.value);
    switch (target.id) {
        case 'depth':
            return setDepth(value);
        case 'width':
            return setWidth(value);
        case 'height':
            return setHeight(value);
    }
}

const mapStateToProps = state => ({
    width: state.width,
    height: state.height,
    depth: state.depth,
    numberWindows: 3
});

const mapDispatchToProps = dispatch => ({
    onSizeChange: event => {
        dispatch(actionSizeFrom(event.target));
    },
    calcAreas: size => {
        dispatch(calcAreaPiso(size));
        dispatch(calcAreaPiso(size));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    dispatchProps.calcAreas(stateProps);

    return Object.assign({},  stateProps, {
        onSizeChange: event => dispatchProps.onSizeChange(event, stateProps)
    });
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SizeDataForm);
