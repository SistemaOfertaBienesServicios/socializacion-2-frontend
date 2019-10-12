import React from 'react'
// Etiqueta de bulma
// Acepta en el parámetro tagType los siguientes strings:

// is-black
// is-dark
// is-light
// is-white

// is-primary
// is-link
// is-info
// is-success
// is-warning
// is-danger

const Tag = ({ label, tagType }) => (
  <span className={`tag is-small ${tagType}`}>{label}</span>
)

export default Tag
