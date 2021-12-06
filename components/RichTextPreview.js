import PropTypes from 'prop-types';
import {css} from '@mxjs/css';

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
    <div className={contentCss} dangerouslySetInnerHTML={{__html: content}}/>
  );
};

RichTextPreview.propTypes = {
  content: PropTypes.string,
};

export default RichTextPreview;
