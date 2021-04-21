import React from 'react';
import PropTypes from 'prop-types';
import {css} from '@chakra-ui/react';
import {Carousel} from 'antd';
import $ from 'miaoxing';

const carousel = css({
  '.slick-dots.slick-dots li': {
    width: '8px',
    height: '8px',
    button: {
      height: '100%',
      borderRadius: '50%',
      background: 'rgba(0, 0, 0, 0.3)',
      marginLeft: 0,
      marginRight: '8px',
    },
    '&.slick-active': {
      width: '8px',
      button: {
        background: '#000',
      },
    },
  },
  '.slick-dots-bottom.slick-dots-bottom': {
    bottom: 0,
    marginBottom: '10px',
  },
});

const img = css({
  maxWidth: '100%',
});

const defaultImage = window.location.origin + $.url('plugins/page/images/default-swiper.svg');

const SwiperPreview = ({duration, items = []}) => {
  return (
    <Carousel
      css={carousel}
      autoplay
      autoplaySpeed={parseInt(duration, 10) || undefined}
      draggable={false}
    >
      {items.map((item, i) => {
        return (
          <div key={i}>
            <img css={img} src={item.image || defaultImage}/>
          </div>
        );
      })}
    </Carousel>
  );
};

SwiperPreview.propTypes = {
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array,
};

export default SwiperPreview;

export {defaultImage};
