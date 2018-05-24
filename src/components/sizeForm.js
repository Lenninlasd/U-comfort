import React from 'react';

export default class SizeDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onSizeChange(event.target);
    }

    render() {
        return (
            <form>
                <div className='form-row form-group'>
                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <small><strong>LENGTH:</strong></small>
                        <input id='length' className="form-control" type="number" value={this.props.length} placeholder='length' onChange={this.handleChange} />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <small><strong>WIDTH:</strong></small>
                        <input id='width' className="form-control" type="number" value={this.props.width}  placeholder='width'  onChange={this.handleChange} />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <small><strong>HEIGHT:</strong></small>
                        <input id='height' className="form-control"  type="number" value={this.props.height} placeholder='height' onChange={this.handleChange} />
                    </div>
                    <div className="offset-lg-1 col-lg-5 col-md-12 col-sm-12">
                        <small><strong># GLASS WINDOWS:</strong></small>
                        <input id='numberWindows' className="form-control" type="number" value={this.props.numberWindows}
                            placeholder='numero de ventanas' onChange={this.handleChange} min='0' max='20' />
                    </div>
                </div>
            </form>
        );
    }
}
