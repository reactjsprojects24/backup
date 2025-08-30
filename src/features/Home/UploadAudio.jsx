// // import React, { useState, useRef, useEffect } from 'react';
// // import { Box, Grid2, Typography } from "@mui/material";
// import React ,{useState} from 'react';
// import AudioUpload from '../../components/uploadAudio/AudioUpload';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from 'react-redux';

// import { uploadAudioThunk } from '../../redux/thunks/audioThunks';

// const UploadAudio = () => {
//     const [audioFile, setAudioFile] = useState([]);
//     // const [error, setError] = useState(null);
//     const dispatch = useDispatch();

//     // const handleFilesUploaded = async(file) => {
//     //    console.log("fileeee",file);
//     //     await dispatch(uploadAudioThunk(file));
       
//     //   };

//       const handleFilesUploaded = async (file) => {
//         console.log(" audioFile before dispatch:", file);
//         dispatch(uploadAudioThunk(file)) // use speakerName
//           .then(() => {
//             // setEnrolling(false);
//             // setSpeakerName('');
//             setAudioFile([]);
//           })
//           .catch(error => {
//             console.error("Error enrolling speaker:", error);
//             // setEnrolling(false);
//           });
    
       
        
//       };
      
    
//     const handleUploadSuccess = (msg) => {
//         toast.success(msg, {
//             position: 'top-right',
//             autoClose: 3000,
//             theme: 'colored'
//         });
//     };

//     const handleUploadError = (msg) => {
//         toast.error(msg, {
//             position: 'top-right',
//             autoClose: 3000,
//             theme: 'colored'
//         });
//     };

//     return (
//         <>
//             <ToastContainer />
//             {/* <AudioUpload
//                 singleFileMode={true}
//                 showMetadata={true}
//                 showTabs={true}
//                 onError={handleUploadError}
//                 onSuccess={handleUploadSuccess}
//             /> */}
//             <AudioUpload onFilesUploaded={handleFilesUploaded} />
    
//         </>
//     );
// };

// export default UploadAudio;


// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Grid2, Typography } from "@mui/material";
import React,{useState} from 'react';
import AudioUpload from '../../components/uploadAudio/AudioUpload';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import { uploadAudioThunk } from '../../redux/thunks/audioThunks';

const UploadAudio = () => {

    const [audioFile, setAudioFile] = useState([]);
    const dispatch = useDispatch();

    const handleFilesUploaded = async (files) => {
        console.log("################## audioFile before dispatch:", files);
        try {
          const responses = await Promise.all(
            files.map(file => dispatch(uploadAudioThunk([file])))
          );
        } catch (err) {
        }
      };

    const handleUploadSuccess = (msg) => {
        toast.success(msg, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored'
        });
    };

    const handleUploadError = (msg) => {
        toast.error(msg, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored'
        });
    };

    return (
        <>
            <ToastContainer />
            <AudioUpload singleFileMode={true}  onFilesUploaded={handleFilesUploaded} showMetadata={true} showTabs={true} />

        </>
    );
};

export default UploadAudio;



