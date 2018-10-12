import React from 'react'
import NumberFormat from 'react-number-format'

function NumberField(props) {
  const {inputRef, onChange, ...other} = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        })
      }}
      thousandSeparator
    />
  )
}

export default NumberField
