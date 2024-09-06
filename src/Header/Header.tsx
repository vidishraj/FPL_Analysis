import './Header.scss';
import { ReactComponent as Logo } from '../Icons/logo.svg';
import { ReactComponent as LogoWritten } from '../Icons/logoWritten.svg';
import { useFplContext } from '../Contexts/context';

export const Header = () => {
  const { dispatch } = useFplContext();

  return (
    <>
      <div
        style={{
          backgroundColor: '#37003c',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexBasis: '70%',
            height: '70px',
            // background: "pink",
          }}
        >
          <Logo
            style={{
              flexBasis: '20%',
              maxWidth: 'fit-content',
              borderRadius: '25px',
            }}
          ></Logo>
          <LogoWritten
            style={{ flexBasis: '80%', maxWidth: 'fit-content' }}
          ></LogoWritten>
        </div>
        <div
          className="headerButtons"
          style={{
            display: 'flex',
            flexBasis: '50%',
            flexWrap: 'nowrap',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}
        >
          <div
            style={{
              textWrap: 'nowrap',
            }}
          >
            <button
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_GLOBAL_PAGE' })}
            >
              All Players
            </button>
          </div>
          <div style={{ textWrap: 'nowrap' }}>
            <button
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_TEAMS_PAGE' })}
            >
              Connect FPL team
            </button>
          </div>
          <div style={{ textWrap: 'nowrap' }}>
            <button
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_LEAGUE_PAGE' })}
            >
              Connect FPL league
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
