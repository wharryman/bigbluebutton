import styled from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import {
  smPaddingX,
  smPaddingY,
  lgPaddingX,
  lgPaddingY,
  mdPaddingX,
  descriptionMargin,
  titlePositionLeft,
  jumboPaddingY,
} from '/imports/ui/stylesheets/styled-components/general';
import { colorGray, colorGrayDark, } from '/imports/ui/stylesheets/styled-components/palette';
import { headingsFontWeight, lineHeightBase } from '/imports/ui/stylesheets/styled-components/typography';

const ClassNoteModal = styled(ModalSimple)`
  padding: ${mdPaddingX};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0;
  margin-top: 0;
  margin: auto;
`;

const Description = styled.div`
  text-align: center;
  line-height: ${lineHeightBase};
  color: ${colorGray};
  margin-bottom: ${jumboPaddingY};
`;

const Header = styled.div`
  margin: 0;
  padding: 0;
  border: none;
  line-height: ${titlePositionLeft};
  margin-bottom: ${lgPaddingY};
`;

const DescriptionText = styled.span`
  white-space: pre-line;
`;
const Title = styled.div`
  color: ${colorGrayDark};
  font-weight: ${headingsFontWeight};
  font-size: ${jumboPaddingY};
`;
const SurveyHead = styled.div`
  margin: 0;
  padding: 0;
  border: none;
  line-height: ${titlePositionLeft};
  margin-bottom: ${lgPaddingY};
`;
const SurveyTitle = styled.div`
  color: ${colorGrayDark};
  font-weight: ${headingsFontWeight};
  font-size: ${jumboPaddingY};
`;
const SurveySubTitle = styled.div`
  text-align: center;
  line-height: ${lineHeightBase};
  color: ${colorGray};
`;
const Radio = styled.input`
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  `

const Checkbox = styled.input`
  position: relative;
  top: 0.134rem;
  margin-right: 0.5rem;

  [dir="rtl"] & {
    margin-right: 0;
    margin-left: 0.5rem;
  }
`;
const NoteForm = styled.div`
  text-align: center;
  line-height: ${lineHeightBase};
  color: ${colorGray};
  margin-bottom: ${jumboPaddingY};
`;

const Footer = styled.div`
  display:flex;
  margin-bottom: ${lgPaddingY};
`;

const ConfirmationButton = styled(Button)`
  padding-right: ${jumboPaddingY};
  padding-left: ${jumboPaddingY};
  margin: 0 ${smPaddingX} 0 0;

  [dir="rtl"] & {
    margin: 0 0 0 ${smPaddingX};
  }
`;

const CancelButton = styled(ConfirmationButton)`
  margin: 0;
`;

const Label = styled.label`
  display: block;
`;

export default {
  ClassNoteModal,
  Container,
  Description,
  DescriptionText,
  Checkbox,
  Footer,
  ConfirmationButton,
  CancelButton,
  Label,
  Header,
  Title,
  NoteForm,
  Radio,
  SurveyHead,
  SurveyTitle,
  SurveySubTitle,
};
