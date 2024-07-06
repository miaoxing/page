import { Fragment, useEffect, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from '@mxjs/a-form';
import PropTypes from 'prop-types';

const Toolbar = ({ selected, children, ...rest }) => {
  return (
    <div hidden={!selected} className="absolute right-0 top-0 z-10 px-1 bg-black/50 text-xs"  {...rest}>
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
};

const PreviewItem = ({ selected = false, deletable = true, isNew = false, onDelete, children, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isNew) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "relative select-none cursor-pointer",
        "before:content-[''] before:absolute before:inset-0 before:border-2 before:border-dashed",
        // 如果内容有图片，显示在图片上面
        "before:z-10",
        // 使用 ::before 的边框模拟 outline，因为 outline 会被子元素挡住
        "hover:before:border-2 hover:before:border-dashed hover:before:border-primary",
        // 选中时显示边框
        selected ? 'before:border-primary' : 'before:border-transparent',
        // hover 显示工具栏
        "[&>div]:hover:!block",
      ].join(' ')}
      {...props}
    >
      <div>
        {children}
      </div>
      {deletable && <Toolbar selected={selected}>
        <a className="text-white hover:text-white" href="#" onClick={onDelete}>删除</a>
      </Toolbar>}
    </div>
  );
};

PreviewItem.propTypes = {
  selected: PropTypes.bool,
  deletable: PropTypes.bool,
  isNew: PropTypes.bool,
  onDelete: PropTypes.func,
  children: PropTypes.node,
};

const EditorPreviewDragContainer = ({ onDragEnd, children }) => {
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

const EditorPreviewDraggable = ({ draggableId, index, children }) => {
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
    <div className="w-[375px] h-[600px] overflow-y-auto border border-gray-100 shadow-sm">
      <EditorPreviewDragContainer onDragEnd={onDragEnd}>
        {fields.map(({ key, name }, index) => {
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
            wrapperProps = { index, draggableId: key.toString() };
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
    </div>
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

