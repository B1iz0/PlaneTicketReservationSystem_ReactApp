import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';

import {
  setIsSimpleSuccessNotificationActive,
  setSimpleSuccessNotificationText,
} from 'reduxStore/notificationsSlice';
import {
  getManagers,
  getFreeUsers,
  assignCompanyToUser,
} from 'api/userRequests';

import ManagersList from './ManagersList';
import ManagerAdding from './ManagerAdding';

const CompanyManagersDialogContent = ({ companyId }) => {
  const dispatch = useDispatch();
  const [managers, setManagers] = useState([]);
  const [freeUsers, setFreeUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [freeUsersResponse, freeUsersError] = await getFreeUsers();
      const [managersResponse, managersError] = await getManagers(companyId);
      if (freeUsersResponse) setFreeUsers(freeUsersResponse);
      if (freeUsersError) {
        // Handle error.
      }
      if (managersResponse) setManagers(managersResponse);
      if (managersError) {
        // Handle error.
      }
    };

    fetchData();
  }, [companyId]);

  const handleAddManager = async (newManager) => {
    const [adminResponse, adminError] = await assignCompanyToUser(newManager.id, companyId);

    if (!adminError) {
      dispatch(setIsSimpleSuccessNotificationActive(true));
      dispatch(setSimpleSuccessNotificationText('The admin was assigned successfully!'));
      setFreeUsers(() => {
        let newFreeUsers = [];
        freeUsers.forEach((user) => {
          if (user.id !== newManager.id) {
            newFreeUsers.push(user);
          }
        });
        return newFreeUsers;
      });
      setManagers([...managers, newManager]);
    };
  };

  const handleDeleteManager = async (manager) => {
    const [adminResponse, adminError] = await assignCompanyToUser(manager.id, '');
    
    if (!adminError) {
      dispatch(setIsSimpleSuccessNotificationActive(true));
      dispatch(setSimpleSuccessNotificationText('The admin was unassigned successfully!'));
      setFreeUsers([...freeUsers, manager]);
      setManagers(() => {
        let newManagers = [];
        managers.forEach((user) => {
          if (user.id !== manager.id) {
            newManagers.push(user);
          }
        });
        return newManagers;
      });
    };
  };

  return (
    <>
      <DialogContent>
        <ManagersList
          managers={managers}
          handleDeleteManager={handleDeleteManager}
        />
        <ManagerAdding
          freeUsers={freeUsers}
          handleAddManager={handleAddManager}
        />
      </DialogContent>
    </>
  );
};

export default CompanyManagersDialogContent;
