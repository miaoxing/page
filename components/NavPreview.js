import PropTypes from 'prop-types';
import {Box} from '@mxjs/box';
import {css} from '@chakra-ui/react';
import defaultImage from '../images/default-nav.svg';

const itemCss = css({
  textAlign: 'center',
  my: '10px',
});

const img = css({
  bg: 'gray.200',
  width: '48px',
  height: '48px',
});

const NavPreview = ({style = {}, rowNum = 4, items = []}) => {
  const width = (100 / rowNum) + '%';

  return (
    <Box flex flexWrap style={{
      ...style,
    }}>
      {items.map((item, i) => {
        return (
          <div key={i} css={[itemCss, {width}]}>
            <img css={img} src={item.image || defaultImage}/>
            <div>{item.title}</div>
          </div>
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

export {defaultImage};
