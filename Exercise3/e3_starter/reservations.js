/* Reservations.js */
'use strict';

const log = console.log
const fs = require('fs');
const datetime = require('date-and-time')

const startSystem = () => {

	let status = {};

	try {
		status = getSystemStatus();
	} catch(e) {
		status = {
			numRestaurants: 0,
			totalReservations: 0,
			currentBusiestRestaurantName: null,
			systemStartTime: new Date(),
		}

		fs.writeFileSync('status.json', JSON.stringify(status))
	}

	return status;
}

/*********/


// You may edit getSystemStatus below.  You will need to call updateSystemStatus() here, which will write to the json file
const getSystemStatus = () => {
	const status = fs.readFileSync('status.json')

	return JSON.parse(status)
}

/* Helper functions to save JSON */
const updateSystemStatus = () => {
	const status = {}

	/* Add your code below */
	fs.writeFileSync('status.json', JSON.stringify(status))
}

const saveRestaurantsToJSONFile = (restaurants) => {
	/* Add your code below */
	fs.writeFileSync('restaurants.json', JSON.stringify(restaurants))
};

const saveReservationsToJSONFile = (reservations) => {
	/* Add your code below */
	fs.writeFileSync('reservations.json', JSON.stringify(reservations))
};

/*********/

// Should return an array of length 0 or 1.
const addRestaurant = (name, description) => {
	// Check for duplicate names

	return [];

	// if no duplicate names:
	const restaurant = null; // remove null and assign it to proper value


	return [restaurant];

}

// should return the added reservation object
const addReservation = (restaurant, time, people) => {

	/* Add your code below */
	const reservation = null; // remove null and assign it to proper value
	return reservation;

}


/// Getters - use functional array methods when possible! ///

// Should return an array - check to make sure restaurants.json exists
const getAllRestaurants = () => {
	/* Add your code below */

};

// Should return the restaurant object if found, or an empty object if the restaurant is not found.
const getRestaurantByName = (name) => {
	/* Add your code below */

};

// Should return an array - check to make sure reservations.json exists
const getAllReservations = () => {
  /* Add your code below */

};

// Should return an array
const getAllReservationsForRestaurant = (name) => {
	/* Add your code below */

};


// Should return an array
const getReservationsForHour = (time) => {
	/* Add your code below */

}

// should return a reservation object
const checkOffEarliestReservation = (restaurantName) => {

	const checkedOffReservation = null; // remove null and assign it to proper value
 	return checkedOffReservation;
}


const addDelayToReservations = (restaurant, minutes) => {
	// Hint: try to use a functional array method

}

startSystem(); // start the system to create status.json (should not be called in app.js)

// May not need all of these in app.js..but they're here.
module.exports = {
	addRestaurant,
	getSystemStatus,
	getRestaurantByName,
	getAllRestaurants,
	getAllReservations,
	getAllReservationsForRestaurant,
	addReservation,
	checkOffEarliestReservation,
	getReservationsForHour,
	addDelayToReservations
}
