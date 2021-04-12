import React from 'react';
import {Button, Card, Col, Row} from 'antd';
import PropTypes from 'prop-types';

const EditorComponentPanel = ({components, onAdd}) => {
  return (
    <Card title="组件">
      <Row gutter={[8, 8]}>
        {Object.values(components).map(component => {
          if (component.visible === false) {
            return;
          }

          return <Col key={component.type} span={8}>
            <Button
              block
              // 默认写死了高度导致不能换行
              style={{height: 'auto'}}
              onClick={() => onAdd(component.type)}
            >
              {component.icon}
              <br/>
              {component.name}
            </Button>
          </Col>;
        })}
      </Row>
    </Card>
  );
};

EditorComponentPanel.propTypes = {
  components: PropTypes.object,
  onAdd: PropTypes.func,
};

export default EditorComponentPanel;
