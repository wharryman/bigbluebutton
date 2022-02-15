import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';
import { styles } from './styles';

export const LessonContext = React.createContext();

const messages = defineMessages({
  ariaModalTitle: {
    id: 'app.modal.randomUser.ariaLabel.title',
    description: 'modal title displayed to screen reader',
  },
  submitLabel: {
    id: 'app.polling.submitLabel',
    description: 'confirm button label',
  },
  closeLabel: {
    id: 'app.poll.closeLabel',
    description: 'confirm button label',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  mountModal: PropTypes.func.isRequired,
  numAvailableViewers: PropTypes.number.isRequired,
};

class TekSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subj: '',
      gr: '',
      lsn: '1',
      hideForm: false,
      hideClose: true,
      hideError: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = {}
    data.subject = this.state.subj;
    data.grade = this.state.gr;
    data.lesson = this.state.lsn;
    data.meeting = this.props.meeting;
    data.currentUser = this.props.currentUser;
    console.log('Received', data);
    fetch('https://tutorcalculator.mindriselearningonline.com/webhook/lesson/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log('Success:', data);
      this.setState({ hideForm: true });
      this.setState({ hideClose: false });
    //TODO: add robust success/error code
    })
    .catch((error) => {
      this.setState({ hideForm: true });
      this.setState({ hideClose: true });
      this.setState({ hideError: false });
      console.error('Error:', error);
    });
  }

  render() {
    const {
      intl,
      mountModal,
      numAvailableViewers,
      currentUser,
      meeting,
    } = this.props;
    const subjects = ['Math', 'Reading', 'Science', 'Social Studies', 'Algebra', 'Biology', 'History', 'ELA 1', 'ELA 2', 'EnglishLanguageArts'];
    const grades = ['3', '4', '5', '6', '7', '8', 'HS'];
    const lessons = [];
    lessons.push('HW');
    for (let i = 1; i <= 60; i += 1) {
      lessons.push(i.toString());
    }

    return (
      <Modal
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={() => mountModal(null)}
        hideBorder
        contentLabel={intl.formatMessage(messages.ariaModalTitle)}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              Input the Subject     /     Grade     /     Lesson:
            </div>
          </div>
        </div>
	<div id="myform" className={this.state.hideForm ? styles.hidden : undefined}>
	    <form id="myform" onSubmit={this.handleSubmit.bind(this)}>
	      <div className={styles.columns}>
		<div>
		  <span className={styles.columnheader}>Subject: </span>
		  <select name="subj" onChange={this.handleChange.bind(this)}>
		    <option value="" selected disabled hidden>Select Subject</option>
		    {subjects.map((subject) => <option value={subject}>{subject}</option>)}
		  </select>
		</div>
		<div>
		  <span className={styles.columnheader}>Grade: </span>
		  <select name="gr" onChange={this.handleChange.bind(this)}>
		    <option value="" selected disabled hidden>Select Grade</option>
		    {grades.map((grade) => <option value={grade}>{grade}</option>)}
		  </select>
		</div>
		<div>
		  <span className={styles.columnheader}>Lesson: </span>
		  <select name="lsn" onChange={this.handleChange.bind(this)}>
		    <option value="" selected disabled hidden>Select Lesson</option>
		    {lessons.map((lsn) => <option value={lsn}>{lsn}</option>)}
		  </select>
		</div>
	      </div>
        <div className={styles.footer}>
            <Button
              id="submitBtn"
              color="primary"
              className={styles.confirmBtn}
              label={intl.formatMessage(messages.submitLabel)}
              onClick={() => {
                this.handleSubmit.bind(this)
              }}
            />
	      </div>
	    </form>
    </div>
    <div id="modal2" className={this.state.hideClose? styles.hidden : undefined}>
        <div>
            <span className={styles.columnheader}>
                You submitted the following Lesson information:
                <ul>
                    <li>Subject: {this.state.subj}</li>
                    <li>Grade Level: {this.state.gr}</li>
                    <li>Lesson: {this.state.lsn}</li>
                </ul>
            </span>
        </div>
        
        <Button 
          id="closeBtn"
              color="primary"
              className={styles.confirmBtn}
              label={intl.formatMessage(messages.closeLabel)}
              onClick={() => {
                mountModal(null);
              }}
            />
    </div>
    <div id="modalError" className={this.state.hideError? styles.hidden : undefined}>
        <div>
            <span className={styles.columnheader}>
                WARNING: You attempted to submit a Lesson, but an error occurred. Please try again, and if this reoccurrs contact your manager/site admin.
            </span>
        </div>
        
        <Button 
          id="closeBtn"
              color="primary"
              className={styles.confirmBtn}
              label={intl.formatMessage(messages.closeLabel)}
              onClick={() => {
                mountModal(null);
              }}
            />
    </div>
  </Modal>
    );
  }
}

TekSelect.propTypes = propTypes;
export default injectIntl(TekSelect);
