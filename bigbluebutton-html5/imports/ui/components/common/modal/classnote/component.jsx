import React, { Component } from 'react';
import { defineMessages } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import PropTypes from 'prop-types';
import Styled from './styles';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';

const messages = defineMessages({
  yesLabel: {
    id: 'app.endMeeting.yesLabel',
    description: 'confirm button label',
  },
  noLabel: {
    id: 'app.endMeeting.noLabel',
    description: 'cancel confirm button label',
  },
});

const propTypes = {
  confirmButtonColor: PropTypes.string,
  disableConfirmButton: PropTypes.bool,
  description: PropTypes.string,
};

const defaultProps = {
  confirmButtonColor: 'primary',
  disableConfirmButton: false,
  description: '',
  noteForm: 'test',
};

class ClassNoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      note: "",
      slidenum: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e, conf) {
    console.log(e);
    console.log(conf);
    console.log("Handling Submit")
    e.preventDefault()
    const data = {}
    const viewerPool = Users.find({
      meetingId: Auth.meetingID,
      presenter: { $ne: true },
      role: { $eq: 'VIEWER' },
    }, {
      fields: {
        userId: 1,
      },
    }).fetch();
    data["currentUser"] = {
      name: Auth.fullname,
      userId: Auth.userID,
    };
    data['meetingId'] = Auth.meetingID;
    data['fullInfo'] = Auth.fullInfo;
    data['slidenum'] = this.state.slidenum;
    data['note'] = this.state.note;

    console.log("fetching HERE");
    fetch('https://tutorcalculator.mindriselearningonline.com/webhook/note/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log('Success:', data);
    //TODO: add robust success/error code
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    const {
      intl,
      mountModal,
      onConfirm,
      title,
      titleMessageId,
      titleMessageExtra,
      checkboxMessageId,
      confirmButtonColor,
      confirmButtonDataTest,
      confirmParam,
      disableConfirmButton,
      description,
    } = this.props;

    const {
      checked,
    } = this.state;

    const hasCheckbox = !!checkboxMessageId;

    return (
      <Styled.ClassNoteModal
        onRequestClose={() => mountModal(null)}
        hideBorder
        contentLabel={title}
      >
        <Styled.Container>
          <Styled.Header>
            <Styled.Title>
              { title || intl.formatMessage({ id: titleMessageId }, { 0: titleMessageExtra })}
            </Styled.Title>
          </Styled.Header>
          <Styled.Description>
	    <Styled.NoteForm>
        <form id="classnote" onSubmit={this.handleSubmit}>
        <label for="slide">Slide # to Start On Next Time:</label>
        <input name="slidenum" type="text" id="slidenum" onChange={this.handleChange.bind(this)} /><br/>

        <label for="notes">Notes on Today:</label>
        <textarea name="note" rows="3" cols="25" id="note" onChange={this.handleChange.bind(this)} /><br/>
      </form>
	    </Styled.NoteForm>
            { hasCheckbox ? (
              <label htmlFor="confirmationCheckbox" key="confirmation-checkbox">
                <Styled.Checkbox
                  type="checkbox"
                  id="confirmationCheckbox"
                  onChange={() => this.setState({ checked: !checked })}
                  checked={checked}
                  aria-label={intl.formatMessage({ id: checkboxMessageId })}
                />
                <span aria-hidden>{intl.formatMessage({ id: checkboxMessageId })}</span>
              </label>
            ) : null }
          </Styled.Description>
            <Styled.DescriptionText>
              {description}
            </Styled.DescriptionText>

          <Styled.Footer>
            <Styled.ConfirmationButton
              color={confirmButtonColor}
              label={intl.formatMessage(messages.yesLabel)}
              disabled={disableConfirmButton}
              data-test={confirmButtonDataTest}
              onClick={ () => {
                console.log("Possibly handling submit")
                this.handleSubmit(event, 
                  onConfirm(confirmParam, checked));
              }}
            />
            <Styled.ConfirmationButton
              label={intl.formatMessage(messages.noLabel)}
              onClick={() => {
                mountModal(null);
              }}
            />
          </Styled.Footer>
        </Styled.Container>
      </Styled.ClassNoteModal>
    );
  }
}

ClassNoteModal.propTypes = propTypes;
ClassNoteModal.defaultProps = defaultProps;

export default withModalMounter(ClassNoteModal);
