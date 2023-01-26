import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Theater from './components/Theater'
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// Create reducer to handle seat selection/unselection, booking and hovering
const seatsReducer = (state = { selectedSeats: [], bookedSeats: [], hoverSeat: '' }, action) => {
  switch (action.type) {
    case 'SELECT_SEAT':
      return { ...state, selectedSeats: [...state.selectedSeats, action.seat] };
    case 'UNSELECT_SEAT':
      return { ...state, selectedSeats: state.selectedSeats.filter(seat => seat !== action.seat) };
    case 'BOOK_SEAT':
      return { ...state, bookedSeats: [...state.bookedSeats, ...state.selectedSeats], selectedSeats: [] };
    case 'HOVER_SEAT':
      return { ...state, hoverSeat: action.seat };
    case 'UNHOVER_SEAT':
      return {
        ...state, hoverSeat: ''
      };
    case 'RESET_SEATS':
      console.log('reset')
      return { ...state, selectedSeats: [], bookedSeats: [], hoverSeat: '' };
    default:
      return state;
  }
};

// Create store
const store = createStore(seatsReducer);

// App component
const App = () => (
  <Provider store={store}>
    <Modal />
    <Theater />
  </Provider>
);

export default App;
