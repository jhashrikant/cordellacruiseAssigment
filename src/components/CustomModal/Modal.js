import { DateRangePicker, DateRange } from 'react-date-range';
import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';

const Modal = ({ isOpen, onClose, destinations, handleDestinationsClick, selectedDestinations, handleApplyFilters, setLocalDateRange, localDateRange }) => {
  // console.log(destinations)
  // useEffect(() => {
  //   if (isOpen) {
  //     // Reset the date range to ensure no dates are selected when the modal opens
  //     setLocalDateRange([
  //       {
  //         startDate: null,
  //         endDate: null,
  //         key: 'selection',
  //       },
  //     ]);
  //   }
  // }, [isOpen]);  
  const handleDateChange = (ranges) => {
    setLocalDateRange([ranges.selection]);
  };

  const handleButtonClick = (destination) => {
    handleDestinationsClick(destination);//kochi
  };


  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <h2>Select Destination and Sailing Date</h2>

        <div className={styles.filterContainer}>
          <div className={styles.selectionGroup}>
            <label>Select Destination</label>
            <div className={styles.buttons}>
              {destinations?.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(destination?.name)}
                  className={`${styles.destinationButton} ${selectedDestinations.includes(destination.name) ? styles.selected : ''}`}
                >
                  {destination?.name}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.date__container}>
            <h3>Select Dates</h3>
            <DateRange
            className={styles.date}
              ranges={localDateRange}
              onChange={handleDateChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              // months={2}
              direction="horizontal"
            />
            {/* <DateRange
              className={styles.date}
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={localDateRange}
            /> */}
          </div>
            
          </div>

          <button className={styles.applyButton} onClick={handleApplyFilters}>Apply</button>
        </div>
      </div>
      );
};

      export default Modal;
