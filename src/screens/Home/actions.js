
var myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');

var myInit = {
  method: 'GET',
  headers: myHeaders,
};

export function itemsHasErrored(bool: boolean) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items: Object) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}
export function itemsFetchData(url: any) {
  return dispatch => {
    console.log('fetch data')
    fetch('https://s3.ca-central-1.amazonaws.com/colectme/data/data.json', myInit).then(res => {
      res.json().then(json => {
        dispatch(itemsFetchDataSuccess(json));
        dispatch(itemsIsLoading(false));
      })
    }).catch(error => {
      console.log('Error: ' + error)
    });
  };
}
export function itemsHeaderFetchDataSuccess(itemsHeader: Object) {
  return {
    type: "ITEMS_HEADER_FETCH_DATA_SUCCESS",
    itemsHeader
  };
}
export function itemsHeaderFetchData(url: any) {
  return dispatch => {
    console.log('fetch data header')
    fetch('https://s3.ca-central-1.amazonaws.com/colectme/data/data.header.json', myInit).then(res => {
      res.json().then(json => {
        dispatch(itemsHeaderFetchDataSuccess(json));
        dispatch(itemsIsLoading(false));
      })
    }).catch(error => {
      console.log('Error: ' + error)
    });
  };
}