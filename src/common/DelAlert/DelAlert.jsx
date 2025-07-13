import * as React from 'react';
import { useNavigate } from 'react-router-dom';

///// components
import MainCard from 'ui-component/cards/MainCard';
import TitlesModal from 'common/TitlesModal/TitlesModal';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';

///// helpers

///// style
import './style.scss';

////// fns

const DelAlert = (props) => {
  const { title, text, click, yesText, noText } = props;
  const navigate = useNavigate();

  return (
    <div className="delAlert">
      <MainCard title={<TitlesModal title={title} />}>
        <div className="applicationForAdminPage__inner">
          <p className="moreText">{text}</p>
          <div className="actionBtn">
            <BtnCancel click={() => navigate(-1)} text={noText} />
            <BtnSave click={click} text={yesText} />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default DelAlert;
