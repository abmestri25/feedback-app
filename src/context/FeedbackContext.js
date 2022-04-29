import { createContext, useState, useEffect } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackedit] = useState({
    item: {},
    edit: false,
  })

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure want to delete ?")) {
      await fetch(`http://localhost:5000/feedback/${id}`, {
        method: "DELETE",
      })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const res = await fetch(`http://localhost:5000/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await res.json()
    setFeedback([data, ...feedback])
  }

  const updateFeedback = async (id, updItem) => {
    const res = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    })

    const data = await res.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  const fetchFeedback = async () => {
    const res = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    )
    const data = await res.json()
    setFeedback(data)
    setLoading(false)
  }

  // this is a state not a function
  const editFeedback = (item) => {
    setFeedbackedit({
      item,
      edit: true,
    })
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        loading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
