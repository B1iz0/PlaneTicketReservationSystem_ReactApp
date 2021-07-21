import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const columns = [
  { field: 'type', headerName: 'Type', width: 200 },
  { field: 'model', headerName: 'Model', width: 200 },
  { field: 'registrationNumber', headerName: 'Registration number', width: 200 },
  { 
    field: 'baggageCapacity', 
    headerName: 'Baggage capacity', 
    width: 200,
    type: 'number',
    valueFormatter: (params) => {
      return `${params.value} Kg`;
    },
 },
];

const CompanyAirplanesTable = ({ companyName }) => {
  const classes = useStyles();
  
  const [offset, setOffset] = useState(0);
  const [modelFilter, setModelFilter] = useState('');
  const [airplaneTypeFilter, setAirplaneTypeFilter] = useState('');
  
  const [airplanes, setAirplanes] = useState([]);
  const [airplanesCount, setAirplanesCount] = useState(0);
  
  const rows = airplanes.map(value => ({
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
          filters.model,
        );
        if (airplanesResponse) setAirplanes(airplanesResponse);
        const airplanesCount = await getAirplanesCount(
          filters.airplaneType,
          filters.company,
          filters.model,
        );
        if (airplanesCount) setAirplanesCount(airplanesCount);
      }
    };

    fetchData();
  }, [companyName, offset, modelFilter, airplaneTypeFilter])

  const onFilterConfirmed = (values) => {
    setAirplaneTypeFilter(values[0]);
    setModelFilter(values[1]);
    setOffset(0);
  };

  const onPageChange = (page) => {
    setOffset(page * elementsOnAdminTable);
  };

  const openAddPage = () => {

  }

  return (
    <>
      <div className={classes.airplanesFilter}>
          <Filter 
            fields={['Airplane type', 'Model']}
            disableOptions={true}
            onFilterConfirmed={onFilterConfirmed}
          />
        </div>
      <Table 
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