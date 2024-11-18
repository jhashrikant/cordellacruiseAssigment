import React, { useCallback, useEffect, useState } from 'react';
import styles from "./Cruise.module.css";
import Modal from '../CustomModal/Modal';
import { API_URL, handleToggleSelection, isObject, parseCustomDate } from '../../helpers/utils';
import tripstatus from "../../assets/Group 1171278275.png"
import offerLogo from "../../assets/Amenities- line.png"
import tickmark from "../../assets/icons.png"
import FilterModal from '../quickFilterModal/FilterModal';


const Cruise = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalopen] = useState(false)
  const [originalData, setOriginalData] = useState([]); // Original unfiltered data
  const [itinerariesData, setItinerariesData] = useState([]); // Filtered data
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  // const [showClearAll, setshowClearAll] = useState(false)
  // const [selectedDateRange, setSelectedDateRange] = useState({ startDate: '', endDate: '' });
  const [localDateRange, setLocalDateRange] = useState([
    // {
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   key: 'selection',
    // },
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);


  console.log('date', localDateRange)
  const [selectedNightRange, setSelectedNightRange] = useState([]);
  const [selectedTripType, setSelectedTripType] = useState([]);
  const [selectedDeparturePort, setSelectedDeparturePort] = useState([]);
  const [DeparturePorts, setDeparturePorts] = useState([])
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const fetchCruiseData = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL);
      if (!response.ok) {
        setError(`Some network error occured API request failed with status: ${response.status}`)
        return;
      }
      const jsonres = await response.json();
      if (!jsonres || !isObject(jsonres)) {
        setError("Invalid data structure received from API")
      }
      setOriginalData(jsonres); // Store the original data
      setItinerariesData(jsonres); // Initialize filtered data with original
      const destinationPorts = jsonres?.ports?.filter((port) => port.destination);
      setDestinations(destinationPorts);
      const departureport = jsonres?.ports?.filter(port => port.origin)
      setDeparturePorts(departureport)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setError(error || "An error occurred while fetching cruise data")
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCruiseData();
  }, []);

  const handleDestinationsClick = (destination) => {
    //using togglefunction for reusability
    handleToggleSelection(destination, setSelectedDestinations)
    // setSelectedDestinations((prevDestinations) => {
    //   if (prevDestinations.includes(destination)) {
    //     return prevDestinations.filter((item) => item !== destination);
    //   } else {
    //     return [...prevDestinations, destination];
    //   }
    // });
  };

  const handlefilterModalclose = () => {
    setFilterModalopen(false)
  }

  const handleApplyFilters = () => {
    closeModal();

    const startDate = localDateRange[0].startDate;
    const endDate = localDateRange[0].endDate;
    console.log(startDate, endDate)

    // Reset to original data if no filters are selected
    if (
      selectedDestinations.length === 0 &&
      (startDate === null || endDate === null) &&
      selectedNightRange.length === 0 &&
      selectedTripType.length === 0 &&
      selectedDeparturePort.length === 0
    ) {
      setItinerariesData(originalData);
      return;
    }

    // Start with the original itineraries
    let filteredItineraries = [...originalData?.itineraries] || [];

    // Filter by night range
    if (selectedNightRange.length > 0) {
      filteredItineraries = filteredItineraries.filter((itinerary) =>
        selectedNightRange.includes(itinerary.nights)
      );
    }

    // Filter by trip type
    if (selectedTripType.length > 0) {
      filteredItineraries = filteredItineraries.filter((itinerary) =>
        selectedTripType.includes(itinerary.trip_type)
      );
    }

    // Filter by departure ports
    if (selectedDeparturePort.length > 0) {
      console.log(filteredItineraries)
      filteredItineraries = filteredItineraries.filter((itinerary) =>
        selectedDeparturePort.includes(itinerary?.starting_port.name)
      );
    }

    // Filter by date range

    if (startDate && endDate) {
      filteredItineraries = filteredItineraries.filter((itinerary) => {
        console.log('Raw Start Date:', itinerary.start_date);
        console.log('Raw End Date:', itinerary.end_date);

        const itineraryStartDate = parseCustomDate(itinerary.start_date);
        const itineraryEndDate = parseCustomDate(itinerary.end_date);
        console.log("hshshdude", itineraryStartDate)
        console.log("hshshendduee", itineraryEndDate)

        if (isNaN(itineraryStartDate) || isNaN(itineraryEndDate)) {
          console.error('Invalid date detected:', itinerary.start_date, itinerary.end_date);
          return false; // Skip this itinerary
        }

        console.log('Parsed Start Date:', itineraryStartDate);
        console.log('Parsed End Date:', itineraryEndDate);

        return startDate <= itineraryEndDate && endDate >= itineraryStartDate;
      });
    }
    // Filter by destinations
    if (selectedDestinations.length > 0) {
      console.log(filteredItineraries)
      filteredItineraries = filteredItineraries.filter((itinerary) => {
        // return selectedDestinations.includes(itinerary?.destination_port?.name)
        return itinerary?.ports?.some((port) => selectedDestinations.includes(port.name))
      }
      );
    }

    setItinerariesData({
      ...originalData,
      itineraries: filteredItineraries,
    });

    console.log("Filtered Itineraries:", filteredItineraries);
  }
  //selectedDestinations, selectedDeparturePort, selectedNightRange, selectedTripType, localDateRange
  console.log("ieie", itinerariesData)

  const handledepartureclick = (portname) => {
    //using togglefunction for reusability
    handleToggleSelection(portname, setSelectedDeparturePort)

    // setSelectedDeparturePort((prev) => {
    //   if (prev.includes(portname)) {
    //     return prev.filter((item) => item !== portname);
    //   } else {
    //     return [...prev, portname];
    //   }
    // })
  }
  console.log(selectedDeparturePort)

  const handleTriptype = (selectedtriptypes) => {
    //using togglefunction for reusability
    handleToggleSelection(selectedtriptypes, setSelectedTripType)

    // setSelectedTripType((prev) => {
    //   if (prev.includes(selectedtriptypes)) {
    //     return prev.filter((item) => item !== selectedtriptypes);
    //   } else {
    //     return [...prev, selectedtriptypes];
    //   }
    // })
  }

  console.log(selectedNightRange)

  const handleNightrange = (selectednightrange) => {
    //using togglefunction for reusability
    handleToggleSelection(selectednightrange, setSelectedNightRange)

    // setSelectedNightRange((prev) => {
    //   if (prev.includes(selectednightrange)) {
    //     return prev.filter((item) => item !== selectednightrange);
    //   } else {
    //     return [...prev, selectednightrange];
    //   }
    // })
  }

  console.log(selectedTripType)

  const handleApply = () => {
    handlefilterModalclose()
    handleApplyFilters()
  }

  const handleReset = () => {
    setFilterModalopen(false)
    setSelectedDeparturePort([])
    setSelectedTripType([])
    setSelectedNightRange([])
  }

  const clearAll = () => {
    setSelectedDestinations([])
    setLocalDateRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    ])
    setItinerariesData(originalData)
  }

  console.log(selectedDestinations)
  return (
    <section className={styles.cruise__container}>
      <h3 className={styles.title}>Explore Cruise Holidays</h3>
      <div className={styles.filterSection}>
        <button onClick={openModal} className={styles.filterButton}>
          <div className={styles.buttonContent}>
            <span role="img" aria-label="destination">📍</span> Destinations
          </div>
          <div className={styles.buttonContent}>
            <span role="img" aria-label="dates">📅</span> Dates
          </div>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        destinations={destinations}
        handleDestinationsClick={handleDestinationsClick}
        selectedDestinations={selectedDestinations}
        setLocalDateRange={setLocalDateRange}
        handleApplyFilters={handleApplyFilters}
        localDateRange={localDateRange}

      />
      {/* applied filters button */}
      <div className='flex justify-center items-center'>
        {selectedDestinations && selectedDestinations.map((destination, index) => {
          return <div key={index} className={styles.destinationpill}>{destination}</div>
        })}
        {(selectedDestinations.length > 0) && <button onClick={clearAll} className={styles.clearAll}>clearAll X</button>}
      </div>


      {/* loading */}
      {loading && <div className={styles.loading}>LOADING...</div>}
      {/* Cruise results */}

      {error && <div className={styles.error}>{error}</div>}

      {/* no records */}
      {(!loading && !itinerariesData?.itineraries?.length > 0) && <div className={styles.noRecords}>No records found</div>}
      <div className={styles.cruiseResultsContainer}>
        <div className='flex items-center justify-between'>
          {!loading && <h2>Cruise search results ({itinerariesData?.itineraries?.length})</h2>}
          {!loading && <h3 className='cursor-pointer font-semibold' onClick={() => setFilterModalopen(true)}>Filter</h3>}
        </div>

        <FilterModal
          DeparturePorts={DeparturePorts}
          onClose={handlefilterModalclose}
          filterModalOpen={filterModalOpen}
          handledepartureclick={handledepartureclick}
          handleTriptype={handleTriptype}
          handleNightrange={handleNightrange}
          handleApply={handleApply}
          handleReset={handleReset}
          selectedDeparturePort={selectedDeparturePort}
          selectedNightRange={selectedNightRange}
          selectedTripType={selectedTripType}
        />


        {itinerariesData?.itineraries?.map((itinerary) => (
          <div key={itinerary.itinerary_id} className={styles.itenarycard}>
            <img className={styles.itineraryimg} src={itinerary?.image_url} alt="itineraryImg" />
            <div className={styles.details}>
              <h6 className={styles.visitingPorts}>visiting ports</h6>
              <div className={styles.visitingPortsName}>
                <div className='flex justify-center items-center'>
                  {itinerary?.ports
                    .filter((port) => !port?.name.includes("At Sea"))
                    .map((port, index) => (
                      <div key={index}>{port.name + "|"}</div>
                    ))}
                </div>

                {/* trip status */}
                {itinerary.trip_type === "one_way" ? <div className='font-bold'>One way</div> : <img src={tripstatus} alt='tripStatusImg' />}
              </div>

              <div className={styles.inclusion__container}>
                <div>
                  <h6 className={styles.inclusiontext}>Inclusions</h6>
                  <div className={styles.inclusions}>
                    {itinerary?.inclusions?.map((inclusion, index) => (
                      <div key={index} className='flex items-center justify-center' ><img src={tickmark} alt='tickmarkLogo' />{inclusion + "|"}</div>
                    ))}
                  </div>
                </div>

                {/* <div className={styles.price}>
                  &#8377;{itinerary?.starting_fare}
                </div> */}

                <div className={`${styles.price} ${styles.mobileHide}`}>
                  &#8377;{itinerary?.starting_fare}
                </div>
              </div>

              <div>{`${itinerary?.start_date} -> ${itinerary?.end_date}`}</div>


              <div className={styles.offersMain}>
                <div className={styles.offers_Container}>
                  <div>
                    <h3 className={styles.offersText}>Applied Offers</h3>
                    <div className={styles.offers}>
                      {itinerary?.offers_available?.map((offer, index) => (
                        <div className='flex items-center justify-start' key={index}><img src={offerLogo} alt='offerlogo' />{offer}</div>
                      ))}
                    </div>
                  </div>

                  {/* Price section for mobile */}
                  <div className={`${styles.price} ${styles.mobileShow}`}>
                    &#8377;{itinerary?.starting_fare}
                  </div>
                </div>

                <div className={styles.btnContainer}>
                  <button className={styles.bookNow}>Book Now</button>
                  <button className={styles.viewItinerary}>View Itinerary</button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cruise;
