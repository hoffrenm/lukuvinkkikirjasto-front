import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateTip } from '../reducers/tipReducer'
import Button from './Button'

const EditTip = (props) => {
  const [read, setRead] = useState(props.tip.read)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    let tipToUpdate = {
      title: e.target.title.value,
      url: e.target.url.value,
      tags: e.target.tags.value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    }

    if (!read) {
      tipToUpdate = { ...tipToUpdate, read: false, readAt: null }
    }

    props.updateTip(props.tip.id, tipToUpdate)
    history.push('/')
  }

  const checkbox = () => (
    <>
      <div>
        <label>Merkkaa lukemattomaksi poistamalla valinta</label>
        <p>
          <input
            type="checkbox"
            checked={read}
            onChange={() => setRead(!read)}
          />
          Luettu {props.tip.readAt.toLocaleString('fi-FI')}
        </p>
      </div>
    </>
  )

  return (
    <div className="form form--add-tip">
      <h3>Päivitä vinkin tiedot</h3>
      <form onSubmit={handleSubmit}>
        <div className="form__field form__field--text">
          <label>Otsikko</label>
          <input
            type="text"
            name="title"
            defaultValue={props.tip.title}
            id={'input-Otsikko'}
          />
        </div>
        <div className="form__field form__field--text">
          <label>Linkki</label>
          <input
            type="text"
            name="url"
            defaultValue={props.tip.url}
            id={'input-Url'}
          />
        </div>
        <div className="form__field form__field--text">
          <label>Tagit</label>
          <input
            type="text"
            name="tags"
            defaultValue={props.tip.tags.join(', ')}
            id={'input-Tagit'}
          />
        </div>
        {props.tip.read && checkbox()}
        <Button
          buttonText="Päivitä"
          priority="primary"
          type="submit"
          cyDataAttribute="update-tip"
        />
        <Button
          buttonText="Palaa takaisin"
          priority="secondary"
          onClick={() => history.push('/')}
        />
      </form>
    </div>
  )
}

const mapStateToProps = () => {
  return {}
}

const connectedEditTip = connect(mapStateToProps, {
  updateTip,
})(EditTip)

export default connectedEditTip
