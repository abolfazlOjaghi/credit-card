import Input from "./input"
import { useState } from "react"
function App() {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitForm, setSubmitForm] = useState(false)
  const inputProps = [
    {
      placeholder: "Example : Abolfazl Ojaghi",
      label: "your name",
      name: "name",
      error : errors.name
    },
    {
      placeholder: "in format : XXXX XXXX XXXX XXXX",
      label: "card number",
      name: "number",
      maxlength: 16,
      error : errors.number
    }
  ]
  const inputProps2 = [
    {
      placeholder : "01 to 12",
      label: "expiry month",
      name: "month",
      width: "w-28 max-md:w-24",
      maxlength: 2,
      error : errors.month
    },
    {
      placeholder : "25 to 29",
      label: "expiry year",
      name: "year",
      width: "w-28 max-md:w-24",
      maxlength: 2,
      error : errors.year
    },
    {
      placeholder : "3/4 digits",
      label : "CVC",
      name : "cvc",
      width : "w-28 max-md:w-24",
      maxlength: 4,
      error : errors.cvc
    }
  ]
  const handleChanges = ({target}) => {
    const numericValue = target.value.replace(/\D/g, "")
    const lettersValue = target.value.replace(/[^a-zA-Z\s]/g, "")
    target.name != "name" ? target.value = numericValue : target.value = lettersValue
    setFormData(prev => ({...prev, [target.name]: target.value}))
  }
  const handleBlur = ({target}) => {
    switch (target.name) {
      case "name" :
        target.value.length < 3 ? setErrors(prev => ({...prev, [target.name]: "name must be at least 3 characters"})) : setErrors(prev => ({...prev, [target.name]: false}))
        break
      case "number" :
        target.value.length != 16 ? setErrors(prev => ({...prev, [target.name]: "card number must be 16 digits"})) : setErrors(prev => ({...prev, [target.name]: false}))
        break
      case "month" :
        target.value.length != 2 || target.value < 1 || target.value > 12 ? setErrors(prev => ({...prev, [target.name]: "month must be 01 to 12"})) : setErrors(prev => ({...prev, [target.name]: false}))
        break
      case "year" :
        target.value.length != 2 || target.value < 25 || target.value > 29 ? setErrors(prev => ({...prev, [target.name]: "year must be 25 to 29"})) : setErrors(prev => ({...prev, [target.name]: false}))
        break
      case "cvc" :
        target.value.length != 3 && target.value.length != 4 ? setErrors(prev => ({...prev, [target.name]: "CVC must be 3 or 4 digits"})) : setErrors(prev => ({...prev, [target.name]: false}))
        break
    }
  }
  const handleSubmit  = e => {
    e.preventDefault();
    const hasEmptyFields = Object.values(formData).some(value => value === "");
    const hasErrors = Object.values(errors).some(error => error);
    (!hasEmptyFields && !hasErrors) && setSubmitForm(true)
  }
  return (
    <section className="flex items-center justify-center w-screen h-screen gap-12 max-lg:flex-col-reverse">
      {!submitForm ? 
      <form className="*:space-y-6 space-y-6 *:max-md:text-sm" onSubmit={handleSubmit}>
        <div className="flex-col items-center max-md:flex">
          {
            inputProps.map((props, index) => {
              return <Input key={index} {...props} handleChanges={handleChanges} handleBlur={handleBlur} />
            })
          }
        </div>
        <div className="flex md:gap-x-6 max-md:justify-between">
          {
            inputProps2.map((props, index) => {
              return <Input key={index} {...props} handleChanges={handleChanges} handleBlur={handleBlur}/>
            })
          }
        </div>
        <button className="bg-linear-to-r from-indigo-600 to-red-600 w-full py-1.5 rounded-xl text-white" type="submit">Confrim</button>
      </form>
      :
      <div className="flex flex-col items-center transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#2b00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
        <h2 className="text-4xl text-white">Thank You!</h2>
      </div>
      }
      <div className="bg-linear-to-r from-indigo-600 to-red-600 rounded-xl max-md:w-[22rem] max-md:h-48 w-[29rem] h-56 text-white p-6 flex flex-col justify-between items-center">
        <div className="flex justify-between w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <p>bank card</p>
        </div>
        <p className="text-4xl max-md:text-3xl">{formData.number ? formData.number.match(/.{1,4}/g).join(" ") : "0000 0000 0000 0000"}</p>
        <div className="flex justify-between w-full">
          <p>CVC: {formData.cvc && formData.cvc}</p>
          <p>{formData.name ? formData.name : "Your name"}</p>
          <p>{formData.month ? formData.month : "MM"}/{formData.year ? formData.year : "YY"}</p>
        </div>
      </div>
    </section>
  )
}
export default App
