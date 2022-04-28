import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import AboutPage from "./pages/AboutPage"
import Header from "./components/Header"
import "./App.css"
import AboutIconLink from "./components/AboutIconLink"
import { FeedbackProvider } from "./context/FeedbackContext"
// import FeedbackData from "./data/FeedbackData"

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            />
            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App
