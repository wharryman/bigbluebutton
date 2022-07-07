import React, { Component } from 'react';
import { defineMessages } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import PropTypes from 'prop-types';
import Styled from './styles';
import Auth from '/imports/ui/services/auth';

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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = {}
    console.log("HERE");
    data.currentUser = Auth.fullInfo;
    fetch('https://tutorcalculator.mindriselearningonline.com/webhook/classnote/', {
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
            <Styled.DescriptionText>
              {description}
            </Styled.DescriptionText>
	    <Styled.NoteForm>
	    <form onSubmit="return false;">
                    <label for="lesson">Lesson:</label>
                    <input type="text" id="lesson" /><br/>
                    
	            <label for="slide">Slide #:</label>
                    <input type="text" id="slide" /><br/>

                    <label for="notes">Notes:</label>
                    <textarea rows="3" cols="25" id="notes" /><br/>
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

          <Styled.Footer>
            <Styled.ConfirmationButton
              color={confirmButtonColor}
              label={intl.formatMessage(messages.yesLabel)}
              disabled={disableConfirmButton}
              data-test={confirmButtonDataTest}
              onClick={() => {
		this.handleSubmit.bind(this);
                onConfirm(confirmParam, checked);
                mountModal(null);
              }}
            />
            <Styled.ConfirmationButton
              label={intl.formatMessage(messages.noLabel)}
              onClick={() => mountModal(null)}
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
