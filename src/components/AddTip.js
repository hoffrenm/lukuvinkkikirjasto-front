import React from 'react'
import { connect } from 'react-redux'
import { addTip } from '../reducers/tipReducer'
import { useField } from '../hooks/index'
import TextInput from './TextInput'
import Button from './Button'

const AddTip =  (props) => {
  const title = useField('text')
  const url = useField('text')
  const tags = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addTip({
      title: title.value,
      url: url.value,
      tags: tags.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    })
    if (props.tips.error === null) {
      title.reset()
      url.reset()
      tags.reset()
    }
  }

  return (
    <div className="form form--add-tip">
      <h3>Lisää vinkki</h3>
      <form onSubmit={handleSubmit}>
        <TextInput label='Otsikko' inputValue={title} />
        <TextInput label='Linkki' inputValue={url} />
        <TextInput label='Tagit' inputValue={tags} />
        <Button buttonText='Lisää' priority='primary' type='submit' cyDataAttribute='add-tip' />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tips: state.tips,
  }
}

const connectedAddTip = connect(mapStateToProps, {
  addTip,
})(AddTip)

export default connectedAddTip
