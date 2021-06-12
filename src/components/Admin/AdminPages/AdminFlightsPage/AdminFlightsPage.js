import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { IconButton } from '@material-ui/core'

import CustomDialog from 'components/shared/CustomDialog'
import Filter from 'components/Filter'
import { refreshCurrentToken } from 'services/token-service'
import API from 'api'
import {
  allFlightsEndPoint,
  allFlightsCountEndPoint,
  elementsOnAdminTable,
} from 'constants'

import FlightInfoDialogContent from './FlightInfoDialogContent'
import FlightEditDialogContent from './FlightEditDialogContent'

const useStyles = makeStyles((theme) => ({
  flightsGrid: {
    height: '500px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const AdminFlightsPage = () => {
  const classes = useStyles()
  const token = useSelector((state) => state.token)

  const [flights, setFlights] = useState([])
  const [totalFlightsNumber, setTotalFlightsNumber] = useState(0)

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(elementsOnAdminTable)
  const [departureCityFilter, setDepartureCityFilter] = useState('')
  const [arrivalCityFilter, setArrivalCityFilter] = useState('')

  const [flightForEditing, setFlightForEditing] = useState()
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false)

  const [flightIdEdit, setFlightIdInfo] = useState()
  const [isMoreInfoDialogOpened, setIsMoreInfoDialogOpened] = useState(false)

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'flightNumber', headerName: 'Flight number', width: 150 },
    { field: 'airplaneModel', headerName: 'Airplane model', width: 200 },
    {
      field: 'airplaneRegistartionNumber',
      headerName: 'Airplane registration number',
      width: 300,
    },
    {
      field: 'fromAirportName',
      headerName: 'Departure airport',
      width: 200,
    },
    { field: 'toAirportName', headerName: 'Arrival airport', width: 150 },
    { field: 'departureDate', headerName: 'Departure date', width: 200 },
    { field: 'arrivalDate', headerName: 'Arrival date', width: 200 },
    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: (row) => {
        return (
          <IconButton
            onClick={() => openEditInfoDialog(row.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        )
      },
    },
    {
      field: 'info',
      headerName: 'More info',
      renderCell: (row) => {
        return (
          <IconButton
            color="primary"
            onClick={() => openMoreInfoDialog(row.id)}
          >
            <InfoOutlinedIcon className={classes.moreInfoIcon} />
          </IconButton>
        )
      },
    },
  ]

  const rows = flights.map((value) => {
    return {
      id: value.id,
      flightNumber: value.flightNumber,
      airplaneId: value.airplane.id,
      airplaneModel: value.airplane.model,
      airplaneRegistartionNumber: value.airplane.registrationNumber,
      fromAirportName: value.from.name,
      fromAirportId: value.from.id,
      toAirportName: value.to.name,
      toAirportId: value.to.id,
      departureDate: value.departureDate,
      arrivalDate: value.arrivalDate,
    }
  })

  useEffect(() => {
    const getFlights = async () => {
      await API.get(`${allFlightsEndPoint}`, {
        params: {
          offset: offset,
          limit: limit,
          departureCity: departureCityFilter,
          arrivalCity: arrivalCityFilter,
        },
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setFlights(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken)
          if (error.response) {
            console.log(error.response.data)
          }
        })
    }
    const getFlightsCount = async () => {
      await API.get(`${allFlightsCountEndPoint}`, {
        params: {
          departureCity: departureCityFilter,
          arrivalCity: arrivalCityFilter,
        },
        headers: {
          Authorization: 'Bearer ' + token.jwtToken,
        },
      })
        .then((response) => response.data)
        .then((data) => setTotalFlightsNumber(data))
        .catch((error) => {
          refreshCurrentToken(token.refreshToken)
          if (error.response) {
            console.log(error.response.data)
          }
        })
    }

    getFlights()
    getFlightsCount()
  }, [
    offset,
    limit,
    departureCityFilter,
    arrivalCityFilter,
    isEditDialogOpened,
  ])

  const onFilterConfirmed = (values) => {
    setDepartureCityFilter(values[0])
    setArrivalCityFilter(values[1])
    setOffset(0)
  }

  const onPageChange = (page) => {
    setOffset(page * limit)
  }

  const openMoreInfoDialog = (id) => {
    setFlightIdInfo(id)
    setIsMoreInfoDialogOpened(true)
  }

  const closeMoreInfoDialog = () => {
    setIsMoreInfoDialogOpened(false)
  }

  const openEditInfoDialog = (row) => {
    setFlightForEditing(row)
    setIsEditDialogOpened(true)
  }

  const closeEditInfoDialog = () => {
    setIsEditDialogOpened(false)
  }

  return (
    <div>
      <CustomDialog
        title="More info"
        isOpened={isMoreInfoDialogOpened}
        DialogContent={
          <FlightInfoDialogContent
            elementUrl={`${allFlightsEndPoint}/${flightIdEdit}`}
          />
        }
        closeDialog={closeMoreInfoDialog}
      />
      <CustomDialog
        title="Edit"
        isOpened={isEditDialogOpened}
        DialogContent={
          <FlightEditDialogContent flightForEditing={flightForEditing} />
        }
        closeDialog={closeEditInfoDialog}
      />
      <div className={classes.tableHeader}>
        <Typography variant="h3">Flights</Typography>
        <Filter
          fields={['Departure city', 'Arrival city']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        onPageChange={(page) => onPageChange(page.page)}
        paginationMode="server"
        pageSize={limit}
        rowCount={totalFlightsNumber}
        checkboxSelection={false}
        disableColumnMenu={true}
        className={classes.flightsGrid}
      />
    </div>
  )
}

export default AdminFlightsPage
