import React from 'react'
import { connect } from 'react-redux'

// Latidud
import condicionesClimaticas from '../../json/condiciones_climaticas'

const ExteriorConditions = ({ exterior, handleChange }) => {
  const optionList = condicionesClimaticas.map(item => {
    return (
      <option key={item.id} value={item.id}>
        {item.ciudad}
      </option>
    )
  })

  return (
    <form>
      <div className="form-row form-group">
        <div className="col-md-12 col-sm-12">
          <small>
            <strong>CIUDAD:</strong>
          </small>
          <select id="ciudad" className="form-control" onChange={handleChange} value={exterior.id}>
            <option hidden>CIUDAD</option>
            {optionList}
          </select>
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = state => ({
  exterior: state.exterior
})

const mapDispatchToProps = dispatch => ({
  handleChange: event => {
    const value = event.target.value
    dispatch({
      type: 'SET_EXTERIOR_CONDITIONS',
      exterior: condicionesClimaticas[value]
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExteriorConditions)
