import React, { useState, useEffect, useRef } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'
import mammoth from 'mammoth';
import { addOne, ztAdd, ztDelect, lcFore, lcThree, lcTwo, lcOne, getNameData } from '@/services/ant-design-pro/api'
import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';

import { Card, Form, Input, Button, Select, Drawer, Radio, Upload, message, Modal, Space, Empty } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styles from './index.less'
// const mammoth = window.Mammoth;
const { Option } = Select;
// const { Step } = Steps;

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

export default (props) => {
    const type = props.location?.query?.type || '';
    const [detailData, setDetailData] = useState({});
    const [feilSuccess, setFeilSuccess] = useState(false);
    const [active, setActive] = useState(0);
    const [fileData, setFileData] = useState([]);
    const [isqs, setIsqs] = useState(false);
    const [caseId, setCaseId] = useState('');
    const [ajData, setAjData] = useState({});
    const [userData, setUserData] = useState([]);
    const [contractFileModels, setContractFileModels] = useState([]);
    const [feilActive, setFeilActive] = useState(0);
    const [userActive, setUserActive] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingNext, setLoadingNext] = useState(false);
    const [userType, setUserType] = useState('PERSON');
    const [dropData, setDropData] = useState('');
    const qyEl = useRef(null);
    useEffect(() => {
        console.log(props, '1231323');
    }, [])

    const getList = () => {
        setDetailData({})
    }

    const urlArray = [
        {
            name: '电子面签',
            url: '/dzmq',
        },
        {
            name: '自定义合同新建',
        }
    ];

    //第一步
    const onFinish = async (values) => {
        console.log('Success:', values);
        setAjData(values)
        const params = { caseName: values.caseName, contractFileModels }
        const res = await addOne(params);
        console.log('res', res);
        if (res.code === 'ok') {
            setCaseId(res.data.id);
            const temp = active + 1
            setActive(temp);
        } else {
            message.error(res.msg || '失败')
        }
        const temp = active + 1
        setActive(temp);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const handeleNext = async () => {
        if (active === 2) {
            // 签署
            setIsModalVisible(true)
        } else if (active === 1) {
            if (!userData.length) {
                message.error('请先添加签约主体');
                return;
            };
            setActive(() => active + 1)
        } else {
            setActive(() => active + 1)
        }
    }

    useEffect(() => {
        if (active === 2) {
            let txtObj = document.getElementsByClassName('txt')
            for (let i = 0; i < txtObj.length; i++) {
                txtObj[i].ondragstart = handle_start
                txtObj[i].ondrag = handle_drag
                txtObj[i].ondragend = handle_end
            }
            let leftTarget = document.getElementById(`Contain${feilActive}`) || {}
            leftTarget.ondragenter = handle_enter
            leftTarget.ondragover = handle_over
            leftTarget.ondragleave = handle_leave
            leftTarget.ondrop = handle_drop
        }
    }, [active, userActive, feilActive])


    function handle_start(e) {
        e.dataTransfer.setData('Text', e.target.innerText)
        console.log('handle_start-拖动开始')
    }
    function handle_drag(e) {
        console.log('handle_drag-拖动中')
    }
    function handle_end(e) {
        console.log('handle_end-拖动结束')
    }


    function handle_enter(e) {
        e.preventDefault()
        console.log('handle_enter-进入目的地')
    }
    function handle_over(e) {
        e.preventDefault()
        let returnObj = e.dataTransfer.getData('Text')
        console.log(returnObj + '-handle_over-在目的地范围内')
    }
    function handle_leave(e) {
        e.preventDefault()
        let namesEle = document.getElementById(`names${userActive}`)
        setIsqs(true);
        debugger
        if (!namesEle) return;
        // let returnObj = dropData
        // let element = document.createElement("div");
        namesEle.innerHTML = dropData;
        namesEle.style.cssText = 'display:block; border: 2px solid #F76260;'

        console.log('handle_leave-没有放下就离开目的地')
    }
    function handle_drop(e) {
        e.stopPropagation();// 不再派发事件。解决Firefox浏览器，打开新窗口的问题。
        e.preventDefault()
        // let namesEle = document.getElementById(`names${userActive}`)
        // setIsqs(true);
        // if (!namesEle) return;
        // let returnObj = e.dataTransfer.getData('Text')
        // // let element = document.createElement("div");
        // namesEle.innerHTML = returnObj;
        // namesEle.style.cssText = 'display:block; border: 2px solid #F76260;'
        // if (returnObj) {
        //     e.target.appendChild(namesEle)
        // }
        // console.log(returnObj + '-handle_drop-在目的地区释放')
    }



    const mouseDown = evt => {
        let child = document.querySelector(`#names${userActive}`)
        let mBounds = mouseBounds(
            evt.nativeEvent,
            child.getBoundingClientRect(),
            document.querySelector(`#Contain${feilActive}`)?.getBoundingClientRect()
        )
        document.onmousemove = function (ev) {
            let pt = calcPositon(ev, mBounds)
            child.style.left = pt.left + 'px'
            child.style.top = pt.top + 'px'
            child.style.opacity = 0.9
            child.style.cursor = 'move'
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
            child.style.opacity = 1
            child.style.cursor = 'default'
        }
    }

    const calcPositon = (pt, bounds) => {
        const left =
            (pt.x > bounds.left && pt.x < bounds.right
                ? pt.x
                : pt.x >= bounds.right
                    ? bounds.right
                    : bounds.left) - bounds.offsetX
        const top =
            (pt.y > bounds.top && pt.y < bounds.bottom
                ? pt.y
                : pt.y >= bounds.bottom
                    ? bounds.bottom
                    : bounds.top) - bounds.offsetY
        return { left, top }
    }
    /**
     * 鼠标可以移动的范围
     * pt:鼠标按下的点
     * compRact：要移动组件的矩形对象
     * containerRact：容器的矩形对象
     * return 的范围为浏览器窗口中的范围（offset为左上角相对于浏览器的偏移）
     */
    const mouseBounds = (pt, compRact, containerRact) => {
        return {
            left: containerRact.left + (pt.x - compRact.left),
            right: containerRact.right - (compRact.right - pt.x),
            top: containerRact.top + (pt.y - compRact.top),
            bottom: containerRact.bottom - (compRact.bottom - pt.y),
            offsetX: containerRact.left + (pt.x - compRact.left),
            offsetY: containerRact.top + (pt.y - compRact.top)
        }
    }


    function parseWordDocxFile(inputElement) {
        var files = inputElement.currentTarget.files || [];
        debugger
        if (!files.length) return;
        var file = files[0];

        console.time();
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;
            // debugger

            mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                // result1.innerHTML = resultObject.value
                setFileData(resultObject.value)
                console.log(resultObject.value)
            })
            console.timeEnd();

            // mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
            //     // result2.innerHTML = resultObject.value
            //     console.log(resultObject.value)
            // })

            // mammoth.convertToMarkdown({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
            //     // result3.innerHTML = resultObject.value
            //     console.log(resultObject.value)
            // })
        };
        reader.readAsArrayBuffer(file);
    }

    const handleOk = () => {
        if (!qyEl || !qyEl?.current) return;
        const { setFieldsValue } = qyEl.current;


    }
    const handeleTs = async () => {
        // const res = await ts({ flowId: ajData.flowId })
        // if (res.code === 'ok') {
        //     props.history?.push('/dzmq');
        // }
        setLoadingNext(true)
        if (await startQs()) {
            message.success('推送成功！')
            props.history?.push('/dzmq');
        } else {
            message.error('推送失败')
        }
        setLoadingNext(false)
    }

    const propsU = {
        name: 'file',
        action: '/manager/signdoc/upload.json',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: async (info) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                const { fileId = '', fileName = '', previewUrl } = info.file.response?.data;
                if (!previewUrl) {
                    !previewUrl && message.error('上传出错')
                    return
                }
                const tempUrl = previewUrl?.endsWith('.pdf') ? previewUrl : `https://view.officeapps.live.com/op/view.aspx?src=${previewUrl}`
                setFileData([...fileData, tempUrl])
                setContractFileModels([...contractFileModels, { fileId, name: fileName }]);
                // var reader = new FileReader();
                // reader.onloadend = function (event) {
                //     var arrayBuffer = reader.result;
                //     setFileData([...fileData, arrayBuffer])
                //     mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                //         // result1.innerHTML = resultObject.value
                //         setFileData([...fileData, resultObject.value])

                //         // console.log(resultObject.value)
                //     })

                //     // mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                //     //     // result2.innerHTML = resultObject.value
                //     //     console.log(resultObject.value)
                //     // })

                //     // mammoth.convertToMarkdown({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                //     //     // result3.innerHTML = resultObject.value
                //     //     console.log(resultObject.value)
                //     // })
                // };
                // // reader.readAsArrayBuffer(info.file?.originFileObj);
                // reader.readAsDataURL(info.file?.originFileObj);
                // setFeilSuccess(true)
                // // message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败.`);
            }
        },
        onRemove(data) {
            const { fileId = '' } = data.response?.data;
            const tempData = contractFileModels.filter(item => item.fileId !== fileId)
            setContractFileModels(tempData);

        }
    };

    const ztSubmit = async () => {
        // 主体添加
        if (!qyEl || !qyEl?.current) return;
        qyEl.current.validateFields().then(async (values) => {
            console.log(values);
            let params = {}
            if (userType === 'PERSON') {
                values.userId = new Date().getTime();
                params = { caseId: caseId, userType: values.userType, contractUser: values }
            } else {
                params = { caseId: caseId, userType: values.userType, contractOrganization: { ...values, name: values.jgname, idNumber: values.jgidNumber, idType: values.jgidType }, contractUser: values }
            }
            const res = await ztAdd(params);
            console.log('res', res);
            if (res.code === 'ok') {
                values.id = res.data?.id;
                setUserData([...userData, values])
                setVisible(false);
            } else {
                message.error(res.msg || '失败')
            }
        })
    }

    const handleDe = async (e, item, inx) => {
        e.preventDefault();
        const res = await ztDelect({ id: item.id || '' })
        console.log(res, 'res');
        if (res.code === 'ok') {
            const temp = userData.filter(e => e.id !== item.id) || [];
            setUserData(temp)
        } else {
            message.error('删除失败')
        }
    }
    //编辑
    const handleBj = async e => {
        e.preventDefault();
        // const res = ztDelect({ id: '' })
    }

    const handleQy = async () => {
        setLoadingNext(true)
        if (await startQs()) {
            message.success('签署成功！')
            setActive(() => active + 1)
        } else {
            message.error('签署失败')
        }
        setLoadingNext(false)
    }

    const handleBlue = async e => {
        const res = await getNameData({ name: e.target.value })
        if (!qyEl || !qyEl?.current) return;
        qyEl.current.setFieldsValue(res.data && res.data[0])
    }

    const startQs = async () => {
        const a = await lcOne({ caseId, businessScene: `${(fileData[feilActive].fileName || '').split('.')[0]}_${new Date().getTime()}}` });
        const b = await lcTwo({ caseId });
        const c = await lcThree({ caseId });
        const d = await lcFore({ caseId });
        return a.code === 'ok' && b.code === 'ok' && c.code === 'ok' && d.code === 'ok'
    }

    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>
                <h3>自定义合同新建</h3>
                <div className={styles.contan}>
                    {
                        ['新增案件', '选择签约主体', '签署合同', '确认推送'].map((item, index) => (
                            <div className={`${styles.item} ${index === active ? styles.active : ''}`} >
                                <div className={styles.num}>{index + 1}</div>
                                <div className={styles.title}>{item}</div>
                                {
                                    index !== 3 ? <div className={styles.line}></div> : null
                                }

                            </div>
                        ))
                    }
                    <div></div>
                </div>
                {
                    (() => {
                        switch (active) {
                            case 0:
                                return <div className={styles.form}>
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 8 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="新增案件名称"
                                            name="caseName"
                                            rules={[{ required: true, message: '请输入' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="上传文件合同"
                                            name="date"
                                            rules={[{ required: true, message: '请输入' }]}
                                        >
                                            <Upload {...propsU}>
                                                <Button icon={<UploadOutlined />}>上传文件</Button>
                                            </Upload>
                                            {/* <input type="file" onChange={e => parseWordDocxFile(e)} /> */}
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
                                            {/* <Button type="primary" htmlType="submit" disabled={!feilSuccess}>
                                                下一步
                                            </Button> */}
                                            <Button type="primary" htmlType="submit">
                                                下一步
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>

                            case 1:
                                return <div className={styles.steptwo}>
                                    <Button type='primary' onClick={() => setVisible(true)} >添加签约主体</Button>
                                    <div style={{ display: 'flex' }}>
                                        {
                                            userData?.map((item, inx) => (

                                                <div className={styles.stept}>
                                                    <img src="https://gw.alipayobjects.com/mdn/rms_3015bf/afts/img/A*kIaURpYqqekAAAAAAAAAAAAAARQnAQ" alt="" />
                                                    <div>
                                                        <h4>{item.userType === 'PERSON' ? '个人' : '机构'}主体</h4>
                                                        <p>姓名：{item.name}</p>
                                                        <p>手机号：{item.mobile}</p>
                                                        <p>身份证号：{item.idNumber}</p>
                                                        <p><a href="#" onClick={e => handleDe(e, item, inx)}>删除</a></p>
                                                        {/* <p><a href="#" onClick={e => handleBj(e)}>编辑</a> ｜ <a href="#" onClick={e => handleDe(e, item)}>删除</a></p> */}
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </div>
                                    {
                                        userData?.length ? null : <Empty />
                                    }

                                    <div>
                                        <Button type='primary' style={{ marginRight: '8px' }} onClick={() => setActive(() => active - 1)}>上一步</Button>
                                        <Button type='primary' onClick={() => handeleNext()}>下一步</Button>
                                    </div>
                                </div>

                            case 2:
                                return <>
                                    <div className={styles.stepthree}>
                                        <div className={styles.left}>
                                            {/* <div dangerouslySetInnerHTML={{ __html: fileData }} /> */}
                                            <div className={styles.title}>
                                                <h3>合同</h3>
                                            </div>
                                            {
                                                contractFileModels?.map((con, k) => (
                                                    <div onClick={() => setFeilActive(k)} className={`${styles.ht} ${k === feilActive ? styles.htActive : ''}`}>
                                                        {con.name}
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        {
                                            contractFileModels?.map((con, keys) => (
                                                keys === feilActive ? <div className={styles.contain} id={`Contain${feilActive}`} >
                                                    {
                                                        userData?.map((e, ke) => (<div className={styles.names} id={`names${ke}`} onMouseDown={mouseDown}></div>))
                                                    }

                                                    {/* <div dangerouslySetInnerHTML={{ __html: fileData[feilActive] }} ></div> */}
                                                    <iframe frameborder="0" height='100%' width="100%" src={fileData[feilActive]}></iframe>

                                                    {/* <FileViewer
                                                        fileType='docx'
                                                        filePath='https://notarizatry.oss-cn-hzfinance.aliyuncs.com/4eb489b0-4d66-45ea-9626-abe499f123cf.docx'
                                                        // errorComponent={CustomErrorComponent}
                                                        onError={e => console.error(e)} /> */}
                                                    {/* <FileViewer
                                                        fileType='docx'
                                                        filePath={fileData[feilActive]}
                                                        // errorComponent={CustomErrorComponent}
                                                        onError={e => console.error(e)} /> */}
                                                </div> : null
                                            ))
                                        }

                                        <div className={styles.right}>
                                            <div className={styles.title}>
                                                <h3>主体</h3>
                                            </div>
                                            {
                                                userData?.map((item, k) => (
                                                    <div className={styles.contain}>
                                                        <div draggable className='txt' onMouseOver={() => { setUserActive(k); setDropData(item.name); }}>{item.name}</div>

                                                        <div>签署</div>
                                                    </div>
                                                ))
                                            }

                                        </div>

                                    </div>
                                    <div>
                                        <Button type='primary' style={{ marginRight: '8px' }} onClick={() => setActive(() => active - 1)}>上一步</Button>
                                        <Button type='primary' onClick={() => handeleNext()}>下一步</Button>
                                    </div>
                                </>


                            case 3:
                                return <div className={styles.stepfore}>
                                    <h4>基本信息</h4>
                                    <div>
                                        <p> <span>案件名称：</span>{ajData.caseName} </p>
                                        {/* <p> <span>上传人：</span>{userData.name} </p> */}
                                        <p> <span>文书数量：</span>{fileData.length}</p>
                                    </div>
                                    {/* <h4>签约</h4>
                                    <div>
                                        <p> <span>签约方：{userData.name}({userData.name})</span> </p>
                                    </div> */}
                                    <h4>业务合同书</h4>
                                    {fileData?.map((item, index) => (
                                        <>
                                            <h4>合同{index + 1}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: item }} className={styles.contain} ></div>
                                        </>
                                    ))}
                                    {/* <div dangerouslySetInnerHTML={{ __html: fileData }} className={styles.contain} ></div> */}
                                    <div>
                                        <Button type='primary' style={{ marginRight: '8px' }} onClick={() => setActive(() => active - 1)}>上一步</Button>
                                        <Button type='primary' onClick={() => handeleTs()} loading={loadingNext}>确认推送</Button>
                                    </div>
                                </div>

                            default:
                                return
                        }
                    })()
                }


            </Card>
            <Drawer title="签约主体" placement="right" onClose={onClose} visible={visible} footer={true} width={500} footer={
                <Space>

                    <Button onClick={onClose}>取消</Button>
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
                    initialValues={{ userType: 'PERSON', platform: false, }}
                    autoComplete="off"
                >
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
                        <Input placeholder='请输入' onBlur={e => handleBlue(e)} />
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
                    {/* <Form.Item
                        label="密钥"
                        name="secret"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item> */}
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
            <Modal width={300} title="温馨提示" visible={isModalVisible} onOk={() => { setIsModalVisible(false); setActive(() => active + 1) }} onCancel={() => setIsModalVisible(false)}>
                <p>为了避免签约失败，请确认相关企业章和法人章都指定到合同中！</p>
            </Modal>
        </>
    )
}