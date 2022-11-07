import React, { Component } from 'react';
import { fetchImageGallery } from 'services/api';
import { AppEl } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ImageGalleryIdle } from './ImageGallery/ImageGallery.styled';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: 'idle',
    loading: true,
    showBtn: false,
  };

  handleFormSubmit = async ({ query }) => {
    if (query === this.state.query) {
      toast.success('This request has already been completed');
      return;
    }

    this.setState({
      query,
      page: 1,
      images: [],
      status: 'pending',
    });
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: 'true' });

      try {
        const response = await fetchImageGallery(query, page);
        console.log(response);
        const images = response.data;

        if (images.hits.length !== 0) {
          const totalPage = Math.ceil(images.totalHits / 12);
          this.controlLastPage(totalPage);

          const result = images.hits.map(img => {
            const { id, largeImageURL, webformatURL, tags } = img;
            return {
              id,
              largeImageURL,
              webformatURL,
              tags,
            };
          });

          return this.setState(({ images }) => ({
            images: [...images, ...result],
            status: 'resolved',
          }));
        }
        Promise.reject(
          new Error(
            toast.error(
              <div>
                Unfortunately, nothing was found for the query <b>{query}</b>
              </div>,
              {
                id: query,
              }
            )
          )
        );
        return this.setState({ status: 'rejected' });
      } catch (error) {
        this.setState({
          error,
          status: 'rejected',
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  handleGalleryButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  controlLastPage = totalPage => {
    const { page } = this.state;
    const isLastPage = page >= totalPage;
    if (isLastPage) {
      toast.success('You have viewed all images!', {
        id: 'lastPage',
      });
      this.setState({
        showBtn: false,
      });
      return true;
    }
    this.setState({
      showBtn: true,
    });
    return false;
  };

  render() {
    const { images, status, loading, showBtn } = this.state;
    return (
      <AppEl>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && (
          <ImageGalleryIdle>
            This is the place for the results of your search
          </ImageGalleryIdle>
        )}

        {status === 'pending' && <Loader />}

        {status === 'rejected' &&
          toast.error('Try to repeat the request.', {
            id: 'Unfortunately, nothing was found...',
          })}

        {status === 'resolved' && (
          <>
            <ImageGallery
              images={images}
              onClick={this.handleGalleryButtonClick}
            />
            {loading && <Loader />}
            {showBtn && <Button onClick={this.handleGalleryButtonClick} />}
          </>
        )}
        <Toaster />
      </AppEl>
    );
  }
}
