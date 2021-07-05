import PropTypes from 'prop-types';

const SpacePreview = ({style = {}}) => {
  return (
    <div style={{
      ...style,
      height: parseInt(style.height, 10),
    }}/>
  );
};

SpacePreview.propTypes = {
  style: PropTypes.object,
};

export default SpacePreview;
