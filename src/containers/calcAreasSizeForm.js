import { connect } from 'react-redux';
import {
    setDepth, setHeight, setWidth, calcAreaPiso, calcAreaTecho,
    setNumberOfPeople, setNumberOfLights
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
        case 'numberOfPeople':
            return setNumberOfPeople(value);
        case 'numberOfLights':
            return setNumberOfLights(value);
    }
}

const mapStateToProps = state => ({
    width: state.width,
    height: state.height,
    depth: state.depth,
    numberOfPeople: state.numberOfPeople,
    numberOfLights: state.luces.numberOfLights
});

const mapDispatchToProps = dispatch => ({
    onSizeChange: event => {
        dispatch(actionSizeFrom(event.target));
        dispatch(calcAreaPiso());
        dispatch(calcAreaTecho());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SizeDataForm);
