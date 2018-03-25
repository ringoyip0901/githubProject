export function fetchIssues(keyword, filterType) {
  return async (dispatch) => {
    function onSuccess(success, filteredSuccess) {
      dispatch(fetchPostsSuccess(success, filteredSuccess));
    }

    function onError(error) {
      dispatch(fetchPostsError(error));
    }

    try {
      dispatch(fetchPostsRequest());
      const success = await fetch('https://api.github.com/repos/facebook/react/issues').then(response => response.json());
      if (filterType === 'author') {
        const authorSuccess = success.filter((element, index) => element.user.login === keyword);
        return authorSuccess.length ? onSuccess(success, authorSuccess) : console.log('Error');
      } else if (filterType === 'label') {
        const labelSuccess = [];
        success.forEach((obj) => {
          obj.labels.forEach((eachLabel) => {
            if (eachLabel.name === keyword) {
              labelSuccess.push(obj);
            }
          });
        });
        return labelSuccess.length ? onSuccess(success, labelSuccess) : console.log('Error');
      } else if (filterType === 'sort') {
        let sortedSuccess = [];
        if (keyword === 'Newest') {
          sortedSuccess = success.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (keyword === 'Oldest') {
          sortedSuccess = success.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (keyword === 'Most commented') {
          sortedSuccess = success.sort((a, b) => b.comments - a.comments);
        } else if (keyword === 'Least commented') {
          sortedSuccess = success.sort((a, b) => a.comments - b.comments);
        }
        return sortedSuccess.length ? onSuccess(success, sortedSuccess) : console.log('Error');
      }

      const newSuccess = success.slice();
      return onSuccess(success, newSuccess);
    } catch (error) {
      return onError(error);
    }
  };
}

export const FETCH_REQUEST = 'FETCH_REQUEST';
export function fetchPostsRequest() {
  return {
    type: 'FETCH_REQUEST',
  };
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export function fetchPostsSuccess(success, filteredSuccess) {
  return {
    type: 'FETCH_SUCCESS',
    success,
    filteredSuccess,
  };
}

export const FETCH_ERROR = 'FETCH_ERROR';
export function fetchPostsError(error) {
  return {
    type: 'FETCH_ERROR',
    error,
  };
}

export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export function filterSuccess(keyword, filterType) {
  return {
    type: 'FILTER_SUCCESS',
    keyword,
    filterType,
  };
}

