// external imports
import React, { Component } from 'react';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
// external css imports
import 'axios-progress-bar/dist/nprogress.css';
import 'react-notifications/lib/notifications.css';
// component imports
import Header from '../../components/header/Header';
import SearchBar from '../searchbar/SearchBar';
import ResultsContainer from '../results/ResultsContainer';
import ViewCorpus from '../other/ViewCorpus';

loadProgressBar();

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      corpus: '',
      text: '',
      filteredSimilarTextList: [],
      isEditing: false,
      updatedText: '',
      currentItem: '',
      isViewingCorpus: false,
    };

    this.search = this.search.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onRemoveItemFromQueryableList =
      this.onRemoveItemFromQueryableList.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onActivateInlineEditMode = this.onActivateInlineEditMode.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onConfirmEdit = this.onConfirmEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
  }

  componentDidMount() {
    console.log('Component mounted');
    this.search();
  }

  search = query => {
    if (!query) {
      return;
    }

    const API = `/cleanCorpus/${query}`;

    axios
      .get(API)
      .then(res => {
        if (!res.data || res.data === 'undefined') {
          return;
        }

        this.setState({
          filteredSimilarTextList: res.data,
        });
      })
      .catch(error => {
        console.log(
          'Can’t access ' + API + ' response. Blocked by browser',
          error,
        );
      });
  };

  onTextChange = event => {
    const { value } = event.target;

    if (!value) {
      this.setState({
        isEditing: false,
        filteredSimilarTextList: [],
      });
    }

    this.setState({
      text: value,
    });

    if (!this.state.isEditing) {
      this.search(value);
    }
  };

  onRemoveItemFromQueryableList = item => {
    axios
      .delete(`/cleanCorpus/${this.state.filteredSimilarTextList}/${item}`)
      .then(res => {
        this.setState({
          filteredSimilarTextList: res.data,
        });
        NotificationManager.info(
          item + ' has been removed from the list',
          'Info',
          3000,
        );
      });
  };

  onAdd = item => {
    axios.post(`cleanCorpus/${item}`).then(res => {
      let items = [...this.state.filteredSimilarTextList];
      if (!items.includes(item)) {
        items.push(item);
        NotificationManager.success(
          item + ' has been added to the list',
          'Success',
          3000,
        );
        this.setState({
          filteredSimilarTextList: items,
        });
      } else {
        NotificationManager.error(
          item + ' is already in the list',
          'Error',
          3000,
        );
      }
    });
  };

  onConfirmEdit = () => {
    const { updatedText, currentItem, filteredSimilarTextList } = this.state;

    if (updatedText) {
      axios
        .put(
          `cleanCorpus/${currentItem}/${updatedText}`,
          filteredSimilarTextList,
        )
        .then(res => {
          let items = [...filteredSimilarTextList];
          items.splice(
            filteredSimilarTextList.indexOf(currentItem),
            1,
            updatedText,
          );
          // console.log(
          //   'here',
          //   filteredSimilarTextList.indexOf(currentItem),
          //   1,
          //   updatedText,
          // );

          NotificationManager.success(
            'Updated ' + currentItem + ' to ' + updatedText,
            'Success',
            3000,
          );

          this.setState({
            filteredSimilarTextList: items,
          });
        });
    } else {
      NotificationManager.info('No changes were made', 'Info', 3000);
    }

    this.setState({
      isEditing: false,
    });
  };

  onActivateInlineEditMode = item => {
    this.setState({
      isEditing: true,
      currentItem: item,
    });
  };

  onEdit = event => {
    const { value } = event.target;

    this.setState({ updatedText: value });
  };

  onCancelEdit = () => {
    this.setState({ isEditing: false });
    NotificationManager.info('No changes were made', 'Info', 3000);
  };

  retrieveCorpus = () => {
    this.setState({
      isViewingCorpus: !this.state.isViewingCorpus,
    });

    if (!this.state.isViewingCorpus) {
      axios.get('corpus').then(res => {
        this.setState({
          corpus: res.data,
        });
      });
    }
  };

  render() {
    const {
      text,
      corpus,
      filteredSimilarTextList,
      isEditing,
      currentItem,
      isViewingCorpus,
    } = this.state;

    return (
      <div className="main">
        <NotificationContainer />
        <img src={require('../../images/header.jpg')} alt="library books" />
        <div className="wrapper">
          <Header />
          <SearchBar
            text={text}
            onTextChange={this.onTextChange}
            onAdd={this.onAdd}
          />
          <ResultsContainer
            filteredSimilarTextList={filteredSimilarTextList}
            isEditing={isEditing}
            currentItem={currentItem}
            onActivateInlineEditMode={this.onActivateInlineEditMode}
            onEdit={this.onEdit}
            onConfirmEdit={this.onConfirmEdit}
            onCancelEdit={this.onCancelEdit}
            onRemoveItemFromQueryableList={this.onRemoveItemFromQueryableList}
          />
          <ViewCorpus
            retrieveCorpus={this.retrieveCorpus}
            isViewingCorpus={isViewingCorpus}
            corpus={corpus}
          />
        </div>
      </div>
    );
  }
}

export default Main;
