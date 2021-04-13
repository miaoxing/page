import React from 'react';
import {PicLeftOutlined} from '@ant-design/icons';
import PagePreview from '../../components/PagePreview';
import PageConfig from '../../components/PageConfig';
import RichTextPreview from '../../components/RichTextPreview';
import RichTextConfig from '../../components/RichTextConfig';

export default [
  {
    type: 'page',
    name: '页面',
    icon: null,
    preview: PagePreview,
    config: PageConfig,
    visible: false,
    deletable: false,
    draggable: false,
    previewStyle: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    default: {
      name: '未命名页面',
      navStyle: {
        color: 'black',
        backgroundColor: '#ffffff',
      },
    },
  },
  {
    type: 'richText',
    name: '富文本',
    sort: 100,
    icon: <PicLeftOutlined/>,
    preview: RichTextPreview,
    config: RichTextConfig,
    default: {
      content: `<p>
    这是一段文字😄，您可以设置<strong>加粗</strong>，<span style="color: #1890ff;">颜色</span>，<span style="background-color: #fa8c16;">背景色</span>，等等。
</p>`,
    },
  },
];
