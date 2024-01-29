import $ from 'miaoxing';
import { Box } from '@mxjs/a-box';
import { CloseCircleFilled, DownCircleFilled, UpCircleFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Toolbar = ({children}) => {
  return (
    <Box
      display="none" position="absolute" top={-4} right={-2} fontSize="xl"
    >
      {children}
    </Box>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
};

const Operation = ({children, ...rest}) => {
  return (
    <Box as="a" ml={1} color="gray.400" href="#" {...rest}>{children}</Box>
  );
};

Operation.propTypes = {
  children: PropTypes.node,
};

const ConfigItem = ({index, length, operation, children}) => {
  return (
    <Box
      position="relative" mb={4} p={6} border="1px" borderColor="gray.100"
      _hover={{
        '> :first-of-type': {
          display: 'block',
        },
      }}
    >
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
    </Box>
  );
};

ConfigItem.propTypes = {
  index: PropTypes.number,
  length: PropTypes.number,
  operation: PropTypes.object,
  children: PropTypes.node,
};

export default ConfigItem;
