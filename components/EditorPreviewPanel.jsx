import { Fragment, useEffect, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from '@mxjs/a-form';
import PropTypes from 'prop-types';
import { Box } from '@mxjs/a-box';

const Toolbar = ({selected, children, ...rest}) => {
  return (
    <Box
      position="absolute" right={0} top={0} zIndex={2}
      px={1} bg="blackAlpha.700" fontSize="xs"
      display={selected ? 'block' : 'none'}
      {...rest}
    >
      {children}
    </Box>
  );
};

Toolbar.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
};

const PreviewItem = ({selected = false, deletable = true, isNew = false, onDelete, children, ...props}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isNew) {
      ref.current.scrollIntoView({behavior: 'smooth'});
    }
  }, []);

  return (
    <Box
      ref={ref}
      position="relative" userSelect="none" cursor="pointer"
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // 如果内容有图片，显示在图片上面
        zIndex: 1,
        border: '2px dashed',
        borderColor: selected ? 'primary' : 'transparent',
      }}
      _hover={{
        // 使用 ::before 的边框模拟 outline，因为 outline 会被子元素挡住
        _before: {
          border: '2px dashed',
          borderColor: 'primary',
        },
        // toolbar
        '> div': {
          display: 'block',
        },
      }}
      {...props}
    >
      <div>
        {children}
      </div>
      {deletable && <Toolbar selected={selected}>
        <Box as="a" color="white" _hover={{color: 'white'}} href="#" onClick={onDelete}>删除</Box>
      </Toolbar>}
    </Box>
  );
};

PreviewItem.propTypes = {
  selected: PropTypes.bool,
  deletable: PropTypes.bool,
  isNew: PropTypes.bool,
  onDelete: PropTypes.func,
  children: PropTypes.node,
};

const EditorPreviewDragContainer = ({onDragEnd, children}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

EditorPreviewDragContainer.propTypes = {
  onDragEnd: PropTypes.func,
  children: PropTypes.node,
};

const EditorPreviewDraggable = ({draggableId, index, children}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

EditorPreviewDraggable.propTypes = {
  draggableId: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node,
};

const EditorPreviewPanel = (
  {
    fields,
    components,
    isNew,
    selectedIndex,
    onSelect,
    onDelete,
    onMove,
  },
) => {
  const form = useForm();
  const pageComponents = form.getFieldValue('components') || [];

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    onMove(result.source.index, result.destination.index);
  };

  return (
    <Box w={375} h={600} overflowY="auto" border="1px solid" borderColor="gray.100" boxShadow="sm">
      <EditorPreviewDragContainer onDragEnd={onDragEnd}>
        {fields.map(({key, name}, index) => {
          // 删除时，pageComponents 还未更新，忽略不存在的值
          const pageComponent = pageComponents[name];
          if (!pageComponent) {
            return;
          }

          // 组件还未加载或不存在
          const component = components[pageComponent.type];
          if (!component) {
            return;
          }

          let Wrapper;
          let wrapperProps = {};
          if (component.draggable === false) {
            Wrapper = Fragment;
          } else {
            Wrapper = EditorPreviewDraggable;
            wrapperProps = {index, draggableId: key.toString()};
          }

          return (
            <Wrapper key={key} {...wrapperProps}>
              <PreviewItem
                style={component.previewStyle}
                selected={selectedIndex === index}
                onClick={() => onSelect(index)}
                deletable={component.deletable}
                onDelete={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(index);
                }}
                isNew={isNew}
              >
                <component.preview {...pageComponent.props}/>
              </PreviewItem>
            </Wrapper>
          );
        })}
      </EditorPreviewDragContainer>
    </Box>
  );
};

EditorPreviewPanel.propTypes = {
  fields: PropTypes.array,
  components: PropTypes.object,
  isNew: PropTypes.bool,
  selectedIndex: PropTypes.number,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};

export default EditorPreviewPanel;

