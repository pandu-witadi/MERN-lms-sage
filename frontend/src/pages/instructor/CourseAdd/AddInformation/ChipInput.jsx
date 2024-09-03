import {useEffect, useState} from "react"

import {MdClose} from "react-icons/md"
import {useTranslation} from "react-i18next";

// Defining a functional component ChipInput
export default function ChipInput({label, name, placeholder, register, errors, setValue, getValues, required}) {
  const {t} = useTranslation();

  // Setting up state for managing chips array
  const [chips, setChips] = useState([])

  useEffect(() => {
    setChips(getValues(name) || [])
    setValue(name, chips)
    register(name, {required: required, validate: (value) => value.length > 0}, chips);
  }, [])

  // "Updates value whenever 'chips' is modified
  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]

        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  // Render the component
  return (
    <div className="flex flex-col space-y-2">
      <label className="my-form-label" htmlFor={name}>{label} <sup className="text-error">{required ? "*" : ""}</sup></label>
      <div className="flex w-full flex-row flex-wrap gap-2 my-form-chip-style">
        {chips?.map((chip, index) => (
          <div key={index} className="m-1 flex items-center justify-items-center rounded-full bg-app-base sm:px-4 px-2 text-sm">
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}>
              <MdClose className="text-sm"/>
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          // placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className=""
        />
      </div>
      <span className={"text-xs opacity-75"}>{placeholder}</span>
      {errors[name] && (<span className="my-form-style-error"> {required ? (label + " " + t("isNeeded")) : (errors[name].message)}</span>)}
    </div>
  )
}