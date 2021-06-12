import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FlightIcon from '@material-ui/icons/Flight'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
  flightInfo: {
    width: '800px',
    margin: 'auto',
    padding: '24px',
  },
  companyName: {
    alignSelf: 'center',
  },
  airplaneIcon: {
    alignSelf: 'center',
    transform: 'rotate(90deg)',
  },
  bookButton: {
    marginLeft: 'auto',
  },
  dividedLine: {
    margin: '0',
  },
  airplaneInfo: {
    flexGrow: 1,
  },
}))

const FlightsItem = ({
  flight: { airplane, from, to, arrivalDate, departureDate },
}) => {
  const classes = useStyles()

  return (
    <Grid item container>
      <Card className={classes.flightInfo} variant="outlined">
        <Grid container direction="column" spacing={2}>
          <hr className={classes.dividedLine}></hr>
          <Grid item container spacing={3}>
            <Grid item className={classes.companyName}>
              <Typography variant="h3" align="center">
                {airplane.company.name}
              </Typography>
            </Grid>
            <Grid item className={classes.airplaneInfo}>
              <Grid item container direction="column">
                <Grid item>
                  <Typography variant="subtitle1" align="center">
                    {airplane.model}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" align="center">
                    ({airplane.airplaneType.typeName})
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container direction="column">
                <Grid item>
                  <Typography variant="subtitle1" align="center">
                    {departureDate.split('T')[1]}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" align="center">
                    {departureDate.split('T')[0]}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="subtitle1" align="center">
                        {from.city.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" align="center">
                        "{from.name}"
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.airplaneIcon}>
              <FlightIcon />
            </Grid>
            <Grid item>
              <Grid item container direction="column">
                <Grid item>
                  <Typography variant="subtitle1" align="center">
                    {arrivalDate.split('T')[1]}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" align="center">
                    {arrivalDate.split('T')[0]}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle1" align="center">
                        {to.city.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" align="center">
                        "{to.name}"
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr className={classes.dividedLine}></hr>
          <Grid item container>
            <Button
              variant="contained"
              color="primary"
              className={classes.bookButton}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default FlightsItem
