import React from 'react';
import style from './index.less';
import { Loading } from '@/components/Loading';
import { fetchData, University } from './model';
import Highlighter from 'react-highlight-words';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { CONFIG } from '@/../config';

function getTV(name: string) {
    return {
        text: name,
        value: name,
    };
}

class Index extends React.Component {
    async componentWillMount() {
        const university_info: University[] = await fetchData();
        let columns: any = [];
        columns = [
            {
                title: '学校标识码',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
                align: 'left',
                sorter: (a: University, b: University) => a.id - b.id,
            },
            {
                title: '学校名称',
                dataIndex: 'name',
                key: 'name',
                width: '25%',
                align: 'left',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '校徽',
                dataIndex: 'logoUrl',
                key: 'logoUrl',
                width: '5%',
                align: 'left',
                render: (logoUrl: string) => {
                    return (
                        <a
                            href={[
                                CONFIG.publicPath,
                                CONFIG.dataPrefix,
                                logoUrl,
                            ].join('')}
                        >
                            <img
                                width="32"
                                height="32"
                                src={[
                                    CONFIG.publicPath,
                                    CONFIG.dataPrefix,
                                    logoUrl,
                                ].join('')}
                            />
                        </a>
                    );
                },
            },
            {
                title: '省份',
                dataIndex: 'province',
                key: 'province',
                width: '10%',
                align: 'left',
                filters: [
                    ...new Set(
                        university_info.map((u: University) => u.province),
                    ),
                ].map((s: string) => getTV(s)),
                onFilter: (value: string, u: University) => u.province == value,
            },
            {
                title: '所在地',
                dataIndex: 'city',
                key: 'city',
                width: '10%',
                align: 'left',
                ...this.getColumnSearchProps('city'),
            },
            {
                title: '主管部门',
                dataIndex: 'competentDepartment',
                key: 'competentDepartment',
                width: '15%',
                align: 'left',
                ...this.getColumnSearchProps('competentDepartment'),
            },
            {
                title: '办学层次',
                dataIndex: 'level',
                key: 'level',
                width: '15%',
                align: 'left',
                filters: [
                    ...new Set(university_info.map((u: University) => u.level)),
                ].map((s: string) => getTV(s)),
                onFilter: (value: string, u: University) => u.province == value,
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                width: '10%',
                align: 'left',
                filters: [
                    ...new Set(
                        university_info.map((u: University) => u.remarks),
                    ),
                ].map((s: string) => getTV(s)),
                onFilter: (value: string, u: University) => u.province == value,
            },
        ];

        this.setState({
            loaded: true,
            columns: columns,
            tableData: university_info,
        });
    }

    constructor(props: any) {
        super(props);
    }

    componentWillReceiveProps(nextProps: any) {}

    state = {
        loaded: false,
        columns: [],
        tableData: [],
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        return (
            <div className={style.root}>
                {this.state.loaded === false && (
                    <div className={style.loading}>
                        <Loading />
                    </div>
                )}

                {this.state.loaded === true && (
                    <Table
                        style={{ paddingTop: 45 }}
                        size="small"
                        columns={this.state.columns}
                        dataSource={this.state.tableData}
                        className={style.Table}
                        pagination={{
                            hideOnSinglePage: true,
                            showQuickJumper: true,
                            showSizeChanger: true,
                            defaultPageSize: 15,
                            pageSizeOptions: ['10', '15', '30', '50', '100'],
                        }}
                    />
                )}
            </div>
        );
    }
}

export default Index;
