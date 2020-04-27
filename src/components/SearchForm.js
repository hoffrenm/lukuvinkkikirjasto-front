import React from 'react'
import { connect } from 'react-redux'
import { searchByTerms, searchByTag, removeSearchFilter } from '../reducers/tipReducer'
import { useField } from '../hooks/index'
import TextInput from './TextInput'
import Button from './Button'

const SearchForm = (props) => {

  const title = useField('text')
  const tag = useField('text')

  const handleTitleSearchSubmit = (e) => {
    e.preventDefault()
    tag.reset()
    props.searchByTerms({
      title: title.value.trim(),
    })
  }

  const handleTagSearchSubmit = (e) => {
    e.preventDefault()
    title.reset()
    props.searchByTag({
      tag: tag.value.trim(),
    })
  }

  const handleReset = () => {
    title.reset()
    tag.reset()
    props.removeSearchFilter()
  }

  return (
    <div className="search-form__wrapper">
      <form className="search__form search__form--title" onSubmit={handleTitleSearchSubmit}>
        <TextInput label='Etsi vinkkejä otsikolla' inputValue={title} />
        <Button buttonText='Hae' priority='primary' type='submit' cyDataAttribute='search-by-tip-title' />
      </form>
      <form className="search__form search__form--tags" onSubmit={handleTagSearchSubmit}>
        <TextInput label='Etsi vinkkejä tagilla' inputValue={tag} />
        <Button buttonText='Hae' priority='primary' type='submit' cyDataAttribute='search-by-tip-tag' />
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
    isSearchActive: state.tips.isSearchActive,
  }
}

const connectedSearchForm = connect(mapStateToProps, {
  searchByTerms,
  searchByTag,
  removeSearchFilter,
})(SearchForm)

export default connectedSearchForm