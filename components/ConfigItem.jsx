import $ from 'miaoxing';
import { CloseCircleFilled, DownCircleFilled, UpCircleFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Toolbar = ({children}) => {
  return (
    <div className="hidden group-hover:block absolute -top-4 -right-2 text-xl">
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
};

const Operation = ({children, ...rest}) => {
  return (
    <a className="ml-1 text-gray-400" href="#" {...rest}>{children}</a>
  );
};

Operation.propTypes = {
  children: PropTypes.node,
};

const ConfigItem = ({index, length, operation, children}) => {
  return (
    <div className="group relative mb-4 p-6 border border-gray-100">
      <Toolbar>
        {index !== 0 && <Operation onClick={(e) => {
          e.preventDefault();
          operation.move(index, index - 1);
        }}>
          <UpCircleFilled/>
        </Operation>}
        {index !== length - 1 && <Operation onClick={(e) => {
          e.preventDefault();
          operation.move(index, index + 1);
        }}>
          <DownCircleFilled/>
        </Operation>}
        <Operation onClick={(e) => {
          e.preventDefault();
          $.confirm('删除后不能还原，确认删除？', result => {
            if (result) {
              operation.remove(index);
            }
          });
        }}>
          <CloseCircleFilled/>
        </Operation>
      </Toolbar>
      {children}
    </div>
  );
};

ConfigItem.propTypes = {
  index: PropTypes.number,
  length: PropTypes.number,
  operation: PropTypes.object,
  children: PropTypes.node,
};

export default ConfigItem;
