import React from 'react';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import { withTracker } from 'meteor/react-meteor-data';
import Service from './service';
import Grading from './component';
import VideoService from '/imports/ui/components/video-provider/service';

const GradingContainer = (props) => <Grading {...props} />;

export default withModalMounter(withTracker(({ mountModal }) => ({
  sharedDevices: VideoService.getSharedDevices(),
  isCamLocked: VideoService.isUserLocked(),
  camCapReached: VideoService.hasCapReached(),
  closeModal: () => mountModal(null),
  webcamDeviceId: Service.webcamDeviceId(),
  hasVideoStream: VideoService.hasVideoStream(),
}))(GradingContainer));
