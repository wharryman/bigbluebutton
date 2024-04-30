import React, { Component } from 'react';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import Styled from './styles';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';

const messages = defineMessages({
  yesLabel: {
    id: 'app.confirmationModal.yesLabel',
    description: 'confirm button label',
  },
  noLabel: {
    id: 'app.endMeeting.noLabel',
    description: 'cancel confirm button label',
  },
  mark: {
    id: 'app.endMeeting.mark',
    description: 'Always mark',
  },
  bkTitle: {
    id: 'app.endMeeting.bkTitle',
    description: 'Background noise form title',
  },
  bkSubTitleNA: {
    id: 'app.endMeeting.bkSubTitleNA',
    description: 'Subtitle containing NA desc',
  },
  bkSubTitleHigh: {
    id: 'app.endMeeting.bkSubTitleHigh',
    description: 'Subtitle containing High desc',
  },
  slideNum: {
    id: 'app.endMeeting.slideNum',
    description: 'form subtitle with slidenum desc',
  },
  formNotes: {
    id: 'app.endMeeting.formNotes',
    description: 'form subtitle with notes desc',
  },
  naLabel: {
    id: 'app.endMeeting.naLabel',
    description: 'form selection for no students/no background noise',
  },
  lowLabel: {
    id: 'app.endMeeting.lowLabel',
    description: 'form selection for low noise',
  },
  medLabel: {
    id: 'app.endMeeting.medLabel',
    description: 'form subtitle for med noise,',
  },
  highLabel: {
    id: 'app.endMeeting.highLabel',
    description: 'form subtitle with high noise',
  },
  surveyTitle: {
    id: 'app.endMeeting.surveyTitle',
    description: 'surveyTitle',
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
};

class ClassNoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      camon: false,
      micon: false,
      note: "",
      slidenum: "",
      absent:"",
      tardy:"",
      bkn:"",
      mictext:"",
      camtext:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleRangeChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    data['absent'] = this.state.absent;
    data['tardy'] = this.state.tardy;
    data['bkn'] = this.state.bkn;
    data['mictext'] = this.state.mictext;
    data['camtext'] = this.state.camtext;
    data['micon'] = this.state.micon;
    data['camon'] = this.state.camon;

    console.log("fetching HERE");
    console.log("data fetched:");
    console.log(data);
    fetch('https://reports.mindriselearningonline.com/webhook/note/', {
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
      setIsOpen,
      onConfirm,
      title,
      titleMessageId,
      titleMessageExtra,
      checkboxMessageId,
      confirmButtonColor,
      confirmButtonLabel,
      confirmButtonDataTest,
      confirmParam,
      disableConfirmButton,
      description,
      isOpen,
      onRequestClose,
      priority,
    } = this.props;

    const {
      checked,
    } = this.state;

    const hasCheckbox = !!checkboxMessageId;

    return (
      <Styled.ClassNoteModal
        onRequestClose={() => setIsOpen(false)}
        contentLabel={title}
        title={title || intl.formatMessage({ id: titleMessageId }, { 0: titleMessageExtra })}
        {...{
          isOpen,
          onRequestClose,
          priority,
        }}
      >
        <Styled.Container>
          <Styled.Description>
            <Styled.SurveyTitle
              >
              Slide | Notes
            </Styled.SurveyTitle>
            <Styled.SurveySubTitle>
            -ALWAYS mark-
            </Styled.SurveySubTitle>
        </Styled.Description>
        <Styled.NoteForm>
        <form id="classnote" onSubmit={this.handleSubmit}>
        
        <label for="slide">Slide # to start on next session (# ONLY)</label>
        <input name="slidenum" type="text" id="slidenum" size="3" onChange={this.handleChange.bind(this)} /><br/>
        <br/>

        <label for="notes">Notes on Today: </label><br/>
        <textarea name="note" rows="3" cols="25" id="note" onChange={this.handleChange.bind(this)} /><br/>
              <br/>
              <Styled.SurveyTitle>
              <label for="bkn">
                Background Noise 
              </label>
              </Styled.SurveyTitle>
              <Styled.SurveySubTitle>
              "N/A" = No students <br/>
              "HIGH" = only if noise prevents quality tutoring <br/>
              </Styled.SurveySubTitle>
          <Styled.Radio
          type="radio"
          id="nabkn"
          value="NA"
          name="bkn"
          onChange={this.handleChange.bind(this)}
            />
            <label for="nabkn">NA</label>
          <Styled.Radio
          type="radio"
          id="mildbkn"
          value="Low"
          name="bkn"
          onChange={this.handleChange.bind(this)}
            />
            <label for="mildbkn">Low</label>
          <Styled.Radio
          type="radio"
          id="somebkn"
          value="Medium"
          name="bkn"
          onChange={this.handleChange.bind(this)}
            />
            <label for="somebkn">Medium</label>
          <Styled.Radio
          type="radio"
          id="extbkn"
          value="HIGH"
          name="bkn"
          onChange={this.handleChange.bind(this)}
            />
            <label for="extbkn">HIGH</label>
            <br/>
        <br/>
        </form>
        </Styled.NoteForm>
        <Styled.DescriptionText>
          {description}
        </Styled.DescriptionText><br/><br/>

        <Styled.Footer>
            <Styled.ConfirmationButton
              color={confirmButtonColor}
              label={confirmButtonLabel ? confirmButtonLabel : intl.formatMessage(messages.yesLabel)}
              disabled={disableConfirmButton}
              data-test={confirmButtonDataTest}
              onClick={() => {
                onConfirm(confirmParam, checked);
                this.handleSubmit(event);
                setIsOpen(false);
              }}
            />
            <Styled.CancelButton
              label={intl.formatMessage(messages.noLabel)}
              onClick={() => setIsOpen(false)}
            />
          </Styled.Footer>
        </Styled.Container>
      </Styled.ClassNoteModal>
    );
  }
}

ClassNoteModal.propTypes = propTypes;
ClassNoteModal.defaultProps = defaultProps;

export default ClassNoteModal;
