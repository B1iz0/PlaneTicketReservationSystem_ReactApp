import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import PlacesPriceDialog from 'components/shared/Dialogs/PlacesPriceDialog';
import Table from 'components/shared/Table';
import Filter from 'components/Filter';
import { elementsOnAdminTable } from 'constants';
import { getAirplanes, getAirplanesCount } from 'api/apiRequests';

const useStyles = makeStyles((theme) => ({
  airplanesTable: {
    minHeight: 400,
  },
  airplanesFilter: {
    marginBottom: theme.spacing(2),
  },
}));

const CompanyAirplanesTable = ({ companyName }) => {
  const classes = useStyles();
  let history = useHistory();
  
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [modelFilter, setModelFilter] = useState('');
  const [airplaneTypeFilter, setAirplaneTypeFilter] = useState('');
  
  const [airplanes, setAirplanes] = useState([]);
  const [airplanesCount, setAirplanesCount] = useState(0);
  
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  
  const [isPlacesPriceDialogOpened, setIsPlacesPriceDialogOpened] = useState(false);
  
  const columns = [
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    {
      field: 'registrationNumber',
      headerName: 'Registration number',
      width: 200,
    },
    {
      field: 'baggageCapacity',
      headerName: 'Baggage capacity',
      width: 200,
      type: 'number',
      valueFormatter: (params) => {
        return `${params.value} Kg`;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (row) => {
        return (
          <>
            <Tooltip title='Places price'>
              <IconButton color='primary' onClick={() => openPlacesPriceDialog(row.row)}>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const rows = airplanes.map((value) => ({
    id: value.id,
    type: value.airplaneType.typeName,
    model: value.model,
    registrationNumber: value.registrationNumber,
    baggageCapacity: value.baggageCapacityInKilograms,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (companyName) {
        const filters = {
          company: companyName,
          airplaneType: airplaneTypeFilter,
          model: modelFilter,
        };
        const airplanesResponse = await getAirplanes(
          offset,
          filters.airplaneType,
          filters.company,
          filters.model
        );
        if (airplanesResponse) setAirplanes(airplanesResponse);
        const airplanesCount = await getAirplanesCount(
          filters.airplaneType,
          filters.company,
          filters.model
        );
        if (airplanesCount) setAirplanesCount(airplanesCount);
      }
    };

    fetchData();
  }, [companyName, offset, modelFilter, airplaneTypeFilter]);

  const onFilterConfirmed = (values) => {
    setAirplaneTypeFilter(values[0]);
    setModelFilter(values[1]);
    setOffset(0);
    setPage(0);
  };

  const onPageChange = (page) => {
    setPage(page);
    setOffset(page * elementsOnAdminTable);
  };

  const openAddPage = () => {
    history.push('/admin/airplanes/creation');
  };

  const openPlacesPriceDialog = (airplane) => {
    setSelectedAirplane(airplane);
    setIsPlacesPriceDialogOpened(true);
  };

  return (
    <>
      <div className={classes.airplanesFilter}>
        <Filter
          fields={['Airplane type', 'Model']}
          disableOptions={true}
          onFilterConfirmed={onFilterConfirmed}
        />
      </div>
      <PlacesPriceDialog 
        airplane={selectedAirplane}
        isOpened={isPlacesPriceDialogOpened}
        closeDialog={() => setIsPlacesPriceDialogOpened(false)}
      />
      <Table
        page={page}
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        rowCount={airplanesCount}
        onAddClick={openAddPage}
      />
    </>
  );
};

export default CompanyAirplanesTable;
