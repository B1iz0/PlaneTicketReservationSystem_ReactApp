import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';

import { getManagers, getFreeUsers, assignCompanyToUser } from 'api/apiRequests';

import ManagersList from './ManagersList';
import ManagerAdding from './ManagerAdding';

const CompanyManagersDialogContent = ({ companyId }) => {
  const [managers, setManagers] = useState([]);
  const [freeUsers, setFreeUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [freeUsersResponse, freeUsersError] = await getFreeUsers();
      const [managersResponse, managersError] = await getManagers(companyId);
      if (freeUsersResponse) setFreeUsers(freeUsersResponse);
      if (managersResponse) setManagers(managersResponse);
    };

    fetchData();
  }, []);

  const handleAddManager = async (newManager) => {
    await assignCompanyToUser(newManager.id, companyId);

    setFreeUsers(() => {
      let newFreeUsers = [];
      freeUsers.forEach(user => {
        if (user.id != newManager.id) {
          newFreeUsers.push(user);
        };
      });
      return newFreeUsers;
    })
    setManagers([
      ...managers,
      newManager,
    ]);
  };

  const handleDeleteManager = async (manager) => {
    await assignCompanyToUser(manager.id, '');
    setFreeUsers([
      ...freeUsers,
      manager,
    ]);
    setManagers(() => {
      let newManagers = [];
      managers.forEach(user => {
        if (user.id != manager.id) {
          newManagers.push(user);
        };
      });
      return newManagers;
    })
  };

  return (
    <>
      <DialogContent>
        <ManagersList managers={managers} handleDeleteManager={handleDeleteManager}/>
        <ManagerAdding freeUsers={freeUsers} handleAddManager={handleAddManager}/>
      </DialogContent>
    </>
  );
};

export default CompanyManagersDialogContent;