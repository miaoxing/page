import PropTypes from 'prop-types';
import { Box } from '@mxjs/a-box';

const RichTextPreview = ({content}) => {
  return (
    <Box
      minH="22px" // .ant-form font-size: 14px * line-height: 1.5715
      sx={{
        '> p': {
          mb: 0,
        },
        img: {
          maxWidth: '100%',
        },
      }}
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
};

RichTextPreview.propTypes = {
  content: PropTypes.string,
};

export default RichTextPreview;
