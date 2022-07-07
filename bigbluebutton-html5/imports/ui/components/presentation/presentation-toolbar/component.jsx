import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import deviceInfo from '/imports/utils/deviceInfo';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import { HUNDRED_PERCENT, MAX_PERCENT, STEP } from '/imports/utils/slideCalcUtils';
import Styled from './styles';
import ZoomTool from './zoom-tool/component';
import TooltipContainer from '/imports/ui/components/common/tooltip/container';
import KEY_CODES from '/imports/utils/keyCodes';

const intlMessages = defineMessages({
  previousSlideLabel: {
    id: 'app.presentation.presentationToolbar.prevSlideLabel',
    description: 'Previous slide button label',
  },
  previousSlideDesc: {
    id: 'app.presentation.presentationToolbar.prevSlideDesc',
    description: 'Aria description for when switching to previous slide',
  },
  nextSlideLabel: {
    id: 'app.presentation.presentationToolbar.nextSlideLabel',
    description: 'Next slide button label',
  },
  nextSlideDesc: {
    id: 'app.presentation.presentationToolbar.nextSlideDesc',
    description: 'Aria description for when switching to next slide',
  },
  noNextSlideDesc: {
    id: 'app.presentation.presentationToolbar.noNextSlideDesc',
    description: '',
  },
  noPrevSlideDesc: {
    id: 'app.presentation.presentationToolbar.noPrevSlideDesc',
    description: '',
  },
  skipSlideLabel: {
    id: 'app.presentation.presentationToolbar.skipSlideLabel',
    description: 'Aria label for when switching to a specific slide',
  },
  skipSlideDesc: {
    id: 'app.presentation.presentationToolbar.skipSlideDesc',
    description: 'Aria description for when switching to a specific slide',
  },
  goToSlide: {
    id: 'app.presentation.presentationToolbar.goToSlide',
    description: 'button for slide select',
  },
  selectLabel: {
    id: 'app.presentation.presentationToolbar.selectLabel',
    description: 'slide select label',
  },
  fitToWidth: {
    id: 'app.presentation.presentationToolbar.fitToWidth',
    description: 'button for fit to width',
  },
  fitToWidthDesc: {
    id: 'app.presentation.presentationToolbar.fitWidthDesc',
    description: 'Aria description to display the whole width of the slide',
  },
  fitToPage: {
    id: 'app.presentation.presentationToolbar.fitToPage',
    description: 'button label for fit to width',
  },
  fitToPageDesc: {
    id: 'app.presentation.presentationToolbar.fitScreenDesc',
    description: 'Aria description to display the whole slide',
  },
  presentationLabel: {
    id: 'app.presentationUploder.title',
    description: 'presentation area element label',
  },
});

