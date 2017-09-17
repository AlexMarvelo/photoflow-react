import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from '../Button/Button';
import { apiHost } from '../../config/api.json';
import request from '../../utils/http';
import styles from './Navbar.styles';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
    };
  }
  
  componentWillMount() {
    this.loadUser();
  }
  
  loadUser() {
    this.setState(state => ({
      ...state,
      loading: true,
    }));
    request(`${apiHost}/users/self/?access_token=${this.props.accessToken}`)
      .then((res) => {
        this.setState(state => ({
          ...state,
          user: res.data,
          loading: false,
        }));
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          loading: false,
        }));
        throw err;
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <span style={styles.title}>{this.state.user.username}</span>
        <img src={this.state.user.profile_picture} alt={this.state.user.full_name} style={styles.avatar} />
      </div>
    );
  }
}

const { string } = PropTypes;
Navbar.propTypes = {
  accessToken: string.isRequired,
};

export default Navbar;
