'use strict'

const userData = [
  {
    firstName: 'Cody',
    lastName: 'Pug',
    email: 'cody@email.com',
    password: '123'
  },
  {
    firstName: 'Murphy',
    lastName: 'Dog',
    email: 'murphy@email.com',
    password: '123'
  }
]

const locationData = [
  {
    lat: 41.9171507,
    lng: -87.647284,
    address: '1932 N Burling Street, Chicago, IL 60614, USA'
  },
  {
    lat: 41.8983855,
    lng: -87.6317642,
    address: '859 N Dearborn St Chicago, IL 60610, USA'
  },
  {
    lat: 41.8952701,
    lng: -87.6412238,
    address: '405 W Superior St, Chicago, IL 60654, USA'
  },
  {
    lat: 41.8844878,
    lng: -87.6338603,
    address: '100 W Randolph St, Chicago, IL 60601, USA'
  },
  {
    lat: 41.9090381,
    lng: -87.629484,
    address: '1443 N Astor St, Chicago, IL 60610, USA'
  },
  {
    lat: 41.922028,
    lng: -87.6467147,
    address: '620 W Webster Ave, Chicago, IL 60614, USA'
  },
  {
    lat: 41.897034,
    lng: -87.6257315,
    address: '800 N Michigan Ave #5801 Park Tower, Chicago, IL 60611, USA'
  },
  {
    lat: 41.8997054,
    lng: -87.6297925,
    address: '11 E Walton St PH 5800, Chicago, IL 60611, USA'
  }
]
const homeData = [
  {
    locationId: 1,
    price: 50000000,
    imgUrl: 'https://photos.zillowstatic.com/p_f/ISi79n7e5lwahu0000000000.jpg'
  },
  {
    locationId: 2,
    price: 1500000,
    imgUrl: 'https://photos.zillowstatic.com/p_h/ISy3xrxnaoxhjb1000000000.jpg'
  },
  {
    locationId: 7,
    price: 11000000,
    imgUrl: 'https://photos.zillowstatic.com/p_h/ISug4vtydsivdw1000000000.jpg'
  },
  {
    locationId: 8,
    price: 10950000,
    imgUrl: 'https://photos.zillowstatic.com/p_h/ISp1e5rrucehcn1000000000.jpg'
  }
]
const placeData = [
  {
    name: 'Work',
    locationId: 3
  },
  {
    name: `Mom's House`,
    locationId: 5
  },
  {
    name: 'Work',
    locationId: 4
  },
  {
    name: 'OZ Animal Hospital',
    locationId: 6
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

const userHomeData = [
  {userId: 1, homeId: 1},
  {userId: 1, homeId: 2},
  // {userId: 1, homeId: 3},
  // {userId: 1, homeId: 4},
  {userId: 2, homeId: 3},
  {userId: 2, homeId: 4}
]

const homePlaceData = [
  {homeId: 1, placeId: 1},
  {homeId: 1, placeId: 2},
  {homeId: 2, placeId: 1},
  {homeId: 2, placeId: 2},
  {homeId: 3, placeId: 3},
  {homeId: 3, placeId: 4},
  {homeId: 4, placeId: 3},
  {homeId: 4, placeId: 4}
]

const prioritiesData = [
  {userId: 1, placeId: 1, priority: 1},
  {userId: 1, categoryId: 1, priority: 2},
  {userId: 1, placeId: 2, priority: 3},
  {userId: 1, categoryId: 2, priority: 4},
  {userId: 1, categoryId: 11, priority: 5},
  {userId: 2, placeId: 3, priority: 1},
  {userId: 2, categoryId: 1, priority: 2},
  {userId: 2, categoryId: 3, priority: 3},
  {userId: 2, placeId: 4, priority: 4},
  {userId: 2, categoryId: 5, priority: 5}
]

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