class PresentationToolbar extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSkipToSlideChange = this.handleSkipToSlideChange.bind(this);
    this.change = this.change.bind(this);
    this.renderAriaDescs = this.renderAriaDescs.bind(this);
    this.switchSlide = this.switchSlide.bind(this);
    this.nextSlideHandler = this.nextSlideHandler.bind(this);
    this.previousSlideHandler = this.previousSlideHandler.bind(this);
    this.fullscreenToggleHandler = this.fullscreenToggleHandler.bind(this);
    this.renderGradingModal = this.renderGradingModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.switchSlide);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.switchSlide);
  }

  switchSlide(event) {
    const { target, which } = event;
    const isBody = target.nodeName === 'BODY';

    if (isBody) {
      switch (which) {
        case KEY_CODES.ARROW_LEFT:
        case KEY_CODES.PAGE_UP:
          this.previousSlideHandler();
          break;
        case KEY_CODES.ARROW_RIGHT:
        case KEY_CODES.PAGE_DOWN:
          this.nextSlideHandler();
          break;
        case KEY_CODES.ENTER:
          this.fullscreenToggleHandler();
          break;
        default:
      }
    }
  }

  handleSkipToSlideChange(event) {
    const {
      skipToSlide,
      podId,
    } = this.props;
    const requestedSlideNum = Number.parseInt(event.target.value, 10);

    if (event) event.currentTarget.blur();
    skipToSlide(requestedSlideNum, podId);
  }

  nextSlideHandler(event) {
    const {
      nextSlide,
      currentSlideNum,
      numberOfSlides,
      podId,
      mountGrading,
    } = this.props;

    if (event) event.currentTarget.blur();
    console.log("nextSlideHandler");
    nextSlide(currentSlideNum, numberOfSlides, podId);
    mountGrading();
  }

  previousSlideHandler(event) {
    const {
      previousSlide,
      currentSlideNum,
      podId,
    } = this.props;

    if (event) event.currentTarget.blur();
    previousSlide(currentSlideNum, podId);
  }

  fullscreenToggleHandler() {
    const {
      fullscreenElementId,
      isFullscreen,
      layoutContextDispatch,
      fullscreenAction,
      fullscreenRef,
      handleToggleFullScreen,
    } = this.props;

    handleToggleFullScreen(fullscreenRef);
    const newElement = isFullscreen ? '' : fullscreenElementId;

    layoutContextDispatch({
      type: fullscreenAction,
      value: {
        element: newElement,
        group: '',
      },
    });
  }

  change(value) {
    const { zoomChanger } = this.props;
    zoomChanger(value);
  }

  renderAriaDescs() {
    const { intl } = this.props;
    return (
      <div hidden>
        {/* Aria description's for toolbar buttons */}
        <div id="prevSlideDesc">
          {intl.formatMessage(intlMessages.previousSlideDesc)}
        </div>
        <div id="noPrevSlideDesc">
          {intl.formatMessage(intlMessages.noPrevSlideDesc)}
        </div>
        <div id="nextSlideDesc">
          {intl.formatMessage(intlMessages.nextSlideDesc)}
        </div>
        <div id="noNextSlideDesc">
          {intl.formatMessage(intlMessages.noNextSlideDesc)}
        </div>
        <div id="skipSlideDesc">
          {intl.formatMessage(intlMessages.skipSlideDesc)}
        </div>
        <div id="fitWidthDesc">
          {intl.formatMessage(intlMessages.fitToWidthDesc)}
        </div>
        <div id="fitPageDesc">
          {intl.formatMessage(intlMessages.fitToPageDesc)}
        </div>
      </div>
    );
  }
  renderGradingModal() {
    const { intl } = this.props;
    return (
      <GradingContainer 
      />
    );
  }

  renderSkipSlideOpts(numberOfSlides) {
    // Fill drop down menu with all the slides in presentation
    const { intl } = this.props;
    const optionList = [];
    for (let i = 1; i <= numberOfSlides; i += 1) {
      optionList.push((
        <option
          value={i}
          key={i}
        >
          {
            intl.formatMessage(intlMessages.goToSlide, { 0: i })
          }
        </option>));
    }

    return optionList;
  }

  render() {
    const {
      currentSlideNum,
      numberOfSlides,
      fitToWidthHandler,
      fitToWidth,
      intl,
      zoom,
      isMeteorConnected,
      isPollingEnabled,
      amIPresenter,
      currentSlidHasContent,
      parseCurrentSlideContent,
      startPoll,
      currentSlide,
      toolbarWidth,
    } = this.props;

    const { isMobile } = deviceInfo;

    const startOfSlides = !(currentSlideNum > 1);
    const endOfSlides = !(currentSlideNum < numberOfSlides);

    const prevSlideAriaLabel = startOfSlides
      ? intl.formatMessage(intlMessages.previousSlideLabel)
      : `${intl.formatMessage(intlMessages.previousSlideLabel)} (${currentSlideNum <= 1 ? '' : (currentSlideNum - 1)})`;

    const nextSlideAriaLabel = endOfSlides
      ? intl.formatMessage(intlMessages.nextSlideLabel)
      : `${intl.formatMessage(intlMessages.nextSlideLabel)} (${currentSlideNum >= 1 ? (currentSlideNum + 1) : ''})`;

    return (
      <Styled.PresentationToolbarWrapper
        id="presentationToolbarWrapper"
        style={
          {
            width: toolbarWidth,
          }
        }>
        {this.renderAriaDescs()}
        {/*<Styled.GradingModal
        onRequestClose={closeModal}
        hideBorder
        shouldShowCloseButton={false}
        contentLabel={intl.formatMessage(intlMessages.ariaModalTitle)}
      >
      */}
        {
          <div>
            {isPollingEnabled
              ? (
                <Styled.QuickPollButton
                  {...{
                    currentSlidHasContent,
                    intl,
                    amIPresenter,
                    parseCurrentSlideContent,
                    startPoll,
                    currentSlide,
                  }}
                />
              ) : null
            }
          </div>
        }
        {
          <Styled.PresentationSlideControls>
            <Styled.PrevSlideButton
              role="button"
              aria-label={prevSlideAriaLabel}
              aria-describedby={startOfSlides ? 'noPrevSlideDesc' : 'prevSlideDesc'}
              disabled={startOfSlides || !isMeteorConnected}
              color="default"
              icon="left_arrow"
              size="md"
              onClick={this.previousSlideHandler}
              label={intl.formatMessage(intlMessages.previousSlideLabel)}
              hideLabel
              data-test="prevSlide"
            />

            <TooltipContainer title={intl.formatMessage(intlMessages.selectLabel)}>
              <Styled.SkipSlideSelect
                id="skipSlide"
                aria-label={intl.formatMessage(intlMessages.skipSlideLabel)}
                aria-describedby="skipSlideDesc"
                aria-live="polite"
                aria-relevant="all"
                disabled={!isMeteorConnected}
                value={currentSlideNum}
                onChange={this.handleSkipToSlideChange}
                data-test="skipSlide"
              >
                {this.renderSkipSlideOpts(numberOfSlides)}
              </Styled.SkipSlideSelect>
            </TooltipContainer>
            <Styled.NextSlideButton
              role="button"
              aria-label={nextSlideAriaLabel}
              aria-describedby={endOfSlides ? 'noNextSlideDesc' : 'nextSlideDesc'}
              disabled={endOfSlides || !isMeteorConnected}
              color="default"
              icon="right_arrow"
              size="md"
              onClick={this.nextSlideHandler}
              label={intl.formatMessage(intlMessages.nextSlideLabel)}
              hideLabel
              data-test="nextSlide"
            />
          </Styled.PresentationSlideControls>
        }
        {
          <Styled.PresentationZoomControls>
            {
              !isMobile
                ? (
                  <TooltipContainer>
                    <ZoomTool
                      zoomValue={zoom}
                      change={this.change}
                      minBound={HUNDRED_PERCENT}
                      maxBound={MAX_PERCENT}
                      step={STEP}
                      isMeteorConnected={isMeteorConnected}
                    />
                  </TooltipContainer>
                )
                : null
            }
            <Styled.FitToWidthButton
              role="button"
              aria-describedby={fitToWidth ? 'fitPageDesc' : 'fitWidthDesc'}
              aria-label={fitToWidth
                ? `${intl.formatMessage(intlMessages.presentationLabel)} ${intl.formatMessage(intlMessages.fitToPage)}`
                : `${intl.formatMessage(intlMessages.presentationLabel)} ${intl.formatMessage(intlMessages.fitToWidth)}`
              }
              color="default"
              disabled={!isMeteorConnected}
              icon="fit_to_width"
              size="md"
              circle={false}
              onClick={fitToWidthHandler}
              label={fitToWidth
                ? intl.formatMessage(intlMessages.fitToPage)
                : intl.formatMessage(intlMessages.fitToWidth)
              }
              hideLabel
            />
          </Styled.PresentationZoomControls>
        }
      </Styled.PresentationToolbarWrapper>
    );
  }
}

PresentationToolbar.propTypes = {
  // The Id for the current pod. Should always be default pod
  podId: PropTypes.string.isRequired,
  // Number of current slide being displayed
  currentSlideNum: PropTypes.number.isRequired,
  // Total number of slides in this presentation
  numberOfSlides: PropTypes.number.isRequired,
  // Actions required for the presenter toolbar
  nextSlide: PropTypes.func.isRequired,
  mountGrading: PropTypes.func.isRequired,
  previousSlide: PropTypes.func.isRequired,
  skipToSlide: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  zoomChanger: PropTypes.func.isRequired,
  fitToWidthHandler: PropTypes.func.isRequired,
  fitToWidth: PropTypes.bool.isRequired,
  zoom: PropTypes.number.isRequired,
  isMeteorConnected: PropTypes.bool.isRequired,
  fullscreenElementId: PropTypes.string.isRequired,
  fullscreenAction: PropTypes.string.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  layoutContextDispatch: PropTypes.func.isRequired,
};

export default injectWbResizeEvent(injectIntl(PresentationToolbar));
