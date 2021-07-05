import {useForm} from '@mxjs/a-form';

const EditorConfigPanel = ({fields, components, selectedIndex}) => {
  const form = useForm();
  const pageComponents = form.getFieldValue('components') || [];

  return fields.map(({key, name}, index) => {
    const component = pageComponents[name];

    // 组件还未加载或不存在
    if (!components[component.type]) {
      return;
    }

    const Config = components[component.type].config;

    const propName = (subName) => {
      if (Array.isArray(subName)) {
        return [name, 'props'].concat(subName);
      } else {
        return [name, 'props', subName];
      }
    };

    return <div key={key} hidden={index !== selectedIndex} data-testid={'config-' + component.type}>
      <Config propName={propName}/>
    </div>;
  });
};

export default EditorConfigPanel;
