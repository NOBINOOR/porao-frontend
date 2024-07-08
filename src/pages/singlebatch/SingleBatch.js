import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleBatch } from '../../redux/reducers/batch/singleBatchSlice';


const SingleBatch = () => {
  const { batchId } = useParams();
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSingleBatch(batchId));
    }, [dispatch,batchId]);
    // const { singleBatch, isLoading, isError } = useSelector((state) => state.posts);

//   useEffect(() => {
//     // Fetch the data from your API
//     fetch(`/api/batches/${batchId}`)
//       .then(response => response.json())
//       .then(data => {
//         setBatch(data);
//         setIsLoading(false);
//       })
//       .catch(() => {
//         setIsError(true);
//         setIsLoading(false);
//       });
//   }, [batchId]);

  

  return (
    <div className='mt-40 '>
      {/* <h2>{batch.subject}</h2>
      <p>Teacher: {batch.teacherInfo.name}</p>
      <p>Days: {batch.days.join(', ')}</p>
      <ul>
        {batch.days.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul> */}
      <h2>hello</h2>
    </div>
  );
};

export default SingleBatch;
