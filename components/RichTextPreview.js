import React from 'react';
import {css} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const contentCss = css({
  minH: '22px', // .ant-form font-size: 14px * line-height: 1.5715
  '> p': {
    marginBottom: 0,
  },
  'img': {
    maxWidth: '100%',
  },
});

const RichTextPreview = ({content}) => {
  return (
    <div css={contentCss} dangerouslySetInnerHTML={{__html: content}}/>
  );
};

RichTextPreview.propTypes = {
  content: PropTypes.string,
};

export default RichTextPreview;
