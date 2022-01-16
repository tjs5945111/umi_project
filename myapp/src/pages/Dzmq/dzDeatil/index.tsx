import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Select, Drawer } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styles from './index.less'
const { Option } = Select;
// const { Step } = Steps;

export default (props) => {
    const type = props.location?.query?.type || '';
    const [detailData, setDetailData] = useState({});
    const [active, setActive] = useState(0);
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

    const onFinish = (values) => {
        console.log('Success:', values);
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
    const handeleNext = () => {
        setActive(() => active + 1)
    }

    useEffect(() => {
        if (active === 2) {
            let txtObj = document.getElementsByClassName('txt')
            for (let i = 0; i < txtObj.length; i++) {
                txtObj[i].ondragstart = handle_start
                txtObj[i].ondrag = handle_drag
                txtObj[i].ondragend = handle_end
            }
            let leftTarget = document.getElementById('Contain')

            leftTarget.ondragenter = handle_enter
            leftTarget.ondragover = handle_over
            leftTarget.ondragleave = handle_leave
            leftTarget.ondrop = handle_drop
        }
    }, [active])


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
        let returnObj = e.dataTransfer.getData('Text')
        console.log(returnObj)
        console.log('handle_leave-没有放下就离开目的地')
    }
    function handle_drop(e) {
        e.stopPropagation();// 不再派发事件。解决Firefox浏览器，打开新窗口的问题。
        e.preventDefault()
        let namesEle = document.getElementById('names')
        if (!namesEle) return;
        let returnObj = e.dataTransfer.getData('Text')
        // let element = document.createElement("div");
        namesEle.innerHTML = returnObj;
        namesEle.style.cssText = 'display:block'
        // if (returnObj) {
        //     e.target.appendChild(namesEle)
        // }
        console.log(returnObj + '-handle_drop-在目的地区释放')
    }


   
    const mouseDown = evt => {
        let child = document.querySelector('#names')
        let mBounds = mouseBounds(
            evt.nativeEvent,
            child.getBoundingClientRect(),
            document.querySelector('#Contain').getBoundingClientRect()
        )
        document.onmousemove = function(ev) {
            let pt = calcPositon(ev, mBounds)
            child.style.left = pt.left + 'px'
            child.style.top = pt.top + 'px'
            child.style.opacity = 0.9
            child.style.cursor = 'move'
        }
        document.onmouseup = function() {
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


    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>

                <h3>自定义合同新建</h3>
                {/* <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
    <Button icon={<UploadOutlined />}>Upload Directory</Button>
  </Upload> */}
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
                                            name="status"
                                            rules={[{ required: false, message: '请输入' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="上传文件合同"
                                            name="date"
                                            rules={[{ required: false, message: '请输入' }]}
                                        >
                                            <input type="file" />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
                                            <Button type="primary" htmlType="submit">
                                                下一步
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>

                            case 1:
                                return <div className={styles.steptwo}>
                                    <Button type='primary' onClick={() => setVisible(true)} >添加签约主体</Button>
                                    <div className={styles.stept}>
                                        <img src="" alt="" />
                                        <div>
                                            <h4>个人主体</h4>
                                            <p>姓名：</p>
                                            <p>手机号：</p>
                                            <p>身份证号：</p>
                                            <p><a href="#">编辑</a> ｜ <a href="#">删除</a></p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button type='primary' style={{ marginRight: '8px' }} onClick={() => setActive(() => active - 1)}>上一步</Button>
                                        <Button type='primary' onClick={() => handeleNext()}>下一步</Button>
                                    </div>
                                </div>

                            case 2:
                                return <>
                                    <div className={styles.stepthree}>
                                        <div className={styles.left}>1</div>
                                        <div className={styles.contain} id='Contain'>
                                            <div className={styles.names} id='names' onMouseDown={mouseDown}></div>
                                        </div>
                                        <div className={styles.right}>
                                            <div className={styles.title}>
                                                <h3>主体</h3>
                                            </div>
                                            <div className={styles.contain}>
                                                <div draggable className='txt'>童建设</div>

                                                <div>签署</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <Button type='primary' style={{ marginRight: '8px' }} onClick={() => setActive(() => active - 1)}>上一步</Button>
                                        <Button type='primary' onClick={() => handeleNext()}>下一步</Button>
                                    </div>
                                </>


                            case 3:
                                return <div>1</div>

                            default:
                                return <div>123</div>
                        }
                    })()
                }


            </Card>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    )
}