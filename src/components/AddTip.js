import React from 'react'
import { connect } from 'react-redux'
import { addTip } from '../reducers/tipReducer'
import { useField } from '../hooks/index'

const AddTip = (props) => {
  const newTitle = useField('text')
  const newUrl = useField('text')
  // const title = useField('text')
  // const url = useField('text'

  // eslint-disable-next-line
  const removeReset = ({ reset: _, ...clone }) => clone

  return (
    <div className="form form--add-tip">
      <h3>Lisää vinkki</h3>
      <form
        onSubmit={(e) =>
          props.addTip(e, {
            title: newTitle.value,
            url: newUrl.value,
            // title: title.value,
            // url: url.value
          })
        }
      >
        <div>
          <label>Otsikko</label>
          <input
            data-cy="tip-title"
            id="tip_title"
            {...removeReset(newTitle)}
          />
        </div>
        <div>
          <label>Linkki</label>
          <input data-cy="tip-url" id="tip_url" {...removeReset(newUrl)} />
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
    newTitle: state.tips.newTitle,
    newUrl: state.tips.newUrl,
  }
}

const connectedAddTip = connect(mapStateToProps, {
  addTip,
})(AddTip)

export default connectedAddTip
