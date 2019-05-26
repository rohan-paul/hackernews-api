import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

/* In order to extract a custom hook for data fetching, move everything that belongs to the data fetching, except for the query state that belongs to the input field, but including the loading indicator and error handling, to its own function. Also make sure you return all the necessary variables from the function that are used in the App component. */
const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      // Once the effect is called for data fetching, which happens when the component mounts or the URL state changes, the loading state is set to true. Once the request resolves, the loading state is set to false again.
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    // Now, make sure, if the URL state changes, the effect runs again to fetch stories from the API.
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;
