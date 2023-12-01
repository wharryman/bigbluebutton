import styled from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import {
  fontSizeXXL,
  headingsFontWeight,
    fontSizeLarge,
  lineHeightComputed,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  mdPaddingX,
  smPaddingX,
  borderSize,
  borderSizeLarge,
  lgPaddingY,
} from '/imports/ui/stylesheets/styled-components/general'; 
import {
  colorGrayLabel,
  colorWhite,
  colorGrayLighter,
  colorGrayDark,
  colorPrimary,
  colorText,
  btnSuccessColor,
  btnDangerColor,
} from '/imports/ui/stylesheets/styled-components/palette';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';

const ModalViewContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  & > div {
    margin-bottom: 1rem;
  }
`;
const SelectButton = styled(Button)`
  margin-bottom: ${mdPaddingX};
`;
const Warning = styled.div`
  text-align: center;
  font-weight: ${headingsFontWeight};
  font-size: 5rem;
  white-space: normal;
`;

const Main = styled.h4`
  margin: ${lineHeightComputed};
  text-align: center;
  font-size: ${fontSizeLarge};
`;

const Text = styled.div`
  margin: ${lineHeightComputed};
  text-align: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0 0.5rem 0 0.5rem;

  width: 50%;
  @media ${smallOnly} {
    width: 90%;
    height: unset;
  }
`;

const Label = styled.label`
  margin-top: 8px;
  font-size: 0.85rem;
  font-weight: bold;
  color: ${colorGrayLabel};
`;

const Select = styled.select`
  background-color: ${colorWhite};
  border: ${borderSize} solid ${colorWhite};
  border-radius: ${borderSize};
  border-bottom: 0.1rem solid ${colorGrayLighter};
  color: ${colorGrayLabel};
  width: 100%;
  height: 1.75rem;
  padding: 1px;

  &:focus {
    outline: none;
    border-radius: ${borderSize};
    box-shadow: 0 0 0 ${borderSize} ${colorPrimary}, inset 0 0 0 1px ${colorPrimary};
  }

  &:hover,
  &:focus {
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  color: ${colorText};
  font-weight: normal;
  padding: ${lineHeightComputed} 0;

  @media ${smallOnly} {
    flex-direction: column;
    margin: 0;
  }
`;

const BrowserWarning = styled.p`
  padding: 0.5rem;
  border-width: ${borderSizeLarge};
  border-style: solid;
  border-radius: 0.25rem;
  margin: ${lineHeightComputed};
  text-align: center;
`;

const Title = styled.div`
  display: block;
  color: ${colorGrayDark};
  font-size: 1.4rem;
  text-align: center;
`;

const GradeBox = styled.table`
  table-layout:fixed;
  width: 100%;
`;

const NALabel = styled.span`
  white-space: normal;
`;

const SmileyTable = styled.table`
  table-layout:fixed;
  width: 100%;
`;

const SmileySpace = styled.td`
  width: 16.4%;
`;

const Smiley = styled.img`
  width: 100%;
`;

const GradeSlider = styled.input`
  width:96%;
`;
const Actions = styled.div`
  margin-left: auto;
  margin-right: ${borderSizeLarge};

  [dir="rtl"] & {
    margin-right: auto;
    background:red;
    margin-left: ${borderSizeLarge};
  }

  & > :first-child {
    margin-right: ${borderSizeLarge};
    margin-left: inherit;

    [dir="rtl"] & {
      margin-right: inherit;
      margin-left: ${borderSizeLarge};
    }
  }
`;

const ExtraActions = styled.div`
  margin-right: auto;
  margin-left: ${borderSizeLarge};

  [dir="rtl"] & {
    margin-left: auto;
    margin-right: ${borderSizeLarge};
  }

  & > :first-child {
    margin-left: ${borderSizeLarge};
    margin-right: inherit;

    [dir="rtl"] & {
      margin-left: inherit;
      margin-right: ${borderSizeLarge};
    }
  }
`;
const ConfirmationButton = styled(Button)`
  padding-right: ${lgPaddingY};
  padding-left: ${lgPaddingY};
  margin: 0 ${smPaddingX} 0 0;

  [dir="rtl"] & {
    margin: 0 0 0 ${smPaddingX};
  }
`;

const CancelButton = styled(ConfirmationButton)`
  padding-right: ${lgPaddingY};
  padding-left: ${lgPaddingY};
  margin: 0 ${smPaddingX} 0 0;

  [dir="rtl"] & {
    margin: 0 0 0 ${smPaddingX};
`;
const Footer = styled.div`
  display:flex;
`;
const Radio = styled.input`
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  `
export default {
  ModalViewContainer,
  SelectButton,
    Warning,
  Main,
  Text,
  Col,
  Label,
  Select,
  Content,
  BrowserWarning,
  Title,
  Footer,
  Actions,
  ExtraActions,
  GradeBox,
  NALabel,
  SmileyTable,
  SmileySpace,
  Smiley,
  GradeSlider,
  ConfirmationButton,
  CancelButton,
  Radio,
};
