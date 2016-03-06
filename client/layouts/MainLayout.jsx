MainLayout = React.createClass({
  showMenu(){
    //determine which menu to show
    if(Meteor.userId()){
      //user is logged in
      return (<NavBar />)
    } else {
      return (<NavPublic />)
    }
  },
  render(){
    return (<div id="app">
      {this.showMenu()}
      <main id="main" className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel glass">
              {this.props.content}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>)
  }
})
