import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

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
    default:
      return state;
  }
};

// Create store
const store = createStore(seatsReducer);

// Theater component
const Theater = () => {
  // Get selected seats, booked seats and hover seat from store
  const { selectedSeats, bookedSeats, hoverSeat } = useSelector(state => state);
  // Dispatch function to handle seat selection/unselection, booking and hovering
  const dispatch = useDispatch();
  const handleClick = seat => {
    if (bookedSeats.includes(seat)) {
      return;
    }
    if (selectedSeats.includes(seat)) {
      dispatch({ type: 'UNSELECT_SEAT', seat });
    } else {
      dispatch({ type: 'SELECT_SEAT', seat });
    }
  };

  const handleMouseEnter = seat => {
    if (!bookedSeats.includes(seat) && !selectedSeats.includes(seat)) {
      dispatch({ type: 'HOVER_SEAT', seat });
    }
  };

  const handleMouseLeave = () => {
    dispatch({ type: 'UNHOVER_SEAT' });
  };

  // Render theater layout with seats
  return (
    <div>
      <div>Seats:</div>
      <div>
        {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
          <div key={row}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(seat => (

              <button
                key={seat}
                className={`seat ${bookedSeats.includes(`${row}${seat}`) ? 'booked' : selectedSeats.includes(`${row}${seat}`) ? 'selected' : hoverSeat === `${row}${seat}` ? 'hover' : ''}`}
                onClick={() => handleClick(`${row}${seat}`)}
                onMouseEnter={() => handleMouseEnter(`${row}${seat}`)}
                onMouseLeave={handleMouseLeave}
                disabled={bookedSeats.includes(`${row}${seat}`)}
              >
                {`${row}${seat}`}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'BOOK_SEAT' })} disabled={selectedSeats.length === 0}>
          Đặt vé
        </button>
      </div>
      <div>
        Selected seats: {selectedSeats.join(', ')}
      </div>
      <div>
        Booked seats: {bookedSeats.join(', ')}
      </div>
    </div>
  );
};

// App component
const App = () => (
  <Provider store={store}>
    <Theater />
  </Provider>
);

export default App;
