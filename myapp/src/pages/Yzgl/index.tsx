// 印章管理
import React, { useState, useEffect,useRef } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio, Button, Table,Drawer,Space,Form,Input,Select } from 'antd';
import { yzList, rysc } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select;

export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState({});
    const [typeList, setTypeList] = useState([]);
    const [baseStatues, setBaseStatues] = useState({});
    const [visible, setVisible] = useState(false);
    const qyEl = useRef(null);

    const columns = [
        {
            title: '用户名称',
            dataIndex: 'name',
        },
        {
            title: '用户电话',
            dataIndex: 'mobile',
        },

        {
            title: '用户身份证号',
            dataIndex: 'idNumber',
        },
        {
            title: '创建时间',
            dataIndex: 'gmtCreate',
        },
        {
            title: '操作',
            key: 'actionList',
            // fixed: 'right',
            // width: 230,
            render: (data) => (
                <div
                    style={{
                        display: 'flex',
                        minWidth: '150px',
                        // justifyContent: "space-between",
                        alignItems: 'center',
                        lineHeight: '0px',
                    }}
                >
                    <a
                        style={{ marginRight: 30 }}
                        onClick={() => {
                            window.open(`/yzgl/detail?id=${data.id}`);
                        }}
                    >
                        查看详情
                    </a>
                    <a
                        style={{ marginRight: 30 }}
                        onClick={()=>setVisible(true)}
                    >
                        添加印章
                    </a>
                    {/* <Divider /> */}
                    {/* <a onClick={() => confirm(data.id)}>删除</a> */}
                    {/* <Popconfirm
                        title="你确定要删除该人员吗?"
                        onConfirm={confirm}
                        onCancel={e=>cancel(e,id)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm> */}
                </div>
            ),
        },
    ];
    const confirm = async (id) => {
        const res = await rysc(id);
        if (res === 1) {
            getList();
        }
    };
    useEffect(() => {
        getList();
    }, []);

    const getList = async (
        pageNum = 1,
        param = {},
        pageSize = 10,
    ) => {
        const params = {
            pageSize: pageSize,
            pageNumber: pageNum,
            ...baseStatues,
            ...param,
        }
        const res = await yzList(params)
        const { data = [], total, size } = res.data || {} as any;
        setTotalSize(total);
        setpageSize(size);
        setTenantList(data);
        setLoading(false);
    };

    const handleSearch = (data: any) => {
        setLoading(true);
        getList(1, data);
        setSearchWord(data)
    };

    const handlePaging = (num: any, size: any) => {
        setLoading(true);
        getList(num, searchWord, size);
    };

    const pagingSizeChange = (size: any, searchWord: any) => {
        setLoading(true);
        setpageSize(size);
        getList(1, searchWord, size);
    };

    const ztSubmit = async () => {
        // 添加印章
        if (!qyEl || !qyEl?.current) return;
        qyEl.current.validateFields().then(async (values) => {
            console.log(values);

            // const res = await ztAdd(params);
            // console.log('res', res);
            // if (res.code === 'ok') {
            //     setUserData([...userData, values])
            //     setVisible(false);
            // } else {
            //     message.error(res.msg || '失败')
            // }
        })
    }

    // const actionList: any = [
    //     <Button
    //         type="primary"
    //         onClick={() => {
    //             window.open(`./rygl/detail`);
    //         }}
    //     >
    //         添加印章
    //     </Button>,
    // ];

    const expandedRowRender = (e) => {
        // debugger
        const columns = [
          { title: '印章名称', dataIndex: 'alias', key: 'date' },
          { title: '印章高度', dataIndex: 'height', key: 'namde' },
          { title: '印章宽度', dataIndex: 'height', key: 'name' },
          { title: '印章id', dataIndex: 'fileKey', key: 'name' },
        ];
        
        return <Table columns={columns} dataSource={e.contractSealVO||[]} pagination={false} />;
      };
    // const searchArray = [
    //     { name: '印章名称', value: 'access' },
    //     { name: '公司名称', value: 'role', type: 'select', data: typeList },
    //     { name: '印章状态', value: 'role', type: 'select', data: typeList },
    // ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                // actionList={actionList}
                // searchArray={searchArray}
                searchWord={searchWord}
                hideState={true}
                loading={loading}
                columns={columns as any}
                expandable={{expandedRowRender}}
                tableName="用户——印章管理"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
             <Drawer title="签约主体" placement="right" onClose={()=>setVisible(false)} visible={visible} footer={true} width={500} footer={
                <Space>

                    <Button onClick={()=>setVisible(false)}>取消</Button>
                    <Button type="primary" onClick={ztSubmit}>
                        提交
                    </Button>
                    {/* </div> */}

                </Space>
            }>
                <Form
                    name="basic"
                    ref={qyEl}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ userType: 'PERSON', platform: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="签约主体类型"
                        name="idType"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="签约主体姓名"
                        name="name"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="签约主体手机号"
                        name="mobile"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="证件类型"
                        name="userType"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Select
                            placeholder="请选择"
                            allowClear
                        >
                            <Option value='PERSON'>身份证</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="证件号码"
                        name="idNumber"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="是否需要活体检验"
                        name="platform"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}
