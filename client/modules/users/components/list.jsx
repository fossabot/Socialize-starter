import React from 'react'
import {Link} from 'react-router'
import Helmet from 'react-helmet'

export default class UserListing extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let list = this.props.users.map((user)=>{
      return <Link to={"users/" + user.username} key={user._id} className="collection-item"><i className="material-icons">account_circle</i> {user.username}</Link>
    })

    let {page, totalUsers, limit} = this.props
    let previousPage, nextPage

    page = Number(page)

    if(page > 1){
      previousPage = <li><Link to={"users?page=" + (page-1)}><i className="material-icons">chevron_left</i></Link></li>
    }

    if(totalUsers >= (page * limit)){
      nextPage = <li><Link to={"users?page=" + (page+1)}><i className="material-icons">chevron_right</i></Link></li>
    }

    return <div>
      <Helmet
        title="Users"
      />
      <h1>User listing</h1>
      <div className="collection">
        {list}
      </div>
      <ul className="pagination">
        {previousPage}
        {nextPage}
      </ul>
    </div>
  }
}
