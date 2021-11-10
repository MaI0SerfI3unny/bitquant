import React from 'react'
import roll from '../../assets/svg/Rolling.svg'

const Loader = () => {
  return(
    <div style={{width:'100%',textAlign: 'center'}}>
      <img style={{width: 60}} src={roll} alt="loader"/>
    </div>
  )
}

export default Loader
