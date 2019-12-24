import React from 'react';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.setState({ loading: true });

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(response => handleResponse(response))
      .then((data) => {
        console.log('Success', data);
        const { currencies, totalPages } = data;
        this.setState({ currencies, totalPages, loading: false });
      })
      .catch((error) => {
        console.log('Error', error);
        this.setState({ error: error.errorMessage, loading: false });
      });
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <xpan>{percent}</xpan>
    }
  }

  handlePaginationClick = direction => {
    let nextPage = this.state.page;
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    if (error) {
      return <div className="error">{this.state.error}</div>
    }

    return (
      <div>
        <Table currencies={currencies} renderChangePercent={this.renderChangePercent}/>
        <Pagination page={page} totalPages={totalPages} handlePaginationClick={this.handlePaginationClick}/>
      </div>
    );
  }
}

export default List;