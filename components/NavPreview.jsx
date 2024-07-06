import PropTypes from 'prop-types';
import defaultImage from '../images/default-nav.svg';

const NavPreview = ({ style = {}, rowNum = 4, items = [] }) => {
  const width = (100 / rowNum) + '%';

  return (
    <div className="flex flex-wrap" style={style}>
      {items.map((item, i) => {
        return (
          <div key={i} className="text-center my-[10px]" style={{ width }}>
            <img className="bg-gray-200 w-12 h-12" src={item.image || defaultImage} alt={item.title}/>
            <div>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

NavPreview.propTypes = {
  style: PropTypes.object,
  rowNum: PropTypes.number,
  items: PropTypes.array,
};

export default NavPreview;

export { defaultImage };
