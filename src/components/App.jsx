import Modal from './Modal';
import Loader from './Loader';
import { Component, createRef } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './common/Button/Button';
import ImageGalleryItem from './ImageGalleryItem';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=43897826-0f8632ff14c61d7f409caf77c&image_type=photo';

export class App extends Component {
  state = {
    searchTherm: '',
    isLoading: false,
    page: 1,
    error: null,
    isVisible: false,
    isModalVisible: false,
    src: '',
    alt: '',
    hits: [],
    searchNoFind: false,
  };

  modalRef = createRef();

  async componentDidMount() {
    document.body.addEventListener('mousedown', this.handleClickOutside);
    document.body.addEventListener('keydown', this.handleKeyDown);

    // console.log('did mount');
    // console.log(this.state.page);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.handleClickOutside);
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleModalClose() {
    this.setState({ isModalVisible: false });
    // console.log('click');
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.handleModalClose();
    }
  };

  handleClickOutside = ev => {
    if (this.modalRef.current && !this.modalRef.current.contains(ev.target)) {
      this.handleModalClose();
    }
  };

  openModal = e => {
    const image = e.target;

    // console.log(image.getAttribute('pageurl'));
    // console.log('openModal');

    const largeImageUrl = image.getAttribute('pageurl');

    this.setState({
      isModalVisible: true,
      src: largeImageUrl,
      alt: image.alt,
    });
  };

  async handleSearch() {
    // console.log(this.state.searchTherm);

    try {
      this.setState({
        isLoading: true,
        error: null,
        isVisible: true,
        page: 1,
      });

      