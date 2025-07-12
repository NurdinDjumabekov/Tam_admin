import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

///// components
import MainCard from 'ui-component/cards/MainCard';
import TitlesModal from 'common/TitlesModal/TitlesModal';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';

///// helpers
import { myAlert } from 'helpers/myAlert';

///// style
import './style.scss';

////// fns

const DelAlert = (props) => {
  const { title, text, click, yesText, noText } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="delAlert">
      <div className="delAlert__inner">
        <MainCard
          title={<TitlesModal title={title} />}
          sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
          contentSX={{ padding: 0 }}
        >
          <div className="applicationForAdminPage__inner">
            <div className="textCommentAdmin">
              <p className="moreText">{text}</p>
              <div className="actionBtn">
                <BtnCancel click={() => navigate(-1)} text={noText} />
                <BtnSave click={click} text={yesText} />
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  );
};

export default DelAlert;
