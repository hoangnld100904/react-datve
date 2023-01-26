import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
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
    const handleReset = () => {
        dispatch({ type: 'RESET_SEATS' });
    }

    // Render theater layout with seats
    return (
        <div>
            <div className='container text-center d-flex justify-content-center'>
                <div className="wraper">
                    <h1>MOVIE SEAT SELECTION</h1>
                    <dv className="description">
                        <p>Seat Status</p>
                        <div className='d-flex justify-content-center'>
                            <div className="ex-row mx-3">
                                <div className="example-seat"></div>
                                <p>: Available Seat</p>
                            </div>
                            <div className="ex-row mx-3">
                                <div className="example-seat selected"></div>
                                <p>: Selected Seat</p>
                            </div>
                            <div className="ex-row mx-3">
                                <div className="example-seat booked"></div>
                                <p>: Booked Seat</p>
                            </div>
                        </div>
                        <p>Button</p>
                        <div className='d-flex justify-content-center'>

                            <div className="ex-row mx-3">
                                <button>Book</button>
                                <p>: Book selected seat</p>
                            </div>
                            <div className="ex-row mx-3">
                                <button>Reset</button>
                                <p>: Reset all seat status to available</p>
                            </div>
                        </div>
                    </dv>
                    <div className='px-3 py-1' id='screen'><span>Screen Here</span></div>
                    <div className='d-flex justify-content-center'>
                        <div>
                            {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
                                <div className='row' key={row}>
                                    <span>{row}</span>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(seat => (

                                        <button
                                            key={seat}
                                            className={`seat d-flex justify-content-center align-items-center ${bookedSeats.includes(`${row}${seat}`) ? 'booked' : selectedSeats.includes(`${row}${seat}`) ? 'selected' : hoverSeat === `${row}${seat}` ? 'hover' : ''}`}

                                            onClick={() => handleClick(`${row}${seat}`)}
                                            onMouseEnter={() => handleMouseEnter(`${row}${seat}`)}
                                            onMouseLeave={handleMouseLeave}
                                            disabled={bookedSeats.includes(`${row}${seat}`)}
                                        >
                                            <span className="d-flex justify-content-center align-items-center">{`${seat}`}</span>
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button className='mx-3' onClick={() => dispatch({ type: 'BOOK_SEAT' })} disabled={selectedSeats.length === 0} >
                            Book
                        </button>
                        <button
                            className='mx-3'
                            onClick={handleReset}
                            disabled={bookedSeats.length === 0}
                        >Reset</button>
                    </div>
                    <div>
                        Selected seats: {selectedSeats.join(', ')}
                    </div>
                    <div>
                        Booked seats: {bookedSeats.join(', ')}
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Theater  