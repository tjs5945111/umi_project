// 印章管理
import React, { useState, useEffect, useRef } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio, Button, Table, Drawer, Space, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { yzList, rysc, yzAdd, ztCreate, getDqlb, getSeals } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select;

const UserTypeEnum = [{ name: '个人', value: 'PERSON' }]
// const UserTypeEnum = [{ name: '个人', value: 'PERSON' }, { name: '机构', value: 'ORGANIZATION' }]
const TypeEnum = [{ name: '统一社会信用代码', value: 'CRED_ORG_USCC' },
{ name: '组织机构代码证', value: 'CRED_ORG_CODE' },
{ name: '工商注册号', value: 'CRED_ORG_REGCODE' },
{ name: '工商登记证', value: 'CRED_ORG_BUSINESS_REGISTTATION_CODE' },
{ name: '税务登记证', value: 'CRED_ORG_TAX_REGISTTATION_CODE' },
{ name: '法人代码证', value: 'CRED_ORG_LEGAL_PERSON_CODE' },
{ name: '事业单位法人证书', value: 'CRED_ORG_ENT_LEGAL_PERSON_CODE' },
{ name: '社会团体登记证书', value: 'CRED_ORG_SOCIAL_REG_CODE' },
{ name: '民办非机构登记证书', value: 'CRED_ORG_PRIVATE_NON_ENT_REG_CODE' },
{ name: '外国机构常驻代表机构登记证', value: 'CRED_ORG_FOREIGN_ENT_REG_CODE' },
{ name: '政府批文', value: 'CRED_ORG_GOV_APPROVAL' },
{ name: '自定义', value: 'CODE_ORG_CUSTOM' },
{ name: '未知证件类型', value: 'CRED_ORG_UNKNOWN' },
]
const orgTypeEnum = [{ name: '企业', value: 'ENTERPRISE' }, { name: '个体工商户', value: 'SELF-EMPLOYED' }, { name: '分公司', value: 'SUBSIDIARY' }, { name: '其他机构', value: 'OTHERORG' }]

