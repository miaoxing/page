import PropTypes from 'prop-types';
import { Box, Image } from '@mxjs/a-box';
import defaultImage from '../images/default-nav.svg';

const NavPreview = ({style = {}, rowNum = 4, items = []}) => {
  const width = (100 / rowNum) + '%';

  return (
    <Box display="flex" flexWrap="wrap" style={{
      ...style,
    }}>
      {items.map((item, i) => {
        return (
          <Box key={i} textAlign="center" my="10px" w={width}>
            <Image bg="gray.200" width="48px" height="48px" src={item.image || defaultImage}/>
            <div>{item.title}</div>
          </Box>
        );
      })}
    </Box>
  );
};

NavPreview.propTypes = {
  style: PropTypes.object,
  rowNum: PropTypes.number,
  items: PropTypes.array,
};

export default NavPreview;

export { defaultImage };
