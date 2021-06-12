import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
})

const PriceTable = ({ prices }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="price table">
        <TableHead>
          <TableRow>
            <TableCell>Place type</TableCell>
            <TableCell align="right">Ticket price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices?.map((price) => (
            <TableRow key={price.id}>
              <TableCell component="th" scope="row">
                {price.placeType}
              </TableCell>
              <TableCell align="right">{price.ticketPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PriceTable
