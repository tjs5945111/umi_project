import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import { getXtlb, getXtpz, getXtxg } from '@/services/ant-design-pro/api';
import ProCard from '@ant-design/pro-card';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  useEffect(() => {
    getList()
  }, []);

  const getList = async () => {
    const res = await getXtlb(2);
    const tempDate = []
    res.records?.map(item => {
      tempDate.push({id:item.id,...JSON.parse(item.configValue || '{}')})
    })
    setDataSource(tempDate)
  }

  const columns: ProColumns<DataSourceType>[] = [
    // {
    //   title: '收费项',
    //   dataIndex: 'title',
    //   formItemProps: (form, { rowIndex }) => {
    //     return {
    //       rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
    //     };
    //   },
    //   // 第一行不允许编辑
    //   editable: (text, record, index) => {
    //     return index !== 0;
    //   },
    //   width: '30%',
    // },
    {
      title: '收费项',
      //   key: 'state',
      dataIndex: 'subject',
      //   valueType: 'select',
      //   valueEnum: {
      //     all: { text: '全部', status: 'Default' },
      //     open: {
      //       text: '未解决',
      //       status: 'Error',
      //     },
      //     closed: {
      //       text: '已解决',
      //       status: 'Success',
      //     },
      //   },
    },

    {
      title: '金额设置',
      dataIndex: 'value',
      //   valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          修改
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="金额明细"
        maxLength={5}
        recordCreatorProps={
          position !== 'hidden'
            ? {
              position: position as 'top',
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) + 'add' }),
            }
            : false
        }
        // toolBarRender={() => [
        //   <ProFormRadio.Group
        //     key="render"
        //     fieldProps={{
        //       value: position,
        //       onChange: (e) => setPosition(e.target.value),
        //     }}
        //     options={[
        //       {
        //         label: '添加到顶部',
        //         value: 'top',
        //       },
        //       {
        //         label: '添加到底部',
        //         value: 'bottom',
        //       },
        //       {
        //         label: '隐藏',
        //         value: 'hidden',
        //       },
        //     ]}
        //   />,
        // ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            const params = {
              configValue: {
                subject: data.subject,
                value: `${data.value}`,
              },
              configType: 2,
            }
            let res = [];
            if (typeof (row.id) === 'number') {
              params.id = row.id
              res = await getXtxg(params)
            } else {
              res = await getXtpz(params);
            }
            console.log(res)
          },
          onChange: setEditableRowKeys,
        }}
      />
      {/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard> */}
    </>
  );
};