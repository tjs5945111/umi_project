import React, { useState, useEffect, useRef } from 'react';
import {
    Card,
    Form,
    Table,
    Row,
    Col,
    Button,
    Input,
    Select,
    Checkbox,
    DatePicker
} from 'antd';
const { RangePicker } = DatePicker;
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.less';
const { Option } = Select;

type on = (x?: any, y?: any) => void;

export interface BaseTableState { }

export interface BaseTablehProps {
    showHeader?: boolean;
    loading?: boolean;
    hideSearch?: boolean;
    hideState?: boolean;
    showSelection?: boolean; // 可选择
    dataSource: any[];
    columns: any[];
    searchArray?: any[]; // 搜索表达每一项{name:'',value:''}
    handleSelected?: on;
    handlePaging?: on; // 分页处理事件
    tableName?: string;
    actionList?: any[]; // 表格操作按钮列表
    radioList?: any[]; // 表格操作按钮列表
    handleSearch?: on; // 搜索处理事件
    pagingSizeChange?: on; // 每页条数变化事件
    totalSize?: number; // 总数
    searchWord?: {}, // 搜索的值
}

const checkBoxOptions = [
    { label: '创建', value: 'DRAFT&UPDATED' },
    { label: '预发', value: 'PRE_RELEASED' },
    { label: '审批中', value: 'PROCESSING' },
    {
        label: '灰度',
        value: 'WHITE_LIST_GRAY&INNER_GRAY&EXTERNAL_GRAY&WHITE_LIST_GRAY_D&EXTERNAL_GRAY_D',
    },
    { label: '发布', value: 'RELEASED' },
    {
        label: '下线',
        value: 'WHITE_LIST_GRAY_D&PROCESSING_D&EXTERNAL_GRAY_D&INVALID',
    },
];

const ALL_SEARCH_STATUS = [
    'DRAFT&UPDATED',
    'PRE_RELEASED',
    'PROCESSING',
    'WHITE_LIST_GRAY&INNER_GRAY&EXTERNAL_GRAY&WHITE_LIST_GRAY_D&EXTERNAL_GRAY_D',
    'RELEASED',
    'WHITE_LIST_GRAY_D&PROCESSING_D&EXTERNAL_GRAY_D&INVALID',
];

