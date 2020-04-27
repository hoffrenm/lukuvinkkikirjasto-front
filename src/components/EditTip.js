import React, { useState, useEffect } from 'react'
import tipService from '../services/tips'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateTip } from '../reducers/tipReducer'
import Button from './Button'
import Loading from './Loading'

const EditTip = (props) => {
  const [tip, setTip] = useState(null)
  const [read, setRead] = useState(false)
  const history = useHistory()

  const formatTip = (tip) => ({
    ...tip,
    createdAt: new Date(tip.createdAt),
    readAt: tip.read ? new Date(tip.readAt) : null,
  })

  useEffect(() => {
    tipService.getById(props.id).then(response => {
      setTip(formatTip(response.data))
      setRead(response.data.read)
    })
  }, [props.id])

  const handleSubmit = (e) => {
    e.preventDefault()

    let tipToUpdate = {
      title: e.target.title.value.trim(),
      url: e.target.url.value,
      tags: e.target.tags.value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    }

    if (!read) {
      tipToUpdate = { ...tipToUpdate, read: false, readAt: null }
    }

    props.updateTip(tip.id, tipToUpdate)
    history.push('/')
  }

  const checkbox = () => (
    <>
      <div>
        <label>Merkkaa lukemattomaksi poistamalla valinta</label>
        <p>
          <input
            type="checkbox"
            id="tip-unread"
            checked={read}
            onChange={() => setRead(!read)}
          />
          Luettu {tip.readAt.toLocaleString('fi-FI')}
        </p>
      </div>
    </>
  )

  if (!tip) {
    return <Loading />
  }

  return (
    <div className="form form--add-tip">
      <h3>Päivitä vinkin tiedot</h3>
      <p>Vinkki luotu {tip.createdAt.toLocaleString('fi-FI')}</p>
      <form onSubmit={handleSubmit}>
        <div className="form__field form__field--text">
          <label>Otsikko</label>
          <input
            type="text"
            name="title"
            defaultValue={tip.title}
            id={'input-Otsikko'}
          />
        </div>
        <div className="form__field form__field--text">
          <label>Linkki</label>
          <input
            type="text"
            name="url"
            defaultValue={tip.url}
            id={'input-Url'}
          />
        </div>
        <div className="form__field form__field--text">
          <label>Tagit</label>
          <input
            type="text"
            name="tags"
            defaultValue={tip.tags.join(', ')}
            id={'input-Tagit'}
          />
        </div>
        {tip.read && checkbox()}
        <Button
          buttonText="Päivitä"
          id="tip-update"
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
