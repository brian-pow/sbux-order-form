import "./App.css"
import React, { useState } from "react"

//Component imports
import menu from "../data/menu"
import BoxField from "./BoxField"

//Material-UI imports
import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import SendIcon from "@material-ui/icons/Send"
import Button from "@material-ui/core/Button"

//Misc imports
import * as html2canvas from "html2canvas"

import MuiPhoneNumber from "material-ui-phone-number"
import "react-phone-input-2/lib/style.css"

const axios = require("axios")

//Material-UI styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#00643b",
    color: "#FFFFFF",
  },
  sendButton: {
    backgroundColor: "#00643b",
    color: "#FFFFFF",
    fontWeight: 800,
  },
  saveButton: {
    backgroundColor: "#604c4b",
    color: "#FFFFFF",
    fontWeight: 800,
  },
}))

//Main function
function App() {
  const classes = useStyles()

  //Controls entries for each option
  const [entry, setEntry] = useState({
    Decaf: "",
    Shots: "",
    Syrup: "",
    Milk: "",
    Custom: "",
    Drink: "",
  })

  //Controls visibility for each option's selector
  const [show, setShow] = useState({
    Decaf: 0,
    Shots: 0,
    Syrup: 0,
    Milk: 0,
    Custom: 0,
    Drink: 0,
  })

  //Manages phone input
  const [showNumberEntry, setShowNumberEntry] = useState(0)
  const [phone, setPhone] = useState("")

  //Changes entries for each option
  function handleChange(selected, type) {
    setEntry((prevEntry) => {
      return {
        ...prevEntry,
        [type]: selected.value,
      }
    })
    handleShowChange(0, type)
  }

  //Toggles visibility of each option's selector
  function handleShowChange(value, type) {
    setShow((prevShow) => {
      return {
        ...prevShow,
        [type]: value,
      }
    })
  }

  //Toggles visibility of "send or save" field
  function showMobileField() {
    setShowNumberEntry(1)
  }

  //Sends message from Twilio through back-end express API
  function send() {
    let fullEntryDecaf = menu.choicesDecaf.filter((obj) => {
      return obj.value === entry.Decaf
    })
    let fullEntryShots = menu.choicesShots.filter((obj) => {
      return obj.value === entry.Shots
    })
    let fullEntrySyrup = menu.choicesSyrup.filter((obj) => {
      return obj.value === entry.Syrup
    })
    let fullEntryMilk = menu.choicesMilk.filter((obj) => {
      return obj.value === entry.Milk
    })
    let fullEntryCustom = menu.choicesCustom.filter((obj) => {
      return obj.value === entry.Custom
    })
    let fullEntryDrink = menu.choicesDrink.filter((obj) => {
      return obj.value === entry.Drink
    })

    //Creates object for send
    let textOrder = {
      decaf: fullEntryDecaf[0] ? fullEntryDecaf[0].label : null,
      shots: fullEntryShots[0] ? fullEntryShots[0].label : null,
      syrup: fullEntrySyrup[0] ? fullEntrySyrup[0].label : null,
      milk: fullEntryMilk[0] ? fullEntryMilk[0].label : null,
      custom: fullEntryCustom[0] ? fullEntryCustom[0].label : null,
      drink: fullEntryDrink[0] ? fullEntryDrink[0].label : null,
      phone: phone,
    }

    //Sends object
    axios
      .post("https://radiant-ravine-93051.herokuapp.com/", textOrder)
      .then(function (response) {
        console.log(response)
        setShowNumberEntry(0)
      })
  }

  //Saves image of selected options using html2canvas library
  function saveImage() {
    setShowNumberEntry(0)
    html2canvas(document.querySelector("#captureArea")).then((canvas) => {
      var a = document.createElement("a")
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream")
      a.download = "somefilename.jpg"
      a.click()
    })
  }

  return (
    <div className="App">
      <div className="container" id="container">
        <div id="captureArea">
          <BoxField
            fieldName="Decaf"
            onChange={handleChange}
            choices={menu.choicesDecaf}
            entry={entry.Decaf}
            onChange2={handleShowChange}
            show={show.Decaf}
          />
          <BoxField
            fieldName="Shots"
            onChange={handleChange}
            choices={menu.choicesShots}
            entry={entry.Shots}
            onChange2={handleShowChange}
            show={show.Shots}
          />
          <BoxField
            fieldName="Syrup"
            onChange={handleChange}
            choices={menu.choicesSyrup}
            entry={entry.Syrup}
            onChange2={handleShowChange}
            show={show.Syrup}
          />
          <BoxField
            fieldName="Milk"
            onChange={handleChange}
            choices={menu.choicesMilk}
            entry={entry.Milk}
            onChange2={handleShowChange}
            show={show.Milk}
          />
          <BoxField
            fieldName="Custom"
            onChange={handleChange}
            choices={menu.choicesCustom}
            entry={entry.Custom}
            onChange2={handleShowChange}
            show={show.Custom}
          />
          <BoxField
            fieldName="Drink"
            onChange={handleChange}
            choices={menu.choicesDrink}
            entry={entry.Drink}
            onChange2={handleShowChange}
            show={show.Drink}
          />
        </div>
        <div className={classes.root}>
          <Fab
            className={classes.fab}
            aria-label="send"
            onClick={showMobileField}
          >
            <SendIcon />
          </Fab>
        </div>
        <div
          className="selector"
          style={{ display: showNumberEntry ? "block" : "none" }}
        >
          <div className="formBox">
            <h3 className="boxFieldTitleForm">Enter mobile number.</h3>
            <MuiPhoneNumber
              defaultCountry={"us"}
              onChange={(phone) => setPhone(phone)}
            />
            <div className={classes.root}>
              <Button
                className={classes.saveButton}
                variant="contained"
                onClick={saveImage}
              >
                Save
              </Button>
              <Button
                className={classes.sendButton}
                variant="contained"
                onClick={send}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
