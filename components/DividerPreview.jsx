import PropTypes from 'prop-types';

const DividerPreview = ({style = {}}) => {
  let {mx = 0, my = 10, ...restStyle} = style;
  mx = parseInt(mx, 10);
  my = parseInt(my, 10);

  return (
    <div style={{overflow: 'hidden'}}>
      <div style={{
        ...restStyle,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        borderWidth: 1,
        marginTop: my,
        marginBottom: my,
        marginLeft: mx,
        marginRight: mx,
      }}/>
    </div>
  );
};

DividerPreview.propTypes = {
  style: PropTypes.object,
};

export default DividerPreview;
