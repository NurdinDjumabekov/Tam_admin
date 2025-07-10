//////// hooks
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// components
import Modal from '@mui/material/Modal';

////// icons
import CloseIcon from '@mui/icons-material/Close';

/////// fns
import { getVideoApartmentReq, loadVideoApartmentReq } from 'store/reducers/otherActionApartmentSlice';

/////// styles
import './style.scss';

const ViewEveryVideoApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => navigate(-1);

  console.log(location?.state?.video, 'location?.state?.video');

  return (
    <Modal open={true} onClose={handleCloseModal}>
      <div className="video-modal">
        <video src={location?.state?.video} controls className="video-player" />
        <button className="closeModalVideo" onClick={handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};

export default ViewEveryVideoApartmentPage;
