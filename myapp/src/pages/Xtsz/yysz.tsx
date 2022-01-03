import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import { getXtlb, getXtpz, getXtxg, yysxsc } from '@/services/ant-design-pro/api';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  subject?: string;
};

const defaultData: DataSourceType[] = [
  // {
  //   id: 624748504,
  //   subject: '2020-05-26T09:42:56Z',
  // },
  // {
  //   id: 624691229,
  //   subject: '',
  // },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  useEffect(() => {
    getList()
  }, []);

  const getList = async () => {
    const res = await getXtlb(1);
    const tempDate = []
    res.records?.map(item => {
      tempDate.push({ id: item.id, ...JSON.parse(item.configValue || '{}') })
    })
    setDataSource(tempDate)
  }
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '预约事项',
      dataIndex: 'subject',
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
          onClick={async () => {
            const res = await yysxsc(record.id);
            if (res) {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            } else {
              message.error('删除失败请稍后重试')
            }

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
        headerTitle="预约事件列表"
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
              configType: 1,
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