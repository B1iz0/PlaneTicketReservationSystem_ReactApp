import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import PlacesPriceDialog from 'components/shared/Dialogs/PlacesPriceDialog';
import Table from 'components/shared/Table';
import Filter from 'shared/Filter';
import { elementsOnAdminTable } from 'constants';
import { getAirplanes, getAirplanesCount } from 'api/airplaneRequests';
import { getAirplaneSearchHints } from 'api/searchHintsRequests';

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
  let timer = null;

  const [airplaneTypeHints, setAirplaneTypeHints] = useState([]);
  const [modelHints, setModelHints] = useState([]);

  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [modelFilter, setModelFilter] = useState('');
  const [airplaneTypeFilter, setAirplaneTypeFilter] = useState('');

  const [airplanes, setAirplanes] = useState([]);
  const [airplanesCount, setAirplanesCount] = useState(0);

  const [selectedAirplane, setSelectedAirplane] = useState(null);

  const [isPlacesPriceDialogOpened, setIsPlacesPriceDialogOpened] =
    useState(false);

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
            <Tooltip title="Places price">
              <IconButton
                color="primary"
                onClick={() => openPlacesPriceDialog(row.row)}
              >
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

  const fetchAirplanes = async () => {
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

  const fetchHints = async () => {
    const hints = await getAirplaneSearchHints({
      airplaneType: airplaneTypeFilter,
      companyName: companyName,
      model: modelFilter,
    });
    const airplaneTypes = hints.map((value) => value.airplaneType);
    const models = hints.map((value) => value.model);
    setAirplaneTypeHints([...new Set(airplaneTypes)]);
    setModelHints([...new Set(models)]);
  };

  useEffect(() => {
    fetchAirplanes();
  }, [companyName, offset, page, airplaneTypeFilter, modelFilter]);

  const onFilterConfirmed = (values) => {
    clearTimeout(timer);
    if (!values[0] && !values[1]) {
      setAirplaneTypeHints([]);
      setModelHints([]);
    }
    if (values[0] || values[1]) {
      timer = setTimeout(() => fetchHints(), 500);
    }
  };

  const onSearchClick = (values) => {
    setAirplaneTypeFilter(values[0]);
    setModelFilter(values[1]);
    setPage(0);
    setOffset(0);
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
          fieldsOptions={[airplaneTypeHints, modelHints]}
          onFilterConfirmed={onFilterConfirmed}
          onSearchClick={onSearchClick}
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
