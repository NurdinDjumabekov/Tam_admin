import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

////// style
import './style.scss';

///// compnents
import MainCard from 'ui-component/cards/MainCard';
import TitlesModal from 'common/TitlesModal/TitlesModal';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';

const ConfirmModal = ({ state, yesFN, noFN, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className="confirmModal">
      <Dialog fullScreen={fullScreen} open={state} onClose={noFN} aria-labelledby="responsive-dialog-title" disableEscapeKeyDown={false}>
        <div className="confirmModal__inner">
          <div className="delAlert">
            <div className="delAlert__inner">
              <MainCard
                title={<TitlesModal title={title} />}
                sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
                contentSX={{ padding: 0 }}
              >
                <div className="applicationForAdminPage__inner">
                  <div className="textCommentAdmin">
                    <p className="moreText">{'Вы действительно хотите это сделать ? Этот процесс не обратим и одноразовый !'}</p>
                    <div className="actionBtn">
                      <BtnCancel click={noFN} text={'Нет'} />
                      <BtnSave click={yesFN} text={'Да'} />
                    </div>
                  </div>
                </div>
              </MainCard>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
