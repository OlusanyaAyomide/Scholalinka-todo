import React, { useContext } from 'react'
import Todos from './pages/Todos'
import AllContext from './store/store'
import SignIn from './pages/signIn'
import Loader from './pages/Loader'
import SignUp from './pages/signUp'

export default function App() {
  const {theme,page} = useContext(AllContext)
  //strings to navigate between pages instead of router
  return (
    <div className={theme==="light"?"":"dark"}>
      {page === "todo" && <Todos/>}
      {page === "signin" && <SignIn/>}
      {page === "loading" && <Loader/>}
      {page === "signup" && <SignUp/>}
      
    </div>
  )
}
