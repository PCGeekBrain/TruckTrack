import API from '../api';

/** Action Creators */
const setTrucks = trucks => {
  return {
    type: "SET_NEW_TRUCKS",
    trucks
  }
}

export const showModal = (truck) => {
  return {
    type: "SHOW_TRUCK_MODAL",
    truck
  }
}

export const hideModal = () => {
  return {
    type: "CLEAR_TRUCK_MODAL",
  }
}

/** Async Creators */
export const loadTrucks = () => {
  return dispatch => {
    return API.get("/trucks")
      .then(trucks => dispatch(setTrucks(trucks)))
  }
}

export const submitTruck = (truck) => {
  return dispatch => {
    // set the defaults
    let url = "/trucks"
    let request = API.post
    // check if it is an update (we have an id)
    if (truck.id) {
      url += `/${truck.id}`;
      request = API.patch;
    }
    // Push it up to the server
    return request(url, truck)
      .then(result => dispatch(loadTrucks()))
  }
}

export const deleteTruck = (id) => {
  return dispatch => {
    API.delete(`/trucks/${id}`)
      .catch(() => dispatch(loadTrucks())) // no content throws error since json is invalid
  }
}