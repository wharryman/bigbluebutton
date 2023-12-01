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
  currentUser: PropTypes.func.isRequired,
};

class GradingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nocam: false,
      nomic: false,
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
      //currentUser: {
         //name: Auth.fullname,
         //userId: Auth.userID,
         //isPresenter: users[Auth.meetingID][Auth.userID].presenter,
      //   },
    }
    this.handleSubmitGrades = this.handleSubmitGrades.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: !e.target.value });
  }

  handleSubmitGrades(event) {
    event.preventDefault();
    console.log("starting handleSubmitGrades");
    const { resolve, toggleKeepModalOpen, setIsOpen } = this.props;
    const data = {}
    data.students = this.state.students;
    console.log("students");
    console.log(data.students);
    data.meetingId = Auth.meetingID;
    data.fullInfo = Auth.fullInfo
    data.currentUser = this.props.currentUser;

    data.students.map((i) => {
      i.academic = document.getElementById(i.userId + "-academic").value
      i.effort = document.getElementById(i.userId + "-effort").value
      i.nocam = false
      i.nomic = false
      if(document.getElementById(i.userId + "-nocam").checked) { i.nocam = true }
      if(document.getElementById(i.userId + "-nomic").checked) { i.nomic = true }
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
    console.log("Ending HSG");
    toggleKeepModalOpen();
    setIsOpen(false);
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
      currentUser,
      handleSubmitGrades,
    } = this.props;
    const {
      students,
      } = this.state
      console.log("students");
      console.log(students);
      console.log("currentUser");
      console.log(currentUser);

    let viewElement;
    let title;

    viewElement = (
      <Styled.ModalViewContainer>
              <Styled.GradeBox>
        <colgroup>
          <col span="3"></col>
        </colgroup>
        <thead>
          <tr>
            <th>
              <Styled.Label>
                Student Name
             </Styled.Label>
            </th>
            <th>
              <Styled.SmileyTable>
                <tbody>
                  <tr>
                    <td colspan={6}>
                        <Styled.Label>
                        Academic Grade
                      </Styled.Label>
                    </td>
                  </tr>
                  <tr>
                    <Styled.SmileySpace>
                      <Styled.NALabel>
                        N/A
                      </Styled.NALabel>
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley1.png" alt="1" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley2.png" alt="2" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley3.png" alt="3" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley4.png" alt="4" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley5.png" alt="5" />
                    </Styled.SmileySpace>
                  </tr>
                </tbody>
              </Styled.SmileyTable>
            </th>
            <th>
              <Styled.SmileyTable>
                <tbody>
                  <tr>
                    <td colspan={6}>
                      <Styled.Label>
                        Effort Grade
                      </Styled.Label>
                    </td>
                  </tr>
                  <tr>
                    <Styled.SmileySpace>
                      <Styled.NALabel>
                        N/A
                      </Styled.NALabel>
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley1.png" alt="1" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley2.png" alt="2" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                                            <Styled.Smiley src="resources/images/smiley3.png" alt="3" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley4.png" alt="4" />
                    </Styled.SmileySpace>
                    <Styled.SmileySpace>
                      <Styled.Smiley src="resources/images/smiley5.png" alt="5" />
                    </Styled.SmileySpace>
                  </tr>
                </tbody>
              </Styled.SmileyTable>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            Object.values(this.state.students).map( (item) => (
            <tr>
              <td>
                <Styled.Label>
                  {item.name}
                </Styled.Label>
              </td>
              <td>
                <Styled.GradeSlider
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  defaultValue="0"
                  name=""
                  id={item.userId + "-academic"}
                >
                </Styled.GradeSlider>
              </td>
              <td>
                <Styled.GradeSlider
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  defaultValue="0"
                  name=""
                  id={item.userId+"-effort"}
                >
                </Styled.GradeSlider>
              </td>
              <td>
                <Styled.Radio
                  type="radio"
                  id={item.userId+"-nocam"}
                  value=""
                  name="nocam"
                  onChange={this.handleChange.bind(this)}
                />
                <label for={item.userId+"-nocam"}>No Cam</label>
                <Styled.Radio
                  type="radio"
                  id={item.userId+"-nomic"}
                  value=""
                  name="nomic"
                  onChange={this.handleChange.bind(this)}
                />
                <label for={item.userId+"-nomic"}>No Mic</label>
              </td>
            </tr>
            ))
          }
          </tbody>
        </Styled.GradeBox>
        <Styled.Footer>
          <Styled.ConfirmationButton
            label="Submit Grades"
            data-test="confirm-button"
            color="success"
            onClick={this.handleSubmitGrades.bind(this)}
              
          />
          <Styled.CancelButton
            label="Cancel"
            color="warning"
            onClick={() => setIsOpen(false)}
          />
        </Styled.Footer>
      </Styled.ModalViewContainer>
    );
    if (keepModalOpen) {
      return (
        <ModalSimple
          onRequestClose={() => {
            //if (currentUser.isPresenter) clearRandomlySelectedUser();
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
