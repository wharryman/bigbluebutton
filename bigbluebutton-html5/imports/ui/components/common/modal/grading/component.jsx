import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import AudioService from '/imports/ui/components/audio/service';
import Styled from './styles';
import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';

const messages = defineMessages({
  noViewers: {
    id: 'app.modal.randomUser.noViewers.description',
    description: 'Label displayed when no viewers are avaiable',
  },
  selected: {
    id: 'app.modal.randomUser.selected.description',
    description: 'Label shown to the selected user',
  },
  randUserTitle: {
    id: 'app.modal.randomUser.title',
    description: 'Modal title label',
  },
  whollbeSelected: {
    id: 'app.modal.randomUser.who',
    description: 'Label shown during the selection',
  },
  onlyOneViewerTobeSelected: {
    id: 'app.modal.randomUser.alone',
    description: 'Label shown when only one viewer to be selected',
  },
  reselect: {
    id: 'app.modal.randomUser.reselect.label',
    description: 'select new random user button label',
  },
  ariaModalTitle: {
    id: 'app.modal.randomUser.ariaLabel.title',
    description: 'modal title displayed to screen reader',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

class GradingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: (
        Users.find({
          meetingId: Auth.meetingID,
          presenter: { $ne: true },
          role: { $eq: 'VIEWER' },
        }, {
          fields: {
            userId: 1,
            name: 1,
            gradevalue: 1,
      academic: 1,
      effort: 1,
          },
        }).fetch()
      ),
      currentUser: {
         name: Auth.fullname,
         userId: Auth.userID,
       } 
    }
    this.handleSubmitGrades = this.handleSubmitGrades.bind(this);

  }
  
  handleSubmitGrades(event) {
    event.preventDefault();
    const { resolve, closeModal } = this.props;
    const data = {}
    data.students = this.state.students;
    console.log("students");
    console.log(data.students);
    data.meetingId = Auth.meetingID;
    data.fullInfo = Auth.fullInfo
    data.currentUser = this.state.currentUser;

    data.students.map((i) => {
      i.academic = document.getElementById(i.userId + "-academic").value
      i.effort = document.getElementById(i.userId + "-effort").value
    });
    fetch("https://reports.mindriselearningonline.com/webhook/fullgrade/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log("Success:", data);
    //TODO: add robust success/error code
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    closeModal();
    if (resolve) resolve();
  }

  componentDidMount() {
    const { keepModalOpen, toggleKeepModalOpen, currentUser } = this.props;

    if (currentUser.presenter && !keepModalOpen) {
      toggleKeepModalOpen();
    }
  }

  render() {
    const {
      keepModalOpen,
      toggleKeepModalOpen,
      intl,
      setIsOpen,
      isOpen,
      priority,
    } = this.props;

    let viewElement;
    let title;

      viewElement = (
        <Styled.ModalViewContainer>
        test test test
        </Styled.ModalViewContainer>
      );
    if (keepModalOpen) {
      return (
        <ModalSimple
          onRequestClose={() => {
            if (this.state.currentUser.presenter) clearRandomlySelectedUser();
            toggleKeepModalOpen();
            setIsOpen(false);
          }}
          contentLabel={intl.formatMessage(messages.ariaModalTitle)}
          title={title}
          {...{
            isOpen,
            priority,
          }}
        >
          {viewElement}
        </ModalSimple>
      );
    } else {
      return null;
    }
  }
}

GradingModal.propTypes = propTypes;
export default injectIntl(GradingModal);
