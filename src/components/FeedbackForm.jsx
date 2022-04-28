import { useState, useContext, useEffect } from "react"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setBtnDisabled(false)
    }
  }, [feedbackEdit])

  const [text, setText] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState("")

  const handleTextChange = (e) => {
    if (rating === "") {
      setMessage("Please Provide Rating !")
      setBtnDisabled(true)
    } else if (text === "") {
      setMessage("Please Provide Review !")
      setBtnDisabled(true)
    } else if (text !== "" && text.trim().length < 10) {
      setMessage("Text must be more than 10 characters !")
      setBtnDisabled(true)
    } else {
      setMessage("Everything looks good !")
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text !== "" && text.trim().length > 10 && rating !== "") {
      const newFeedback = {
        text,
        rating,
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
        feedbackEdit.edit = false
        setText("")
        setBtnDisabled(true)
        setMessage("")
      } else {
        addFeedback(newFeedback)
        setText("")
        setBtnDisabled(true)
        setMessage("")
      }
    } else {
      setMessage("Something Went Wrong !")
      setBtnDisabled(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
        <RatingSelect
          select={(rating) => {
            setRating(rating)
          }}
        />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          {feedbackEdit.edit === true ? (
            <Button type='submit' isDisabled={btnDisabled}>
              Update
            </Button>
          ) : (
            <Button type='submit' isDisabled={btnDisabled}>
              Send
            </Button>
          )}
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
