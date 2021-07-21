import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import {
  getAirplaneTypes,
  getAllCompanies,
  addAirplane,
} from 'api/apiRequests';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: '100%',
  },
  airplaneCreationForm: {
    padding: theme.spacing(1),
  },
}));

const AirplaneCreateDialogContent = ({ closeDialog }) => {
  const classes = useStyles();

  const [airplaneType, setAirplaneType] = useState('');
  const [airplaneTypeId, setAirplaneTypeId] = useState();

  const [company, setCompany] = useState('');
  const [companyId, setCompanyId] = useState();

  const [airplaneTypes, setAirplaneTypes] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState();
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const airplaneTypes = await getAirplaneTypes();
      const companies = await getAllCompanies();

      setAirplaneTypes(airplaneTypes);
      setCompanies(companies);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    await addAirplane(
      airplaneTypeId,
      companyId,
      model,
      registrationNumber,
      rows,
      columns
    );
    closeDialog();
  };

  return (
    <>
      <DialogContent>
        <form className={classes.airplaneCreationForm}>
          <Grid container direction="column" spacing={1}>
            <Grid item lg={12}>
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Model"
                onChange={(e) => setModel(e.target.value)}
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Registration number"
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </Grid>
            <Grid item lg={12}>
              <FormControl className={classes.formField}>
                <InputLabel>Airplane type</InputLabel>
                <Select
                  value={airplaneType}
                  onChange={(event) => setAirplaneType(event.target.value)}
                >
                  {airplaneTypes.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.typeName}
                      onClick={() => setAirplaneTypeId(item.id)}
                    >
                      {item.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item lg={6}>
                <TextField
                  className={classes.formField}
                  variant="outlined"
                  label="Rows number"
                  onChange={(e) => setRows(e.target.value)}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  className={classes.formField}
                  variant="outlined"
                  label="Places number in a row"
                  onChange={(e) => setColumns(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <FormControl className={classes.formField}>
                <InputLabel>Company</InputLabel>
                <Select
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                >
                  {companies.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.name}
                      onClick={() => setCompanyId(item.id)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<KeyboardArrowRightIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default AirplaneCreateDialogContent;
