import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  field: {
    width: 200,
  },
  searchButton: {
    height: 40,
  },
}));

const Filter = ({ fields, fieldsOptions, onFilterConfirmed }) => {
  const classes = useStyles();
  const [selectedValues, setSelectedValues] = useState(["", ""]);

  const searchClickHandle = () => {
    onFilterConfirmed(selectedValues);
  };

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        {fields.map((field, key) => {
          return (
            <Grid item key={key}>
              <Autocomplete
                id={`filter${key}`}
                options={fieldsOptions[key]}
                getOptionLabel={(option) => option.name}
                className={classes.field}
                inputValue={selectedValues[key]}
                onInputChange={(event, newInputValue) => {
                  setSelectedValues([
                    ...selectedValues.slice(0, key),
                    newInputValue,
                    ...selectedValues.slice(key + 1),
                  ]);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={field} variant="outlined" />
                )}
              />
            </Grid>
          );
        })}
        <Button
          variant="contained"
          color="primary"
          className={classes.searchButton}
          onClick={searchClickHandle}
        >
          Search
        </Button>
      </Grid>
    </>
  );
};

export default Filter;
