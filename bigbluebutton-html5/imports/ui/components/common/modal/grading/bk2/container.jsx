import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';
import GradingComponent from './component';
import { updateLockSettings, updateWebcamsOnlyForModerator } from './service';
//import { UsersContext } from '../components-data/users-context/context';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

const GradingContainer = (props) => {
  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const currentUser = users[Auth.meetingID][Auth.userID];
  const amIModerator = currentUser.role === ROLE_MODERATOR;

  return amIModerator && <GradingComponent {...props} />
}

export default withModalMounter(withTracker(({ mountModal }) => ({
  closeModal: () => mountModal(null),
  meeting: Meetings.findOne({ meetingId: Auth.meetingID }),
  updateLockSettings,
  updateWebcamsOnlyForModerator,
  showToggleLabel: false,
}))(GradingContainer));
