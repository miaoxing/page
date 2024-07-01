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
              style={{
                // 默认写死了高度导致不能换行
                height: 'auto',
                // 组件名称包含 4 个字符时能正常显示
                paddingLeft: 0,
                paddingRight: 0,
              }}
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
