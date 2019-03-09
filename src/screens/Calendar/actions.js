
var myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');

var myInit = {
  method: 'GET',
  headers: myHeaders,
};

export function itemsFetchCalendarDataSuccess(items: Object) {
  return {
    type: "ITEMS_FETCH_CALENDER_DATA_SUCCESS",
    items
  };
}
export function itemsFetchCalendarData(url: any) {
  return dispatch => {
    console.log('fetch calendar data')
    fetch('https://s3.ca-central-1.amazonaws.com/colectme/data/data.calendar.json', myInit).then(res => {
      res.json().then(json => {
        dispatch(itemsFetchCalendarDataSuccess(json));
      })
    }).catch(error => {
      console.log('Error: ' + error)
    });
  };
}