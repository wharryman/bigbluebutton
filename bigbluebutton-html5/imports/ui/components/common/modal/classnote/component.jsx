
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

  handleMicon = event =>
    this.setState({ micon: event.target.checked })
  handleCamon = event =>
    this.setState({ camon: event.target.checked })

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
      camchecked,
      micchecked,
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
	    <Styled.SurveyTitle>
	      Slide | Notes
	    </Styled.SurveyTitle>
	    <Styled.SurveySubTitle>
	    -ALWAYS mark-
	    </Styled.SurveySubTitle>
	    <Styled.NoteForm>
        <form id="classnote" onSubmit={this.handleSubmit}>
        <label for="slide">Slide # to start on next session(# ONLY):</label>
        <input name="slidenum" type="text" id="slidenum" size="3" onChange={this.handleChange.bind(this)} /><br/>
	<br/>

        <label for="notes">Notes on Today:</label><br/>
        <textarea name="note" rows="3" cols="25" id="note" onChange={this.handleChange.bind(this)} /><br/>
	    <br/>
	<Styled.SurveyTitle>
	    Attendance | Tardies
	</Styled.SurveyTitle>
	<Styled.SurveySubTitle>
	    -ALWAYS mark-
	</Styled.SurveySubTitle>
        <label for="absent">Student Attendance:&nbsp;</label>
	    <Styled.Radio
	    	type="radio"
	    	id="allstudents"
	    	value="All Present"
	    	name="absent"
	    	onChange={this.handleChange.bind(this)}
	    />
	    <label for="allstudents">All Present</label>
	    <Styled.Radio
	    	type="radio"
	    	id="somestudents"
	    	value="Some Present"
	    	name="absent"
	    	onChange={this.handleChange.bind(this)}
	    />
	    <label for="somestudents">Some Present</label>
	    <Styled.Radio
	    	type="radio"
	    	id="nostudents"
	    	value="No Students"
	    	name="absent"
	    	onChange={this.handleChange.bind(this)}
	    />
	    <label for="nostudents">No Students</label>
	    <br/>
        <label for="tardy">First student to arrive (mins tardy):&nbsp;</label>
	    <select name="tardy" id="tardy" onChange={this.handleChange.bind(this)} >
	    	<option value="">--Please choose an option--</option>
	    	<option value="No Students">No Students</option>
	    	<option value="<10">Less than 10</option>
	    	<option value="10">10</option>
	    	<option value="15">15</option>
	    	<option value="20">20</option>
	    	<option value="25">25</option>
	    	<option value="30">30</option>
	    	<option value="35">35</option>
	    	<option value="40">40</option>
	    	<option value="45">45</option>
	    	<option value="50">50</option>
	    	<option value="55">55</option>
	    	<option value="60">60</option>
	    	<option value="65">65</option>
	    	<option value="70">70</option>
	    	<option value="75">75</option>
	    	<option value="80">80</option>
	    	<option value="85">85</option>
	    	<option value="90">90</option>
	    </select>
	<br/>
	<br/>
	<Styled.SurveyHead>
	    <Styled.SurveyTitle>
	    	Noise | Cameras | Mics
	    </Styled.SurveyTitle>
	    <Styled.SurveySubTitle>
	    	-ONLY mark if you have students!-
	    </Styled.SurveySubTitle>
	</Styled.SurveyHead>
        <label for="bkn">Background Noise Distractions</label>
	    <br/>
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
        <label for="camon">Cameras:&nbsp;</label>
	    <Styled.Radio
	    	type="checkbox"
	        id="camon"
	        name="camon"
            	checked={this.state.camon}
            	onChange={this.handleCamon}
	    />
		  ALL Cameras ON
	<br/>
        <label for="camtext">Cameras OFF (Enter names) <br/> </label>
        <textarea name="camtext" rows="2" cols="25" id="camtext" onChange={this.handleChange.bind(this)} /><br/>
	<br/>

        <label for="micon">Microphones:&nbsp;</label>
	    <Styled.Checkbox
	    	type="checkbox"
	        id="micon"
	        name="micon"
            	checked={this.state.micon}
            	onChange={this.handleMicon}
	    />
		  ALL Mics ON
	<br/>
        <label for="mictext">Microphones OFF (Enter names) <br/> </label>
        <textarea name="mictext" rows="2" cols="25" id="mictext" onChange={this.handleChange.bind(this)} /><br/>
	<br/>
	<br/>



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
