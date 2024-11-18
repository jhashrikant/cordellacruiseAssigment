import React, { useState } from "react";
import styles from "./FilterModal.module.css";

const tripTypes = ["one_way", "round"]

const FilterModal = ({ DeparturePorts, filterModalOpen, onClose, handledepartureclick, handleTriptype, handleNightrange, handleReset, handleApply, selectedDeparturePort, selectedNightRange, selectedTripType }) => {


  if (!filterModalOpen) {
    return null
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Filters</h2>

        <div className={styles.filterGroup}>
          <label className={styles.groupLabel}>Trip Type</label>
          <div className={styles.options}>
            {tripTypes.map((triptype, index) => {
              return <button
                key={index}
                className={`${styles.optionButton} ${selectedTripType.includes(triptype) ? styles.selected : ""
                  }`}
                onClick={() => handleTriptype(triptype)}
              >
                {triptype} Trip
              </button>
            })}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.groupLabel}>Number of Nights</label>
          <div className={styles.options}>
            {[2, 3, 4, 5].map((nights, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${selectedNightRange.includes(nights) ? styles.selected : ""
                  }`}
                onClick={() =>
                  handleNightrange(nights)
                }
              >
                {nights} Nights
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.groupLabel}>Departure Port</label>
          <div className={styles.options}>
            {DeparturePorts?.map((port, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${selectedDeparturePort.includes(port?.name) ? styles.selected : ""
                  }`}
                onClick={() =>
                  handledepartureclick(port?.name)
                }
              >
                {port?.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset All
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