export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState({});
    const [typeList, setTypeList] = useState([]);
    const [baseStatues, setBaseStatues] = useState({});
    const [visible, setVisible] = useState(false);
    const [yzid, setYzid] = useState('');
    const [ids, setIds] = useState('');
    const [imgData, setImgData] = useState('');
    const qyEl = useRef(null);
    const [userType, setUserType] = useState('PERSON');
    const qyEls = useRef(null);
    const [visibles, setVisibles] = useState(false);
    const [caseIdList, setCaseIdList] = useState([]);
    const [yzData, setYzData] = useState([]);

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
                    {/* <a
                        style={{ marginRight: 30 }}
                        onClick={() => {
                            window.open(`/yzgl/detail?id=${data.id}`);
                        }}
                    >
                        查看详情
                    </a> */}
                    <a
                        style={{ marginRight: 30 }}
                        onClick={() => { debugger; setVisible(true); setYzid(data.userAcc); setIds(data.id) }}
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
        // getCase()
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

    const getCase = async () => {
        const res = await getDqlb({})
        const { data = {}, total = 0, size } = res as any;
        setCaseIdList(data.data);
    }
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
            values.userAcc = yzid;
            values.sealData = imgData;
            values.accountId = ids;
            console.log(values);

            const res = await yzAdd(values);
            console.log('res', res);
            if (res.code === 'ok') {
                setVisible(false);
                message.success('添加成功');
                getList();
            } else {
                message.error(res.msg || '添加失败')
            }
        })
    }
    const ztSubmits = async () => {
        // 主体添加
        if (!qyEls || !qyEls?.current) return;
        qyEls.current.validateFields().then(async (values) => {
            console.log(values);
            let params = {}
            if (userType === 'PERSON') {
                values.userId = new Date().getTime();
                params = { userType: values.userType, contractUser: values }
            } else {
                params = { userType: values.userType, contractOrganization: { ...values, name: values.jgname, idNumber: values.jgidNumber, idType: values.jgidType }, contractUser: values }
            }
            const res = await ztCreate(params);
            console.log('res', res);
            if (res.code === 'ok') {
                values.id = res.data?.id;
                // setUserData([...userData, values])
                getList();
                setVisibles(false);
            } else {
                message.error(res.msg || '失败')
            }
        })
    }

    const actionList: any = [
        <></>
        , <Button
            type="primary"
            onClick={() => setVisibles(true)}
        >
            添加实体
        </Button>,
    ];
    const propsU = {
        name: 'file',
        action: '',
        accept: 'image/*',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: async (info) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                var reader = new FileReader();
                reader.onloadend = function (event) {
                    setImgData((reader.result || '').split(',')[1] || '')
                };
                reader.readAsDataURL(info.file?.originFileObj);
                // message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                var reader = new FileReader();
                reader.onloadend = function (event) {
                    setImgData((reader.result || '').split(',')[1] || '')
                };
                reader.readAsDataURL(info.file?.originFileObj);
                // message.error(`${info.file.name} 文件上传失败.`);
            }
        },
        onRemove(data) {
            setImgData('')
        }
    };

    const expandedRowRender = (e) => {
        // debugger
        const columns = [
            { title: '印章名称', dataIndex: 'alias', key: 'date' },
            { title: '印章高度', dataIndex: 'height', key: 'namde' },
            { title: '印章宽度', dataIndex: 'height', key: 'name' },
            { title: '印章id', dataIndex: 'fileKey', key: 'name' },
        ];

        return <Table columns={columns} dataSource={e.contractSealVO || []} pagination={false} />;
    };
    const handonExpand = async (e, data) => {
        if (e) {
            const res = await getSeals({ userId: data.id })
            if (res?.code === 'ok') {
                tenantList.map(item => {
                    if (item.id === data.id) {
                        item.contractSealVO = res.data

                    }
                    return item;
                })
                setYzData(res.data)
            } else {
                message.error('获取印章数据失败')
            }
            // debugger
        }
    }
    // const searchArray = [
    //     { name: '印章名称', value: 'access' },
    //     { name: '公司名称', value: 'role', type: 'select', data: typeList },
    //     { name: '印章状态', value: 'role', type: 'select', data: typeList },
    // ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                actionList={actionList}
                // searchArray={searchArray}
                searchWord={searchWord}
                hideState={true}
                loading={loading}
                columns={columns as any}
                expandable={{ expandedRowRender }}
                onExpand={handonExpand}
                tableName="用户_印章管理"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
            <Drawer title="签约主体" placement="right" onClose={() => setVisible(false)} visible={visible} footer={true} width={500} footer={
                <Space>

                    <Button onClick={() => setVisible(false)}>取消</Button>
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
                    initialValues={{ width: 100, height: 100 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="印章名称"
                        name="alias"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="印章宽度"
                        name="width"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="印章高度"
                        name="height"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="印章图片"
                        name="sealData"
                        rules={[{ required: true, message: '请上传' }]}
                    >
                        <Upload {...propsU}>
                            <Button icon={<UploadOutlined />} disabled={!!imgData}>上传图片</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer title="签约主体" placement="right" onClose={() => setVisibles(false)} visible={visibles} footer={true} width={500} footer={
                <Space>

                    <Button onClick={() => setVisibles(false)}>取消</Button>
                    <Button type="primary" onClick={ztSubmits}>
                        提交
                    </Button>
                    {/* </div> */}

                </Space>
            }>
                <Form
                    name="basic"
                    ref={qyEls}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ userType: 'PERSON', platform: false, }}
                    autoComplete="off"
                >
                    {/* <Form.Item
                        label="案件"
                        name="caseId"
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <Select
                            placeholder="请选择"
                            allowClear
                        >
                            {
                                caseIdList.map(item => <Option value={item.id}>{item.name}</Option>)
                            }

                        </Select>
                    </Form.Item> */}
                    <Form.Item
                        label="签约主体类型"
                        name="userType"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Select
                            placeholder="请选择"
                            allowClear
                            onSelect={e => setUserType(e)}
                        >
                            {
                                UserTypeEnum.map(item => <Option value={item.value}>{item.name}</Option>)
                            }

                        </Select>
                    </Form.Item>
                    {
                        userType === 'PERSON' ? <>
                        </> : <>
                            <Form.Item
                                label="企业法人名称"
                                name="legalPerson"
                                rules={[{ required: true, message: '请输入' }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <Form.Item
                                label="企业法人证件号码"
                                name="legalPersonId"
                                rules={[{ required: true, message: '请输入' }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>

                            <Form.Item
                                label="企业证件类型"
                                name="jgidType"
                                rules={[{ required: true, message: '请输入' }]}
                            >
                                <Select placeholder='请选择' >
                                    {
                                        TypeEnum.map(ele => (<Option value={ele.value}>{ele.name}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="证件号码"
                                name="jgidNumber"
                                rules={[{ required: true, message: '请输入' }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <Form.Item
                                label="机构名称"
                                name="jgname"
                                rules={[{ required: true, message: '请输入' }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <Form.Item
                                label="机构标识"
                                name="organizationId"
                                rules={[{ required: false, message: '请输入' }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <Form.Item
                                label="机构子类型"
                                name="orgType"
                                rules={[{ required: false, message: '请输入' }]}
                            >
                                <Select placeholder='请选择' >
                                    {
                                        orgTypeEnum.map(ele => (<Option value={ele.value}>{ele.name}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                        </>
                    }
                    <Form.Item
                        label="签约主体姓名"
                        name="name"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="签约主体手机号"
                        name="mobile"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>

                    <Form.Item
                        label="证件类型"
                        name="idType"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Select placeholder='请选择' >
                            <Option value="CRED_PSN_CH_IDCARD">身份证号码</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="证件号码"
                        name="idNumber"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="密钥"
                        name="secret"
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
