import PropTypes from 'prop-types';

const RichTextPreview = ({content}) => {
  return (
    <div
      className="min-h-[22px] [&>p]:mb-0 [&_img]:max-w-full"
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
};

RichTextPreview.propTypes = {
  content: PropTypes.string,
};

export default RichTextPreview;
