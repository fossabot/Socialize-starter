import React from 'react'
import NavUser from '../containers/nav_user.js'
import NavPublic from './nav_public.jsx'

export default class Navigation extends React.Component {
render(){
    if(this.props.user){
      return <NavUser />
    } else {
      return <NavPublic />
    }
  }
}