import { Button, Modal, Tag, Select, Form, Input, Space } from 'antd';
import {Table} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategories, getCategory, updateCategory } from '../store/actions/categoryActions';
import { AppState } from '../store/reducers';
import { Category, CategoryForm } from '../types/category';

import { SketchPicker } from 'react-color';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type Mode = 'new' | 'edit' | 'delete';

const emptyForm: CategoryForm = {
  name: '',
  type: 'expense',
  color: 'black',
};

function Categories() {
  const { data, loading, error } = useSelector((state: AppState) => state.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>('new');
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [updateId, setUpdateId] = useState<Number | null>(null);
  const [deleteId, setDeleteId] = useState<Number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === 'new') dispatch(addCategory(form));
    else if (mode === 'edit') dispatch(updateCategory(form, updateId as number));
    else if (mode === 'delete' && typeof deleteId === 'number') dispatch(deleteCategories(deleteId));
    setIsModalVisible(false);
    setMode('new');
    setForm(emptyForm);
    setUpdateId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode('new');
    setForm(emptyForm);
    setUpdateId(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, category: Category) => (
        <Space size='middle'>
          <EditOutlined
            style={{ color: '#0390fc' }}
            onClick={() => {
              showModal('edit');
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            style={{ color: ' #c20808' }}
            onClick={() => {
              showModal('delete');
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <>
      <div>
        <Button type='primary' onClick={() => showModal('new')}>
          Open Modal
        </Button>
        <Modal title={mode === 'new' ? 'Create New Category' : mode === 'edit' ? 'Update Category' : 'Delete Category'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{disabled: !(mode === 'delete') || !form.name}}>
          {mode === 'edit' || mode === 'new' ? (
            <Form>
              <Form.Item label='Category Name'>
                <Input name='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Form.Item>
              <Form.Item label='Category Type'>
                <Select defaultValue='expense' value={form.type} onChange={(type) => setForm({ ...form, type: type })}>
                  <Select.Option value='income'>Income</Select.Option>
                  <Select.Option value='expense'>Expence</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Color'>
                <SketchPicker color={form.color} onChange={(color) => setForm({ ...form, color: color.hex })} />
              </Form.Item>
            </Form>
          ) : mode === 'delete' ? (
            <>Are Your Sure?</>
          ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} rowKey='id' />
    </>
  );
}

export default Categories;
