import React, { Component } from 'react';
import ReactDOM from 'react-dom'
//import Draggable from 'react-draggable';
import { defineMessages, injectIntl } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/modal/service';
import PropTypes from 'prop-types';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';
import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';
import { styles } from './styles';

const messages = defineMessages({
  submitLabel: {
    id: 'app.polling.submitLabel',
    description: 'confirm button label',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  mountModal: PropTypes.func.isRequired,
};

class GradingSelectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: Users.find({
        meetingId: Auth.meetingID,
        presenter: { $ne: true },
        role: { $eq: 'VIEWER' },
      }, {
        fields: {
          userId: 1,
          name: 1,
          gradevalue: 1,
        },
      }).fetch(),
      smileys: [
        './resources/images/smiley1.png',
        './resources/images/smiley2.png',
        './resources/images/smiley3.png',
        './resources/images/smiley4.png',
        './resources/images/smiley5.png',
      ],
      gradetype: '',
      lessonnum: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = React.createRef();
  }

  handleDrops(e) {
    this.setState({ [e.target.name]:e.target.value });
  }

  /*
  handleChange(event, data, gradeitem ) {
    console.log('new value:' + event + ' ' + data + ' ' + gradeitem);
    const newgrades = this.state.grades.map(element => {
      if (element.name === gradeitem.userId) {
        return {
          ...element,
          gradevalue: value,
        };
      } else return element;
    });
    this.setState({ grades: newgrades });

    document.querySelectorAll('.smileyspot').forEach(function(el) {
      el.style.display = 'none';
    });
    const diff = event.value - 1;
    const image = document.getElementById(event.target.userId + diff.toString());
    image.style.display = 'block';
  }
  */

  
  handleSubmit(e) {
    e.preventDefault()
    const data = {}
    console.log("HERE");
    data.grades= this.state.grades;
    data.gradetype = this.state.gradetype;
    data.lessonnum = this.state.lessonnum;
    data.currentUser = Auth.fullInfo;
    console.log('Received', data.grades);
    data.grades.map((e) => {
      console.log('finding ' + e.name);
      e.gradevalue = document.getElementById(e.userId).value
    });
    fetch('https://tutorcalculator.mindriselearningonline.com/webhook/grade/', {
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
      mountModal, onConfirm, user, title, intl,
    } = this.props;

    const {
      smileys,
    } = this.state;

    const gradetype = ['Lesson', 'IP'];
    const lessons = [];
    const grades = this.props.grade ? [this.props.grade] : this.state.grades;
    for (let i = 0; i <= 99; i += 1) {
      if (i === 0) {
        lessons.push('GP');
      } else lessons.push(i.toString());
    }

    // const lessons = [...Array(100).keys()];

    return (
        <Modal
          overlayClassName={styles.overlay}
          className={styles.modal}
          onRequestClose={() => mountModal(null)}
          hideBorder
          contentLabel={title}
        >
	<form id="myform" onSubmit={this.handleSubmit.bind(this)} ref={this.formRef}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.title}>
                Assign Grades for your Students:
              </div>
            </div>
            <div className={styles.columns}>
              <div>
                <select name="gradetype" onChange={this.handleDrops.bind(this)}>
                  <option value="" selected disabled hidden>Select Grade Type</option>
                  {gradetype.map((gt) => <option value={gt}>{gt}</option>)}
                </select>
                <select name="lessonnum" onChange={this.handleDrops.bind(this)}>
                  <option value="" selected disabled hidden>Choose Problem</option>
                  {lessons.map((lesson) => <option value={lesson}>{lesson}</option>)}
                </select>
              </div>
              <div>
                <span className={styles.smileysbar}>N/A</span>
                <img src="./resources/images/smiley1.png" alt="logo" className={styles.smileysbar} />
                <img src="./resources/images/smiley2.png" alt="logo" className={styles.smileysbar} />
                <img src="./resources/images/smiley3.png" alt="logo" className={styles.smileysbar} />
                <img src="./resources/images/smiley4.png" alt="logo" className={styles.smileysbar} />
                <img src="./resources/images/smiley5.png" alt="logo" className={styles.smileysbar} />
              </div>
            </div>
            <div>
                <table className={styles.studentlist}>
                  <colgroup>
                    <col className={styles.cw50} />
                    <col className={styles.cw40} />
                    <col className={styles.cw10} />
                  </colgroup>
                  <tbody>
                    {grades.map((gradeitem, index) => (
                      <tr>
                        <td className={styles.studentname}>
                          {gradeitem.name}
                        </td>
                        <td>
                          <input
                            type="range"
                            min="0"
                            max="5"
                            step="1"
                            defaultValue="0"
                            className={styles.slider}
                            name={gradeitem.userId}
			    id={gradeitem.userId}
                          />
                        </td>
                        <td>
                          {this.state.smileys.map((sm, i) => <img src={sm} id={"img" + i} className={styles.smileyspot} alt="logo" /> )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className={styles.footer}>
              <Button
                color="primary"
                className={styles.confirmBtn}
                label={intl.formatMessage(messages.submitLabel)}
                onClick={() => {
		  this.handleSubmit.bind(this);
		  mountModal(null);
                }}
              />
            </div>
          </div>
          </form>
        </Modal>
    );
  }
}

GradingSelectModal.propTypes = propTypes;
export default withModalMounter(injectIntl(GradingSelectModal));