export default function BaseTable({
    showHeader = true,
    dataSource,
    loading,
    columns,
    handleSelected,
    handlePaging,
    hideSearch = false,
    searchArray,
    tableName,
    actionList,
    radioList,
    showSelection = false,
    handleSearch,
    pagingSizeChange,
    totalSize,
    searchWord,
    hideState = false,
}: BaseTablehProps) {
    const [selectedRowKeys, SetSelectedRowKeys] = useState([]);
    const [expand, SetExpand] = useState(false);
    const [formatSearchStatus, SetFormatSearchStatus] = useState<any>([]);
    const [checkAll, SetcheckAll] = useState<any>(false);
    const [searchParams, SetSearchParams] = useState(searchWord);
    const formEl = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            if (!formEl || !formEl?.current) return;
            const { setFieldsValue } = formEl.current;
            Object.keys(searchParams || {}).length && setFieldsValue(searchParams);
        }, 0);
    }, [dataSource]);
    const handleSelectedChange = (rowKeys, rows) => {
        SetSelectedRowKeys(rowKeys);
        typeof handleSelected !== 'undefined' && handleSelected(rowKeys, rows);
        // console.log(rowKeys, rows);
    };

    const pagingChange = (page: any, size) => {
        typeof handlePaging !== 'undefined' && handlePaging(page, size);
    };

    const onCheckAllChange = e => {
        SetFormatSearchStatus(e.target.checked ? ALL_SEARCH_STATUS : []);
        SetcheckAll(e.target.checked);
    };

    const getFields = (form: any) => {
        if (!searchArray) {
            return [];
        }
        const count = expand ? searchArray?.length : 6;
        const children: any = [];
        searchArray?.forEach((ele, index) => {
            children.push(
                <>
                    {(() => {
                        switch (ele.type) {
                            case 'select':
                                return (
                                    <Form.Item name={`${ele.value}`}
                                        label={`${ele.name}`}
                                        rules={[
                                            {
                                                required: ele.disable,
                                                message: '请选择',
                                            },
                                        ]}>
                                        <Select placeholder={`请选择${ele.name}`}>
                                            {ele.data?.map((item: any) => {
                                                return (
                                                    <Option value={`${item.value}`} key={item.value}>
                                                        {item.name}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                );
                            case 'date':
                                return (
                                    <Form.Item name={`${ele.value}`}
                                        label={`${ele.name}`}
                                        rules={[
                                            {
                                                required: ele.disable,
                                                message: '请选择',
                                            },
                                        ]}>
                                        {/* <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" /> */}
                                        <RangePicker />
                                    </Form.Item>
                                );
                            default:
                                return (
                                    <Form.Item name={`${ele.value}`}
                                        label={`${ele.name}`}
                                        rules={[
                                            {
                                                required: ele.disable,
                                                message: '请输入',
                                            },
                                        ]}>
                                        <Input placeholder={`${ele.name}`} />
                                    </Form.Item>
                                );
                        }
                    })()}
                </>,
            );
        });
        const checkEle = (
            <Col key="check" span={24}>
                <span>状态： </span>
                <>
                    <Checkbox
                        // indeterminate={false}
                        onChange={(e: any) => onCheckAllChange(e)}
                        checked={checkAll}
                    >
                        全部
                    </Checkbox>
                    <Checkbox.Group
                        options={checkBoxOptions}
                        value={formatSearchStatus}
                        onChange={(e: any) => SetFormatSearchStatus(e)}
                    />
                </>
            </Col>
        );
        !hideState && children.push(checkEle);
        return children;
    };

    const handleSearchs = (values) => {
        if (formatSearchStatus?.length) {
            values.statusList = formatSearchStatus;
        }
        typeof handleSearch !== 'undefined' && handleSearch(values, searchParams);
        SetSearchParams(values);
    };

    const handleReset = (form: any) => {
        console.log(form);

        // form.resetFields();
        typeof handleSearch !== 'undefined' && handleSearch({}, {});
        SetFormatSearchStatus([]);
        SetcheckAll(false);
        SetSearchParams({});
    };

    const pagingSizeChanges = (size: any) => {
        typeof pagingSizeChange !== 'undefined' && pagingSizeChange(size, searchParams);
    };

    const toggle = () => {
        SetExpand(!expand);
    };

    const SearchForm = ((props: any) => {
        const { form, hideSearchType } = props;
        return !hideSearchType && searchArray ? (
            <Form layout={'inline'} onFinish={handleSearchs} ref={formEl}>
                <Row gutter={24}>{getFields(form)}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={() => handleReset(form)}>
                                重置
                            </Button>
                        </Form.Item>

                        {searchArray?.length > 6 ? (
                            expand ? (
                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => toggle()}>
                                    收起 <DownOutlined />
                                </a>
                            ) : (
                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => toggle()}>
                                    展开 <UpOutlined />
                                </a>
                            )
                        ) : null}
                    </Col>
                </Row>
            </Form>
        ) : null;
    });
    return (
        <>
            <Card bordered={false}>
                {
                    tableName ? <h3>{tableName}</h3> : null
                }

                {radioList?.map((item: any, index) => (
                    <div key={index}>{item}</div>
                ))}
                {!hideSearch && searchArray ? (
                    <div style={{ margin: '20px 12px' }}>
                        <SearchForm hideSearchType={hideSearch} />
                    </div>
                ) : null}
                {
                    actionList?.length ? <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        {/* {tableName ? <h3 style={{ marginBottom: '24px' }}>{tableName}</h3> : null} */}
                        <>
                            {actionList?.map((item: any, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </>
                    </div> : null
                }

                <Table
                    showHeader={showHeader}
                    rowSelection={
                        showSelection
                            ? {
                                selectedRowKeys: selectedRowKeys || [],
                                onChange: (rowKeys, selectedRows) => {
                                    handleSelectedChange(rowKeys, selectedRows);
                                },
                            }
                            : undefined
                    }
                    loading={loading}
                    rowKey={(_, index) => `${index}`}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        size: 'small',
                        onChange: (page: any, size) => {
                            pagingChange(page, size);
                        },
                        onShowSizeChange: (page: any, size: any) => {
                            // pagingSizeChanges(size);
                        },
                        total: totalSize,
                        showTotal: totalSize => `共${totalSize}个`,
                        // pageSize: 10,
                    }}
                    scroll={{ x: 1300 }}
                />
            </Card>
        </>
    );
}
