// NOTE: 动态表单各组件例子
export default [
  {
    type: 'alert',
    label: '提示消息',
    key: 'message',
    value: 'Hello BalmUI',
    required: false
  },
  {
    type: 'text',
    label: '网页链接',
    key: 'link',
    value: '',
    maxlength: 40,
    required: true
  },
  {
    type: 'textarea',
    label: '简介',
    key: 'intro',
    value: '',
    maxlength: 140,
    required: true
  },
  {
    type: 'number',
    label: '数字',
    key: 'count',
    value: 0,
    min: 10,
    required: true
  },
  {
    type: 'select',
    label: '选项',
    key: 'itemId',
    value: '',
    options: [
      {
        label: 'Item 1',
        value: 1
      },
      {
        label: 'Item 2',
        value: 2
      }
    ],
    required: true
  },
  {
    type: 'multi-select',
    label: '多级联动',
    provinceKey: 'itemId1', // 省份字段
    provinceValue: '',
    provinceOptions: [
      {
        label: 'Item 1',
        value: 1
      },
      {
        label: 'Item 2',
        value: 2
      }
    ],
    key: 'itemId2', // 媒体字段
    value: '',
    options: [
      {
        id: 1,
        list: [
          {
            label: 'Item 11',
            value: 11
          },
          {
            label: 'Item 12',
            value: 12
          }
        ]
      },
      {
        id: 2,
        list: [
          {
            label: 'Item 21',
            value: 21
          },
          {
            label: 'Item 22',
            value: 22
          }
        ]
      }
    ],
    required: true
  },
  {
    type: 'upload-image',
    label: '截图',
    key: 'image',
    value: [],
    maxFileCount: 3,
    required: true
  },
  {
    type: 'upload-file',
    label: '材料',
    key: 'file',
    value: [],
    maxFileCount: 3,
    required: true
  },
  {
    type: 'datepicker',
    label: '时间',
    key: 'time',
    value: '',
    required: true
  },
  {
    type: 'chips',
    label: '多选项',
    key: 'option',
    value: [],
    options: [
      {
        label: 'Item 1',
        value: 1
      },
      {
        label: 'Item 2',
        value: 2
      },
      {
        label: 'Item 3',
        value: 3
      }
    ],
    required: true
  },
  {
    type: 'radio',
    label: '单选项1',
    key: 'radio',
    value: 2,
    options: [
      {
        label: 'Item 1',
        value: 1
      },
      {
        label: 'Item 2',
        value: 2
      }
    ],
    required: true
  },
  {
    type: 'radio-with-switch',
    label: '单选项2',
    key: 'radio2',
    value: {
      checked: 2,
      toggle: true
    },
    options: [
      {
        label: 'Item 1',
        value: 1,
        description: ['aaa', 'bbb'],
        switch: true
      },
      {
        label: 'Item 2',
        value: 2,
        description: ['ccc', 'ddd'],
        switch: true
      }
    ],
    required: true
  },
  {
    type: 'switch',
    label: '开关',
    key: 'toggle',
    value: true,
    description: ['aaa', 'bbb'],
    options: [
      {
        label: '开',
        value: true
      },
      {
        label: '关',
        value: false
      }
    ],
    required: true
  }
];
