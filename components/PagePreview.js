import StatusBar from './StatusBar';
import PropTypes from 'prop-types';

const PagePreview = ({navStyle = {}, title}) => {
  return (
    <div style={{
      color: 'black',
      backgroundColor: 'white',
      height: 64,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 16,
      padding: 8,
      ...navStyle,
    }}>
      <StatusBar fill={navStyle.color}/>
      {title || '页面标题'}
    </div>
  );
};

PagePreview.propTypes = {
  navStyle: PropTypes.object,
  title: PropTypes.string,
};

export default PagePreview;
