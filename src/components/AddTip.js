import React from 'react'
import { connect } from 'react-redux'
import { addTip } from '../reducers/tipReducer'
import { useField } from '../hooks/index'

const AddTip =  (props) => {
  const title = useField('text')
  const url = useField('text')

  // eslint-disable-next-line
  const removeReset = ({ reset: _, ...clone }) => clone

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addTip(e, {
      title: title.value,
      url: url.value
    })
    title.reset()
    url.reset()
  }

  return (
    <div className="form form--add-tip">
      <h3>Lisää vinkki</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Otsikko</label>
          <input
            data-cy="tip-title"
            id="tip_title"
            {...removeReset(title)}
          />
        </div>
        <div>
          <label>Linkki</label>
          <input
            data-cy="tip-url"
            id="tip_url"
            {...removeReset(url)}
          />
        </div>
        <button
          className="button button-primary button-submit"
          data-cy="add-tip"
          type="submit"
        >
          Lisää
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const connectedAddTip = connect(mapStateToProps, {
  addTip,
})(AddTip)

export default connectedAddTip
