import React from 'react';
import {PicLeftOutlined, ExpandOutlined, LineOutlined} from '@ant-design/icons';
import PagePreview from '../../components/PagePreview';
import PageConfig from '../../components/PageConfig';
import RichTextPreview from '../../components/RichTextPreview';
import RichTextConfig from '../../components/RichTextConfig';
import SpacePreview from '../../components/SpacePreview';
import SpaceConfig from '../../components/SpaceConfig';
import DividerPreview from '../../components/DividerPreview';
import DividerConfig from '../../components/DividerConfig';

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
  {
    type: 'space',
    name: '空白间距',
    sort: 90,
    icon: <ExpandOutlined/>,
    preview: SpacePreview,
    config: SpaceConfig,
    default: {
      style: {
        height: 20,
      },
    },
  },
  {
    type: 'divider',
    name: '分割线',
    sort: 80,
    icon: <LineOutlined/>,
    preview: DividerPreview,
    config: DividerConfig,
    default: {
      style: {
        my: 10,
        mx: 0,
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
      },
    },
  },
];
