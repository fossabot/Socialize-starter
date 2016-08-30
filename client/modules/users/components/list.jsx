import React from 'react'
import {Link} from 'react-router'

export default class UserListing extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let list = this.props.users.map((user)=>{
      return <Link to={"users/"+user.username} key={user._id} className="collection-item"><i className="material-icons">account_circle</i> {user.username}</Link>
    })

    let {page, totalUsers} = this.props
    let previousPage, nextPage
    let perPage = 10

    page = Number(page)

    if(page <= 1){
      previousPage = "disabled"
    }

    if(totalUsers >= (page - 1) * perPage ){
      nextPage = "disabled"
    }

    return <div>
      <h1>User listing</h1>
      <div className="collection">
        {list}
      </div>
      <ul className="pagination">
        <li className={previousPage}><Link to={"users?page="+ page--}><i className="material-icons">chevron_left</i></Link></li>
        <li className={nextPage}><Link to={"users?page="+ page++}><i className="material-icons">chevron_right</i></Link></li>
      </ul>
    </div>
  }
}
