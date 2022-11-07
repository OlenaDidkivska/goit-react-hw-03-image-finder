import React, { Component } from 'react';
import { Overlay, ModalEl } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget !== event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalEl>
          <img src={this.props.contentModal} alt="" />
        </ModalEl>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
};
