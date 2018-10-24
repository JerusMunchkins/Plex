'use strict'

const userData = [
  {
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'amazinggrace@navy.mil',
    password: 'password'
  }
]

const locationData = [
  {
    lat: 41.9171507,
    lng: -87.647284,
    address: '1932 N Burling St, Chicago, IL 60614, USA'
  },
  {
    lat: 41.8983855,
    lng: -87.6317642,
    address: '859 N Dearborn St, Chicago, IL 60610, USA'
  },
  {
    lat: 41.910188,
    lng: -87.640007,
    address: '1530 N Hudson Ave, Chicago, IL 60610, USA'
  }
]
const homeData = [
  {
    locationId: 1,
    price: 5000000,
    imgUrl: 'https://photos.zillowstatic.com/p_f/ISi79n7e5lwahu0000000000.jpg'
  },
  {
    locationId: 2,
    price: 1500000,
    imgUrl: 'https://photos.zillowstatic.com/p_h/ISy3xrxnaoxhjb1000000000.jpg'
  }
]
const placeData = [
  {
    name: "Mom's House",
    locationId: 3
  }
]

const categoryData = [
  'supermarket',
  'gym',
  'pharmacy',
  'laundry',
  'library',
  'church',
  'mosque',
  'synagogue',
  'hindu_temple',
  'bus_station',
  'train_station',
  'subway_station'
]

const userHomeData = [{userId: 1, homeId: 1}, {userId: 1, homeId: 2}]

const homePlaceData = [{homeId: 1, placeId: 1}, {homeId: 2, placeId: 1}]

const prioritiesData = [{userId: 1, placeId: 1, priority: 1}]

module.exports = {
  userData,
  locationData,
  homeData,
  placeData,
  categoryData,
  userHomeData,
  prioritiesData,
  homePlaceData
}
