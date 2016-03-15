FlowRouter.route("/", {
  name: "homepage",
  triggersEnter: [anonOnly],
  action: () => {
    ReactLayout.render(MainLayout, {content: <HomePage />})
  }
})

/**
 * Routes for login, registration and settings
 * Using components from storyteller:accounts-react-materialize
 */
FlowRouter.route("/dashboard", {
 name: "dashboard",
 triggersEnter: [usersOnly],
 action: () => {
   ReactLayout.render(MainLayout, {content: <UserDashboard />})
 }
})

//user login
FlowRouter.route("/login", {
 name: "login",
 triggersEnter: [anonOnly],
 action: () => {
   ReactLayout.render(MainLayout, {content: <UserLogin />})
 }
})

//user registration
FlowRouter.route("/register", {
 name: "register",
 triggersEnter: [anonOnly],
 action: () => {
   ReactLayout.render(MainLayout, {content: <UserRegister />})
 }
})

//forgot password
FlowRouter.route("/forgot-password", {
  name: "forgot-password",
  triggersEnter: [anonOnly],
  action: ()=>{
    ReactLayout.render(MainLayout, {content: <ForgotPassword />})
  }
})

//user settings
FlowRouter.route("/user/settings", {
 name: "user-settings",
 triggersEnter: [usersOnly],
 action: () => {
   ReactLayout.render(MainLayout, {content: <UserSettings />})
 }
})

//friendship requests
FlowRouter.route("/user/friends/requests", {
  name: "user-friends-requests",
  triggersEnter: [usersOnly],
  action: () => {
    ReactLayout.render(MainLayout, {content: <UserFriendsRequests />})
  }
})

//user profiles
FlowRouter.route("/profile", {
  name: "profile-personal",
  triggersEnter: [usersOnly],
  action: () => {
    ReactLayout.render(MainLayout, { content: <UserProfile user={Meteor.userId()} />})
  }
})

FlowRouter.route("/profile/:username", {
  name: "profile",
  action: (params, queryParams) => {
   //if username null, go to the currently logged in user
   if(params.username === null){
     if(Meteor.userId()){
       FlowRouter.go("/profile")
     } else {
       //show 404
       console.log("User not found!")
     }
   }
   ReactLayout.render(MainLayout, { content: <UserProfile user={params.username} />})
 }
})

/**
 * Private messages
 */
FlowRouter.route("/pm", {
  name: "pm-overview",
  triggersEnter: [usersOnly],
  action: (params, queryParams) => {
    ReactLayout.render(MainLayout, {content: <UserConversationOverview />})
  }
})

FlowRouter.route("/pm/:conversationId", {
  name: "pm-conversation",
  triggersEnter: [usersOnly],
  action: (params, queryParams) => {
    ReactLayout.render(MainLayout, {content: <UserConversation conversationId={params.conversationId} />})
  }
})

/**
 * Functions for routes
 *
 */
function usersOnly(context){
  //TODO after loging redirect back to the given page
  if(Meteor.userId() === null){
    FlowRouter.go("login")
  }
}

function anonOnly(context){
  if(Meteor.userId()){
    FlowRouter.go("dashboard")
  }
}
