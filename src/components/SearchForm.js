import React from 'react'
import { connect } from 'react-redux'
import { searchByTerms, removeSearchFilter } from '../reducers/tipReducer'
import { useField } from '../hooks/index'
import TextInput from './TextInput'
import Button from './Button'

const SearchForm = (props) => {

  const title = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.searchByTerms({
      title: title.value.trim()
    })
  }

  const handleReset = () => {
    title.reset()
    props.removeSearchFilter()
  }

  return (
    <div className="search-form__wrapper">
      <form className="search__form" onSubmit={handleSubmit}>
        <TextInput label='Etsi vinkkejä' inputValue={title} />
        <Button buttonText='Hae' priority='primary' type='submit' cyDataAttribute='search-by-tip-title' />
      </form>
      {props.isSearchActive &&
          <Button
            onClick={() => handleReset()}
            buttonText='Poista hakusuodatin'
            priority='secondary'
            type='button'
            cyDataAttribute='remove-search-filter'
          />
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isSearchActive: state.tips.isSearchActive
  }
}

const connectedSearchForm = connect(mapStateToProps, {
  searchByTerms,
  removeSearchFilter
})(SearchForm)

export default connectedSearchForm