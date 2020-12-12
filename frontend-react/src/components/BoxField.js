import React from "react"

//Material-UI imports
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

//Material-UI styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

//Function for selector box
function BoxField({ fieldName, choices, onChange, entry, onChange2, show }) {
  const classes = useStyles()

  //Directs selection changes to parent component
  function handleChange(event) {
    onChange(event.target, fieldName)
  }

  //Directs visibility toggle changes to parent component
  function toggleShow(event) {
    onChange2(1, fieldName)
  }

  return (
    <div className="boxField">
      <h2 className="boxFieldTitle">{fieldName}</h2>
      <div className="boxField" onClick={toggleShow}>
        <div className="boxBorder">
          <h3 className="boxFieldText">{entry}</h3>
        </div>
      </div>
      <div className="selector" style={{ display: show ? "block" : "none" }}>
        <div className="formBox">
          <h3 className="boxFieldTitleForm">{fieldName}</h3>
          <div className="selectBox">
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                onChange={handleChange}
              >
                {choices.map((choice) => (
                  <MenuItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxField
