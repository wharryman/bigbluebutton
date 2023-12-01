import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Meetings from '/imports/api/meetings';
import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';
import { makeCall } from '/imports/ui/services/api';
import GradingModal from './component';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';
import logger from '/imports/startup/client/logger';

//  A value that is used by component to remember
//  whether it should be open or closed after a render
let keepModalOpen = true;

//  A value that stores the previous indicator
let updateIndicator = 1;

const toggleKeepModalOpen = () => { keepModalOpen = ! keepModalOpen; };

const GradingModalContainer = (props) => {
  const usingUsersContext = useContext(UsersContext);

  const { users } = usingUsersContext;

  const currentUser = {
    userId: Auth.userID,
    name: Auth.fullname,
    presenter: users[Auth.meetingID][Auth.userID].presenter
  };

  return (
    <GradingModal
      {...props}
      currentUser={currentUser}
      keepModalOpen={keepModalOpen}
    />
  );
};
export default withTracker(() => {
  const viewerPool = Users.find({
    meetingId: Auth.meetingID,
    presenter: { $ne: true },
    role: { $eq: 'VIEWER' },
  }, {
    fields: {
      userId: 1,
    },
  }).fetch();

  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const currentUser = {
    userId: Auth.userID,
    name: Auth.fullname,
    presenter: users[Auth.meetingID][Auth.userID].presenter
  };

  return ({
    currentUser,
    toggleKeepModalOpen,
    viewerPool,
    numAvailableViewers: viewerPool.length,
  });
})(GradingModalContainer);
