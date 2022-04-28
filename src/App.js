import { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import Header from "./components/Header"
import { v4 as uuidv4 } from "uuid"
import "./App.css"
// import FeedbackData from "./data/FeedbackData"

function App() {
  const [feedback, setFeedback] = useState([])

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure want to delete ?")) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }
  return (
    <Router>
      <Header title='Feedback UI' />
      <div className='container'>
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />

        <Route path='/about'>This is about route</Route>
      </div>
    </Router>
  )
}

export default App
