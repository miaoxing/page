## 页面管理

### 添加页面

管理员可以添加页面

1. 进入添加页面后，页面中间从左到右包括三个部分，分别是组件栏，预览栏和配置栏
2. 页面右上角为为操作区域

#### 组件栏

1. 以按钮的形式，逐个显示可添加的组件，按钮包含图标和名称，名称例如 "富文本"、"图片轮播"
2. 用户点击组件按钮后，系统添加组件到预览栏

#### 预览栏

1. 预览栏显示为一个手机屏幕，宽为 375px，高为 600px，包含头部和内容区域
2. 头部区域为 "页面" 组件，显示为状态栏和标题栏
3. 内容区域为用户添加的组件，每个组件铺满一行，以列表的形式从上到下展示
4. 当内容超过预览栏高度时，头部区域固定，内容区域可滚动
4. 用户添加组件后，将选中该组件，同时内容区域滚动到最底部，以便组件在窗口中可见
5. 用户点击可以选中任意组件，配置栏显示选中组件的配置表单
6. 选中组件，或鼠标停留在组件上方时，如果组件可以删除，则在右上角显示 "删除" 按钮，点击确认后可删除相应的组件
7. 除了固定的组件（例如头部的 "页面" 组件）外，用户可以拖动重新排序，拖动后，仍然选中该组件

#### 配置栏

1. 用户选中组件后，配置栏显示选中组件的配置表单
2. 用户更改配置表单的内容，实时刷新预览栏的内容，例如更改了标题的颜色值，预览栏实时更新标题的颜色

#### 操作区域

1. 操作区域显示 "保存" 按钮和下拉菜单图标
2. 点击 "保存" 按钮，系统将页面数据提交给后台，页面保持不变
3. 鼠标移到下拉菜单，显示 "保存并返回" 按钮，点击将保存数据，并跳转到页面列表

#### 组件

##### 页面

配置内容包括页面名称，分享标题，分享图片，页面标题，标题颜色（黑色和白色）和背景颜色

##### 轮播图

配置内容包括切换时间，多个图片项目，每个项目包含图片和链接

##### 导航

配置内容包括文字颜色，背景颜色，每行数量和多个导航项目，每个项目包含图片，文字和链接

##### 富文本

配置内容为所见所得的富文本编辑器，可以设置文字颜色，背景色，上传图片等等

##### 空白间距

配置内容包括背景颜色和高度

##### 分割线

配置内容包括线条样式，颜色，上下边距，左右边距

### 编辑页面

管理员可以编辑页面，编辑内容和添加相同。

### 查看页面列表

管理员可以查看地址列表，包括名称，类型（独立页面，首页），创建时间，最后更改时间，操作（设为首页，编辑，删除）。

列表按创建时间从大到小排列。

### 设为首页

管理员在列表页面，可以点击任意独立页面的 "设为首页" 链接，将其改为 "首页"，原来的 "首页" 会变成 "独立页面"。

### 删除页面

管理员可以点击列表中的删除按钮删除页面，删除后页面将不在后台展示，不能在前台查看。

## 链接选择器

### 选择首页

管理员点击链接选择器，选择 "页面" - "首页"，系统将链接和名称更新到链接选择器的输入框中

### 选择独立页面

管理员点击链接选择器，选择 "页面" - "独立页面"，系统弹出 "选择页面" 的对话框

对话框从上到下为工具栏，搜索栏，页面表格和操作栏

- 工具栏包括 "添加" 和 "刷新" 按钮
  - 点击添加按钮，打开新窗口，进入添加页面
  - 点击刷新按钮，刷新下方表格。用于将新添加的页面展示出来


- 搜索栏包括名称搜索框
  - 输入名称时实时刷新表格内容


- 图文表格包括单选框，名称，创建时间和最后更改时间
  - 点击单选框可以选中一行


- 操作栏包括取消和确定按钮
  - 点击取消，关闭对话框
  - 点击确定，关闭对话框，如果选择了图文，则将页面名称更新到链接选择器的输入框中
