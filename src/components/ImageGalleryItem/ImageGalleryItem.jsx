import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import {
  ImageGalleryItemEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    contentModal: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      contentModal: this.props.largeImageURL,
    }));
  };

  render() {
    const { showModal, contentModal } = this.state;

    return (
      <ImageGalleryItemEl onClick={this.toggleModal}>
        <ImageGalleryItemImage
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} contentModal={contentModal} />
        )}
      </ImageGalleryItemEl>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
