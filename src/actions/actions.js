export function fetchIssues(keyword, filterType) {
  return async dispatch => {
    function onSuccess(success, filteredSuccess) {
      dispatch(fetchPostsSuccess(success, filteredSuccess));
      return;
    }

    function onError(error) {
      dispatch(fetchPostsError(error));
      return;
    }
    
    try {
      dispatch(fetchPostsRequest())
      const success = await fetch('https://api.github.com/repos/facebook/hhvm/issues').then(
        response => response.json()
      )
      if (filterType === 'author') {
        let authorSuccess = success.filter((element, index) => {
          return element.user.login === keyword;
        });
        return authorSuccess.length ? onSuccess(success, authorSuccess) : console.log("Error");
      }
      else if (filterType === 'label') {
        const labelSuccess = [];
        success.forEach((obj) => {
          obj.labels.forEach((eachLabel) => {
            if (eachLabel.name === keyword) {
              labelSuccess.push(obj);
            }
          })
        })
        return labelSuccess.length ? onSuccess(success, labelSuccess) : console.log("Error");
      }
      else if (filterType === 'date') {
        if (keyword === 'Newest') {
          const sortedDates = [1,2,3];
          console.log('sorted issues', sortedDates)
          return;
        }
      }
      else {
        const newSuccess = success.slice();
        return onSuccess(success, newSuccess)
      }
    } catch (error) {
      return onError(error);
    }
  };
}

export const FETCH_REQUEST = "FETCH_REQUEST";
export function fetchPostsRequest(){
  return {
    type: "FETCH_REQUEST"
  };
}

export const FETCH_SUCCESS = "FETCH_SUCCESS";
export function fetchPostsSuccess(success, filteredSuccess) {
  return {
    type: "FETCH_SUCCESS",
    success, 
    filteredSuccess
  };
}

export const FETCH_ERROR = "FETCH_ERROR";
export function fetchPostsError(error) {
  return {
    type: "FETCH_ERROR",
    error
  };
}

export const FILTER_SUCCESS = "FILTER_SUCCESS";
export function filterSuccess(keyword, filterType) {
  return {
    type: "FILTER_SUCCESS", 
    keyword,
    filterType
  };
}

// export const SORT_DATES = "SORT_DATES";
// export function filterDates(issues) {
//   console.log('filtering dates: ', issues)
//   const sortedIssues = [1,2,3];
//   return {
//     type: "FILTER_DATES",
//     sortedIssues
//   }
// }
